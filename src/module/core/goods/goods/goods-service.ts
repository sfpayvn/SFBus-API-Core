import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { GoodsDocument } from './schema/goods.schema';
import { CreateGoodsDto, CreateGoodsEvent } from './dto/create-goods.dto';
import {
  RequestUpdateGoodsScheduleAssignmentDto,
  RequestUpdateGoodsScheduleBoardingDto,
  RequestUpdatePaymentGoodsStatusDto,
  UpdateGoodsDto,
} from './dto/update-goods.dto';
import { customAlphabet } from 'nanoid';
import { GoodsDto, GoodsEvent, GoodsSortFilter, SearchGoodsPagingRes } from './dto/goods.dto';
import { plainToInstance } from 'class-transformer';
import { GoodsCategoryService } from '../good-category/goods-category-service';
import { BusScheduleDocument } from '../../bus/bus-schedule/schema/bus-schedule.schema';
import { BusRouteDocument } from '../../bus/bus-route/schema/bus-route.schema';
import { GoodsCategoryDocument } from '../good-category/schema/goods.-categoryschema';
import { send } from 'process';
import { BusScheduleService } from '../../bus/bus-schedule/bus-schedule.service';
import { GoodsGateway } from './good.gateway';
import { FileService } from '../../file/file/file.service';
import { PaymentService } from '../../payment/payment-service';
import { GOODS_STATUS } from '@/common/constants/status.constants';
import { getFirstValue, processFilterValue, toObjectId } from '@/utils/utils';
import { GoodsCategoryDto } from '../good-category/dto/goods-category.dto';
import { GOODS_EVENT_TYPES } from '../types/goods.types';

@Injectable()
export class GoodsService {
  private alphabet = process.env.ALPHABET || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  private nanoid = customAlphabet(this.alphabet, 6);
  private rootTenantId = new Types.ObjectId(process.env.ROOT_TENANT_ID || '000000000000000000000000');

  constructor(
    @InjectModel(GoodsDocument.name) private readonly goodsModel: Model<GoodsDocument>,
    @Inject(forwardRef(() => BusScheduleService))
    private readonly busScheduleService: BusScheduleService,
    @Inject(forwardRef(() => GoodsCategoryService))
    private readonly goodsCategoryService: GoodsCategoryService,
    @Inject(forwardRef(() => FileService))
    private readonly fileService: FileService,
    @Inject(forwardRef(() => PaymentService))
    private readonly paymentService: PaymentService,
    private readonly goodsGateway: GoodsGateway,
  ) {
    this.watchChanges();
  }

  async watchChanges() {
    try {
      const changeStream = this.goodsModel.watch();
      changeStream.on('change', async (nodeChange: any) => {
        try {
          // Chỉ xử lý insert và update events, bỏ qua delete
          if (!['insert', 'update', 'replace'].includes(nodeChange.operationType)) {
            return;
          }

          const _id = nodeChange.documentKey._id;

          const goodsDocument = await this.goodsModel
            .findById(_id)
            .populate({ path: 'busSchedule', model: BusScheduleDocument.name })
            .populate({ path: 'busRoute', model: BusRouteDocument.name })
            .populate({ path: 'categories', model: GoodsCategoryDocument.name })
            .lean()
            .exec();

          if (!goodsDocument) {
            return;
          }
          const goods = plainToInstance(GoodsDto, goodsDocument);
          this.goodsGateway.goodsChangeOfBusRouteId(goods, goods.busRouteId);
        } catch (innerError) {
          console.error('Lỗi khi xử lý change event:', innerError);
        }
      });
    } catch (error) {
      console.error('Lỗi khi theo dõi thay đổi:', error);
    }
  }

  async create(createGoodsDto: CreateGoodsDto, tenantId: Types.ObjectId): Promise<GoodsDto> {
    createGoodsDto.goodsNumber = this.generateGoodsNumber();

    // Cập nhật tên file nếu có imageIds
    await this.renameGoodsImages(createGoodsDto.imageIds, createGoodsDto.goodsNumber, tenantId);

    const totalPrice = createGoodsDto.shippingCost + createGoodsDto.cod;
    if (totalPrice <= 0) {
      createGoodsDto.paymentStatus = 'paid';
    }

    const goodsEvent: CreateGoodsEvent = {
      type: GOODS_EVENT_TYPES.CREATED,
      stationId: createGoodsDto.currentStationId,
      scheduleId: createGoodsDto.busScheduleId,
      createdAt: new Date(),
    };

    createGoodsDto.events = [goodsEvent];

    const goods = await this.goodsModel.create({ ...createGoodsDto, tenantId, status: 'new' });

    const goodsDto = plainToInstance(GoodsDto, goods.toObject()) || null;
    await this.mapGoodsImageUrl([goodsDto]);
    return goodsDto;
  }

  async findAll(tenantId: Types.ObjectId): Promise<GoodsDto[]> {
    const rootTenantIdObjectId = toObjectId(this.rootTenantId);

    const goods = await this.goodsModel
      .find({ tenantId })
      .populate({
        path: 'busSchedule',
        model: BusScheduleDocument.name,
        match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
      })
      .populate({
        path: 'busRoute',
        model: BusRouteDocument.name,
        match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
      })
      .populate({
        path: 'categories',
        model: GoodsCategoryDocument.name,
        match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
      })
      .lean()
      .exec();
    return (
      plainToInstance(
        GoodsDto,
        goods.map((good) => good),
      ) || null
    );
  }

  async findOne(id: string, tenantId?: Types.ObjectId) {
    const query: any = { _id: id };
    if (tenantId) {
      query.tenantId = tenantId;
    }

    const rootTenantIdObjectId = toObjectId(this.rootTenantId);

    const goods = await this.goodsModel
      .findOne(query)
      .populate({
        path: 'busSchedule',
        model: BusScheduleDocument.name,
        match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
      })
      .populate({
        path: 'busRoute',
        model: BusRouteDocument.name,
        match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
      })
      .populate({
        path: 'categories',
        model: GoodsCategoryDocument.name,
        match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
      })
      .lean()
      .exec();
    if (!goods) {
      throw new NotFoundException('goods not found.');
    }
    const goodsDto = plainToInstance(GoodsDto, goods) || null;
    await this.mapGoodsImageUrl([goodsDto]);
    return goodsDto;
  }

  async findAllGoodsForBusSchedule(
    busScheduleId: Types.ObjectId,
    tenantId: Types.ObjectId,
    filters?: GoodsSortFilter[],
  ): Promise<GoodsDto[]> {
    const match: any = { busScheduleId, tenantId };
    const ands: any[] = [];

    if (filters && Array.isArray(filters)) {
      for (const { key, value } of filters) {
        // Sử dụng hàm helper để xử lý filter
        ands.push(processFilterValue(key, value));
      }
    }

    if (ands.length) match.$and = ands;

    const pipeline: any[] = [{ $match: match }];

    const items = await this.goodsModel.aggregate(pipeline).exec();

    const rootTenantIdObjectId = toObjectId(this.rootTenantId);

    const categories = await this.goodsCategoryService.findByIds(
      items.flatMap((good) => good.categoriesIds),
      [tenantId, rootTenantIdObjectId],
    );

    const goodses =
      plainToInstance(
        GoodsDto,
        items.map((good) => ({
          ...good,
          categories: categories.filter((category) => good.categoriesIds.includes(category._id)),
        })),
      ) || null;
    await this.mapGoodsImageUrl(goodses);
    return goodses;
  }

  async findAllGoodsAvailable(
    busRouteId: Types.ObjectId,
    tenantId: Types.ObjectId,
    filters?: GoodsSortFilter[],
  ): Promise<GoodsDto[]> {
    const match: any = {
      $and: [
        { tenantId },
        {
          $or: [
            {
              $and: [{ busRouteId: busRouteId }],
            },
            {
              busRouteId: '',
            },
          ],
        },
      ],
    };

    const ands: any[] = [];

    if (filters && Array.isArray(filters)) {
      for (const { key, value } of filters) {
        // Sử dụng hàm helper để xử lý filter
        ands.push(processFilterValue(key, value));
      }
    }

    if (ands.length) {
      match.$and.push(...ands);
    }

    const pipeline: any[] = [{ $match: match }];

    const items = await this.goodsModel.aggregate(pipeline).exec();
    const rootTenantIdObjectId = toObjectId(this.rootTenantId);
    const categories = await this.goodsCategoryService.findByIds(
      items.flatMap((good) => good.categoriesIds),
      [tenantId, rootTenantIdObjectId],
    );

    const goodses =
      plainToInstance(
        GoodsDto,
        items.map((good) => ({
          ...good,
          categories: categories.filter((category) => good.categoriesIds.includes(category._id)),
        })),
      ) || null;
    await this.mapGoodsImageUrl(goodses);
    return goodses;
  }

  async findAllByBookingGroupNumber(goodsNumber: string, tenantId: Types.ObjectId): Promise<GoodsDto> {
    const rootTenantIdObjectId = toObjectId(this.rootTenantId);
    const goodses = await this.goodsModel
      .findOne({ goodsNumber, tenantId })
      .populate({
        path: 'busSchedule',
        model: BusScheduleDocument.name,
        match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
      })
      .populate({
        path: 'busRoute',
        model: BusRouteDocument.name,
        match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
      })
      .populate({
        path: 'categories',
        model: GoodsCategoryDocument.name,
        match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
      })
      .lean()
      .exec();
    return plainToInstance(GoodsDto, goodses);
  }

  async update(updateGoodsDto: UpdateGoodsDto, tenantId: Types.ObjectId): Promise<GoodsDto & { _oldData?: any }> {
    const rootTenantIdObjectId = toObjectId(this.rootTenantId);
    const goodsDocument = await this.goodsModel
      .findOne({ _id: updateGoodsDto._id, tenantId })
      .populate({
        path: 'busSchedule',
        model: BusScheduleDocument.name,
        match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
      })
      .populate({
        path: 'busRoute',
        model: BusRouteDocument.name,
        match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
      })
      .populate({
        path: 'categories',
        model: GoodsCategoryDocument.name,
        match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
      })
      .exec();

    if (!goodsDocument) {
      throw new NotFoundException('Goods not found');
    }

    const oldData = goodsDocument.toObject();
    await this.determineAndSetPaymentStatus(updateGoodsDto, goodsDocument, tenantId);

    // Xử lý cập nhật imageIds
    if (updateGoodsDto.imageIds) {
      const oldImageIds = goodsDocument.imageIds || [];
      await this.handleImageUpdates(oldImageIds, updateGoodsDto.imageIds, goodsDocument.goodsNumber, tenantId);
    }
    await this.determineAndSetPaymentStatus(updateGoodsDto, goodsDocument, tenantId);

    Object.assign(goodsDocument, updateGoodsDto);

    const saved = await goodsDocument.save();
    const result: any = plainToInstance(GoodsDto, saved.toObject());

    await this.mapGoodsImageUrl([result]);
    result._oldData = oldData;

    return result;
  }

  async updates(
    updateGoodsDto: UpdateGoodsDto[],
    tenantId: Types.ObjectId,
  ): Promise<(GoodsDto & { _oldData?: any })[]> {
    const updatePromises = await Promise.all(
      updateGoodsDto.map(async (dto) => {
        const rootTenantIdObjectId = toObjectId(this.rootTenantId);
        const goodsDocument = await this.goodsModel
          .findOne({ _id: dto._id, tenantId })
          .populate({
            path: 'busSchedule',
            model: BusScheduleDocument.name,
            match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
          })
          .populate({
            path: 'busRoute',
            model: BusRouteDocument.name,
            match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
          })
          .populate({
            path: 'categories',
            model: GoodsCategoryDocument.name,
            match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
          })
          .exec();

        if (!goodsDocument) {
          throw new NotFoundException('Goods not found');
        }

        const oldData = goodsDocument.toObject();
        await this.determineAndSetPaymentStatus(dto, goodsDocument, tenantId);

        // Xử lý cập nhật imageIds
        if (dto.imageIds) {
          const oldImageIds = goodsDocument.imageIds || [];
          await this.handleImageUpdates(oldImageIds, dto.imageIds, goodsDocument.goodsNumber, tenantId);
        }

        Object.assign(goodsDocument, dto);

        const saved = await goodsDocument.save();
        const result: any = plainToInstance(GoodsDto, saved.toObject());

        result._oldData = oldData;
        return result;
      }),
    );
    await this.mapGoodsImageUrl(updatePromises);
    return updatePromises;
  }

  async updatePaymentGoodsStatus(
    updateGoodsDto: RequestUpdatePaymentGoodsStatusDto,
    tenantId: Types.ObjectId,
  ): Promise<GoodsDto> {
    const rootTenantIdObjectId = toObjectId(this.rootTenantId);
    const goodsDocument = await this.goodsModel
      .findOne({ _id: updateGoodsDto._id || updateGoodsDto._id, tenantId })
      .populate({
        path: 'busSchedule',
        model: BusScheduleDocument.name,
        match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
      })
      .populate({
        path: 'busRoute',
        model: BusRouteDocument.name,
        match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
      })
      .populate({
        path: 'categories',
        model: GoodsCategoryDocument.name,
        match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
      })
      .exec();

    if (!goodsDocument) {
      throw new NotFoundException('Goods not found');
    }

    const oldData = goodsDocument.toObject();
    Object.assign(goodsDocument, updateGoodsDto);
    const saved = await goodsDocument.save();
    const result: any = plainToInstance(GoodsDto, saved.toObject());
    result._oldData = oldData;
    await this.mapGoodsImageUrl([result]);
    return result;
  }

  /**
   * Cập nhật việc assign hoặc un-assign nhiều goods vào bus schedule
   * @param requestUpdateGoodsScheduleAssignmentDto - Array các goods cần assign/un-assign
   * @param tenantId - ID của tenant
   * @returns Array GoodsDto đã được cập nhật
   */
  async updatesGoodsScheduleAssignment(
    requestUpdateGoodsScheduleAssignmentDto: RequestUpdateGoodsScheduleAssignmentDto[],
    tenantId: Types.ObjectId,
  ): Promise<GoodsDto[]> {
    const rootTenantIdObjectId = toObjectId(this.rootTenantId);
    // collect all ids across dtos
    const allIds = requestUpdateGoodsScheduleAssignmentDto.flatMap((d) => d.goodsIds || []);
    if (!allIds || allIds.length === 0) {
      return [];
    }

    // Read old docs once
    const oldDocs = await this.goodsModel
      .find({ _id: { $in: allIds }, tenantId })
      .lean()
      .exec();
    if (!oldDocs || oldDocs.length === 0) {
      throw new NotFoundException('Goods not found');
    }

    // For each dto, perform updateMany for its ids
    for (const dto of requestUpdateGoodsScheduleAssignmentDto) {
      const ids = dto.goodsIds || [];
      const busScheduleId = dto.busScheduleId;
      if (!ids || ids.length === 0) continue;
      if (!busScheduleId) {
        await this.goodsModel.updateMany(
          { _id: { $in: ids }, tenantId },
          { $set: { busScheduleId: null, status: GOODS_STATUS.NEW } },
        );
      } else {
        await this.goodsModel.updateMany(
          { _id: { $in: ids }, tenantId },
          { $set: { busScheduleId: busScheduleId as any, status: GOODS_STATUS.PENDING } },
        );
      }
    }

    // Re-fetch updated docs for all ids with populates
    const updatedDocs = await this.goodsModel
      .find({ _id: { $in: allIds }, tenantId })
      .populate({
        path: 'busSchedule',
        model: BusScheduleDocument.name,
        match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
      })
      .populate({
        path: 'busRoute',
        model: BusRouteDocument.name,
        match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
      })
      .populate({
        path: 'categories',
        model: GoodsCategoryDocument.name,
        match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
      })
      .lean()
      .exec();

    const oldById = new Map<string, any>();
    for (const o of oldDocs) oldById.set(o._id.toString(), o);
    const updatedById = new Map<string, any>();
    for (const u of updatedDocs) updatedById.set(u._id.toString(), u);

    const results: GoodsDto[] = [];
    // Preserve order: iterate input dtos and their goodsIds
    for (const dto of requestUpdateGoodsScheduleAssignmentDto) {
      for (const id of dto.goodsIds || []) {
        const idStr = id.toString();
        const updated = updatedById.get(idStr);
        const oldData = oldById.get(idStr) || null;
        if (!updated) continue;
        const res: any = plainToInstance(GoodsDto, updated);
        res._oldData = oldData;
        results.push(res);
      }
    }

    await this.mapGoodsImageUrl(results);
    return results;
  }

  async updatesGoodsBoarding(
    requestUpdateGoodsScheduleBoardingDto: RequestUpdateGoodsScheduleBoardingDto,
    tenantId: Types.ObjectId,
  ): Promise<GoodsDto[] & { _oldData?: any }> {
    const rootTenantIdObjectId = toObjectId(this.rootTenantId);
    const goodsIds = requestUpdateGoodsScheduleBoardingDto.goodsIds;
    // 1) Read old documents (lean) in a single query to capture oldData
    const oldDocs = await this.goodsModel
      .find({ _id: { $in: goodsIds }, tenantId, busScheduleId: requestUpdateGoodsScheduleBoardingDto.busScheduleId })
      .lean()
      .exec();

    if (!oldDocs || oldDocs.length === 0) {
      throw new NotFoundException('Goods not found');
    }

    // 2) Execute a single updateMany to set new status for matching goods
    await this.goodsModel.updateMany(
      { _id: { $in: goodsIds }, tenantId, busScheduleId: requestUpdateGoodsScheduleBoardingDto.busScheduleId },
      { $set: { status: requestUpdateGoodsScheduleBoardingDto.status } },
    );

    // 3) Re-fetch updated documents with populates (lean) and preserve order
    const updatedDocs = await this.goodsModel
      .find({ _id: { $in: goodsIds }, tenantId })
      .populate({
        path: 'busSchedule',
        model: BusScheduleDocument.name,
        match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
      })
      .populate({
        path: 'busRoute',
        model: BusRouteDocument.name,
        match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
      })
      .populate({
        path: 'categories',
        model: GoodsCategoryDocument.name,
        match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
      })
      .lean()
      .exec();

    // Map by id for quick lookup
    const oldById = new Map<string, any>();
    for (const o of oldDocs) oldById.set(o._id.toString(), o);

    const updatedById = new Map<string, any>();
    for (const u of updatedDocs) updatedById.set(u._id.toString(), u);

    // Build results in the same order as goodsItemIds
    const results: Array<GoodsDto & { _oldData?: any }> = [];
    for (const id of goodsIds) {
      const idStr = id.toString();
      const updated = updatedById.get(idStr);
      const oldData = oldById.get(idStr) || null;
      if (!updated) continue;
      const dto: any = plainToInstance(GoodsDto, updated);
      dto._oldData = oldData;
      results.push(dto);
    }

    await this.mapGoodsImageUrl(results);
    return results as any;
  }

  updatesGoodsStatus(goodsIds: string[], status: string, tenantId: Types.ObjectId): Promise<GoodsDto[]> {
    const updatePromises = goodsIds.map(async (id) => {
      const rootTenantIdObjectId = toObjectId(this.rootTenantId);
      const goodsDocument = await this.goodsModel
        .findOne({ _id: id, tenantId })
        .populate({
          path: 'busSchedule',
          model: BusScheduleDocument.name,
          match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
        })
        .populate({
          path: 'busRoute',
          model: BusRouteDocument.name,
          match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
        })
        .populate({
          path: 'categories',
          model: GoodsCategoryDocument.name,
          match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
        })
        .exec();

      if (!goodsDocument) {
        throw new NotFoundException(`Goods with id ${id} not found`);
      }

      goodsDocument.status = status;

      const updatedGoods = await goodsDocument.save();
      return plainToInstance(GoodsDto, updatedGoods.toObject());
    });

    return Promise.all(updatePromises);
  }

  private async determineAndSetPaymentStatus(
    updateGoodsDto: UpdateGoodsDto,
    goodsDocument: GoodsDocument,
    tenantId: Types.ObjectId,
  ): Promise<void> {
    if (updateGoodsDto.shippingCost !== goodsDocument.shippingCost || updateGoodsDto.cod !== goodsDocument.cod) {
      const totalPrice =
        (updateGoodsDto.shippingCost || goodsDocument.shippingCost) + (updateGoodsDto.cod || goodsDocument.cod);
      if (totalPrice <= 0) {
        updateGoodsDto.paymentStatus = 'paid';
        return;
      }

      const payments = await this.paymentService.findAllByReferrentId(updateGoodsDto._id, tenantId);
      const totalPaidAmount = payments.reduce((sum, p) => sum + (p.chargedAmount || 0), 0);

      if (totalPaidAmount >= totalPrice) {
        updateGoodsDto.paymentStatus = 'paid';
      } else if (totalPaidAmount > 0 && totalPaidAmount < totalPrice) {
        updateGoodsDto.paymentStatus = 'deposited';
      } else {
        updateGoodsDto.paymentStatus = 'new';
      }
    }
  }

  async remove(id: string, tenantId: Types.ObjectId): Promise<boolean> {
    const goods = await this.goodsModel.findOneAndDelete({ _id: id, tenantId });
    if (!goods) {
      throw new NotFoundException('goods not found.');
    }
    return goods !== null;
  }

  async searchGoodsPaging(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: GoodsSortFilter,
    filters: GoodsSortFilter[],
    tenantId: Types.ObjectId,
  ): Promise<SearchGoodsPagingRes> {
    {
      const pipeline = await this.buildQuerySearchGoodsPaging(pageIdx, pageSize, keyword, sortBy, filters, tenantId);
      // Thực hiện tìm kiếm
      const goods = await this.goodsModel.aggregate(pipeline).exec();

      // Đếm tổng số mục theo filters (không có paging)
      const countPipeline = await this.buildQuerySearchGoodsPaging(0, 0, keyword, sortBy, filters, tenantId);
      // Remove skip và limit từ count pipeline
      const countOnlyPipeline = countPipeline.filter((stage: any) => !stage.$skip && !stage.$limit);
      const countResult = await this.goodsModel.aggregate([...countOnlyPipeline, { $count: 'total' }]).exec();
      const totalItem = countResult.length > 0 ? countResult[0].total : 0;

      // Lấy count by status (theo filters nhưng không bao gồm status)
      const countByStatus = await this.countByStatus(tenantId, keyword, filters);

      const filteredGoods = await Promise.all(
        goods.map(async (goods) => {
          if (!goods.busScheduleId) {
            return goods;
          }
          const busSchedule = await this.busScheduleService.findOne(goods.busScheduleId, tenantId);
          const categories = await this.goodsCategoryService.findByIds(goods.categoriesIds || [], [
            tenantId,
            toObjectId(this.rootTenantId),
          ]);
          goods.categories = categories;

          return plainToInstance(GoodsDto, {
            ...goods,
            busSchedule,
          });
        }),
      );

      await this.mapGoodsImageUrl(filteredGoods);

      // Trả về kết quả
      return {
        pageIdx,
        goods: filteredGoods, // Now properly awaited
        totalPage: Math.ceil(totalItem / pageSize),
        totalItem,
        countByStatus,
      };
    }
  }

  async buildQuerySearchGoodsPaging(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: GoodsSortFilter,
    filters: GoodsSortFilter[],
    tenantId: Types.ObjectId,
  ) {
    const skip = pageIdx ? (pageIdx - 1) * pageSize : 0;

    const pipeline: any = [];
    const matchConditions: any[] = [{ tenantId }];

    // 1. Tìm theo keyword
    if (keyword) {
      matchConditions.push({
        $or: [
          { name: { $regex: keyword, $options: 'i' } },
          { goodsNumber: { $regex: keyword, $options: 'i' } },
          { customerName: { $regex: keyword, $options: 'i' } },

          { customerPhoneNumber: { $regex: keyword, $options: 'i' } },
          { customerAddress: { $regex: keyword, $options: 'i' } },

          { senderName: { $regex: keyword, $options: 'i' } },
          { senderPhoneNumber: { $regex: keyword, $options: 'i' } },
        ],
      });
    }

    // 2. Xác định start/end date và các filter còn lại
    let startDateValue: Date | null = null;
    let endDateValue: Date | null = null;

    if (Array.isArray(filters)) {
      await Promise.all(
        filters.map(async ({ key, value }) => {
          if (!key || value == null) return;

          if (key === 'startDate') {
            const dateValue = getFirstValue(value);
            startDateValue = new Date(dateValue);
          } else if (key === 'endDate') {
            const dateValue = getFirstValue(value);
            endDateValue = new Date(dateValue);
          } else if (key === 'phoneNumber') {
            const phoneValue = getFirstValue(value);
            matchConditions.push({ customerPhoneNumber: { $regex: phoneValue, $options: 'i' } });
          } else {
            matchConditions.push(processFilterValue(key, value));
          }
        }),
      );
    }

    // 3. Tạo điều kiện range cho createdAt nếu có startDate và/hoặc endDate
    if (startDateValue || endDateValue) {
      const rangeCond: any = {};
      if (startDateValue) rangeCond.$gte = startDateValue;
      if (endDateValue) rangeCond.$lte = endDateValue;

      matchConditions.push({ createdAt: rangeCond });
    }

    // 4. Đẩy $match với điều kiện tenantId và các điều kiện khác
    pipeline.push({
      $match: { $and: matchConditions },
    });

    // 4. $sort
    if (sortBy?.key) {
      pipeline.push({
        $sort: { [sortBy.key]: sortBy.value === 'ascend' ? 1 : -1 },
      });
    }

    // 5. paging: $skip + $limit (only if pageSize > 0)
    if (pageSize > 0) {
      pipeline.push({ $skip: skip }, { $limit: pageSize });
    }
    return pipeline;
  }

  generateGoodsNumber(): string {
    return this.nanoid();
  }

  async renameGoodsImages(imageIds: Types.ObjectId[], goodsNumber: string, tenantId: Types.ObjectId): Promise<void> {
    if (!imageIds || imageIds.length === 0) {
      return;
    }

    await Promise.all(
      imageIds.map(async (imageId, index) => {
        const newFileName = `${goodsNumber}-${index + 1}`;
        await this.fileService.update(
          {
            _id: imageId,
            filename: newFileName,
          } as any,
          tenantId,
        );
      }),
    );
  }

  async handleImageUpdates(
    oldImageIds: Types.ObjectId[],
    newImageIds: Types.ObjectId[],
    goodsNumber: string,
    tenantId: Types.ObjectId,
  ): Promise<void> {
    // Lọc ra những imageIds cũ không còn trong danh sách mới
    const deletedImageIds = oldImageIds.filter(
      (oldId) => !newImageIds.some((newId) => newId.toString() === oldId.toString()),
    );

    // Xóa các file không còn sử dụng
    if (deletedImageIds.length > 0) {
      await this.fileService.deleteFiles(deletedImageIds, tenantId);
    }

    // Đổi tên các file mới theo goodsNumber
    await this.renameGoodsImages(newImageIds, goodsNumber, tenantId);
  }

  async mapGoodsImageUrl(goods: GoodsDto[]): Promise<GoodsDto[]> {
    return await Promise.all(
      goods.map(async (good: GoodsDto) => {
        if (good.imageIds) {
          good.images = good.imageIds.map(
            (id) => `${process.env.DOMAIN}:${process.env.PORT}/file/view/${id.toString()}`,
          );
        }
        await this.mapGoodsCategoryImageUrl(good.categories);
        return good;
      }),
    );
  }

  mapGoodsCategoryImageUrl(goodsCategories: GoodsCategoryDto[]): GoodsCategoryDto[] {
    if (!goodsCategories || goodsCategories.length === 0) {
      return goodsCategories;
    }
    return goodsCategories.map((category: GoodsCategoryDto) => {
      if (category.iconId) {
        category.icon = `${process.env.DOMAIN}:${process.env.PORT}/file/view/${category.iconId.toString()}`;
      }
      return category;
    });
  }

  private async countByField(
    tenantId: Types.ObjectId,
    field: string,
    keyword?: string,
    filters?: GoodsSortFilter[],
  ): Promise<Record<string, number>> {
    const matchConditions: any[] = [{ tenantId }];

    if (keyword) {
      matchConditions.push({
        $or: [
          { name: { $regex: keyword, $options: 'i' } },
          { goodsNumber: { $regex: keyword, $options: 'i' } },
          { customerName: { $regex: keyword, $options: 'i' } },
          { customerPhoneNumber: { $regex: keyword, $options: 'i' } },
          { customerAddress: { $regex: keyword, $options: 'i' } },
          { senderName: { $regex: keyword, $options: 'i' } },
          { senderPhoneNumber: { $regex: keyword, $options: 'i' } },
        ],
      });
    }

    let startDateValue: Date | null = null;
    let endDateValue: Date | null = null;

    if (Array.isArray(filters)) {
      await Promise.all(
        filters.map(async ({ key, value }) => {
          if (!key || value == null) return;

          // preserve previous behavior: always skip explicit status filter
          if (key === 'status') return;

          if (key === 'startDate') {
            const dateValue = getFirstValue(value);
            startDateValue = new Date(dateValue);
          } else if (key === 'endDate') {
            const dateValue = getFirstValue(value);
            endDateValue = new Date(dateValue);
          } else if (key === 'phoneNumber') {
            const phoneValue = getFirstValue(value);
            matchConditions.push({ customerPhoneNumber: { $regex: phoneValue, $options: 'i' } });
          } else {
            matchConditions.push(processFilterValue(key, value));
          }
        }),
      );
    }

    if (startDateValue || endDateValue) {
      const rangeCond: any = {};
      if (startDateValue) rangeCond.$gte = startDateValue;
      if (endDateValue) rangeCond.$lte = endDateValue;

      matchConditions.push({ createdAt: rangeCond });
    }

    const groupField = `$${field}`;
    const counts = await this.goodsModel.aggregate([
      { $match: { $and: matchConditions } },
      { $group: { _id: groupField, count: { $sum: 1 } } },
      { $project: { _id: 0, key: '$_id', count: 1 } },
    ]);

    const result: Record<string, number> = {};
    let totalAll = 0;
    counts.forEach((item: any) => {
      const k = item.key === null || item.key === undefined ? 'null' : String(item.key);
      result[k] = item.count;
      totalAll += item.count;
    });

    result['all'] = totalAll;
    return result;
  }

  async countByStatus(
    tenantId: Types.ObjectId,
    keyword?: string,
    filters?: GoodsSortFilter[],
  ): Promise<Record<string, number>> {
    return this.countByField(tenantId, 'status', keyword, filters);
  }
}

import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBusDto } from './dto/create-bus.dto';
import { BusDto, SearchBusQuerySortFilter, SearchBusRes } from './dto/bus.dto';
import { Model, Types } from 'mongoose';
import { BusDocument } from './schema/bus.schema';
import { BusServiceService } from '../bus-service/bus-service.service';
import { BusTypeService } from '../bus-type/bus-type.service';
import { plainToInstance } from 'class-transformer';
import { UpdateBusDto } from './dto/update-bus.dto';
import { BusTemplateService } from '../bus-template/bus-template.service';

@Injectable()
export class BusService {
  constructor(
    @InjectModel(BusDocument.name) private readonly busModel: Model<BusDocument>,
    @Inject(forwardRef(() => BusServiceService)) private readonly busServiceService: BusServiceService,
    @Inject(forwardRef(() => BusTypeService)) private readonly busTypeService: BusTypeService,
    @Inject(forwardRef(() => BusTemplateService)) private readonly busTemplateService: BusTemplateService,
  ) {}

  async create(createBusDto: CreateBusDto, tenantId: Types.ObjectId): Promise<BusDto> {
    const createdBus = new this.busModel({ ...createBusDto, tenantId });
    const savedBus = await createdBus.save();
    return plainToInstance(BusDto, savedBus);
  }

  async findOne(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<BusDto | null> {
    const bus = await this.busModel.findOne({ _id: id, tenantId }).lean().exec();

    if (!bus) {
      return null;
    }

    return plainToInstance(BusDto, bus);
  }

  async findByBusTemplate(
    busTemplateId: Types.ObjectId,
    tenantId: Types.ObjectId,
    rootTenantId: Types.ObjectId,
  ): Promise<BusDto[] | []> {
    const busesModel = await this.busModel.find({ busTemplateId, tenantId }).lean().exec();

    // Giữ nguyên hành vi cũ: chỉ check null (find() trả []), không throw khi rỗng
    if (!busesModel) {
      return [];
    }

    const buses = busesModel.map((bus) => plainToInstance(BusDto, bus));

    await Promise.all(
      buses.map(async (bus) => {
        // Nếu BusTemplate cũng cần scope theo tenant, thêm tenantId tại đây (tùy chữ ký service của bạn)
        bus.busTemplate = await this.busTemplateService.findOne(bus.busTemplateId, [tenantId, rootTenantId]);
      }),
    );
    return buses;
  }

  async findAll(tenantId: Types.ObjectId): Promise<BusDto[]> {
    const buses = await this.busModel.find({ tenantId }).lean().exec();
    return buses.map((bus) => plainToInstance(BusDto, bus));
  }

  async update(updateBusDto: UpdateBusDto, tenantId: Types.ObjectId): Promise<BusDto> {
    // dùng findOneAndUpdate để kèm điều kiện tenantId
    const updated = await this.busModel
      .findOneAndUpdate({ _id: updateBusDto._id, tenantId }, updateBusDto, { new: true })
      .lean()
      .exec();

    if (!updated) {
      throw new NotFoundException(`Bus service with ID "${updateBusDto._id}" not found.`);
    }
    return plainToInstance(BusDto, updated);
  }

  async delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean> {
    const result = await this.busModel.findOneAndDelete({ _id: id, tenantId }).lean().exec();
    return result !== null;
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: SearchBusQuerySortFilter,
    filters: SearchBusQuerySortFilter[],
    tenantId: Types.ObjectId,
  ): Promise<SearchBusRes> {
    const pipeline = await this.buildQuerySearchBus(pageIdx, pageSize, keyword, sortBy, filters, tenantId);

    // Thực hiện tìm kiếm
    const buses = await this.busModel.aggregate(pipeline).exec();

    // Đếm tổng số mục
    const totalItem = await this.busModel.countDocuments({ tenantId });

    const result = plainToInstance(
      BusDto,
      buses.map((b) => b),
    );

    return {
      pageIdx,
      buses: result,
      totalPage: Math.ceil(totalItem / (pageSize || 1)),
      totalItem,
    };
  }

  async buildQuerySearchBus(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: SearchBusQuerySortFilter,
    filters: SearchBusQuerySortFilter[],
    tenantId: Types.ObjectId,
  ) {
    // Thêm điều kiện kiểm tra điểm khởi hành nếu có

    const skip = pageIdx ? (pageIdx - 1) * pageSize : 0;

    const pipeline: any = [];
    const matchConditions: any[] = [{ tenantId }];

    // 1. Tìm theo keyword
    if (keyword) {
      matchConditions.push({
        $or: [{ name: { $regex: keyword, $options: 'i' } }],
      });
    }

    // 2. Xác định start/end date và các filter còn lại
    let startDateValue: string = '';
    let endDateValue: string = '';

    if (Array.isArray(filters)) {
      await Promise.all(
        filters.map(async ({ key, value }) => {
          if (!key || value == null) return;

          if (key === 'startDate') {
            startDateValue = value;
          } else if (key === 'endDate') {
            endDateValue = value;
          } else {
            matchConditions.push({ [key]: value });
          }
        }),
      );
    }

    // 3. Tạo điều kiện range cho createdAt nếu có startDate và/hoặc endDate
    if (startDateValue || endDateValue) {
      const rangeCond: any = {};
      if (startDateValue) rangeCond.$gte = startDateValue;
      if (endDateValue) rangeCond.$lte = endDateValue;

      matchConditions.push({ startDate: rangeCond });
    }

    // 4. Đẩy $match nếu có bất kỳ điều kiện nào
    if (matchConditions.length) {
      pipeline.push({
        $match: { $and: matchConditions },
      });
    }

    // 4. $sort
    if (sortBy?.key) {
      pipeline.push({
        $sort: { [sortBy.key]: sortBy.value === 'ascend' ? 1 : -1 },
      });
    }

    // 5. paging: $skip + $limit
    pipeline.push({ $skip: skip }, { $limit: pageSize });
    return pipeline;
  }
}

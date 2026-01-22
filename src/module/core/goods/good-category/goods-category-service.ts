import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { GoodsCategoryDocument } from './schema/goods.-categoryschema';
import { CreateGoodsCategoryDto } from './dto/create-goods-category.dto';
import { UpdateGoodsCategoryDto } from './dto/update-goods-category.dto';
import { customAlphabet } from 'nanoid';
import { SearchGoodsCategoryPagingQuerySortFilter, SearchGoodsPagingRes } from './dto/goods-category.dto';
import { plainToInstance } from 'class-transformer';
import { GoodsCategoryDto } from './dto/goods-category.dto';

@Injectable()
export class GoodsCategoryService {
  private alphabet = process.env.ALPHABET || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  private nanoid = customAlphabet(this.alphabet, 6);

  constructor(
    @InjectModel(GoodsCategoryDocument.name) private readonly goodsCategoryModel: Model<GoodsCategoryDocument>,
  ) {}

  async create(createGoodsCategoryDto: CreateGoodsCategoryDto, tenantId: Types.ObjectId): Promise<GoodsCategoryDto> {
    const goodsCategory = await this.goodsCategoryModel.create({ ...createGoodsCategoryDto, tenantId });
    return plainToInstance(GoodsCategoryDto, goodsCategory) || null;
  }

  async update(updateGoodsCategoryDto: UpdateGoodsCategoryDto, tenantId: Types.ObjectId): Promise<GoodsCategoryDto> {
    const goodsCategory = await this.goodsCategoryModel.findOneAndUpdate(
      { _id: updateGoodsCategoryDto._id, tenantId },
      updateGoodsCategoryDto,
      { new: true },
    );
    if (!goodsCategory) {
      throw new NotFoundException('goods not found.');
    }
    const dto = plainToInstance(GoodsCategoryDto, goodsCategory);

    const [mapped] = await this.mapImageUrl([dto]);
    return mapped || null;
  }

  async remove(id: string, tenantId: Types.ObjectId): Promise<boolean> {
    const goodsCategory = await this.goodsCategoryModel.findOneAndDelete({ _id: id, tenantId }).lean().exec();
    if (!goodsCategory) {
      throw new NotFoundException('goods not found.');
    }
    return goodsCategory !== null;
  }

  async findByIds(ids: Types.ObjectId[], tenantIds: Types.ObjectId[]): Promise<GoodsCategoryDto[]> {
    const goodsCategories = await this.goodsCategoryModel
      .find({ _id: { $in: ids }, tenantId: { $in: tenantIds } })
      .lean()
      .exec();
    const dtos = plainToInstance(GoodsCategoryDto, goodsCategories || []);
    return await this.mapImageUrl(dtos);
  }

  async findAll(tenantId: Types.ObjectId): Promise<GoodsCategoryDto[]> {
    const goodsCategories = await this.goodsCategoryModel.find({ tenantId }).lean().exec();
    const dtos = plainToInstance(GoodsCategoryDto, goodsCategories || []);
    return await this.mapImageUrl(dtos);
  }

  async findOne(id: string, tenantId: Types.ObjectId): Promise<GoodsCategoryDto> {
    const goodsCategory = await this.goodsCategoryModel.findOne({ _id: id, tenantId }).lean().exec();
    if (!goodsCategory) {
      throw new NotFoundException('goods not found.');
    }
    const dto = plainToInstance(GoodsCategoryDto, goodsCategory);
    const [mapped] = await this.mapImageUrl([dto]);
    return mapped || null;
  }

  async searchGoodsCategoryPaging(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: SearchGoodsCategoryPagingQuerySortFilter,
    filters: SearchGoodsCategoryPagingQuerySortFilter[],
    tenantId: Types.ObjectId,
  ): Promise<SearchGoodsPagingRes> {
    {
      const pipeline = await this.buildQuerySearchGoodsCategoryPaging(
        pageIdx,
        pageSize,
        keyword,
        sortBy,
        filters,
        tenantId,
      );
      // Thực hiện tìm kiếm
      const goodsCategories = await this.goodsCategoryModel.aggregate(pipeline).exec();

      // Đếm tổng số mục
      const totalItem = await this.goodsCategoryModel.countDocuments({ tenantId });

      const dtos = plainToInstance(GoodsCategoryDto, goodsCategories || []);
      const mapped = await this.mapImageUrl(dtos);

      return {
        pageIdx,
        goodsCategories: mapped,
        totalPage: Math.ceil(totalItem / pageSize),
        totalItem,
      };
    }
  }

  async buildQuerySearchGoodsCategoryPaging(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: SearchGoodsCategoryPagingQuerySortFilter,
    filters: SearchGoodsCategoryPagingQuerySortFilter[],
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
            startDateValue = new Date(value);
          } else if (key === 'endDate') {
            endDateValue = new Date(value);
          } else if (key === 'phoneNumber') {
            matchConditions.push({ customerPhoneNumber: { $regex: value, $options: 'i' } });
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

    // 5. paging: $skip + $limit
    pipeline.push({ $skip: skip }, { $limit: pageSize });
    return pipeline;
  }

  generateGoodsNumber(): string {
    return this.nanoid();
  }

  async mapImageUrl(goodsCategories: GoodsCategoryDto[]): Promise<GoodsCategoryDto[]> {
    return await Promise.all(
      goodsCategories.map(async (goodsCategory) => {
        if (goodsCategory.iconId) {
          goodsCategory.icon = `${process.env.DOMAIN}:${process.env.PORT}/file/view/${goodsCategory.iconId.toString()}`;
        }
        return goodsCategory;
      }),
    );
  }
}

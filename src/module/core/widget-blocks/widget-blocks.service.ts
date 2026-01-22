import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { plainToInstance } from 'class-transformer';
import { CreateWidgetBlockDto } from './dto/create-widget-block.dto';
import { UpdateWidgetBlockDto } from './dto/update-widget-block.dto';
import { WidgetBlockDocument } from './schemas/widget-block.schema';
import { SearchWidgetBlockQuerySortFilter, SearchWidgetBlocksResultDto, WidgetBlockDto } from './dto/widget-block.dto';

@Injectable()
export class WidgetBlocksService {
  constructor(
    @InjectModel(WidgetBlockDocument.name)
    private readonly widgetBlockModel: Model<WidgetBlockDocument>,
  ) {}

  async create(createWidgetBlockDto: CreateWidgetBlockDto, tenantId: Types.ObjectId): Promise<any> {
    try {
      const created = new this.widgetBlockModel({
        ...createWidgetBlockDto,
        tenantId,
        isActive: true,
      });
      const saved = await created.save();
      const widgetBlock = await this.mapImageUrl([plainToInstance(WidgetBlockDto, saved.toObject())]);
      return widgetBlock[0];
    } catch (error: any) {
      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        throw new NotFoundException(`${field} "${createWidgetBlockDto[field]}" already exists.`);
      }
      throw error;
    }
  }

  async update(updateWidgetBlockDto: UpdateWidgetBlockDto, tenantId: Types.ObjectId): Promise<any> {
    try {
      const id = updateWidgetBlockDto._id;
      const widgetBlock = await this.widgetBlockModel.findOne({ _id: id, tenantId }).lean().exec();
      if (!widgetBlock) {
        throw new NotFoundException(`Widget block with ID "${id}" not found.`);
      }

      const updated = await this.widgetBlockModel
        .findOneAndUpdate({ _id: id, tenantId }, updateWidgetBlockDto, { new: true })
        .lean()
        .exec();

      const result = await this.mapImageUrl([plainToInstance(WidgetBlockDto, updated)]);
      return result[0];
    } catch (error: any) {
      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        throw new NotFoundException(`${field} already exists.`);
      }
      throw error;
    }
  }

  async delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean> {
    // Soft delete
    const res = await this.widgetBlockModel
      .findOneAndUpdate({ _id: id, tenantId }, { isActive: false }, { new: true })
      .lean()
      .exec();
    return res !== null;
  }

  async findAll(tenantIds: Types.ObjectId[]): Promise<any[]> {
    const widgetBlocks = await this.widgetBlockModel
      .find({ tenantId: { $in: tenantIds }, isActive: true })
      .sort({ updatedAt: -1 })
      .lean()
      .exec();
    let result = plainToInstance(WidgetBlockDto, widgetBlocks);
    result = await this.mapImageUrl(result);
    return result;
  }

  async findOne(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<any | null> {
    const widgetBlock = await this.widgetBlockModel.findOne({ _id: id, tenantId, isActive: true }).lean().exec();
    if (!widgetBlock) {
      return null;
    }
    return plainToInstance(WidgetBlockDto, widgetBlock);
  }

  async findByCode(code: string, tenantId: Types.ObjectId): Promise<any> {
    const widgetBlock = await this.widgetBlockModel.findOne({ code, tenantId, isActive: true }).lean().exec();
    if (!widgetBlock) {
      throw new NotFoundException(`Widget block with code "${code}" not found.`);
    }
    const mapped = await this.mapImageUrl([plainToInstance(WidgetBlockDto, widgetBlock)]);
    return mapped[0];
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: SearchWidgetBlockQuerySortFilter,
    filters: SearchWidgetBlockQuerySortFilter[],
    tenantIds: Types.ObjectId[],
  ): Promise<SearchWidgetBlocksResultDto> {
    const pipeline = await this.buildQuerySearchWidgetBlocks(pageIdx, pageSize, tenantIds, keyword, sortBy, filters);

    const widgetBlocks = await this.widgetBlockModel.aggregate(pipeline).exec();

    const totalItem = await this.widgetBlockModel.countDocuments({
      tenantId: { $in: tenantIds },
      isActive: true,
    });

    let result = plainToInstance(WidgetBlockDto, widgetBlocks);
    result = await this.mapImageUrl(result);

    return {
      pageIdx,
      widgetBlocks: result,
      totalPage: Math.ceil(totalItem / pageSize),
      totalItem,
    };
  }

  async buildQuerySearchWidgetBlocks(
    pageIdx: number,
    pageSize: number,
    tenantIds: Types.ObjectId[],
    keyword: string,
    sortBy: SearchWidgetBlockQuerySortFilter,
    filters: SearchWidgetBlockQuerySortFilter[],
  ) {
    const skip = pageIdx ? (pageIdx - 1) * pageSize : 0;
    const pipeline: any = [];
    const matchConditions: any[] = [];

    // Add tenant filter
    matchConditions.push({ tenantId: { $in: tenantIds } });
    matchConditions.push({ isActive: true });

    // 1. Search by keyword
    if (keyword) {
      matchConditions.push({
        $or: [
          { name: { $regex: keyword, $options: 'i' } },
          { code: { $regex: keyword, $options: 'i' } },
          { description: { $regex: keyword, $options: 'i' } },
        ],
      });
    }

    // 2. Process filters
    let startDateValue: string = '';
    let endDateValue: string = '';

    if (Array.isArray(filters)) {
      filters.forEach(({ key, value }) => {
        if (!key || value == null) return;

        if (key === 'startDate') {
          startDateValue = value;
        } else if (key === 'endDate') {
          endDateValue = value;
        } else {
          matchConditions.push({ [key]: value });
        }
      });
    }

    // 3. Add date range condition if provided
    if (startDateValue || endDateValue) {
      const rangeCond: any = {};
      if (startDateValue) rangeCond.$gte = startDateValue;
      if (endDateValue) rangeCond.$lte = endDateValue;
      matchConditions.push({ createdAt: rangeCond });
    }

    // 4. Add match stage if there are conditions
    if (matchConditions.length) {
      pipeline.push({
        $match: { $and: matchConditions },
      });
    }

    // 5. Sort
    if (sortBy?.key) {
      pipeline.push({
        $sort: { [sortBy.key]: sortBy.value === 'ascend' ? 1 : -1 },
      });
    } else {
      // Default sort by updatedAt descending
      pipeline.push({
        $sort: { updatedAt: -1 },
      });
    }

    // 6. Pagination
    pipeline.push({ $skip: skip }, { $limit: pageSize });

    return pipeline;
  }

  async validateWidgetBlock(code: string, tenantId: Types.ObjectId): Promise<any | null> {
    const widgetBlock = await this.widgetBlockModel.findOne({ code, tenantId, isActive: true }).lean().exec();
    if (!widgetBlock) {
      return null;
    }
    return plainToInstance(WidgetBlockDto, widgetBlock);
  }

  async mapImageUrl(widgetBlocks: WidgetBlockDto[]): Promise<WidgetBlockDto[]> {
    return Promise.all(
      widgetBlocks.map(async (block) => {
        if (block.imageId) {
          block.imageUrl = `${process.env.DOMAIN}:${process.env.PORT}/file/view/${block.imageId.toString()}`;
        }
        return block;
      }),
    );
  }
}

// bus-template.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BusLayoutTemplateDocument } from './schema/bus-layout-template.schema';
import {
  BusLayoutTemplateDto,
  SearchBusLayoutTemplateQuerySortFilter,
  SearchBusTemplateRes,
} from './dto/bus-layout-template.dto';
import { CreateBusLayoutTemplateDto } from './dto/create-bus-layout-template.dto';
import { UpdateBusLayoutTemplateDto } from './dto/update-bus-layout-template.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class BusLayoutTemplateService {
  constructor(
    @InjectModel(BusLayoutTemplateDocument.name) private busLayoutTemplateModel: Model<BusLayoutTemplateDocument>,
  ) {}

  async create(
    createBusLayoutTemplateDto: CreateBusLayoutTemplateDto,
    tenantId: Types.ObjectId,
  ): Promise<BusLayoutTemplateDto> {
    const createdBusTemplate = new this.busLayoutTemplateModel({
      ...createBusLayoutTemplateDto,
      tenantId,
    });

    // Ensure the loops wait for each seat and seat layout to complete
    for (const seatLayout of createdBusTemplate.seatLayouts) {
      for (const seat of seatLayout.seats) {
        seat._id = new Types.ObjectId();
      }
      seatLayout._id = new Types.ObjectId();
    }

    // Save the updated template to the database
    const savedBusTemplate = await createdBusTemplate.save();

    // Transform and return the saved template
    return plainToInstance(BusLayoutTemplateDto, savedBusTemplate.toObject());
  }

  async update(
    updateBusLayoutTemplateDto: UpdateBusLayoutTemplateDto,
    tenantId: Types.ObjectId,
  ): Promise<BusLayoutTemplateDto> {
    const updatedBusService = await this.busLayoutTemplateModel
      .findOneAndUpdate({ _id: updateBusLayoutTemplateDto._id, tenantId }, updateBusLayoutTemplateDto, { new: true })
      .lean()
      .exec();
    if (!updatedBusService) {
      throw new NotFoundException(`Bus service with ID "${updateBusLayoutTemplateDto._id}" not found.`);
    }
    return plainToInstance(BusLayoutTemplateDto, updatedBusService);
  }

  async delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean> {
    const result = await this.busLayoutTemplateModel.findOneAndDelete({ _id: id, tenantId }).lean().exec();
    return result !== null;
  }

  async findAll(tenantIds: Types.ObjectId[]): Promise<BusLayoutTemplateDto[]> {
    const templates = await this.busLayoutTemplateModel
      .find({ tenantId: { $in: tenantIds } })
      .populate('seatLayouts')
      .exec();
    return templates.map((template) => plainToInstance(BusLayoutTemplateDto, template));
  }

  async findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<BusLayoutTemplateDto> {
    const template = await this.busLayoutTemplateModel
      .findOne({ _id: id, tenantId: { $in: tenantIds } })
      .populate('seatLayouts')
      .exec();

    if (!template) {
      throw new NotFoundException(`BusTemplate with ID "${id}" not found.`);
    }

    return plainToInstance(BusLayoutTemplateDto, template);
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: SearchBusLayoutTemplateQuerySortFilter,
    filters: SearchBusLayoutTemplateQuerySortFilter[],
    tenantIds: Types.ObjectId[],
  ): Promise<SearchBusTemplateRes> {
    const pipeline = await this.buildQuerySearchBusLayoutTemplate(
      pageIdx,
      pageSize,
      keyword,
      sortBy,
      filters,
      tenantIds,
    );

    // Thực hiện tìm kiếm
    const busLayoutTemplates = await this.busLayoutTemplateModel.aggregate(pipeline).exec();

    // Đếm tổng số mục
    const totalItem = await this.busLayoutTemplateModel.countDocuments({ tenantId: { $in: tenantIds } });
    const result = plainToInstance(
      BusLayoutTemplateDto,
      busLayoutTemplates.map((busLayoutTemplate) => busLayoutTemplate),
    );

    return {
      pageIdx,
      busLayoutTemplates: result,
      totalPage: Math.ceil(totalItem / pageSize),
      totalItem,
    };
  }

  async buildQuerySearchBusLayoutTemplate(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: SearchBusLayoutTemplateQuerySortFilter,
    filters: SearchBusLayoutTemplateQuerySortFilter[],
    tenantIds: Types.ObjectId[],
  ) {
    // Thêm điều kiện kiểm tra điểm khởi hành nếu có

    const skip = pageIdx ? (pageIdx - 1) * pageSize : 0;

    const pipeline: any = [];
    const matchConditions: any[] = [{ tenantId: { $in: tenantIds } }];

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

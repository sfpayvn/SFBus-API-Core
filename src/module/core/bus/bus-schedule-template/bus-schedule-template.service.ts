// src/bus-schedule/bus-schedule.service.ts
import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBusScheduleTemplateDto } from './dto/create-bus-schedule-template.dto';
import { UpdateBusScheduleTemplateDto } from './dto/update-bus-schedule-template.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Types } from 'mongoose';
import {
  BusScheduleTemplateDto,
  SearchBusScheduleTemplateQuerySortFilter,
  SearchBusScheduleTemplateRes,
} from './dto/bus-schedule-template.dto';
import { BusScheduleTemplateDocument } from './schema/bus-schedule-template.schema';
import { BusService } from '../bus/bus.service';
import { plainToInstance } from 'class-transformer';
import { BusLayoutTemplateService } from '../bus-layout-template/bus-layout-template.service';

@Injectable()
export class BusScheduleTemplateService {
  constructor(
    @InjectModel(BusScheduleTemplateDocument.name) private busScheduleTemplateModel: Model<BusScheduleTemplateDocument>,
    @Inject(forwardRef(() => BusService)) private readonly busService: BusService,
    @Inject(forwardRef(() => BusLayoutTemplateService))
    private readonly busLayoutTemplateService: BusLayoutTemplateService,
  ) {}

  async create(
    createBusScheduleTemplateDto: CreateBusScheduleTemplateDto,
    tenantId: Types.ObjectId,
  ): Promise<BusScheduleTemplateDto> {
    const createdBusScheduleTemplate = new this.busScheduleTemplateModel({
      ...createBusScheduleTemplateDto,
      tenantId,
    });
    const savedBusScheduleTemplate = await createdBusScheduleTemplate.save();
    return plainToInstance(BusScheduleTemplateDto, savedBusScheduleTemplate);
  }

  async update(
    updateBusScheduleTemplateDto: UpdateBusScheduleTemplateDto,
    tenantId: Types.ObjectId,
  ): Promise<BusScheduleTemplateDto> {
    const updatedBusService = await this.busScheduleTemplateModel
      .findOneAndUpdate({ _id: updateBusScheduleTemplateDto._id, tenantId }, updateBusScheduleTemplateDto, {
        new: true,
      })
      .lean()
      .exec();
    if (!updatedBusService) {
      throw new NotFoundException(`Bus service with ID "${updateBusScheduleTemplateDto._id}" not found.`);
    }
    return plainToInstance(BusScheduleTemplateDto, updatedBusService);
  }

  async delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean> {
    const result = await this.busScheduleTemplateModel.findOneAndDelete({ _id: id, tenantId }).lean().exec();
    return result !== null;
  }

  async findAll(tenantIds: Types.ObjectId[]): Promise<BusScheduleTemplateDto[]> {
    const BusScheduleTemplates = await this.busScheduleTemplateModel
      .find({ tenantId: { $in: tenantIds } })
      .lean()
      .exec();
    return BusScheduleTemplates.map((BusScheduleTemplate) =>
      plainToInstance(BusScheduleTemplateDto, BusScheduleTemplate),
    );
  }

  async findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<BusScheduleTemplateDto> {
    const BusScheduleTemplate = await this.busScheduleTemplateModel
      .findOne({ _id: id, tenantId: { $in: tenantIds } })
      .exec();
    if (!BusScheduleTemplate) {
      throw new NotFoundException(`Không tìm thấy lịch trình xe buýt với ID ${id}`);
    }
    return plainToInstance(BusScheduleTemplateDto, BusScheduleTemplate);
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: SearchBusScheduleTemplateQuerySortFilter,
    filters: SearchBusScheduleTemplateQuerySortFilter[],
    tenantIds: Types.ObjectId[],
  ): Promise<SearchBusScheduleTemplateRes> {
    const pipeline = await this.buildQuerySearchBusScheduleTemplate(
      pageIdx,
      pageSize,
      keyword,
      sortBy,
      filters,
      tenantIds,
    );

    // Thực hiện tìm kiếm
    const busSchedulesTemplate = await this.busScheduleTemplateModel.aggregate(pipeline).exec();

    // Đếm tổng số mục
    const totalItem = await this.busScheduleTemplateModel.countDocuments({ tenantId: { $in: tenantIds } });

    const result = plainToInstance(
      BusScheduleTemplateDto,
      busSchedulesTemplate.map((busScheduleTemplate) => busScheduleTemplate),
    );

    return {
      pageIdx,
      busScheduleTemplates: result,
      totalPage: Math.ceil(totalItem / pageSize),
      totalItem,
    };
  }

  async buildQuerySearchBusScheduleTemplate(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: SearchBusScheduleTemplateQuerySortFilter,
    filters: SearchBusScheduleTemplateQuerySortFilter[],
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

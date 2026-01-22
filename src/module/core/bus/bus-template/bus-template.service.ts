import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BusTemplateDto, SearchBusTemplateQuerySortFilter, SearchBusTemplateRes } from './dto/bus-template.dto';
import { Model, Types } from 'mongoose';
import { BusTemplateDocument } from './schema/bus-template.schema';
import { BusServiceService } from '../bus-service/bus-service.service';
import { BusTypeService } from '../bus-type/bus-type.service';
import { plainToInstance } from 'class-transformer';
import { UpdateBusTemplateDto } from './dto/update-bus-template.dto';
import { CreateBusTemplateDto } from './dto/create-bus-template.dto';

@Injectable()
export class BusTemplateService {
  constructor(
    @InjectModel(BusTemplateDocument.name) private readonly busTemplateModel: Model<BusTemplateDocument>,
    @Inject(forwardRef(() => BusServiceService)) private readonly busServiceService: BusServiceService,
    @Inject(forwardRef(() => BusTypeService)) private readonly busTypeService: BusTypeService,
  ) {}

  async create(createBusTemplateDto: CreateBusTemplateDto, tenantId: Types.ObjectId): Promise<BusTemplateDto> {
    const createdBus = new this.busTemplateModel({ ...createBusTemplateDto, tenantId });
    const savedBus = await createdBus.save();
    return plainToInstance(BusTemplateDto, savedBus.toObject());
  }

  async update(updateBusTemplateDto: UpdateBusTemplateDto, tenantId: Types.ObjectId): Promise<BusTemplateDto> {
    const updatedBusService = await this.busTemplateModel
      .findOneAndUpdate({ _id: updateBusTemplateDto._id, tenantId }, updateBusTemplateDto, { new: true })
      .lean()
      .exec();
    if (!updatedBusService) {
      throw new NotFoundException(`Bus service with ID "${updateBusTemplateDto._id}" not found.`);
    }
    return plainToInstance(BusTemplateDto, updatedBusService);
  }

  async delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean> {
    const result = await this.busTemplateModel.findOneAndDelete({ _id: id, tenantId }).lean().exec();
    return result !== null;
  }

  async findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<BusTemplateDto> {
    const busTemplate = await this.busTemplateModel
      .findOne({ _id: id, tenantId: { $in: tenantIds } })
      .lean()
      .exec();

    if (!busTemplate) {
      throw new NotFoundException('Bus Template not found');
    }

    const allServices = await this.busServiceService.findAll(tenantIds);
    const busType = await this.busTypeService.findOne(busTemplate.busTypeId, tenantIds);

    const busServices = allServices.filter((service) =>
      busTemplate.busServiceIds.map((id) => id.toString()).includes(service._id.toString()),
    );

    const busWithDetails = {
      ...busTemplate,
      busType,
      busServices,
    };

    return plainToInstance(BusTemplateDto, busWithDetails);
  }

  async findAll(tenantIds: Types.ObjectId[]): Promise<BusTemplateDto[]> {
    const buses = await this.busTemplateModel
      .find({ tenantId: { $in: tenantIds } })
      .lean()
      .exec();
    return buses.map((bus) => plainToInstance(BusTemplateDto, bus));
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: SearchBusTemplateQuerySortFilter,
    filters: SearchBusTemplateQuerySortFilter[],
    tenantIds: Types.ObjectId[],
  ): Promise<SearchBusTemplateRes> {
    const pipeline = await this.buildQuerySearchBusTemplate(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);

    // Thực hiện tìm kiếm
    const busTemplates = await this.busTemplateModel.aggregate(pipeline).exec();

    // Đếm tổng số mục
    const totalItem = await this.busTemplateModel.countDocuments({ tenantId: { $in: tenantIds } });

    const result = plainToInstance(
      BusTemplateDto,
      busTemplates.map((busTemplate) => busTemplate),
    );

    return {
      pageIdx,
      busTemplates: result,
      totalPage: Math.ceil(totalItem / pageSize),
      totalItem,
    };
  }

  async buildQuerySearchBusTemplate(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: SearchBusTemplateQuerySortFilter,
    filters: SearchBusTemplateQuerySortFilter[],
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

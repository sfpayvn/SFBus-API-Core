import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BusTypeDto, SearchBusTypesQuerySortFilter, SearchBusTypesRes } from './dto/bus-type.dto';
import { CreateBusTypeDto } from './dto/create-bus-type.dto';
import { UpdateBusTypeDto } from './dto/update-bus-type.dto';
import { BusTypeDocument } from './schema/bus-type.schema';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class BusTypeService {
  constructor(@InjectModel(BusTypeDocument.name) private readonly busTypeModel: Model<BusTypeDocument>) {}

  async create(createBusTypeDto: CreateBusTypeDto, tenantId: Types.ObjectId): Promise<BusTypeDto> {
    const createBusType = new this.busTypeModel({ ...createBusTypeDto, tenantId });
    const savedBusType = await createBusType.save();
    return plainToInstance(BusTypeDto, savedBusType.toObject());
  }

  async update(updateBusTypeDto: UpdateBusTypeDto, tenantId: Types.ObjectId): Promise<BusTypeDto> {
    const updatedBusType = await this.busTypeModel
      .findOneAndUpdate({ _id: updateBusTypeDto._id, tenantId }, updateBusTypeDto, { new: true })
      .lean()
      .exec();
    if (!updatedBusType) {
      throw new NotFoundException(`Bus type with ID "${updateBusTypeDto._id}" not found.`);
    }
    return plainToInstance(BusTypeDto, updatedBusType);
  }

  async delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean> {
    const result = await this.busTypeModel.findOneAndDelete({ _id: id, tenantId }).lean().exec();
    return result !== null;
  }

  async findAll(tenantIds: Types.ObjectId[]): Promise<BusTypeDto[]> {
    const busTypes = await this.busTypeModel
      .find({ tenantId: { $in: tenantIds } })
      .lean()
      .exec();
    return busTypes.map((busType) => plainToInstance(BusTypeDto, busType));
  }

  async findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<BusTypeDto> {
    const busType = await this.busTypeModel
      .findOne({ _id: id, tenantId: { $in: tenantIds } })
      .lean()
      .exec();
    if (!busType) {
      throw new NotFoundException(`Bus type with ID "${id}" not found.`);
    }
    return plainToInstance(BusTypeDto, busType);
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: SearchBusTypesQuerySortFilter,
    filters: SearchBusTypesQuerySortFilter[],
    tenantIds: Types.ObjectId[],
  ): Promise<SearchBusTypesRes> {
    const pipeline = await this.buildQuerySearchBusTypes(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);

    // Thực hiện tìm kiếm
    const busTypes = await this.busTypeModel.aggregate(pipeline).exec();

    // Đếm tổng số mục
    const totalItem = await this.busTypeModel.countDocuments({ tenantId: { $in: tenantIds } });

    const result = plainToInstance(
      BusTypeDto,
      busTypes.map((busType) => busType),
    );

    return {
      pageIdx,
      busTypes: result,
      totalPage: Math.ceil(totalItem / pageSize),
      totalItem,
    };
  }

  async buildQuerySearchBusTypes(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: SearchBusTypesQuerySortFilter,
    filters: SearchBusTypesQuerySortFilter[],
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

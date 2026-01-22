import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SearchSeatTypeQuerySortFilter, SearchSeatTypeRes, SeatTypeDto } from './dto/seat-type.dto';
import { CreateSeatTypeDto } from './dto/create-seat-type.dto';
import { SeatTypeDocument } from './schema/seat-type.schema';
import { plainToInstance } from 'class-transformer';
import { UpdateSeatTypeDto } from './dto/update-seat-type.dto';

@Injectable()
export class SeatTypeService {
  constructor(@InjectModel(SeatTypeDocument.name) private readonly seatTypeModel: Model<SeatTypeDocument>) {}

  async create(createSeatTypeDto: CreateSeatTypeDto, tenantId: Types.ObjectId): Promise<SeatTypeDto> {
    const createSeatType = new this.seatTypeModel({ ...createSeatTypeDto, tenantId });
    const savedSeatType = await createSeatType.save();
    return plainToInstance(SeatTypeDto, savedSeatType);
  }

  async update(updateSeatTypeDto: UpdateSeatTypeDto, tenantId: Types.ObjectId): Promise<SeatTypeDto> {
    const seatTypeModel = await this.seatTypeModel
      .findOneAndUpdate({ _id: updateSeatTypeDto._id, tenantId }, updateSeatTypeDto, { new: true })
      .lean()
      .exec();
    if (!seatTypeModel) {
      throw new NotFoundException(`Bus service with ID "${updateSeatTypeDto._id}" not found.`);
    }

    let seatType = plainToInstance(SeatTypeDto, seatTypeModel);

    seatType = this.mapSeatTypeIconUrl([seatType])[0];

    return seatType;
  }

  async delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean> {
    const result = await this.seatTypeModel.findOneAndDelete({ _id: id, tenantId }).lean().exec();
    return result !== null;
  }

  async findAll(tenantIds: Types.ObjectId[]): Promise<SeatTypeDto[]> {
    const seatTypeModels = await this.seatTypeModel
      .find({ tenantId: { $in: tenantIds } })
      .lean()
      .exec();
    let seatTypes = seatTypeModels.map((seatType) => plainToInstance(SeatTypeDto, seatType));

    seatTypes = this.mapSeatTypeIconUrl(seatTypes);
    return seatTypes;
  }

  async findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<SeatTypeDto> {
    const seatTypeModel = await this.seatTypeModel
      .findOne({ _id: id, tenantId: { $in: tenantIds } })
      .lean()
      .exec();
    if (!seatTypeModel) {
      throw new NotFoundException(`Seat type with ID "${id}" not found.`);
    }
    let seatType = plainToInstance(SeatTypeDto, seatTypeModel);

    seatType = this.mapSeatTypeIconUrl([seatType])[0];

    return seatType;
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: SearchSeatTypeQuerySortFilter,
    filters: SearchSeatTypeQuerySortFilter[],
    tenantIds: Types.ObjectId[],
  ): Promise<SearchSeatTypeRes> {
    const pipeline = await this.buildQuerySearchBusTypes(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);

    // Thực hiện tìm kiếm
    const seatTypes = await this.seatTypeModel.aggregate(pipeline).exec();

    // Đếm tổng số mục
    const totalItem = await this.seatTypeModel.countDocuments({ tenantId: { $in: tenantIds } });

    let result = plainToInstance(
      SeatTypeDto,
      seatTypes.map((seatType) => seatType),
    );

    result = this.mapSeatTypeIconUrl(seatTypes);

    return {
      pageIdx,
      seatTypes: result,
      totalPage: Math.ceil(totalItem / pageSize),
      totalItem,
    };
  }

  async buildQuerySearchBusTypes(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: SearchSeatTypeQuerySortFilter,
    filters: SearchSeatTypeQuerySortFilter[],
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

      matchConditions.push({ createDate: rangeCond });
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

  mapSeatTypeIconUrl(seatTypes: SeatTypeDto[]): SeatTypeDto[] {
    return seatTypes.map((seatType) => {
      if (seatType.iconId) {
        seatType.icon = `${process.env.DOMAIN}:${process.env.PORT}/file/view/${seatType.iconId.toString()}`;
      }
      return seatType;
    });
  }
}

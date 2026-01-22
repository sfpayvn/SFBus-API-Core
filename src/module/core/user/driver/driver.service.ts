// driver.service.ts

import { Injectable, BadRequestException, NotFoundException, forwardRef, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateDriverDto } from './dto/create-driver.dto';
import { DriverDocument } from './schema/driver.schema';
import { SearchDriversRes, DriverDto, SearchDriversQuerySortFilter } from './dto/driver.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { UserService } from '../user/user.service';
import { SearchSeatTypeQuerySortFilter } from '../../seat/seat-type/dto/seat-type.dto';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Injectable()
export class DriverService {
  constructor(
    @InjectModel(DriverDocument.name) private driverModel: Model<DriverDocument>,
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService,
  ) {}

  async create(createDriverDto: CreateDriverDto, tenantId: Types.ObjectId): Promise<DriverDto> {
    const createDriver = new this.driverModel({
      ...createDriverDto,
      tenantId,
    });
    const savedDriver = await createDriver.save();
    return plainToInstance(DriverDto, savedDriver.toObject());
  }

  async update(updateDriverDto: UpdateDriverDto, tenantId: Types.ObjectId): Promise<DriverDto> {
    const updatedDriver = await this.driverModel
      .findOneAndUpdate({ _id: updateDriverDto._id, tenantId }, updateDriverDto, { new: true })
      .lean()
      .exec();
    if (!updatedDriver) {
      throw new NotFoundException(`Driver with ID "${updateDriverDto._id}" not found.`);
    }
    return plainToInstance(DriverDto, updatedDriver);
  }

  async delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean> {
    const result = await this.driverModel.findOneAndDelete({ _id: id, tenantId }).lean().exec();
    return result !== null;
  }

  async deleteByUserId(userId: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean> {
    const result = await this.driverModel.findOneAndDelete({ userId, tenantId }).lean().exec();
    return result !== null;
  }

  async findAllUserDriver(tenantId: Types.ObjectId): Promise<DriverDto[]> {
    const userDrivers = await this.userService.findAllByRole(ROLE_CONSTANTS.DRIVER, tenantId);
    const userIds = userDrivers.map((user) => user._id); // Lấy danh sách userIds
    const drivers = await this.driverModel
      .find({ userId: { $in: userIds }, tenantId })
      .lean()
      .exec(); // Query với $in

    const result = userDrivers.map((user) => {
      const driver = drivers.find((d) => d.userId.toString() === user._id.toString());
      return {
        ...new DriverDto(), // Tạo một DriverDto trống
        ...user, // Gộp thông tin từ user
        ...driver, // Gộp thêm thông tin từ driver nếu có
        licenseNumber: driver?.licenseNumber || null,
        licenseExpirationDate: driver?.licenseExpirationDate || null,
        licenseType: driver?.licenseType || null,
        licenseImage: driver?.licenseImage || null,
      };
    }) as DriverDto[];
    return plainToInstance(
      DriverDto,
      result.map((driver) => driver),
    );
  }

  async findOne(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<DriverDto> {
    const driver = await this.driverModel.findOne({ _id: id, tenantId }).lean().exec();
    if (!driver) {
      throw new NotFoundException(`Driver with ID "${id}" not found.`);
    }
    return plainToInstance(DriverDto, driver);
  }

  async findUserDriverByIds(ids: Types.ObjectId[], tenantId: Types.ObjectId): Promise<DriverDto[]> {
    const userDrivers = await this.userService.findByIds(ids, tenantId);
    if (!userDrivers || userDrivers.length === 0) {
      return [];
    }
    const userIds = userDrivers.map((user) => user._id);
    const drivers = await this.driverModel
      .find({ userId: { $in: userIds }, tenantId })
      .lean()
      .exec(); // Query với $in

    const result = userDrivers.map((user) => {
      const driver = drivers.find((d) => d.userId.toString() === user._id.toString());
      return {
        ...new DriverDto(), // Tạo một DriverDto trống
        ...user, // Gộp thông tin từ user
        ...driver, // Gộp thêm thông tin từ driver nếu có
        licenseNumber: driver?.licenseNumber || null,
        licenseExpirationDate: driver?.licenseExpirationDate || null,
        licenseType: driver?.licenseType || null,
        licenseImage: driver?.licenseImage || null,
      };
    }) as DriverDto[];
    return plainToInstance(
      DriverDto,
      result.map((driver) => driver),
    );
  }

  async findOneByUser(userId: Types.ObjectId, tenantId: Types.ObjectId): Promise<DriverDto | null> {
    const driver = await this.driverModel.findOne({ userId, tenantId }).lean().exec();
    if (!driver) {
      return null;
    }
    return plainToInstance(DriverDto, driver);
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: SearchDriversQuerySortFilter,
    filters: SearchDriversQuerySortFilter[],
    tenantId: Types.ObjectId,
  ): Promise<SearchDriversRes> {
    // Lấy danh sách tất cả users với vai trò drivers
    const userDrivers = await this.userService.findAllByRole(ROLE_CONSTANTS.DRIVER, tenantId);
    const userIds = userDrivers.map((user) => user._id);

    const pipeline = await this.buildQuerySearchBusTypes(
      userIds,
      pageIdx,
      pageSize,
      keyword,
      sortBy,
      filters,
      tenantId,
    );

    // Thực hiện tìm kiếm
    const drivers = await this.driverModel.aggregate(pipeline).exec();

    // Đếm tổng số mục
    const totalItem = await this.driverModel.countDocuments({ tenantId });

    // Kết hợp thông tin từ users và drivers
    const result = userDrivers.map((user) => {
      const driver = drivers.find((d) => d.userId.toString() === user._id.toString());
      return {
        ...new DriverDto(), // Tạo một DriverDto trống
        ...user, // Gộp thông tin từ user
        ...driver, // Gộp thêm thông tin từ driver nếu có
        licenseNumber: driver?.licenseNumber || null,
        licenseExpirationDate: driver?.licenseExpirationDate || null,
        licenseType: driver?.licenseType || null,
        licenseImage: driver?.licenseImage || null,
      };
    }) as DriverDto[];

    return {
      pageIdx,
      userDrivers: result,
      totalPage: Math.ceil(userDrivers.length / pageSize),
      totalItem: drivers.length > 0 ? totalItem : userDrivers.length,
    };
  }

  async buildQuerySearchBusTypes(
    userIds: Types.ObjectId[],
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: SearchDriversQuerySortFilter,
    filters: SearchDriversQuerySortFilter[],
    tenantId: Types.ObjectId,
  ) {
    // Thêm điều kiện kiểm tra điểm khởi hành nếu có

    const skip = pageIdx ? (pageIdx - 1) * pageSize : 0;

    const pipeline: any = [];
    const matchConditions: any[] = [{ userId: { $in: userIds }, tenantId }];

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

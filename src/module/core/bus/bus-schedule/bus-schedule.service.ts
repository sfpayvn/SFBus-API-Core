// src/bus-schedule/bus-schedule.service.ts
import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBusScheduleBusDto, CreateBusScheduleDto } from './dto/create-bus-schedule.dto';
import { UpdateBusScheduleDto } from './dto/update-bus-schedule.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Types } from 'mongoose';
import {
  BusScheduleDto,
  BusScheduleSortFilter,
  SearchBusSchedulePagingRes,
  SearchBusScheduleQuery,
} from './dto/bus-schedule.dto';
import { BusScheduleDocument } from './schema/bus-schedule.schema';
import moment from 'moment-timezone';
import { BusService } from '../bus/bus.service';
import { plainToInstance } from 'class-transformer';
import { BusDto } from '../bus/dto/bus.dto';
import { BusScheduleLayoutService } from '../bus-schedule-layout/bus-schedule-layout.service';
import { BusLayoutTemplateService } from '../bus-layout-template/bus-layout-template.service';
import { CreateBusScheduleLayoutDto } from '../bus-schedule-layout/dto/create-bus-schedule-layout.dto';
import {
  getFirstValue,
  isValidDate,
  processFilterValue,
  getCurrentDate,
  parseTimeHmToMilliseconds,
} from '@/utils/utils';
import { bufferToObjectIdHex } from '@/utils/utils';
import { customAlphabet } from 'nanoid';
import { RequestUpdateSeatStatusDto } from '../bus-schedule-layout/dto/bus-schedule-layout.dto';
import { BusServiceDto } from '../bus-service/dto/bus-service.dto';
import { SettingsService } from '../../settings/settings.service';
import { SETTING_CONSTANTS } from '@/common/constants/setting.constants';
import { DriverService } from '../../user/driver/driver.service';
import { EVENT_STATUS } from '@/common/constants/status.constants';

@Injectable()
export class BusScheduleService {
  private alphabet = process.env.ALPHABET || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  private nanoid = customAlphabet(this.alphabet, 6);

  constructor(
    @InjectModel(BusScheduleDocument.name) private busScheduleModel: Model<BusScheduleDocument>,
    @Inject(forwardRef(() => BusService)) private readonly busService: BusService,
    @Inject(forwardRef(() => BusScheduleLayoutService))
    private readonly busScheduleLayoutService: BusScheduleLayoutService,
    @Inject(forwardRef(() => BusLayoutTemplateService))
    private readonly busLayoutTemplateService: BusLayoutTemplateService,
    @Inject(forwardRef(() => DriverService)) private readonly driverService: DriverService,
    @Inject(forwardRef(() => SettingsService)) private readonly settingsService: SettingsService,
  ) {}

  async create(
    createBusScheduleDto: CreateBusScheduleDto,
    rootTenantId: Types.ObjectId,
    tenantId: Types.ObjectId,
  ): Promise<BusScheduleDto> {
    const busLayoutTemplate = await this.busLayoutTemplateService.findOne(createBusScheduleDto.busLayoutTemplateId, [
      rootTenantId,
      tenantId,
    ]);
    // Transform `busLayoutTemplate` to match the structure of `CreateBusScheduleLayoutDto`

    createBusScheduleDto.busScheduleNumber = this.generateBusScheduleNumber();

    if (createBusScheduleDto.busId) {
      const bus = await this.busService.findOne(createBusScheduleDto.busId, tenantId);
      if (!bus) {
        throw new NotFoundException(`Không tìm thấy xe buýt với ID ${createBusScheduleDto.busId}`);
      }
      const bus2Update = plainToInstance(CreateBusScheduleBusDto, bus, { excludeExtraneousValues: true });
      createBusScheduleDto.bus = bus2Update;
    }

    createBusScheduleDto.currentStationId = createBusScheduleDto.busRoute.breakPoints[0].busStationId;

    busLayoutTemplate.seatLayouts = busLayoutTemplate.seatLayouts.map((seatLayout) => {
      seatLayout.seats = seatLayout.seats.map((seat) => ({
        ...seat,
        status: createBusScheduleDto.busSeatLayoutBlockIds.map((id) => id.toString()).includes(seat._id.toString())
          ? 'blocked'
          : 'available',
        _id: new Types.ObjectId(),
      }));
      return {
        ...seatLayout,
        _id: new Types.ObjectId(),
      };
    });
    const createdBusSchedule = new this.busScheduleModel({ ...createBusScheduleDto, tenantId });
    const savedBusSchedule = await createdBusSchedule.save();

    const busSchedule = plainToInstance(BusScheduleDto, savedBusSchedule.toObject());

    const createBusScheduleLayoutDto: CreateBusScheduleLayoutDto = {
      busLayoutTemplateId: createBusScheduleDto.busLayoutTemplateId,
      name: busLayoutTemplate.name,
      seatLayouts: busLayoutTemplate.seatLayouts,
      busScheduleId: busSchedule._id,
    };

    await this.busScheduleLayoutService.create(createBusScheduleLayoutDto, tenantId);

    return busSchedule;
  }

  async findAll(tenantId: Types.ObjectId, filters?: BusScheduleSortFilter[]): Promise<BusScheduleDto[]> {
    const match: any = { tenantId };
    const ands: any[] = [];

    if (filters && Array.isArray(filters)) {
      for (const { key, value } of filters) {
        // Sử dụng hàm helper để xử lý filter
        ands.push(processFilterValue(key, value));
      }
    }

    if (ands.length) match.$and = ands;

    const pipeline: any[] = [{ $match: match }];

    const items = await this.busScheduleModel.aggregate(pipeline).exec();

    const busSchedules: BusScheduleDto[] = items.map((schedule) => plainToInstance(BusScheduleDto, schedule));

    const enrichSchedules = await this.enrichSchedules(busSchedules, tenantId);

    return enrichSchedules;
  }

  async findAllAvailable(tenantId: Types.ObjectId): Promise<BusScheduleDto[]> {
    const startOfDay = moment(new Date(), 'YYYY-MM-DDTHH:mm:ss.SSSZ', 'Asia/Ho_Chi_Minh')
      .clone()
      .startOf('day')
      .tz('Asia/Ho_Chi_Minh')
      .toDate();

    const endOfDay = moment(new Date(), 'YYYY-MM-DDTHH:mm:ss.SSSZ', 'Asia/Ho_Chi_Minh')
      .clone()
      .endOf('day')
      .tz('Asia/Ho_Chi_Minh')
      .toDate();

    const query = {
      tenantId,
      status: { $in: ['scheduled'] },
      startDate: {
        $gte: startOfDay.toISOString(),
        $lte: endOfDay.toISOString(),
      },
    };

    const busScheduleBusDocument = await this.busScheduleModel.find(query).lean().exec();

    const busSchedules: BusScheduleDto[] = busScheduleBusDocument.map((schedule) =>
      plainToInstance(BusScheduleDto, schedule),
    );

    const enrichSchedules = await this.enrichSchedules(busSchedules, tenantId);
    return enrichSchedules;
  }

  async findOne(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<BusScheduleDto> {
    const busScheduleModel = await this.busScheduleModel.findOne({ _id: id, tenantId }).lean().exec();

    if (!busScheduleModel) {
      throw new NotFoundException(`Không tìm thấy lịch trình xe buýt với ID ${id}`);
    }

    const currentDate = getCurrentDate();

    const busSchedule = plainToInstance(BusScheduleDto, busScheduleModel);
    const enrichSchedules = await this.enrichSchedules([busSchedule], tenantId);

    return enrichSchedules[0];
  }

  async update(updateBusScheduleDto: UpdateBusScheduleDto, tenantId: Types.ObjectId): Promise<BusScheduleDto> {
    const updateData: any = {};

    if (updateBusScheduleDto.busId) {
      const bus = await this.busService.findOne(updateBusScheduleDto.busId, tenantId);
      if (!bus) {
        throw new NotFoundException(`Không tìm thấy xe buýt với ID ${updateBusScheduleDto.busId}`);
      }
      const bus2Update = plainToInstance(CreateBusScheduleBusDto, bus, { excludeExtraneousValues: true });
      updateBusScheduleDto.bus = bus2Update;
    }

    // Build update object with only provided fields
    Object.keys(updateBusScheduleDto).forEach((key) => {
      if (key !== '_id' && key !== 'tenantId' && updateBusScheduleDto[key] !== undefined) {
        updateData[key] = updateBusScheduleDto[key];
      }
    });

    const updateBusScheduleDocument = await this.busScheduleModel
      .findOneAndUpdate({ _id: updateBusScheduleDto._id, tenantId }, { $set: updateData }, { new: true })
      .exec();

    if (!updateBusScheduleDocument) {
      throw new NotFoundException(`Bus Schedule with ID "${updateBusScheduleDto._id}" not found.`);
    }

    // Handle seat status updates only if busSeatLayoutBlockIds is provided
    if (updateBusScheduleDto.busSeatLayoutBlockIds && updateBusScheduleDto.busSeatLayoutBlockIds.length > 0) {
      const requestUpdateSeatsStatus: RequestUpdateSeatStatusDto[] = [];

      for (const _id of updateBusScheduleDto.busSeatLayoutBlockIds) {
        const updateSeatStatus: RequestUpdateSeatStatusDto = {
          _id,
          status: 'blocked',
        };
        requestUpdateSeatsStatus.push(updateSeatStatus);
      }

      await this.busScheduleLayoutService.updateSeatStatusByBusSchedule(
        updateBusScheduleDto._id,
        requestUpdateSeatsStatus,
        tenantId,
      );
    }

    return plainToInstance(BusScheduleDto, updateBusScheduleDocument.toObject());
  }

  async delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean> {
    const result = await this.busScheduleModel.findOneAndDelete({ _id: id, tenantId }).lean().exec();
    return result !== null;
  }

  async searchBusSchedulePaging(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: BusScheduleSortFilter,
    filters: BusScheduleSortFilter[],
    tenantId: Types.ObjectId,
  ): Promise<SearchBusSchedulePagingRes> {
    // Update status trong DB trước khi query
    const pipeline = await this.buildQuerySearchBusSchedule(pageIdx, pageSize, keyword, sortBy, filters, tenantId);

    // Thực hiện tìm kiếm
    const busSchedules = await this.busScheduleModel.aggregate(pipeline).exec();

    // Đếm tổng số mục
    const totalItem = await this.busScheduleModel.countDocuments({ tenantId });

    // Bổ sung dữ liệu busDrivers và busServices
    const filteredSchedules = await this.enrichSchedules(busSchedules, tenantId);

    // Trả về kết quả
    return {
      pageIdx,
      busSchedules: filteredSchedules, // Now properly awaited
      totalPage: Math.ceil(totalItem / pageSize),
      totalItem,
    };
  }

  async searchBusScheduleByDriver(
    keyword: string,
    sortBy: BusScheduleSortFilter,
    filters: BusScheduleSortFilter[],
    driverId: Types.ObjectId,
    tenantId: Types.ObjectId,
  ): Promise<BusScheduleDto[]> {
    const pipeline = await this.buildQuerySearchBusScheduleByDriver(keyword, sortBy, filters, driverId, tenantId);

    // Thực hiện tìm kiếm
    const busSchedules = await this.busScheduleModel.aggregate(pipeline).exec();
    // Bổ sung dữ liệu busDrivers và busServices
    const filteredSchedules = await this.enrichSchedules(busSchedules, tenantId);

    // Trả về kết quả
    return filteredSchedules;
  }

  // Build query pipeline for departure-specific searches (sets scheduleDirection=departure)
  async buildQuerySearchScheduleDeparture(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: BusScheduleSortFilter,
    filters: BusScheduleSortFilter[],
    tenantId: Types.ObjectId,
  ) {
    const filtersWithDirection = Array.isArray(filters)
      ? [...filters.filter((f) => f.key !== 'scheduleDirection')]
      : [];
    filtersWithDirection.push({ key: 'scheduleDirection', value: 'departure' } as BusScheduleSortFilter);
    return this.buildQuerySearchBusScheduleDirection(
      pageIdx,
      pageSize,
      keyword,
      sortBy,
      filtersWithDirection,
      tenantId,
    );
  }

  // Build query pipeline for arrival-specific searches (sets scheduleDirection=arrival)
  async buildQuerySearchScheduleArrival(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: BusScheduleSortFilter,
    filters: BusScheduleSortFilter[],
    tenantId: Types.ObjectId,
  ) {
    const filtersWithDirection = Array.isArray(filters)
      ? [...filters.filter((f) => f.key !== 'scheduleDirection')]
      : [];
    filtersWithDirection.push({ key: 'scheduleDirection', value: 'arrival' } as BusScheduleSortFilter);
    return this.buildQuerySearchBusScheduleDirection(
      pageIdx,
      pageSize,
      keyword,
      sortBy,
      filtersWithDirection,
      tenantId,
    );
  }

  // Public search: departure
  async searchBusScheduleDeparture(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: BusScheduleSortFilter,
    filters: BusScheduleSortFilter[],
    tenantId: Types.ObjectId,
  ): Promise<SearchBusSchedulePagingRes> {
    const pipeline = await this.buildQuerySearchScheduleDeparture(
      pageIdx,
      pageSize,
      keyword,
      sortBy,
      filters,
      tenantId,
    );
    const busSchedules = await this.busScheduleModel.aggregate(pipeline).exec();
    const totalItem = await this.busScheduleModel.countDocuments({ tenantId });
    const filteredSchedules = await this.enrichSchedules(busSchedules, tenantId);

    return {
      pageIdx,
      busSchedules: filteredSchedules,
      totalPage: Math.ceil(totalItem / pageSize),
      totalItem,
    };
  }

  // Public search: arrival
  async searchBusScheduleArrival(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: BusScheduleSortFilter,
    filters: BusScheduleSortFilter[],
    tenantId: Types.ObjectId,
  ): Promise<SearchBusSchedulePagingRes> {
    const pipeline = await this.buildQuerySearchScheduleArrival(pageIdx, pageSize, keyword, sortBy, filters, tenantId);
    const busSchedules = await this.busScheduleModel.aggregate(pipeline).exec();
    const totalItem = await this.busScheduleModel.countDocuments({ tenantId });
    const filteredSchedules = await this.enrichSchedules(busSchedules, tenantId);

    return {
      pageIdx,
      busSchedules: filteredSchedules,
      totalPage: Math.ceil(totalItem / pageSize),
      totalItem,
    };
  }

  /**
   * Cập nhật status cho nhiều schedule một lần (batch update)
   * Cập nhật cả in-memory objects và database
   * @returns Mảng schedules đã được update status
   */
  async updateScheduleStatus(schedules: any[]): Promise<any[]> {
    const updates: Array<{ _id: Types.ObjectId; newStatus: string }> = [];
    const currentDate = getCurrentDate();

    // Tính toán status mới cho mỗi schedule
    for (const schedule of schedules) {
      if ([EVENT_STATUS.UN_PUBLISHED, EVENT_STATUS.IN_PROGRESS, EVENT_STATUS.SCHEDULED].includes(schedule.status)) {
        const startDate = moment(schedule.startDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ', 'Asia/Ho_Chi_Minh')
          .clone()
          .tz('Asia/Ho_Chi_Minh')
          .toDate();
        const endDate = moment(schedule.endDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ', 'Asia/Ho_Chi_Minh')
          .clone()
          .tz('Asia/Ho_Chi_Minh')
          .toDate();

        // Parse the cutoff time setting to milliseconds
        const cutoffMs = this.getCutoffMilliseconds(schedule.tenantId);

        let newStatus = schedule.status;
        if (endDate < currentDate) {
          newStatus = EVENT_STATUS.OVERDUE;
        } else if (
          startDate < new Date(currentDate.getTime() + cutoffMs) && // Within cutoff time
          endDate > currentDate // End date is still in the future
        ) {
          newStatus = EVENT_STATUS.IN_PROGRESS;
        }

        // Nếu trạng thái thay đổi, thêm vào danh sách update
        if (newStatus !== schedule.status && schedule && schedule._id) {
          // Cập nhật in-memory object
          schedule.status = newStatus;
          // Thêm vào danh sách batch update
          updates.push({ _id: schedule._id, newStatus });
        }
      }
    }

    // Nếu có cập nhật, thực hiện batch update vào database (await để đảm bảo hoàn thành)
    if (updates.length > 0) {
      const bulkOps = updates.map((update) => ({
        updateOne: {
          filter: { _id: update._id },
          update: { $set: { status: update.newStatus } },
        },
      }));

      // Thực hiện bulk write và chờ hoàn thành
      await this.busScheduleModel.bulkWrite(bulkOps).catch(() => {});
    }

    // Trả lại mảng schedules đã được update status
    return schedules;
  }

  private getCutoffMilliseconds(tenantId: Types.ObjectId): number {
    try {
      const settingValue = this.settingsService.findByName(
        SETTING_CONSTANTS.BUS_SCHEDULE_AVAILABILITY_CUTOFF,
        tenantId,
      ) as unknown as string;
      if (settingValue) {
        return parseTimeHmToMilliseconds(settingValue);
      }
      return 60 * 60 * 1000; // Default 1 hour
    } catch {
      return 60 * 60 * 1000; // Default 1 hour
    }
  }

  async updateBusScheduleNote(busScheduleId: Types.ObjectId, note: string, tenantId: Types.ObjectId): Promise<string> {
    if (!busScheduleId) {
      throw new NotFoundException(`Bus Schedule not found.`);
    }

    // Cập nhật note của bus schedule dựa trên busScheduleId
    const updatedBusSchedule = await this.busScheduleModel
      .findOneAndUpdate({ _id: busScheduleId, tenantId }, { note }, { new: true })
      .lean()
      .exec();

    if (!updatedBusSchedule) {
      throw new NotFoundException(`Bus Schedule not found.`);
    }

    return updatedBusSchedule.note;
  }

  async updateCurrentStation(
    busScheduleId: Types.ObjectId,
    currentStationId: Types.ObjectId,
    tenantId: Types.ObjectId,
  ): Promise<BusScheduleDto> {
    if (!busScheduleId) {
      throw new NotFoundException(`Bus Schedule not found.`);
    }

    const updated = await this.busScheduleModel
      .findOneAndUpdate({ _id: busScheduleId, tenantId }, { $set: { currentStationId } }, { new: true })
      .exec();

    if (!updated) {
      throw new NotFoundException(`Bus Schedule not found.`);
    }

    return plainToInstance(BusScheduleDto, updated.toObject());
  }

  generateBusScheduleNumber(): string {
    return this.nanoid();
  }

  async buildQuerySearchBusScheduleDirection(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: BusScheduleSortFilter,
    filters: BusScheduleSortFilter[],
    tenantId: Types.ObjectId,
  ) {
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
    let scheduleDirection: string = '';
    let currentStationIdValue: Types.ObjectId | null = null;

    if (Array.isArray(filters)) {
      await Promise.all(
        filters.map(async ({ key, value }) => {
          if (!key || value == null) return;

          if (key === 'startDate') {
            startDateValue = getFirstValue(value);
          } else if (key === 'endDate') {
            endDateValue = getFirstValue(value);
          } else if (key === 'scheduleDirection') {
            scheduleDirection = getFirstValue(value);
          } else if (key === 'currentStationId') {
            const firstVal: any = getFirstValue(value);
            let idHex: string | null = null;
            if (firstVal && typeof firstVal === 'object' && firstVal.buffer != null) {
              idHex = bufferToObjectIdHex(firstVal);
            } else if (firstVal) {
              idHex = firstVal;
            }
            currentStationIdValue = idHex ? new Types.ObjectId(idHex) : null;
          } else if (key === 'departureId') {
            matchConditions.push({ 'busRoute.breakPoints.0.busStationId': new Types.ObjectId(getFirstValue(value)) });
          } else if (key === 'destinationId') {
            if (!pipeline.some((stage: any) => stage.$addFields?.lastBreakPoint)) {
              pipeline.push({
                $addFields: {
                  lastBreakPoint: { $arrayElemAt: ['$busRoute.breakPoints', -1] },
                },
              });
            }
            matchConditions.push({ 'lastBreakPoint.busStationId': new Types.ObjectId(getFirstValue(value)) });
          } else {
            matchConditions.push(processFilterValue(key, value));
          }
        }),
      );
    }

    // Use `currentStationId` from UI to match route breakPoints according to scheduleDirection.
    // For departure -> match busRoute.breakPoints[0].busStationId
    // For arrival   -> match lastBreakPoint.busStationId (add lastBreakPoint if needed)
    if (currentStationIdValue) {
      if (scheduleDirection === 'arrival') {
        if (!pipeline.some((stage: any) => stage.$addFields?.lastBreakPoint)) {
          pipeline.push({
            $addFields: {
              lastBreakPoint: { $arrayElemAt: ['$busRoute.breakPoints', -1] },
            },
          });
        }
        matchConditions.push({ 'lastBreakPoint.busStationId': currentStationIdValue });
      } else {
        matchConditions.push({ 'busRoute.breakPoints.0.busStationId': currentStationIdValue });
      }
    }

    // 4. Tạo điều kiện range cho date - chọn field dựa trên scheduleDirection
    if (scheduleDirection === 'arrival') {
      // For arrival, use endDate within provided startDate and endDate range
      if (startDateValue || endDateValue) {
        const endRange: any = {};
        if (startDateValue) endRange.$gte = startDateValue;
        if (endDateValue) endRange.$lte = endDateValue;
        matchConditions.push({ endDate: endRange });
      }
    } else {
      // For departure or no direction, use startDate and endDate normally
      if (startDateValue || endDateValue) {
        const rangeCond: any = {};
        if (startDateValue) rangeCond.$gte = startDateValue;
        if (endDateValue) rangeCond.$lte = endDateValue;

        matchConditions.push({ startDate: rangeCond });
      }
    }

    // 5. Đẩy $match đầu tiên (không bao gồm filter status)
    const matchConditionsWithoutStatus = matchConditions.filter(
      (cond) => !cond.status && !(cond.$and && cond.$and.some((c: any) => c.status)),
    );

    if (matchConditionsWithoutStatus.length) {
      pipeline.push({
        $match: { $and: matchConditionsWithoutStatus },
      });
    }

    // 6. Filter theo status nếu có trong matchConditions
    const statusFilter = matchConditions.find((cond) => cond.status);
    if (statusFilter) {
      pipeline.push({
        $match: { status: statusFilter.status },
      });
    }

    // 7. $sort
    if (sortBy?.key) {
      pipeline.push({
        $sort: { [sortBy.key]: sortBy.value === 'ascend' ? 1 : -1 },
      });
    }

    // 8. paging: $skip + $limit
    pipeline.push({ $skip: skip }, { $limit: pageSize });
    return pipeline;
  }

  async buildQuerySearchBusSchedule(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: BusScheduleSortFilter,
    filters: BusScheduleSortFilter[],
    tenantId: Types.ObjectId,
  ) {
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
    let scheduleDirection: string = '';
    let currentStationIdValue: Types.ObjectId | null = null;

    if (Array.isArray(filters)) {
      await Promise.all(
        filters.map(async ({ key, value }) => {
          if (!key || value == null) return;

          if (key === 'startDate') {
            startDateValue = getFirstValue(value);
          } else if (key === 'endDate') {
            endDateValue = getFirstValue(value);
          } else if (key === 'scheduleDirection') {
            scheduleDirection = getFirstValue(value);
          } else if (key === 'currentStationId') {
            const firstVal: any = getFirstValue(value);
            if (firstVal && typeof firstVal === 'object' && firstVal.buffer != null) {
              currentStationIdValue = null;
            } else {
              currentStationIdValue = new Types.ObjectId(getFirstValue(value));
            }
          } else if (key === 'departureId') {
            matchConditions.push({ 'busRoute.breakPoints.0.busStationId': new Types.ObjectId(getFirstValue(value)) });
          } else if (key === 'destinationId') {
            if (!pipeline.some((stage: any) => stage.$addFields?.lastBreakPoint)) {
              pipeline.push({
                $addFields: {
                  lastBreakPoint: { $arrayElemAt: ['$busRoute.breakPoints', -1] },
                },
              });
            }
            matchConditions.push({ 'lastBreakPoint.busStationId': new Types.ObjectId(getFirstValue(value)) });
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

      matchConditions.push({ startDate: rangeCond });
    }

    // Use `currentStationId` from UI to match route breakPoints according to scheduleDirection.
    // For departure -> match busRoute.breakPoints[0].busStationId
    // For arrival   -> match lastBreakPoint.busStationId (add lastBreakPoint if needed)
    if (currentStationIdValue) {
      if (scheduleDirection === 'arrival') {
        if (!pipeline.some((stage: any) => stage.$addFields?.lastBreakPoint)) {
          pipeline.push({
            $addFields: {
              lastBreakPoint: { $arrayElemAt: ['$busRoute.breakPoints', -1] },
            },
          });
        }
        matchConditions.push({ 'lastBreakPoint.busStationId': currentStationIdValue });
      } else {
        matchConditions.push({ 'busRoute.breakPoints.0.busStationId': currentStationIdValue });
      }
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

  async buildQuerySearchBusScheduleByDriver(
    keyword: string,
    sortBy: BusScheduleSortFilter,
    filters: BusScheduleSortFilter[],
    driverId: Types.ObjectId,
    tenantId: Types.ObjectId,
  ) {
    // Thêm điều kiện kiểm tra điểm khởi hành nếu có

    const pipeline: any = [];
    const matchConditions: any[] = [{ tenantId }, { busDriverIds: { $in: [driverId] } }];

    // 1. Tìm theo keyword
    if (keyword) {
      matchConditions.push({
        $or: [{ name: { $regex: keyword, $options: 'i' } }],
      });
    }

    // 2. Xác định start/end date và các filter còn lại
    let startDateValue: string = '';
    let endDateValue: string = '';
    let scheduleDirection: string = '';
    let currentStationIdValue: Types.ObjectId | null = null;

    if (Array.isArray(filters)) {
      await Promise.all(
        filters.map(async ({ key, value }) => {
          if (!key || value == null) return;

          if (key === 'startDate') {
            startDateValue = getFirstValue(value);
          } else if (key === 'endDate') {
            endDateValue = getFirstValue(value);
          } else if (key === 'scheduleDirection') {
            scheduleDirection = getFirstValue(value);
          } else if (key === 'currentStationId') {
            const firstVal: any = getFirstValue(value);
            let idHex: string | null = null;
            if (firstVal && typeof firstVal === 'object' && firstVal.buffer != null) {
              idHex = bufferToObjectIdHex(firstVal);
            } else if (firstVal) {
              idHex = firstVal;
            }
            currentStationIdValue = idHex ? new Types.ObjectId(idHex) : null;
            // Don't add to matchConditions here, handled separately after direction check
          } else if (key === 'departureId') {
            matchConditions.push({ 'busRoute.breakPoints.0.busStationId': new Types.ObjectId(getFirstValue(value)) });
          } else if (key === 'destinationId') {
            pipeline.push({
              $addFields: {
                lastBreakPoint: { $arrayElemAt: ['$busRoute.breakPoints', -1] }, // Lấy phần tử cuối cùng
              },
            });
            pipeline.push({
              $addFields: {
                lastBreakPoint: { $arrayElemAt: ['$busRoute.breakPoints', -1] }, // Lấy phần tử cuối cùng
              },
            });
            matchConditions.push({ 'lastBreakPoint.busStationId': new Types.ObjectId(getFirstValue(value)) });
          } else {
            matchConditions.push(processFilterValue(key, value));
          }
        }),
      );
    }

    // Use `currentStationId` from UI to match route breakPoints according to scheduleDirection.
    // For departure -> match busRoute.breakPoints[0].busStationId
    // For arrival   -> match lastBreakPoint.busStationId (add lastBreakPoint if needed)
    if (currentStationIdValue) {
      if (scheduleDirection === 'arrival') {
        if (!pipeline.some((stage: any) => stage.$addFields?.lastBreakPoint)) {
          pipeline.push({
            $addFields: {
              lastBreakPoint: { $arrayElemAt: ['$busRoute.breakPoints', -1] },
            },
          });
        }
        matchConditions.push({ 'lastBreakPoint.busStationId': currentStationIdValue });
      } else {
        matchConditions.push({ 'busRoute.breakPoints.0.busStationId': currentStationIdValue });
      }
    }

    // 4. Xử lý date range dựa trên scheduleDirection
    if (scheduleDirection === 'arrival') {
      // For arrival, only use endDate, ignore startDate
      // For arrival, use endDate within provided startDate and endDate range
      if (startDateValue || endDateValue) {
        const endRange: any = {};
        if (startDateValue) endRange.$gte = startDateValue;
        if (endDateValue) endRange.$lte = endDateValue;
        matchConditions.push({ endDate: endRange });
      }
    } else {
      // For departure or no direction, use startDate and endDate normally
      if (startDateValue || endDateValue) {
        const rangeCond: any = {};
        if (startDateValue) rangeCond.$gte = startDateValue;
        if (endDateValue) rangeCond.$lte = endDateValue;

        matchConditions.push({ startDate: rangeCond });
      }
    }

    // 5. Đẩy $match nếu có bất kỳ điều kiện nào
    if (matchConditions.length) {
      pipeline.push({
        $match: { $and: matchConditions },
      });
    }

    // 6. $sort
    if (sortBy?.key) {
      pipeline.push({
        $sort: { [sortBy.key]: sortBy.value === 'ascend' ? 1 : -1 },
      });
    }
    // 7. paging: $skip + $limit
    return pipeline;
  }

  mapBusServiceImages(busServices: any[]) {
    return busServices.map((service: BusServiceDto) => {
      if (!service.icon) {
        const port = process.env.PUBLIC_PORT ? `:${process.env.PUBLIC_PORT}` : '';
        service.icon = `${process.env.DOMAIN}${port}/file/view/${service.iconId.toString()}`;
      }
      return service;
    });
  }

  /**
   * Ánh xạ busServices trong busTemplate nếu tồn tại
   */
  mapBusTemplateServices(schedule: any): any {
    if (schedule.busTemplate && schedule.busTemplate.busServices) {
      schedule.busTemplate.busServices = this.mapBusServiceImages(schedule.busTemplate.busServices);
    }
    return schedule;
  }

  /**
   * Bổ sung dữ liệu busDrivers và busServices cho tất cả schedules
   * Lấy busDrivers song song và map busServices
   */
  async enrichSchedules(schedules: any[], tenantId: Types.ObjectId): Promise<any[]> {
    // Cập nhật status cho tất cả schedules (batch update) - trả về schedules đã update
    const updatedSchedules = await this.updateScheduleStatus(schedules);

    schedules = updatedSchedules;

    // Lấy remainSeat song song
    const remainSeats = await Promise.all(
      schedules.map((schedule) => this.busScheduleLayoutService.getRemainSeats(schedule._id, tenantId)),
    );
    schedules.forEach((schedule, index) => {
      schedule.remainSeat = remainSeats[index];
    });

    // Lấy busDrivers song song cho tất cả schedules
    const busDriversList = await Promise.all(
      schedules.map((schedule) => this.driverService.findUserDriverByIds(schedule.busDriverIds, tenantId)),
    );

    // Map thêm busDrivers và busServices
    return schedules.map((schedule, index) => {
      schedule.busDrivers = busDriversList[index];
      schedule = this.mapBusTemplateServices(schedule);
      return schedule;
    });
  }
}

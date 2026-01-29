// src/bus-schedule/bus-schedule.service.ts
import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateBusScheduleAutogeneratorDto } from './dto/update-bus-schedule-autogenerator.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Types } from 'mongoose';
import {
  BusScheduleAutogeneratorDto,
  SearchBusScheduleAutogeneratorPagingQuerySortFilter,
  SearchBusScheduleRes,
  SpecificTimeSlotDto,
} from './dto/bus-schedule-autogenerator.dto';
import { BusScheduleAutogeneratorDocument, SpecificTimeSlotDocument } from './schema/bus-schedule-autogenerator.schema';
import { plainToInstance } from 'class-transformer';
import { CreateBusScheduleAutogeneratorDto } from './dto/create-bus-schedule-autogenerator.dto';
import { BusScheduleTemplateService } from '../bus-schedule-template/bus-schedule-template.service';
import { BusScheduleService } from '../bus-schedule/bus-schedule.service';
import {
  CreateBusRouteScheduleDto,
  CreateBusScheduleBreakPointsTimeDto,
  CreateBusScheduleBusProvinceDto,
  CreateBusScheduleDto,
} from '../bus-schedule/dto/create-bus-schedule.dto';
import {
  BusScheduleTemplateBreakPointsTimeDto,
  BusScheduleTemplateDto,
} from '../bus-schedule-template/dto/bus-schedule-template.dto';
import { BusTemplateService } from '../bus-template/bus-template.service';
import { BusService } from '../bus/bus.service';
import { BusRouteService } from '../bus-route/bus-route.service';
import { BusScheduleBreakPointsTimeDto } from '../bus-schedule/dto/bus-schedule.dto';
import { BusStationService } from '../bus-station/bus-station.service';
import { BusProvinceService } from '../bus-province/bus-province.service';
import { BusStationDto } from '../bus-station/dto/bus-station.dto';
import { BusProvinceDto } from '../bus-province/dto/bus-province.dto';
import { customAlphabet } from 'nanoid';
import { BusDto } from '../bus/dto/bus.dto';
import { toObjectId } from '@/utils/utils';
import { EVENT_STATUS } from '@/common/constants/status.constants';
import { AutoJobTrackingService } from '../../auto-job-tracking';

@Injectable()
export class BusScheduleAutogeneratorService {
  ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';
  private alphabet = process.env.ALPHABET || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  private nanoid = customAlphabet(this.alphabet, 6);

  constructor(
    @InjectModel(BusScheduleAutogeneratorDocument.name)
    private busScheduleAutogeneratorModel: Model<BusScheduleAutogeneratorDocument>,
    @Inject(forwardRef(() => BusScheduleTemplateService))
    private readonly busScheduleTemplateService: BusScheduleTemplateService,
    @Inject(forwardRef(() => BusScheduleService)) private readonly busScheduleService: BusScheduleService,
    @Inject(forwardRef(() => BusTemplateService)) private readonly busTemplateService: BusTemplateService,
    @Inject(forwardRef(() => BusService)) private readonly busService: BusService,
    @Inject(forwardRef(() => BusRouteService)) private readonly busRouteService: BusRouteService,
    @Inject(forwardRef(() => BusStationService)) private readonly busStationService: BusStationService,
    @Inject(forwardRef(() => BusProvinceService)) private readonly busProvinceService: BusProvinceService,
    @Inject(forwardRef(() => AutoJobTrackingService)) private readonly autoJobTrackingService: AutoJobTrackingService,
  ) {}

  async create(
    createBusScheduleAutogeneratorDto: CreateBusScheduleAutogeneratorDto,
    tenantId: Types.ObjectId,
    timezoneOffset: number,
  ): Promise<BusScheduleAutogeneratorDto> {
    const createdBusScheduleAutogenerator = new this.busScheduleAutogeneratorModel({
      ...createBusScheduleAutogeneratorDto,
      tenantId,
    });
    createdBusScheduleAutogenerator.specificTimeSlots.map((specificTimeSlot: SpecificTimeSlotDocument) => {
      specificTimeSlot._id = new Types.ObjectId();
    });
    const savedBusScheduleAutogenerator = await createdBusScheduleAutogenerator.save();
    const busScheduleAutogenerator = plainToInstance(
      BusScheduleAutogeneratorDto,
      savedBusScheduleAutogenerator.toObject(),
    );

    const rootTenantId = toObjectId(this.ROOT_TENANT_ID);
    const jobName = `auto_schedule:${busScheduleAutogenerator._id}`;
    if (busScheduleAutogenerator.status === EVENT_STATUS.SCHEDULED) {
      const shouldRun = await this.autoJobTrackingService.tryRunToday(tenantId, jobName, timezoneOffset);
      if (shouldRun) {
        this.runCreateBusSchedule(busScheduleAutogenerator._id, rootTenantId, tenantId);
      }
    }

    return busScheduleAutogenerator;
  }

  async findAll(tenantId: Types.ObjectId): Promise<BusScheduleAutogeneratorDto[]> {
    const busScheduleAutogenerators = await this.busScheduleAutogeneratorModel.find({ tenantId }).lean().exec();
    return busScheduleAutogenerators.map((busScheduleAutogenerator) =>
      plainToInstance(BusScheduleAutogeneratorDto, busScheduleAutogenerator),
    );
  }

  async findOne(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<BusScheduleAutogeneratorDto> {
    const busScheduleAutogenerator = await this.busScheduleAutogeneratorModel
      .findOne({ _id: id, tenantId })
      .lean()
      .exec();
    if (!busScheduleAutogenerator) {
      throw new NotFoundException(`Không tìm thấy lịch trình xe buýt với ID ${id}`);
    }
    return plainToInstance(BusScheduleAutogeneratorDto, busScheduleAutogenerator);
  }

  async update(
    updateBusScheduleAutogeneratorDto: UpdateBusScheduleAutogeneratorDto,
    tenantId: Types.ObjectId,
    timezoneOffset: number,
  ): Promise<BusScheduleAutogeneratorDto> {
    const updatedBusService = await this.busScheduleAutogeneratorModel
      .findOneAndUpdate({ _id: updateBusScheduleAutogeneratorDto._id, tenantId }, updateBusScheduleAutogeneratorDto, {
        new: true,
      })
      .lean()
      .exec();
    if (!updatedBusService) {
      throw new NotFoundException(`Bus service with ID "${updateBusScheduleAutogeneratorDto._id}" not found.`);
    }
    const result = plainToInstance(BusScheduleAutogeneratorDto, updatedBusService);

    // Try to run creation once for this autogenerator today (tracked per-generator)
    try {
      const rootTenantId = toObjectId(this.ROOT_TENANT_ID);
      const jobName = `auto_schedule:${result._id}`;
      if (result.status === EVENT_STATUS.SCHEDULED) {
        const shouldRun = await this.autoJobTrackingService.tryRunToday(tenantId, jobName, timezoneOffset);
        if (shouldRun) {
          this.runCreateBusSchedule(result._id, rootTenantId, tenantId);
        }
      }
    } catch (err) {
      // swallow errors from tracking to avoid breaking update
    }

    return result;
  }

  async delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean> {
    const result = await this.busScheduleAutogeneratorModel.findOneAndDelete({ _id: id, tenantId }).lean().exec();
    return result !== null;
  }

  async searchBusScheduleAutogenerator(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: SearchBusScheduleAutogeneratorPagingQuerySortFilter,
    filters: SearchBusScheduleAutogeneratorPagingQuerySortFilter[],
    tenantId: Types.ObjectId,
  ): Promise<SearchBusScheduleRes> {
    const pipeline = await this.buildQuerySearchBusScheduleAutogenerator(
      pageIdx,
      pageSize,
      keyword,
      sortBy,
      filters,
      tenantId,
    );

    // Thực hiện tìm kiếm
    const busSchedules = await this.busScheduleAutogeneratorModel.aggregate(pipeline).exec();

    const totalItem = await this.busScheduleAutogeneratorModel.countDocuments({ tenantId }).lean().exec();

    const result = plainToInstance(
      BusScheduleAutogeneratorDto,
      busSchedules.map((busType) => busType),
    );

    return {
      pageIdx,
      busScheduleAutoGenerators: result,
      totalPage: Math.ceil(totalItem / pageSize),
      totalItem,
    };
  }

  async buildQuerySearchBusScheduleAutogenerator(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: SearchBusScheduleAutogeneratorPagingQuerySortFilter,
    filters: SearchBusScheduleAutogeneratorPagingQuerySortFilter[],
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

  async generateSchedulesForToday(tenantId: Types.ObjectId, timezoneOffset: number): Promise<void> {
    const now = new Date();
    const localTime = new Date(now.getTime() + timezoneOffset);
    const todayDate = new Date(localTime.getFullYear(), localTime.getMonth(), localTime.getDate());

    const todayStart = new Date(todayDate.getTime());
    const todayEnd = new Date(todayDate.getTime() + 24 * 60 * 60 * 1000 - 1);

    const query: any = {
      tenantId,
      status: 'scheduled',
      startDate: { $lte: todayEnd },
      $or: [{ endDate: { $exists: false } }, { endDate: null }, { endDate: { $gte: todayStart } }],
    };

    const busScheduleAutogeneratorsModel = await this.busScheduleAutogeneratorModel.find(query).lean().exec();

    const busScheduleAutogenerators = busScheduleAutogeneratorsModel.map((busScheduleAutogenerator) =>
      plainToInstance(BusScheduleAutogeneratorDto, busScheduleAutogenerator),
    );

    const rootTenantObjectId = toObjectId(this.ROOT_TENANT_ID);
    for (const busScheduleAutogenerator of busScheduleAutogenerators) {
      if (
        this.isRunDay(busScheduleAutogenerator, todayDate) &&
        busScheduleAutogenerator.status === EVENT_STATUS.SCHEDULED
      ) {
        await this.runCreateBusSchedule(busScheduleAutogenerator._id, rootTenantObjectId, tenantId);
      }
    }
  }

  isRunDay = (busScheduleAutoGenerator: BusScheduleAutogeneratorDto, date: Date): boolean => {
    // Adjust startDate by subtracting preGenerateDays
    const adjustedStartDate = new Date(busScheduleAutoGenerator.startDate);
    adjustedStartDate.setDate(adjustedStartDate.getDate() + busScheduleAutoGenerator.preGenerateDays);

    // Lấy ngày hôm nay, loại bỏ thời gian (giờ, phút, giây)
    const todayWithoutTime = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    // Lấy phần ngày của adjustedStartDate (không tính giờ, phút, giây)
    const start = new Date(adjustedStartDate.getFullYear(), adjustedStartDate.getMonth(), adjustedStartDate.getDate());

    // Tính chênh lệch thời gian tính bằng mili-giây giữa hôm nay và ngày bắt đầu
    const diffMs = todayWithoutTime.getTime() - start.getTime();

    // Nếu lặp theo tuần, tính số tuần đã trôi qua
    if (busScheduleAutoGenerator.repeatType === 'weeks') {
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)); // Tính chênh lệch số ngày
      const diffWeeks = Math.floor(diffDays / 7); // Số tuần đã trôi qua

      // Kiểm tra điều kiện tuần chạy
      const isWeekValid = diffWeeks >= 0 && diffWeeks % busScheduleAutoGenerator.repeatInterval === 0;

      // Kiểm tra điều kiện ngày chạy
      const isDayValid = busScheduleAutoGenerator.repeatDaysPerWeek.includes(
        todayWithoutTime.toLocaleString('en-US', { weekday: 'short' }),
      );

      // Kết quả cuối cùng
      return isWeekValid && isDayValid;
    } else {
      // Nếu lặp theo ngày, so sánh dựa trên số ngày
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)); // Số ngày chênh lệch
      return diffDays >= 0 && diffDays % busScheduleAutoGenerator.repeatInterval === 0;
    }
  };

  async runCreateBusSchedule(
    _id: Types.ObjectId,
    rootTenantId: Types.ObjectId,
    tenantId: Types.ObjectId,
  ): Promise<boolean> {
    const busScheduleAutogenerator: BusScheduleAutogeneratorDto = await this.findOne(_id, tenantId);

    if (busScheduleAutogenerator.status !== EVENT_STATUS.SCHEDULED) {
      return false;
    }

    if (busScheduleAutogenerator.specificTimeSlots && busScheduleAutogenerator.specificTimeSlots.length > 0) {
      const busScheduleTemplate: BusScheduleTemplateDto = await this.busScheduleTemplateService.findOne(
        busScheduleAutogenerator.busScheduleTemplateId,
        [rootTenantId, tenantId],
      );
      if (!busScheduleTemplate) {
        throw new NotFoundException(
          `Không tìm thấy lịch trình xe buýt với ID ${busScheduleAutogenerator.busScheduleTemplateId}`,
        );
      }

      const busTemplate = await this.busTemplateService.findOne(busScheduleTemplate.busTemplateId, [
        rootTenantId,
        tenantId,
      ]);
      if (!busTemplate) {
        throw new NotFoundException(`Không tìm thấy mẫu xe buýt với ID ${busScheduleTemplate.busTemplateId}`);
      }

      let bus: BusDto | null = null;

      if (busScheduleTemplate.busId) {
        bus = await this.busService.findOne(busScheduleTemplate.busId, tenantId);
      }

      const busStations = await this.busStationService.findAll([rootTenantId, tenantId]);
      if (!busStations) {
        throw new NotFoundException(`Không tìm thấy trạm xe buýt nào`);
      }

      const busProvinces = await this.busProvinceService.findAll([rootTenantId, tenantId]);
      if (!busProvinces) {
        throw new NotFoundException(`Không tìm thấy tỉnh xe buýt nào`);
      }

      const busRoute: CreateBusRouteScheduleDto = new CreateBusRouteScheduleDto();
      busRoute.name = busScheduleTemplate.busRoute.name;
      busRoute.distance = busScheduleTemplate.busRoute.distance;
      busRoute.distanceTime = busScheduleTemplate.busRoute.distanceTime;

      for (const specificTimeSlot of busScheduleAutogenerator.specificTimeSlots) {
        busRoute.breakPoints = [];
        for (const breakPoint of busScheduleTemplate.busRoute.breakPoints) {
          const newBreakPoint = await this.createBreakPoint(breakPoint, busStations, busProvinces, specificTimeSlot);
          busRoute.breakPoints.push(newBreakPoint);
        }

        const { _id, name, busRouteId, busTemplateId, busDriverIds, busId, busSeatLayoutBlockIds, busSeatPrices } =
          busScheduleTemplate;

        const createBusScheduleDto: CreateBusScheduleDto = {
          tenantId,
          busScheduleNumber: this.generateBusScheduleNumber(),
          name,
          busRouteId,
          busRoute: busRoute,
          currentStationId: busRoute.breakPoints[0].busStationId,
          busTemplateId,
          busDriverIds,
          busId,
          busTemplate: {
            ...busTemplate,
            _id: busTemplate._id.toString(),
            busType: {
              ...busTemplate.busType,
              _id: busTemplate.busType._id.toString(),
            },
            busServices: busTemplate.busServices?.map((service) => ({
              ...service,
              _id: service._id.toString(),
            })),
          },
          busSeatPrices,
          busSeatLayoutBlockIds: busSeatLayoutBlockIds,
          startDate: busRoute.breakPoints[0].timeSchedule || '',
          endDate: busRoute.breakPoints.at(-1)?.timeSchedule || '',
          busScheduleTemplateId: _id,
          busLayoutTemplateId: busTemplate.busLayoutTemplateId,
        };

        if (bus) {
          createBusScheduleDto.bus = bus;
        }

        await this.busScheduleService.create(createBusScheduleDto, rootTenantId, tenantId);
      }

      return true;
    }
    return false;
  }

  async createBreakPoint(
    breakPoint: BusScheduleTemplateBreakPointsTimeDto,
    busStations: BusStationDto[],
    busProvinces: BusProvinceDto[],
    specificTimeSlot: SpecificTimeSlotDto,
  ) {
    const busStation = (await busStations.find(
      (busStation: BusStationDto) => busStation._id.toString() === breakPoint.busStationId.toString(),
    )) as BusStationDto;
    const { name = '', detailAddress = '', location = '', provinceId = '', isOffice = false } = busStation;

    const province = (await busProvinces.find(
      (busProvince: BusProvinceDto) => busProvince._id.toString() === provinceId.toString(),
    )) as unknown as CreateBusScheduleBusProvinceDto;

    const timeSchedule = this.calculateTimeSchedule(breakPoint.timeOffset, specificTimeSlot);

    const busRouteBreakPoint: CreateBusScheduleBreakPointsTimeDto = new CreateBusScheduleBreakPointsTimeDto();
    busRouteBreakPoint.busStationId = breakPoint.busStationId;
    busRouteBreakPoint.timeSchedule = timeSchedule;
    busRouteBreakPoint.name = name;
    busRouteBreakPoint.detailAddress = detailAddress;
    busRouteBreakPoint.location = location;
    busRouteBreakPoint.provinceId = provinceId || new Types.ObjectId();
    busRouteBreakPoint.province = province;
    busRouteBreakPoint.isOffice = isOffice;
    return busRouteBreakPoint;
  }

  calculateTimeSchedule(offsetTime: string, specificTimeSlot: SpecificTimeSlotDto): string {
    const currentDate = new Date(); // Thời gian hiện tại
    const [hours, minutes, seconds] = specificTimeSlot.timeSlot.split(':').map(Number);
    currentDate.setHours(hours);
    currentDate.setMinutes(minutes);
    currentDate.setSeconds(seconds);
    // Tách phần số và đơn vị (nếu không có đơn vị thì mặc định là h - giờ)
    const match = offsetTime && offsetTime.match(/^(\d+)(h|m)?$/);

    if (!match) {
      return '';
    }

    const value = parseInt(match[1], 10); // Lấy số
    const unit = match[2] || 'h'; // Mặc định là 'h' nếu không có đơn vị

    let timeSchedule: Date;

    // Kiểm tra đơn vị
    if (unit === 'h') {
      // Nếu là giờ, cộng số giờ vào thời gian hiện tại
      timeSchedule = new Date(currentDate.getTime() + value * 3600000);
    } else if (unit === 'm') {
      // Nếu là phút, cộng số phút vào thời gian hiện tại
      timeSchedule = new Date(currentDate.getTime() + value * 60000);
    } else {
      throw new Error('Invalid unit. Only "h" (hours) or "m" (minutes) are supported.');
    }

    return timeSchedule.toISOString(); // Trả về thời gian ISO
  }

  generateBusScheduleNumber(): string {
    return this.nanoid();
  }
}

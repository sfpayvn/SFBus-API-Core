// bus-template.service.ts

import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  BusScheduleLayoutDocument,
  BusScheduleLayoutSeatDocument,
  BusScheduleSeatLayoutTemplateDocument,
} from './schema/bus-schedule-layout.schema';
import { CreateBusScheduleLayoutDto } from './dto/create-bus-schedule-layout.dto';
import {
  BusScheduleLayoutDto,
  BusScheduleLayoutSeatDto,
  BusScheduleSeatLayoutTemplateDto,
  RequestUpdateSeatStatusDto,
} from './dto/bus-schedule-layout.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateBusScheduleLayoutDto } from './dto/update-bus-schedule-layout.dto';
import {
  BusLayoutTemplateDto,
  BusSeatLayoutTemplateDto,
  SeatDto,
} from '../bus-layout-template/dto/bus-layout-template.dto';
import { BookingService } from '../../booking/booking-service';
import { BookingItemDto } from '../../booking/dto/booking.dto';
import { SeatTypeService } from '../../seat/seat-type/seat-type.service';

@Injectable()
export class BusScheduleLayoutService {
  ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';

  constructor(
    @InjectModel(BusScheduleLayoutDocument.name)
    private readonly busScheduleLayoutModel: Model<BusScheduleLayoutDocument>,
    @Inject(forwardRef(() => BookingService)) private readonly bookingService: BookingService,
    @Inject(forwardRef(() => SeatTypeService)) private readonly seatTypeService: SeatTypeService,
  ) {}

  async create(
    createBusScheduleLayoutDto: CreateBusScheduleLayoutDto,
    tenantId: Types.ObjectId,
  ): Promise<BusScheduleLayoutDto> {
    const seatLayouts = createBusScheduleLayoutDto.seatLayouts.map((layout) => {
      const seats = layout.seats.map((seat) => ({
        ...seat,
        _id: new Types.ObjectId(),
      }));
      return {
        ...layout,
        _id: new Types.ObjectId(),
        seats,
      };
    });

    const createdBusTemplate = new this.busScheduleLayoutModel({
      ...createBusScheduleLayoutDto,
      seatLayouts,
      tenantId,
    });

    const savedTemplate = await createdBusTemplate.save();
    return plainToInstance(BusScheduleLayoutDto, savedTemplate);
  }

  async findAll(tenantId: Types.ObjectId): Promise<BusScheduleLayoutDto[]> {
    const templates = await this.busScheduleLayoutModel.find({ tenantId }).populate('seatLayouts').lean().exec();
    return templates.map((template) => plainToInstance(BusScheduleLayoutDto, template));
  }

  async findOne(busScheduleId: Types.ObjectId, tenantId: Types.ObjectId): Promise<BusScheduleLayoutDto> {
    const busScheduleLayoutModel = await this.busScheduleLayoutModel
      .findOne({ busScheduleId, tenantId })
      .populate('seatLayouts')
      .lean()
      .exec();

    if (!busScheduleLayoutModel) {
      throw new NotFoundException(`BusScheduleLayout with ID  busScheduleId "${busScheduleId}" not found.`);
    }

    const busScheduleLayout = plainToInstance(BusScheduleLayoutDto, busScheduleLayoutModel);
    busScheduleLayout.seatLayouts = await Promise.all(
      busScheduleLayout.seatLayouts.map(async (seatLayout: BusScheduleSeatLayoutTemplateDto) => {
        seatLayout.seats = seatLayout.seats.map((seat: BusScheduleLayoutSeatDto) => {
          if (seat.bookingId) {
            seat.status = 'blocked';
          }
          return seat;
        });
        return seatLayout;
      }),
    );
    return busScheduleLayout;
  }

  async findOneByBusSchedule(busScheduleId: Types.ObjectId, tenantId: Types.ObjectId): Promise<BusScheduleLayoutDto> {
    const busScheduleLayoutModel = await this.busScheduleLayoutModel
      .findOne({ busScheduleId, tenantId })
      .populate('seatLayouts')
      .lean()
      .exec();

    if (!busScheduleLayoutModel) {
      throw new NotFoundException(`BusScheduleLayout with ID "${busScheduleId}" not found.`);
    }

    const busScheduleLayout = plainToInstance(BusScheduleLayoutDto, busScheduleLayoutModel);
    // Sau khi tất cả trạng thái ghế được cập nhật, trả về busScheduleLayout
    return busScheduleLayout;
  }

  async update(
    updateBusScheduleLayoutDto: UpdateBusScheduleLayoutDto,
    tenantId: Types.ObjectId,
  ): Promise<BusScheduleLayoutDto> {
    const busScheduleLayoutUpdated = await this.busScheduleLayoutModel
      .findOneAndUpdate({ _id: updateBusScheduleLayoutDto._id, tenantId }, updateBusScheduleLayoutDto, { new: true })
      .populate('seatLayouts')
      .exec();

    if (!busScheduleLayoutUpdated) {
      throw new NotFoundException(`BusScheduleLayout with ID "${updateBusScheduleLayoutDto._id}" not found.`);
    }

    return plainToInstance(BusScheduleLayoutDto, busScheduleLayoutUpdated);
  }

  async updateSeatStatusByBusSchedule(
    busScheduleId: Types.ObjectId,
    requestUpdateSeatDto: RequestUpdateSeatStatusDto[],
    tenantId: Types.ObjectId,
  ): Promise<boolean> {
    const busScheduleLayout = await this.busScheduleLayoutModel.findOne({ busScheduleId, tenantId }).lean().exec();

    if (!busScheduleLayout) {
      throw new NotFoundException(`Bus Schedule with ID "${busScheduleId}" not found.`);
    }

    const seatUpdatePromises: Promise<any>[] = [];

    busScheduleLayout.seatLayouts.forEach((layout: BusScheduleSeatLayoutTemplateDocument, li) => {
      layout.seats.forEach((seat: BusScheduleLayoutSeatDocument, si) => {
        const matched = requestUpdateSeatDto.find((s) => s._id.toString() === seat._id.toString());
        if (
          (matched &&
            matched.bookingId &&
            seat.bookingId &&
            seat.bookingId.toString() === matched.bookingId.toString()) ||
          (matched && !seat.bookingId)
        ) {
          const basePath = `seatLayouts.${li}.seats.${si}`;

          const setData: Record<string, any> = {};

          // Chỉ set nếu tồn tại giá trị (khác null/undefined)
          if (matched.status !== undefined) {
            setData[`${basePath}.status`] = matched.status;
          }
          if (matched.bookingStatus !== undefined) {
            setData[`${basePath}.bookingStatus`] = matched.bookingStatus;
          }
          if (matched.bookingId !== undefined) {
            setData[`${basePath}.bookingId`] = matched.bookingId;
          }
          if (matched.bookingNumber !== undefined) {
            setData[`${basePath}.bookingNumber`] = matched.bookingNumber;
          }

          seatUpdatePromises.push(
            this.busScheduleLayoutModel
              .updateOne(
                { _id: busScheduleLayout._id, [`seatLayouts.${li}.seats._id`]: seat._id },
                {
                  $set: setData,
                },
              )
              .exec(),
          );
        }
      });
    });

    await Promise.all(seatUpdatePromises);
    return true;
  }

  async updateCancelledSeatStatusByBusSchedule(
    busScheduleId: Types.ObjectId,
    seatIds: Types.ObjectId[],
    tenantId: Types.ObjectId,
  ): Promise<boolean> {
    const busScheduleLayout = await this.busScheduleLayoutModel.findOne({ busScheduleId, tenantId }).lean().exec();

    if (!busScheduleLayout) {
      throw new NotFoundException(`Bus Schedule with ID "${busScheduleId}" not found.`);
    }

    const seatUpdatePromises: Promise<any>[] = [];

    busScheduleLayout.seatLayouts.forEach((layout: BusScheduleSeatLayoutTemplateDocument, li) => {
      layout.seats.forEach((seat: BusScheduleLayoutSeatDocument, si) => {
        const matched = seatIds.find((s) => s.toString() === seat._id.toString());
        if (matched) {
          seatUpdatePromises.push(
            this.busScheduleLayoutModel
              .updateOne(
                { _id: busScheduleLayout._id, [`seatLayouts.${li}.seats._id`]: seat._id },
                {
                  $set: {
                    [`seatLayouts.${li}.seats.${si}.status`]: 'available',
                    [`seatLayouts.${li}.seats.${si}.bookingStatus`]: '',
                    [`seatLayouts.${li}.seats.${si}.bookingId`]: '',
                    [`seatLayouts.${li}.seats.${si}.bookingNumber`]: '',
                  },
                },
              )
              .exec(),
          );
        }
      });
    });

    await Promise.all(seatUpdatePromises);
    return true;
  }

  async remove(id: string, tenantId: Types.ObjectId): Promise<void> {
    const result = await this.busScheduleLayoutModel.findOneAndDelete({ _id: id, tenantId }).lean().exec();
    if (!result) {
      throw new NotFoundException(`BusScheduleLayout with ID "${id}" not found.`);
    }
  }

  async getRemainSeats(busScheduleId: Types.ObjectId, tenantId: Types.ObjectId): Promise<number> {
    const busScheduleLayoutModel = await this.busScheduleLayoutModel.findOne({ busScheduleId, tenantId }).lean().exec();

    if (!busScheduleLayoutModel) {
      return 0;
    }

    let remainSeats = 0;

    const busScheduleLayout = plainToInstance(BusLayoutTemplateDto, busScheduleLayoutModel);

    const seatTypes = await this.seatTypeService.findAll([tenantId, new Types.ObjectId(this.ROOT_TENANT_ID)]);

    if (!seatTypes || seatTypes.length === 0) {
      return 0;
    }

    const updatePromises = await busScheduleLayout.seatLayouts.map(async (seatLayout: BusSeatLayoutTemplateDto) => {
      // Kiểm tra các seat tồn tạis
      const bookings = (await this.bookingService.findBookingBySchedule(busScheduleId, tenantId)) ?? [];

      // 1) Tập hợp tất cả seatId đã được booking
      const bookedSeatIds = new Set<string>();
      for (const booking of bookings ?? []) {
        for (const item of booking.bookingItems ?? []) {
          const sid = item?.seat?._id;
          if (sid != null) bookedSeatIds.add(sid.toString());
        }
      }

      // 2) Tập hợp các typeId có isEnv = true (nếu muốn check theo type nhanh)
      const envTypeIds = new Set<string>(
        (seatTypes ?? []).filter((st) => !!st && st.isEnv).map((st) => st._id.toString()),
      );

      // 3) Duyệt seatLayouts 1 lần và cập nhật trạng thái ghế
      busScheduleLayout.seatLayouts = (busScheduleLayout.seatLayouts ?? []).map(
        (seatLayout: BusSeatLayoutTemplateDto) => {
          seatLayout.seats = (seatLayout.seats ?? []).map((seat: SeatDto) => {
            const seatId = seat?._id?.toString?.();
            const typeId = seat?.typeId?.toString?.();

            const isBooked = seatId ? bookedSeatIds.has(seatId) : false;
            const isEnv = typeId ? envTypeIds.has(typeId) : false;

            // nếu đã bị blocked trước thì giữ nguyên (nếu muốn), hoặc overwrite:
            if (isBooked || isEnv) {
              return { ...seat, status: 'blocked' };
            }

            // nếu muốn reset lại trạng thái khi không blocked, ví dụ 'available':
            // return { ...seat, status: 'available' };

            return seat; // giữ nguyên nếu không muốn thay đổi
          });

          return seatLayout;
        },
      );

      remainSeats += seatLayout.seats.filter((seat) => seat.status === 'available').length;
    });

    // Chờ tất cả các cập nhật hoàn tất
    await Promise.all(updatePromises);
    return remainSeats;
  }
}

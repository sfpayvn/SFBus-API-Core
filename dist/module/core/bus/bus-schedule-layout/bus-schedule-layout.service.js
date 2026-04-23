"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusScheduleLayoutService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bus_schedule_layout_schema_1 = require("./schema/bus-schedule-layout.schema");
const bus_schedule_layout_dto_1 = require("./dto/bus-schedule-layout.dto");
const class_transformer_1 = require("class-transformer");
const bus_layout_template_dto_1 = require("../bus-layout-template/dto/bus-layout-template.dto");
const booking_service_1 = require("../../booking/booking-service");
const seat_type_service_1 = require("../../seat/seat-type/seat-type.service");
let BusScheduleLayoutService = class BusScheduleLayoutService {
    constructor(busScheduleLayoutModel, bookingService, seatTypeService) {
        this.busScheduleLayoutModel = busScheduleLayoutModel;
        this.bookingService = bookingService;
        this.seatTypeService = seatTypeService;
        this.ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';
    }
    async create(createBusScheduleLayoutDto, tenantId) {
        const seatLayouts = createBusScheduleLayoutDto.seatLayouts.map((layout) => {
            const seats = layout.seats.map((seat) => ({
                ...seat,
                _id: new mongoose_2.Types.ObjectId(),
            }));
            return {
                ...layout,
                _id: new mongoose_2.Types.ObjectId(),
                seats,
            };
        });
        const createdBusTemplate = new this.busScheduleLayoutModel({
            ...createBusScheduleLayoutDto,
            seatLayouts,
            tenantId,
        });
        const savedTemplate = await createdBusTemplate.save();
        return (0, class_transformer_1.plainToInstance)(bus_schedule_layout_dto_1.BusScheduleLayoutDto, savedTemplate);
    }
    async findAll(tenantId) {
        const templates = await this.busScheduleLayoutModel.find({ tenantId }).populate('seatLayouts').lean().exec();
        return templates.map((template) => (0, class_transformer_1.plainToInstance)(bus_schedule_layout_dto_1.BusScheduleLayoutDto, template));
    }
    async findOne(busScheduleId, tenantId) {
        const busScheduleLayoutModel = await this.busScheduleLayoutModel
            .findOne({ busScheduleId, tenantId })
            .populate('seatLayouts')
            .lean()
            .exec();
        if (!busScheduleLayoutModel) {
            throw new common_1.NotFoundException(`BusScheduleLayout with ID  busScheduleId "${busScheduleId}" not found.`);
        }
        const busScheduleLayout = (0, class_transformer_1.plainToInstance)(bus_schedule_layout_dto_1.BusScheduleLayoutDto, busScheduleLayoutModel);
        busScheduleLayout.seatLayouts = await Promise.all(busScheduleLayout.seatLayouts.map(async (seatLayout) => {
            seatLayout.seats = seatLayout.seats.map((seat) => {
                if (seat.bookingId) {
                    seat.status = 'blocked';
                }
                return seat;
            });
            return seatLayout;
        }));
        return busScheduleLayout;
    }
    async findOneByBusSchedule(busScheduleId, tenantId) {
        const busScheduleLayoutModel = await this.busScheduleLayoutModel
            .findOne({ busScheduleId, tenantId })
            .populate('seatLayouts')
            .lean()
            .exec();
        if (!busScheduleLayoutModel) {
            throw new common_1.NotFoundException(`BusScheduleLayout with ID "${busScheduleId}" not found.`);
        }
        const busScheduleLayout = (0, class_transformer_1.plainToInstance)(bus_schedule_layout_dto_1.BusScheduleLayoutDto, busScheduleLayoutModel);
        return busScheduleLayout;
    }
    async update(updateBusScheduleLayoutDto, tenantId) {
        const busScheduleLayoutUpdated = await this.busScheduleLayoutModel
            .findOneAndUpdate({ _id: updateBusScheduleLayoutDto._id, tenantId }, updateBusScheduleLayoutDto, { new: true })
            .populate('seatLayouts')
            .exec();
        if (!busScheduleLayoutUpdated) {
            throw new common_1.NotFoundException(`BusScheduleLayout with ID "${updateBusScheduleLayoutDto._id}" not found.`);
        }
        return (0, class_transformer_1.plainToInstance)(bus_schedule_layout_dto_1.BusScheduleLayoutDto, busScheduleLayoutUpdated);
    }
    async updateSeatStatusByBusSchedule(busScheduleId, requestUpdateSeatDto, tenantId) {
        const busScheduleLayout = await this.busScheduleLayoutModel.findOne({ busScheduleId, tenantId }).lean().exec();
        if (!busScheduleLayout) {
            throw new common_1.NotFoundException(`Bus Schedule with ID "${busScheduleId}" not found.`);
        }
        const seatUpdatePromises = [];
        busScheduleLayout.seatLayouts.forEach((layout, li) => {
            layout.seats.forEach((seat, si) => {
                const matched = requestUpdateSeatDto.find((s) => s._id.toString() === seat._id.toString());
                if ((matched &&
                    matched.bookingId &&
                    seat.bookingId &&
                    seat.bookingId.toString() === matched.bookingId.toString()) ||
                    (matched && !seat.bookingId)) {
                    const basePath = `seatLayouts.${li}.seats.${si}`;
                    const setData = {};
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
                    seatUpdatePromises.push(this.busScheduleLayoutModel
                        .updateOne({ _id: busScheduleLayout._id, [`seatLayouts.${li}.seats._id`]: seat._id }, {
                        $set: setData,
                    })
                        .exec());
                }
            });
        });
        await Promise.all(seatUpdatePromises);
        return true;
    }
    async updateCancelledSeatStatusByBusSchedule(busScheduleId, seatIds, tenantId) {
        const busScheduleLayout = await this.busScheduleLayoutModel.findOne({ busScheduleId, tenantId }).lean().exec();
        if (!busScheduleLayout) {
            throw new common_1.NotFoundException(`Bus Schedule with ID "${busScheduleId}" not found.`);
        }
        const seatUpdatePromises = [];
        busScheduleLayout.seatLayouts.forEach((layout, li) => {
            layout.seats.forEach((seat, si) => {
                const matched = seatIds.find((s) => s.toString() === seat._id.toString());
                if (matched) {
                    seatUpdatePromises.push(this.busScheduleLayoutModel
                        .updateOne({ _id: busScheduleLayout._id, [`seatLayouts.${li}.seats._id`]: seat._id }, {
                        $set: {
                            [`seatLayouts.${li}.seats.${si}.status`]: 'available',
                            [`seatLayouts.${li}.seats.${si}.bookingStatus`]: '',
                            [`seatLayouts.${li}.seats.${si}.bookingId`]: '',
                            [`seatLayouts.${li}.seats.${si}.bookingNumber`]: '',
                        },
                    })
                        .exec());
                }
            });
        });
        await Promise.all(seatUpdatePromises);
        return true;
    }
    async remove(id, tenantId) {
        const result = await this.busScheduleLayoutModel.findOneAndDelete({ _id: id, tenantId }).lean().exec();
        if (!result) {
            throw new common_1.NotFoundException(`BusScheduleLayout with ID "${id}" not found.`);
        }
    }
    async getRemainSeats(busScheduleId, tenantId) {
        const busScheduleLayoutModel = await this.busScheduleLayoutModel.findOne({ busScheduleId, tenantId }).lean().exec();
        if (!busScheduleLayoutModel) {
            return 0;
        }
        let remainSeats = 0;
        const busScheduleLayout = (0, class_transformer_1.plainToInstance)(bus_layout_template_dto_1.BusLayoutTemplateDto, busScheduleLayoutModel);
        const seatTypes = await this.seatTypeService.findAll([tenantId, new mongoose_2.Types.ObjectId(this.ROOT_TENANT_ID)]);
        if (!seatTypes || seatTypes.length === 0) {
            return 0;
        }
        const updatePromises = await busScheduleLayout.seatLayouts.map(async (seatLayout) => {
            const bookings = (await this.bookingService.findBookingBySchedule(busScheduleId, tenantId)) ?? [];
            const bookedSeatIds = new Set();
            for (const booking of bookings ?? []) {
                for (const item of booking.bookingItems ?? []) {
                    const sid = item?.seat?._id;
                    if (sid != null)
                        bookedSeatIds.add(sid.toString());
                }
            }
            const envTypeIds = new Set((seatTypes ?? []).filter((st) => !!st && st.isEnv).map((st) => st._id.toString()));
            busScheduleLayout.seatLayouts = (busScheduleLayout.seatLayouts ?? []).map((seatLayout) => {
                seatLayout.seats = (seatLayout.seats ?? []).map((seat) => {
                    const seatId = seat?._id?.toString?.();
                    const typeId = seat?.typeId?.toString?.();
                    const isBooked = seatId ? bookedSeatIds.has(seatId) : false;
                    const isEnv = typeId ? envTypeIds.has(typeId) : false;
                    if (isBooked || isEnv) {
                        return { ...seat, status: 'blocked' };
                    }
                    return seat;
                });
                return seatLayout;
            });
            remainSeats += seatLayout.seats.filter((seat) => seat.status === 'available').length;
        });
        await Promise.all(updatePromises);
        return remainSeats;
    }
};
exports.BusScheduleLayoutService = BusScheduleLayoutService;
exports.BusScheduleLayoutService = BusScheduleLayoutService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(bus_schedule_layout_schema_1.BusScheduleLayoutDocument.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => booking_service_1.BookingService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => seat_type_service_1.SeatTypeService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        booking_service_1.BookingService,
        seat_type_service_1.SeatTypeService])
], BusScheduleLayoutService);
//# sourceMappingURL=bus-schedule-layout.service.js.map
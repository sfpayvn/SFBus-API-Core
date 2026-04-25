import { PosBusScheduleService } from './pos-bus-schedule.service';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { PosSearchBusSchedulePagingQuery } from './dto/pos-bus-schedule.dto';
import { Types } from 'mongoose';
import { PosUpdateBusScheduleDto } from './dto/pos-update-bus-schedule.dto';
export declare class PosBusScheduleController {
    private readonly posBusScheduleService;
    constructor(posBusScheduleService: PosBusScheduleService);
    update(posUpdateBusScheduleDto: PosUpdateBusScheduleDto, user: UserTokenDto): Promise<import("./dto/pos-bus-schedule.dto").PosBusScheduleDto>;
    findOne(id: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/pos-bus-schedule.dto").PosBusScheduleDto | null>;
    findAll(user: UserTokenDto): Promise<import("./dto/pos-bus-schedule.dto").PosBusScheduleDto[]>;
    searchBusSchedulePaging(query: PosSearchBusSchedulePagingQuery, user: UserTokenDto): Promise<import("./dto/pos-bus-schedule.dto").PosSearchBusSchedulePagingRes>;
    searchBusScheduleDeparture(query: PosSearchBusSchedulePagingQuery, user: UserTokenDto): Promise<import("./dto/pos-bus-schedule.dto").PosSearchBusSchedulePagingRes>;
    searchBusScheduleArrival(query: PosSearchBusSchedulePagingQuery, user: UserTokenDto): Promise<import("./dto/pos-bus-schedule.dto").PosSearchBusSchedulePagingRes>;
    updateCurrentStation(currentStationId: Types.ObjectId, busScheduleId: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/pos-bus-schedule.dto").PosBusScheduleDto>;
}

import { DriverBusScheduleService } from './driver-bus-schedule.service';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { DriverSearchBusSchedulePagingQuery } from './dto/driver-bus-schedule.dto';
import { Types } from 'mongoose';
export declare class DriverBusScheduleController {
    private readonly driverBusScheduleService;
    constructor(driverBusScheduleService: DriverBusScheduleService);
    findAll(user: UserTokenDto): Promise<import("./dto/driver-bus-schedule.dto").DriverBusScheduleDto[]>;
    findOne(id: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/driver-bus-schedule.dto").DriverBusScheduleDto>;
    searchBusScheduleByDriver(query: DriverSearchBusSchedulePagingQuery, user: UserTokenDto): Promise<import("./dto/driver-bus-schedule.dto").DriverBusScheduleDto[]>;
    updateCurrentStation(currentStationId: Types.ObjectId, busScheduleId: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/driver-bus-schedule.dto").DriverBusScheduleDto>;
}

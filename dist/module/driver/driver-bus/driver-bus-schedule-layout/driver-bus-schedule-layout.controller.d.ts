import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { DriverBusScheduleLayoutService } from './driver-bus-schedule-layout.service';
import { Types } from 'mongoose';
export declare class DriverBusScheduleLayoutController {
    private readonly DriverBusScheduleLayoutService;
    constructor(DriverBusScheduleLayoutService: DriverBusScheduleLayoutService);
    findAll(user: UserTokenDto): Promise<import("./dto/driver-bus-schedule-layout.dto").DriverBusScheduleLayoutDto[]>;
    findOne(id: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/driver-bus-schedule-layout.dto").DriverBusScheduleLayoutDto>;
    findOneByBusSchedule(busScheduleId: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/driver-bus-schedule-layout.dto").DriverBusScheduleLayoutDto>;
}

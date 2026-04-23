import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { PosBusScheduleLayoutService } from './pos-bus-schedule-layout.service';
import { Types } from 'mongoose';
export declare class PosBusScheduleLayoutController {
    private readonly PosBusScheduleLayoutService;
    constructor(PosBusScheduleLayoutService: PosBusScheduleLayoutService);
    findAll(user: UserTokenDto): Promise<import("./dto/pos-bus-schedule-layout.dto").PosBusScheduleLayoutDto[]>;
    findOne(id: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/pos-bus-schedule-layout.dto").PosBusScheduleLayoutDto>;
    findOneByBusSchedule(busScheduleId: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/pos-bus-schedule-layout.dto").PosBusScheduleLayoutDto>;
}

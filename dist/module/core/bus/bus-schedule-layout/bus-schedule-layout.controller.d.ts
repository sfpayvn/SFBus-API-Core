import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { CreateBusScheduleLayoutDto } from './dto/create-bus-schedule-layout.dto';
import { BusScheduleLayoutService } from './bus-schedule-layout.service';
import { UpdateBusScheduleLayoutDto } from './dto/update-bus-schedule-layout.dto';
import { Types } from 'mongoose';
export declare class BusScheduleLayoutController {
    private readonly busScheduleLayoutService;
    constructor(busScheduleLayoutService: BusScheduleLayoutService);
    create(createBusScheduleLayoutDto: CreateBusScheduleLayoutDto, user: UserTokenDto): Promise<import("./dto/bus-schedule-layout.dto").BusScheduleLayoutDto>;
    update(id: string, updateBusLayoutDto: UpdateBusScheduleLayoutDto, user: UserTokenDto): Promise<import("./dto/bus-schedule-layout.dto").BusScheduleLayoutDto>;
    remove(id: string, user: UserTokenDto): Promise<{
        message: string;
    }>;
    findAll(user: UserTokenDto): Promise<import("./dto/bus-schedule-layout.dto").BusScheduleLayoutDto[]>;
    findOne(id: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/bus-schedule-layout.dto").BusScheduleLayoutDto>;
    findOneByBusSchedule(busScheduleId: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/bus-schedule-layout.dto").BusScheduleLayoutDto>;
}

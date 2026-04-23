import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { BusScheduleAutogeneratorService } from './bus-schedule-autogenerator.service';
import { UpdateBusScheduleAutogeneratorDto } from './dto/update-bus-schedule-autogenerator.dto';
import { Types } from 'mongoose';
import { CreateBusScheduleAutogeneratorDto } from './dto/create-bus-schedule-autogenerator.dto';
import { BusScheduleAutogeneratorDto, SearchBusScheduleAutogeneratorQuery } from './dto/bus-schedule-autogenerator.dto';
export declare class BusScheduleAutogeneratorController {
    private readonly busScheduleAutogeneratorService;
    constructor(busScheduleAutogeneratorService: BusScheduleAutogeneratorService);
    create(createBusScheduleAutogeneratorDto: CreateBusScheduleAutogeneratorDto, user: UserTokenDto, timezoneOffset: number): Promise<BusScheduleAutogeneratorDto>;
    findAll(user: UserTokenDto): Promise<BusScheduleAutogeneratorDto[]>;
    findOne(id: Types.ObjectId, user: UserTokenDto): Promise<BusScheduleAutogeneratorDto>;
    update(updateBusScheduleAutogeneratorDto: UpdateBusScheduleAutogeneratorDto, user: UserTokenDto, timezoneOffset: number): Promise<BusScheduleAutogeneratorDto>;
    runCreateBusSchedule(_id: Types.ObjectId, user: UserTokenDto): Promise<boolean>;
    delete(id: Types.ObjectId, user: UserTokenDto): Promise<boolean>;
    searchBusScheduleAutogenerator(query: SearchBusScheduleAutogeneratorQuery, user: UserTokenDto): Promise<import("./dto/bus-schedule-autogenerator.dto").SearchBusScheduleRes>;
}

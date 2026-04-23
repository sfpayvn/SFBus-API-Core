import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { BusScheduleService } from './bus-schedule.service';
import { CreateBusScheduleDto } from './dto/create-bus-schedule.dto';
import { UpdateBusScheduleDto } from './dto/update-bus-schedule.dto';
import { Types } from 'mongoose';
import { SearchBusScheduleDriverQuery, SearchBusSchedulePagingQuery } from './dto/bus-schedule.dto';
import { BusService } from '../bus/bus.service';
export declare class BusScheduleController {
    private readonly busScheduleService;
    private readonly busService;
    constructor(busScheduleService: BusScheduleService, busService: BusService);
    create(createBusScheduleDto: CreateBusScheduleDto, user: UserTokenDto): Promise<import("./dto/bus-schedule.dto").BusScheduleDto>;
    update(updateBusScheduleDto: UpdateBusScheduleDto, user: UserTokenDto): Promise<import("./dto/bus-schedule.dto").BusScheduleDto>;
    updateBusScheduleNote(note: string, busScheduleId: Types.ObjectId, user: UserTokenDto): Promise<string>;
    updateCurrentStation(currentStationId: Types.ObjectId, busScheduleId: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/bus-schedule.dto").BusScheduleDto>;
    delete(id: Types.ObjectId, user: UserTokenDto): Promise<boolean>;
    findAll(user: UserTokenDto): Promise<import("./dto/bus-schedule.dto").BusScheduleDto[]>;
    findAvailable(user: UserTokenDto): Promise<import("./dto/bus-schedule.dto").BusScheduleDto[]>;
    findOne(id: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/bus-schedule.dto").BusScheduleDto>;
    searchBusSchedulePaging(query: SearchBusSchedulePagingQuery, user: UserTokenDto): Promise<import("./dto/bus-schedule.dto").SearchBusSchedulePagingRes>;
    searchBusScheduleByDriver(query: SearchBusScheduleDriverQuery, user: UserTokenDto): Promise<import("./dto/bus-schedule.dto").BusScheduleDto[]>;
}

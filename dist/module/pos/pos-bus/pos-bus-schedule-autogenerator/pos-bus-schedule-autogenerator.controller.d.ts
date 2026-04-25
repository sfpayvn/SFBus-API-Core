import { PosBusScheduleAutogeneratorService } from './pos-bus-schedule-autogenerator.service';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { PosCreateBusScheduleAutogeneratorDto } from './dto/pos-create-bus-schedule-autogenerator.dto';
import { PosUpdateBusScheduleAutogeneratorDto } from './dto/pos-update-bus-schedule-autogenerator.dto';
import { Types } from 'mongoose';
import { PosSearchBusScheduleAutogeneratorQuery } from './dto/pos-bus-schedule-autogenerator.dto';
export declare class PosBusScheduleAutogeneratorController {
    private readonly PosBusScheduleAutogeneratorService;
    constructor(PosBusScheduleAutogeneratorService: PosBusScheduleAutogeneratorService);
    create(PosCreateBusScheduleAutogeneratorDto: PosCreateBusScheduleAutogeneratorDto, user: UserTokenDto, timezoneOffset: number): Promise<import("./dto/pos-bus-schedule-autogenerator.dto").PosBusScheduleAutogeneratorDto>;
    update(PosUpdateBusScheduleAutogeneratorDto: PosUpdateBusScheduleAutogeneratorDto, user: UserTokenDto, timezoneOffset: number): Promise<import("../../../core/bus/bus-schedule-autogenerator/dto/bus-schedule-autogenerator.dto").BusScheduleAutogeneratorDto>;
    delete(id: Types.ObjectId, user: UserTokenDto): Promise<boolean>;
    findAll(user: UserTokenDto): Promise<import("./dto/pos-bus-schedule-autogenerator.dto").PosBusScheduleAutogeneratorDto[]>;
    searchBusScheduleAutogenerator(query: PosSearchBusScheduleAutogeneratorQuery, user: UserTokenDto): Promise<import("./dto/pos-bus-schedule-autogenerator.dto").PosSearchBusScheduleRes>;
}

import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { BusScheduleTemplateService } from './bus-schedule-template.service';
import { CreateBusScheduleTemplateDto } from './dto/create-bus-schedule-template.dto';
import { UpdateBusScheduleTemplateDto } from './dto/update-bus-schedule-template.dto';
import { Types } from 'mongoose';
import { SearchBusScheduleTemplateQuery } from './dto/bus-schedule-template.dto';
export declare class BusScheduleTemplateController {
    private readonly BusScheduleTemplateService;
    constructor(BusScheduleTemplateService: BusScheduleTemplateService);
    create(createBusScheduleTemplateDto: CreateBusScheduleTemplateDto, user: UserTokenDto): Promise<import("./dto/bus-schedule-template.dto").BusScheduleTemplateDto>;
    findAll(user: UserTokenDto): Promise<import("./dto/bus-schedule-template.dto").BusScheduleTemplateDto[]>;
    findOne(id: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/bus-schedule-template.dto").BusScheduleTemplateDto>;
    update(updateBusScheduleTemplateDto: UpdateBusScheduleTemplateDto, user: UserTokenDto): Promise<import("./dto/bus-schedule-template.dto").BusScheduleTemplateDto>;
    delete(id: Types.ObjectId, user: UserTokenDto): Promise<boolean>;
    search(query: SearchBusScheduleTemplateQuery, user: UserTokenDto): Promise<import("./dto/bus-schedule-template.dto").SearchBusScheduleTemplateRes>;
}

import { BusLayoutTemplateService } from './bus-layout-template.service';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { Types } from 'mongoose';
import { SearchBusLayoutTemplateQuery } from './dto/bus-layout-template.dto';
import { CreateBusLayoutTemplateDto } from './dto/create-bus-layout-template.dto';
import { UpdateBusLayoutTemplateDto } from './dto/update-bus-layout-template.dto';
export declare class BusLayoutTemplateController {
    private readonly busLayoutTemplateService;
    constructor(busLayoutTemplateService: BusLayoutTemplateService);
    create(createBusLayoutTemplateDto: CreateBusLayoutTemplateDto, user: UserTokenDto): Promise<import("./dto/bus-layout-template.dto").BusLayoutTemplateDto>;
    update(updateBusLayoutTemplateDto: UpdateBusLayoutTemplateDto, user: UserTokenDto): Promise<import("./dto/bus-layout-template.dto").BusLayoutTemplateDto>;
    delete(id: Types.ObjectId, user: UserTokenDto): Promise<boolean>;
    findAll(user: UserTokenDto): Promise<import("./dto/bus-layout-template.dto").BusLayoutTemplateDto[]>;
    findOne(id: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/bus-layout-template.dto").BusLayoutTemplateDto>;
    search(query: SearchBusLayoutTemplateQuery, user: UserTokenDto): Promise<import("./dto/bus-layout-template.dto").SearchBusTemplateRes>;
}

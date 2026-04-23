import { BusTemplateService } from './bus-template.service';
import { BusTemplateDto, SearchBusTemplateQuery } from './dto/bus-template.dto';
import { UpdateBusTemplateDto } from './dto/update-bus-template.dto';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { Types } from 'mongoose';
import { CreateBusTemplateDto } from './dto/create-bus-template.dto';
export declare class BusTemplateController {
    private readonly busTemplateService;
    constructor(busTemplateService: BusTemplateService);
    create(createBusTemplateDto: CreateBusTemplateDto, user: UserTokenDto): Promise<BusTemplateDto>;
    findAll(user: UserTokenDto): Promise<BusTemplateDto[]>;
    findOne(id: Types.ObjectId, user: UserTokenDto): Promise<BusTemplateDto>;
    update(updateBusTemplateDto: UpdateBusTemplateDto, user: UserTokenDto): Promise<BusTemplateDto>;
    delete(id: Types.ObjectId, user: UserTokenDto): Promise<boolean>;
    search(query: SearchBusTemplateQuery, user: UserTokenDto): Promise<import("./dto/bus-template.dto").SearchBusTemplateRes>;
}

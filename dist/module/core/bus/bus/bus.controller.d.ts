import { Types } from 'mongoose';
import { BusService } from './bus.service';
import { CreateBusDto } from './dto/create-bus.dto';
import { BusDto, SearchBusQuery } from './dto/bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
export declare class BusController {
    private readonly busService;
    constructor(busService: BusService);
    create(createBusDto: CreateBusDto, user: UserTokenDto): Promise<BusDto>;
    update(updateBusDto: UpdateBusDto, user: UserTokenDto): Promise<BusDto>;
    delete(id: Types.ObjectId, user: UserTokenDto): Promise<boolean>;
    findAll(user: UserTokenDto): Promise<BusDto[]>;
    findOne(id: Types.ObjectId, user: UserTokenDto): Promise<BusDto | null>;
    findByBusTemplate(busTemplateId: Types.ObjectId, user: UserTokenDto): Promise<[] | BusDto[]>;
    search(query: SearchBusQuery, user: UserTokenDto): Promise<import("./dto/bus.dto").SearchBusRes>;
}

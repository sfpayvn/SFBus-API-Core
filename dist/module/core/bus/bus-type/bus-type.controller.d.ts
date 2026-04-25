import { BusTypeService } from './bus-type.service';
import { CreateBusTypeDto } from './dto/create-bus-type.dto';
import { SearchBusTypesQuery } from './dto/bus-type.dto';
import { UpdateBusTypeDto } from './dto/update-bus-type.dto';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { Types } from 'mongoose';
export declare class BusTypeController {
    private readonly busTypeService;
    constructor(busTypeService: BusTypeService);
    create(createBusTypeDto: CreateBusTypeDto, user: UserTokenDto): Promise<import("./dto/bus-type.dto").BusTypeDto>;
    update(updateBusTypeDto: UpdateBusTypeDto, user: UserTokenDto): Promise<import("./dto/bus-type.dto").BusTypeDto>;
    delete(id: Types.ObjectId, user: UserTokenDto): Promise<boolean>;
    findOne(id: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/bus-type.dto").BusTypeDto>;
    findAll(user: UserTokenDto): Promise<import("./dto/bus-type.dto").BusTypeDto[]>;
    search(query: SearchBusTypesQuery, user: UserTokenDto): Promise<import("./dto/bus-type.dto").SearchBusTypesRes>;
}

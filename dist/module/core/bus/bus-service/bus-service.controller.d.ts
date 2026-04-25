import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { BusServiceService } from './bus-service.service';
import { CreateBusServiceDto } from './dto/create-bus-service.dto';
import { UpdateBusServiceDto } from './dto/update-bus-service.dto';
import { Types } from 'mongoose';
import { SearchBusServicesQuery } from './dto/bus-service.dto';
export declare class BusServiceController {
    private readonly busServiceService;
    constructor(busServiceService: BusServiceService);
    create(createBusServiceDto: CreateBusServiceDto, user: UserTokenDto): Promise<import("./dto/bus-service.dto").BusServiceDto>;
    findAll(user: UserTokenDto): Promise<import("./dto/bus-service.dto").BusServiceDto[]>;
    findOne(id: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/bus-service.dto").BusServiceDto>;
    update(updateBusServiceDto: UpdateBusServiceDto, user: UserTokenDto): Promise<import("./dto/bus-service.dto").BusServiceDto>;
    delete(id: Types.ObjectId, user: UserTokenDto): Promise<boolean>;
    search(query: SearchBusServicesQuery, user: UserTokenDto): Promise<import("./dto/bus-service.dto").SearchBusServicesRes>;
}

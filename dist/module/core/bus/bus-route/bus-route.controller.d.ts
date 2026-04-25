import { CreateBusRouteDto } from './dto/create-bus-route.dto';
import { UpdateBusRouteDto } from './dto/update-bus-route.dto';
import { BusRouteService } from './bus-route.service';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { Types } from 'mongoose';
import { SearchBusRouteQuery } from './dto/bus-route.dto';
export declare class BusRouteController {
    private readonly busRouteService;
    constructor(busRouteService: BusRouteService);
    create(createBusRouteDto: CreateBusRouteDto, user: UserTokenDto): Promise<import("./dto/bus-route.dto").BusRouteDto>;
    findAll(user: UserTokenDto): Promise<import("./dto/bus-route.dto").BusRouteDto[]>;
    findOne(id: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/bus-route.dto").BusRouteDto | null>;
    update(updateBusRouteDto: UpdateBusRouteDto, user: UserTokenDto): Promise<import("./dto/bus-route.dto").BusRouteDto>;
    delete(id: Types.ObjectId, user: UserTokenDto): Promise<boolean>;
    search(query: SearchBusRouteQuery, user: UserTokenDto): Promise<import("./dto/bus-route.dto").SearchBusRouteRes>;
}

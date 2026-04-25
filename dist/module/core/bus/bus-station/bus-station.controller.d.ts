import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { BusStationService } from './bus-station.service';
import { CreateBusStationDto } from './dto/create-bus-station.dto';
import { UpdateBusStationDto } from './dto/update-bus-station.dto';
import { Types } from 'mongoose';
import { SearchBusStationsQuery } from './dto/bus-station.dto';
export declare class BusStationController {
    private readonly busStationService;
    constructor(busStationService: BusStationService);
    create(createBusStationDto: CreateBusStationDto, user: UserTokenDto): Promise<import("./dto/bus-station.dto").BusStationDto>;
    update(updateBusStationDto: UpdateBusStationDto, user: UserTokenDto): Promise<import("./dto/bus-station.dto").BusStationDto>;
    updates(updateBusStationsDto: UpdateBusStationDto[], user: UserTokenDto): Promise<import("./dto/bus-station.dto").BusStationDto[]>;
    delete(id: Types.ObjectId, user: UserTokenDto): Promise<boolean>;
    findAll(user: UserTokenDto): Promise<import("./dto/bus-station.dto").BusStationDto[]>;
    findOne(id: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/bus-station.dto").BusStationDto>;
    findOneByProvinceId(provinceId: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/bus-station.dto").BusStationDto>;
    search(query: SearchBusStationsQuery, user: UserTokenDto): Promise<import("./dto/bus-station.dto").SearchBusStationsRes>;
}

import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { BusProvinceService } from './bus-province.service';
import { CloneBusProvinceDto, CreateBusProvinceDto } from './dto/create-bus-province.dto';
import { UpdateBusProvinceDto } from './dto/update-bus-province.dto';
import { Types } from 'mongoose';
import { SearchBusProvincesQuery } from './dto/bus-province.dto';
export declare class BusProvinceController {
    private readonly busProvinceService;
    constructor(busProvinceService: BusProvinceService);
    create(createBusProvinceDto: CreateBusProvinceDto, user: UserTokenDto): Promise<import("./dto/bus-province.dto").BusProvinceDto>;
    clone(cloneBusProvinceDto: CloneBusProvinceDto, user: UserTokenDto): Promise<import("./dto/bus-province.dto").BusProvinceDto>;
    update(updateBusProvinceDto: UpdateBusProvinceDto, user: UserTokenDto): Promise<import("./dto/bus-province.dto").BusProvinceDto>;
    delete(id: Types.ObjectId, user: UserTokenDto): Promise<boolean>;
    findAll(user: UserTokenDto): Promise<import("./dto/bus-province.dto").BusProvinceDto[]>;
    findOne(id: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/bus-province.dto").BusProvinceDto>;
    search(query: SearchBusProvincesQuery, user: UserTokenDto): Promise<import("./dto/bus-province.dto").SearchBusProvincesRes>;
}

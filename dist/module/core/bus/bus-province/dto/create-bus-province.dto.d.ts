import { CreateBusStationDto } from '../../bus-station/dto/create-bus-station.dto';
export declare class CreateBusProvinceDto {
    name: string;
    isActive?: boolean;
}
export declare class CloneBusProvinceDto {
    busProvince: CreateBusProvinceDto;
    busStations: CreateBusStationDto[];
}

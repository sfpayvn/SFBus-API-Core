import { AdminCreateBusStationDto } from '../../admin-bus-station/dto/admin-create-bus-station.dto';
export declare class AdminCreateBusProvinceDto {
    name: string;
    isActive: boolean;
}
export declare class AdminCloneBusProvinceDto {
    busProvince: AdminCreateBusProvinceDto;
    busStations: AdminCreateBusStationDto[];
}

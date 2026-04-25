import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { AdminCreateBusStationDto } from '../../admin-bus-station/dto/admin-create-bus-station.dto';

export class AdminCreateBusProvinceDto {
  @IsNotEmpty()
  @Type(() => String)
  name: string;

  @IsNotEmpty()
  @Type(() => Boolean)
  isActive: boolean;
}

export class AdminCloneBusProvinceDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AdminCreateBusProvinceDto)
  busProvince: AdminCreateBusProvinceDto = new AdminCreateBusProvinceDto();

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AdminCreateBusStationDto)
  busStations: AdminCreateBusStationDto[] = [];
}

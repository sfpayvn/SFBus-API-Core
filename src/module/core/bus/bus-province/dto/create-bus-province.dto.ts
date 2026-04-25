import { Type } from 'class-transformer';
import { IsNotEmpty, isNotEmpty, ValidateNested, IsOptional } from 'class-validator';
import { CreateBusStationDto } from '../../bus-station/dto/create-bus-station.dto';

export class CreateBusProvinceDto {
  @IsNotEmpty()
  @Type(() => String)
  name: string;

  @IsOptional()
  @Type(() => Boolean)
  isActive?: boolean;
}

export class CloneBusProvinceDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateBusProvinceDto)
  busProvince: CreateBusProvinceDto = new CreateBusProvinceDto();

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateBusStationDto)
  busStations: CreateBusStationDto[] = [];
}

import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class TopRoutesQueryDto {
  @IsNotEmpty()
  @Type(() => Date)
  startDate: Date;

  @IsNotEmpty()
  @Type(() => Date)
  endDate: Date;

  @IsOptional()
  @Type(() => String)
  platform?: string;

  @IsOptional()
  @Type(() => String)
  userId?: string;
}

export class TopRouteItemDto {
  routeId: string;
  routeName: string;
  ticketCount: number;
  percentage: number;
  revenue: number;
}

export class TopRoutesResponseDto {
  data: TopRouteItemDto[];
  total: number;
  totalRevenue: number;
  metadata: {
    startDate: string;
    endDate: string;
  };
}

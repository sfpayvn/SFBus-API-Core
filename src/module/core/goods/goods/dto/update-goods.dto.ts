import { PartialType } from '@nestjs/mapped-types';
import { CreateGoodsDto } from './create-goods.dto';
import { IsIn, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';
import { GOODS_STATUS } from '@/common/constants/status.constants';

export class UpdateGoodsDto extends PartialType(CreateGoodsDto) {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  _id: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => String)
  status: string;
}

export class RequestUpdatePaymentGoodsStatusDto {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  _id: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => String)
  paymentStatus: string;
}

export class RequestUpdateGoodsScheduleAssignmentDto {
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  goodsIds: Types.ObjectId[];

  @Type(() => Types.ObjectId)
  busScheduleId: Types.ObjectId | null;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  currentStationId: Types.ObjectId;
}

export class RequestUpdateGoodsScheduleBoardingDto {
  @IsNotEmpty()
  @IsIn([GOODS_STATUS.PENDING, GOODS_STATUS.ON_BOARD, GOODS_STATUS.ARRIVED_FINAL_STATION, GOODS_STATUS.COMPLETED])
  status: string;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  goodsIds: Types.ObjectId[];

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  busScheduleId: Types.ObjectId;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  currentStationId: Types.ObjectId;
}

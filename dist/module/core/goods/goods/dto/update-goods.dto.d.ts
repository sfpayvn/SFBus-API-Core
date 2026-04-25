import { CreateGoodsDto } from './create-goods.dto';
import { Types } from 'mongoose';
declare const UpdateGoodsDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateGoodsDto>>;
export declare class UpdateGoodsDto extends UpdateGoodsDto_base {
    _id: Types.ObjectId;
    status: string;
}
export declare class RequestUpdatePaymentGoodsStatusDto {
    _id: Types.ObjectId;
    paymentStatus: string;
}
export declare class RequestUpdateGoodsScheduleAssignmentDto {
    goodsIds: Types.ObjectId[];
    busScheduleId: Types.ObjectId | null;
    currentStationId: Types.ObjectId;
}
export declare class RequestUpdateGoodsScheduleBoardingDto {
    status: string;
    goodsIds: Types.ObjectId[];
    busScheduleId: Types.ObjectId;
    currentStationId: Types.ObjectId;
}
export {};

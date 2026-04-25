import { Types } from 'mongoose';
export declare class DriverUpdateGoodsStatus {
    _id: string;
    status: string;
}
export declare class DriverRequestUpdateGoodsBoardingDto {
    status: string;
    goodsIds: Types.ObjectId[];
    busScheduleId: Types.ObjectId;
    currentStationId: Types.ObjectId;
}

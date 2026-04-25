import { PosCreateGoodsDto } from './pos-create-goods.dto';
import { Types } from 'mongoose';
declare const PosUpdateGoodsDto_base: import("@nestjs/mapped-types").MappedType<Partial<PosCreateGoodsDto>>;
export declare class PosUpdateGoodsDto extends PosUpdateGoodsDto_base {
    _id: Types.ObjectId;
    status: string;
}
export declare class PosRequestUpdateGoodsScheduleAssignmentDto {
    goodsIds: Types.ObjectId[];
    busScheduleId: Types.ObjectId | null;
    currentStationId: Types.ObjectId;
}
export {};

import { Types } from 'mongoose';
export declare class CreateBusTemplateDto {
    name: string;
    busLayoutTemplateId: Types.ObjectId;
    busServiceIds: Types.ObjectId[];
    busTypeId: Types.ObjectId;
}

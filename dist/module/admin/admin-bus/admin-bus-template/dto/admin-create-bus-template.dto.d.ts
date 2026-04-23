import { Types } from 'mongoose';
export declare class AdminCreateBusTemplateDto {
    name: string;
    busLayoutTemplateId: Types.ObjectId;
    busServiceIds: Types.ObjectId[];
    busTypeId: Types.ObjectId;
}

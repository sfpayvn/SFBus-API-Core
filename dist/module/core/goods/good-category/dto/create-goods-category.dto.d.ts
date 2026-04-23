import { Types } from 'mongoose';
export declare class CreateGoodsCategoryDto {
    tenantId: Types.ObjectId;
    status: string;
    name: string;
    iconId: Types.ObjectId;
}

import { Types } from 'mongoose';
export declare class AdminCreateGoodsCategoryDto {
    tenantId: Types.ObjectId;
    status: string;
    name: string;
    iconId: Types.ObjectId;
}

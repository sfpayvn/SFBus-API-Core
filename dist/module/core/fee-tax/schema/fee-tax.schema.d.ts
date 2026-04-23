import { Document, Types } from 'mongoose';
export type FeeTaxDocument = FeeTax & Document;
export declare class FeeTax {
    tenantId: Types.ObjectId;
    feeType: 'fee' | 'tax';
    name: string;
    calculationType: 'fixed' | 'percentage';
    appliedOn: 'ticket_price' | 'total_booking' | 'after_discount';
    value: number;
    priority: number;
    enabled: boolean;
    description?: string;
    conditions?: {
        minTotal?: number;
        maxTotal?: number;
        minTickets?: number;
        maxTickets?: number;
        appliedRoutes?: Types.ObjectId[];
        excludedRoutes?: Types.ObjectId[];
    };
    startDate?: Date;
    endDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy: Types.ObjectId;
    updatedBy: Types.ObjectId;
}
export declare const FeeTaxSchema: import("mongoose").Schema<FeeTax, import("mongoose").Model<FeeTax, any, any, any, Document<unknown, any, FeeTax> & FeeTax & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, FeeTax, Document<unknown, {}, import("mongoose").FlatRecord<FeeTax>> & import("mongoose").FlatRecord<FeeTax> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;

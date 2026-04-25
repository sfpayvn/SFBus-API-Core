import { Document, Types } from 'mongoose';
export declare class AuthRescueDocument extends Document {
    tenantId: Types.ObjectId;
    identifier: string;
    purpose: string;
    tokenHash: string;
    expiresAt: Date;
    attempts: number;
    lockedUntil?: Date;
    consumed: boolean;
}
export declare const AuthRescueSchema: import("mongoose").Schema<AuthRescueDocument, import("mongoose").Model<AuthRescueDocument, any, any, any, Document<unknown, any, AuthRescueDocument> & AuthRescueDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AuthRescueDocument, Document<unknown, {}, import("mongoose").FlatRecord<AuthRescueDocument>> & import("mongoose").FlatRecord<AuthRescueDocument> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare function hashToken(token: string): string;

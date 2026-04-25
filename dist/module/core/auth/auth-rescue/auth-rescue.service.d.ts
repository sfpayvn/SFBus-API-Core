import { Model, Types } from 'mongoose';
import { AuthRescueDocument } from './schema/auth-rescue.schema';
export declare class AuthRescueService {
    private authRescueModel;
    private MAX_ATTEMPTS;
    private LOCK_MINUTES;
    private TOKEN_LENGTH;
    private TOKEN_TTL_MINUTES;
    constructor(authRescueModel: Model<AuthRescueDocument>);
    private generateNumericToken;
    requestAuthRescue(identifier: string, purpose: string, tenantId: Types.ObjectId): Promise<{
        expiresAt: Date;
        debugToken: string;
    }>;
    verifyAuthRescue(identifier: string, purpose: string, token: string, tenantId: Types.ObjectId): Promise<boolean>;
    checkOtpAlreadyVerified(identifier: string, purpose: string, token: string, tenantId: Types.ObjectId): Promise<boolean>;
}

import { AuthRescueService } from '@/module/core/auth/auth-rescue/auth-rescue.service';
import { AuthRescueDocument } from '@/module/core/auth/auth-rescue/schema/auth-rescue.schema';
import { Model, Types } from 'mongoose';
export declare class PosAuthRescueService {
    private authRescueModel;
    private readonly authRescueService;
    constructor(authRescueModel: Model<AuthRescueDocument>, authRescueService: AuthRescueService);
    requestAuthRescue(identifier: string, purpose: string, tenantId: Types.ObjectId): Promise<{
        expiresAt: Date;
        debugToken: string;
    }>;
    verifyAuthRescue(identifier: string, purpose: string, token: string, tenantId: Types.ObjectId): Promise<boolean>;
}

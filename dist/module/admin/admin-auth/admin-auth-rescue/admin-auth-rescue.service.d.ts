import { AuthRescueService } from '@/module/core/auth/auth-rescue/auth-rescue.service';
import { AuthRescueDocument } from '@/module/core/auth/auth-rescue/schema/auth-rescue.schema';
import { UserService } from '@/module/core/user/user/user.service';
import { Model, Types } from 'mongoose';
export declare class AdminAuthRescueService {
    private authRescueModel;
    private readonly authRescueService;
    private readonly userService;
    constructor(authRescueModel: Model<AuthRescueDocument>, authRescueService: AuthRescueService, userService: UserService);
    requestAuthRescue(identifier: string, purpose: string, tenantId: Types.ObjectId): Promise<{
        expiresAt: Date;
        debugToken: string;
    }>;
    verifyAuthRescue(identifier: string, purpose: string, token: string, userId: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean>;
}

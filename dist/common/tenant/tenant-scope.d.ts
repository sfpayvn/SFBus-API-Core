import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { Types } from 'mongoose';
export type ObjectId = Types.ObjectId | string;
export interface TenantScopeResult {
    rootTenantId: Types.ObjectId;
    tenantIds: Types.ObjectId[];
    tenantId: Types.ObjectId;
}
export declare function buildTenantScope(user: UserTokenDto): TenantScopeResult;
export declare const TenantScope: (...dataOrPipes: unknown[]) => ParameterDecorator;

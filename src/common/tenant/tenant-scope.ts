// src/common/tenant/tenant-scope.ts
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Types } from 'mongoose';

export type ObjectId = Types.ObjectId | string;

export interface TenantScopeResult {
  rootTenantId: Types.ObjectId;
  tenantIds: Types.ObjectId[];
  tenantId: Types.ObjectId;
}

function toObjectId(id: any | undefined): Types.ObjectId {
  return new Types.ObjectId(id ?? undefined);
}

export function buildTenantScope(user: UserTokenDto): TenantScopeResult {
  const ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';
  const isRoot = !!user?.tenantId && user.tenantId.toString() === toObjectId(ROOT_TENANT_ID).toString();

  const rootTenantObjectId = toObjectId(ROOT_TENANT_ID);
  const tenantIds = isRoot ? [toObjectId(user.tenantId)] : [toObjectId(user.tenantId), rootTenantObjectId];

  return {
    rootTenantId: rootTenantObjectId,
    tenantIds,
    tenantId: toObjectId(user.tenantId),
  };
}

export const TenantScope = createParamDecorator((_data: unknown, ctx: ExecutionContext): TenantScopeResult => {
  const req = ctx.switchToHttp().getRequest();
  const user = req.user as UserTokenDto;
  return buildTenantScope(user);
});

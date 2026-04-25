import { toObjectId } from '@/utils/utils';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Types } from 'mongoose';

export const TenantIdByCode = createParamDecorator((data: unknown, ctx: ExecutionContext): Types.ObjectId => {
  const request = ctx.switchToHttp().getRequest();
  return request.tenantId;
});

export const TenantIdsByCode = createParamDecorator((data: unknown, ctx: ExecutionContext): Types.ObjectId[] => {
  const request = ctx.switchToHttp().getRequest();
  const ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';
  return [request.tenantId, toObjectId(ROOT_TENANT_ID)];
});

export const TenantInfoByCode = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.tenant;
});

import { UseInterceptors } from '@nestjs/common';
import {
  UpdateAuditFieldsInterceptor,
  UpdateAuditFieldsOptions,
} from '@/common/interceptors/update-audit-fields.interceptor';

export function UpdateAuditFields(options?: UpdateAuditFieldsOptions) {
  return UseInterceptors(new UpdateAuditFieldsInterceptor(options));
}

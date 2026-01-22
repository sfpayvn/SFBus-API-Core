import { TenantService } from '@/module/core/tenant/tenant.service';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  BadRequestException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class TenantByCodeInterceptor implements NestInterceptor {
  constructor(
    @Inject(forwardRef(() => TenantService))
    private readonly clientTenantService: TenantService,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    // Lấy x-tenant-code từ header
    const tenantCode = request.headers['x-tenant-code'];

    if (!tenantCode) {
      throw new BadRequestException('x-tenant-code header is required');
    }

    try {
      // Tìm tenant từ tenant code
      const tenant = await this.clientTenantService.findByCode(tenantCode);

      if (!tenant) {
        throw new BadRequestException(`Tenant with code "${tenantCode}" not found`);
      }

      // Gán tenantId vào request để sử dụng trong controller
      request.tenantId = tenant._id;
      request.tenant = tenant;
    } catch (error: any) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Failed to resolve tenant code: ${error.message}`);
    }

    return next.handle();
  }
}

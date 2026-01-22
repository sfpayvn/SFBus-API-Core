import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RewriteInterceptor } from './rewrite.intercepter';
import { CustomInterceptor } from './customer.interceptor';
import { TenantSubscriptionUsageModule } from '@/module/core/tenant-subscription-usage/tenant-subscription-usage.module';

@Module({
  imports: [TenantSubscriptionUsageModule],
  providers: [
    // { provide: APP_INTERCEPTOR, useClass: RewriteInterceptor },
    { provide: APP_INTERCEPTOR, useClass: CustomInterceptor },
  ],
  exports: [],
})
export class InterceptorModule {}

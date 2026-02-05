// user.module.ts

import { forwardRef, Module } from '@nestjs/common';
import { AdminUserMainService } from './admin-user-main.service';
import { UserModule } from '@/module/core/user/user/user.module';
import { AdminUserMainController } from './admin-user-main.controller';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [AdminUserMainService],
  controllers: [AdminUserMainController],
  exports: [AdminUserMainService],
})
export class AdminUserMainModule {}

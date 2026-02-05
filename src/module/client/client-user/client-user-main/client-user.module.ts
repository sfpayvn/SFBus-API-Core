// user.module.ts

import { forwardRef, Module } from '@nestjs/common';
import { ClientUserController } from './client-user.controller';
import { ClientUserService } from './client-user.service';
import { UserModule } from '@/module/core/user/user/user.module';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [ClientUserService],
  controllers: [ClientUserController],
  exports: [ClientUserService],
})
export class ClientUserModule {}

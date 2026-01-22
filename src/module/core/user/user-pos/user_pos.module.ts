// pos.module.ts

import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { UserPosService } from './user_pos.service';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [UserPosService],
  exports: [UserPosService],
})
export class UserPosModule {}

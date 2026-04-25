// client.module.ts

import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { UserClientService } from './user_client.service';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [UserClientService],
  exports: [UserClientService],
})
export class UserClientModule {}

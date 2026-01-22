// driver.module.ts

import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { UserDriverService } from './user-driver.service';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [UserDriverService],
  exports: [UserDriverService],
})
export class UserDriverModule {}

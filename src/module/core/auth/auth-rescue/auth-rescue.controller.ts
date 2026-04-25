// otp.controller.ts
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthRescueService } from './auth-rescue.service';
import { RequestAuthRescueDto, VerifyAuthRescueDto } from './dto/auth-rescue.dto';
import { ParseObjectIdPipe } from '@/common/pipes/parse-objectId.pipe';

@Controller('auth/rescue')
export class AuthRescueController {
  constructor(private readonly authRescueService: AuthRescueService) {}
}

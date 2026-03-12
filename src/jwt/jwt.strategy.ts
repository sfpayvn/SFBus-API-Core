import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '@/module/core/user/user/user.service';
import { SettingsService } from '@/module/core/settings/settings.service';
import { UserTokenDto } from './dto/user-token.dto';
import { Types } from 'mongoose';
import { isVersionCompatible } from '@/common/config/app.version';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    private settingsService: SettingsService,
    configService: ConfigService,
  ) {
    const jwtSecret = configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in the configuration');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: any): Promise<UserTokenDto> {
    // Kiểm tra tokenVersion nếu có trong payload
    if (payload.tokenVersion !== undefined && payload._id && payload.tenantId) {
      const user = await this.userService.findById(new Types.ObjectId(payload._id), new Types.ObjectId(payload.tenantId));
      
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Nếu tokenVersion trong database khác với tokenVersion trong token thì token đã bị revoke
      if ((user.tokenVersion ?? 0) !== payload.tokenVersion) {
        throw new UnauthorizedException('Token has been revoked');
      }
    }

    // Kiểm tra appVersion nếu có trong payload
    // Token không có appVersion vẫn accept (backward compatibility)
    if (payload.appVersion) {
      try {
        // Get current app version from DB settings
        const currentAppVersion = await this.settingsService.getAppVersion(
          new Types.ObjectId(payload.tenantId)
        );

        // Compare token version with DB version
        if (!isVersionCompatible(payload.appVersion, currentAppVersion)) {
          throw new UnauthorizedException('App version incompatible. Please re-login.');
        }
      } catch (error) {
        // If DB fetch fails, just log warning and continue
        // (Don't reject request just because DB is temporarily unavailable)
        if (error?.message?.includes('App version incompatible')) {
          throw error;
        }
        console.warn('Failed to validate app version from DB:', error?.message);
      }
    }

    return payload as UserTokenDto;
  }
}

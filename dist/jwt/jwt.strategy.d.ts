import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '@/module/core/user/user/user.service';
import { SettingsService } from '@/module/core/settings/settings.service';
import { UserTokenDto } from './dto/user-token.dto';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private userService;
    private settingsService;
    constructor(userService: UserService, settingsService: SettingsService, configService: ConfigService);
    validate(payload: any): Promise<UserTokenDto>;
}
export {};

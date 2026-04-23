"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const config_1 = require("@nestjs/config");
const user_service_1 = require("../module/core/user/user/user.service");
const settings_service_1 = require("../module/core/settings/settings.service");
const mongoose_1 = require("mongoose");
const app_version_1 = require("../common/config/app.version");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(userService, settingsService, configService) {
        const jwtSecret = configService.get('JWT_SECRET');
        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined in the configuration');
        }
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtSecret,
        });
        this.userService = userService;
        this.settingsService = settingsService;
    }
    async validate(payload) {
        if (payload.tokenVersion !== undefined && payload._id && payload.tenantId) {
            const user = await this.userService.findById(new mongoose_1.Types.ObjectId(payload._id), new mongoose_1.Types.ObjectId(payload.tenantId));
            if (!user) {
                throw new common_1.UnauthorizedException('User not found');
            }
            if ((user.tokenVersion ?? 0) !== payload.tokenVersion) {
                throw new common_1.UnauthorizedException('Token has been revoked');
            }
        }
        if (payload.appVersion) {
            try {
                const currentAppVersion = await this.settingsService.getAppVersion(new mongoose_1.Types.ObjectId(payload.tenantId));
                if (!(0, app_version_1.isVersionCompatible)(payload.appVersion, currentAppVersion)) {
                    throw new common_1.UnauthorizedException('App version incompatible. Please re-login.');
                }
            }
            catch (error) {
                if (error?.message?.includes('App version incompatible')) {
                    throw error;
                }
                console.warn('Failed to validate app version from DB:', error?.message);
            }
        }
        return payload;
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        settings_service_1.SettingsService,
        config_1.ConfigService])
], JwtStrategy);
//# sourceMappingURL=jwt.strategy.js.map
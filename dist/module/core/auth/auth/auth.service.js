"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("mongoose");
const user_dto_1 = require("../../user/user/dto/user.dto");
const user_service_1 = require("../../user/user/user.service");
const class_validator_1 = require("class-validator");
const tenant_service_1 = require("../../tenant/tenant.service");
const crypto = __importStar(require("crypto"));
const bcrypt = __importStar(require("bcrypt"));
const auth_rescue_service_1 = require("../auth-rescue/auth-rescue.service");
const class_transformer_1 = require("class-transformer");
const settings_service_1 = require("../../settings/settings.service");
let AuthService = class AuthService {
    constructor(userService, tenantService, authRescueService, settingsService, jwtService, resetJwt) {
        this.userService = userService;
        this.tenantService = tenantService;
        this.authRescueService = authRescueService;
        this.settingsService = settingsService;
        this.jwtService = jwtService;
        this.resetJwt = resetJwt;
        this.FRONTEND_RESET_URL = process.env.FRONTEND_RESET_URL ?? 'https://localhost:8100/reset-password';
    }
    async validateUser(phoneNumber, password, tenantCode) {
        const tenant = await this.tenantService.findByCode(tenantCode);
        if (!tenant) {
            throw new common_1.UnauthorizedException('Tenant không tồn tại.');
        }
        const userModel = await this.userService.findByPhoneNumber(phoneNumber, tenant._id);
        if (!userModel) {
            return null;
        }
        const isMatch = await bcrypt.compare(password, userModel.password);
        if (!isMatch) {
            return null;
        }
        const user = (0, class_transformer_1.plainToInstance)(user_dto_1.UserDto, userModel);
        user.tenant = tenant;
        return user;
    }
    async login(user) {
        const userDocument = await this.userService.findById(user._id, user.tenantId);
        const tokenVersion = userDocument?.tokenVersion ?? 0;
        const appVersion = await this.settingsService.getAppVersion(user.tenantId);
        const payload = {
            _id: user._id.toString(),
            roles: user.roles,
            tenantId: user.tenantId?.toString(),
            subscriptionId: user.tenant?.subscriptionId?.toString(),
            tokenVersion: tokenVersion,
            appVersion: appVersion,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async verifyPhoneNumber(phoneNumber) {
        const user = await this.userService.findByPhoneNumber(phoneNumber);
        if (user) {
            return user.name;
        }
        return null;
    }
    async validateOtp(userId, tenantId, otp) {
        const valid = await this.authRescueService.verifyAuthRescue(userId.toString(), '2fa', otp, tenantId);
        return valid;
    }
    async forgotPassword(phoneNumber, tenantCode, redirectBaseUrl) {
        const token = this.createForgotPasswordToken(phoneNumber, tenantCode);
        const base = redirectBaseUrl ?? this.FRONTEND_RESET_URL;
        const resetUrl = `${base}?token=${token}`;
        return { ok: resetUrl };
    }
    async createForgotPasswordToken(identifier, tenantCode) {
        const tenant = await this.tenantService.findByCode(tenantCode);
        if (!tenant) {
            throw new common_1.UnauthorizedException('Tenant not found');
        }
        let user = null;
        if (identifier && (0, class_validator_1.isPhoneNumber)(identifier, 'VN')) {
            user = await this.userService.findByPhoneNumber(identifier, tenant._id);
        }
        else if (identifier && identifier.includes('@')) {
            user = await this.userService.findByEmail(identifier.toLowerCase().trim(), tenant._id);
        }
        if (!user)
            return { ok: true };
        const pwdFinger = crypto.createHash('sha256').update(user.password).digest('hex');
        const payload = {
            sub: user._id,
            v: user.resetTokenVersion ?? 0,
            pf: pwdFinger,
            tenantId: user.tenantId?.toString(),
        };
        const token = await this.resetJwt.signAsync(payload);
        return token;
    }
    async resetPassword(token, newPassword) {
        let decoded;
        try {
            decoded = await this.resetJwt.verifyAsync(token);
        }
        catch {
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
        const user = await this.userService.findById(new mongoose_1.Types.ObjectId(decoded.sub), new mongoose_1.Types.ObjectId(decoded.tenantId));
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if ((user.resetTokenVersion ?? 0) !== decoded.v) {
            throw new common_1.UnauthorizedException('Token has been revoked');
        }
        const currentFinger = crypto.createHash('sha256').update(user.password).digest('hex');
        if (currentFinger !== decoded.pf) {
            throw new common_1.UnauthorizedException('Token invalid due to password change');
        }
        const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS ?? 10);
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        user.resetTokenVersion = (user.resetTokenVersion ?? 0) + 1;
        await this.userService.updateUserField(user._id, 'resetTokenVersion', user.resetTokenVersion, user.tenantId);
        await this.userService.updateUserField(user._id, 'password', hashedPassword, user.tenantId);
        return { ok: true };
    }
    async logout(userId, tenantId) {
        const user = await this.userService.findById(userId, tenantId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const newTokenVersion = (user.tokenVersion ?? 0) + 1;
        await this.userService.updateUserField(userId, 'tokenVersion', newTokenVersion, tenantId);
        return { ok: true };
    }
    async forceLogoutUser(userId, tenantId) {
        const user = await this.userService.findById(userId, tenantId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const newTokenVersion = (user.tokenVersion ?? 0) + 1;
        await this.userService.updateUserField(userId, 'tokenVersion', newTokenVersion, tenantId);
        return { ok: true, message: `User ${user.name} has been logged out` };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => tenant_service_1.TenantService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_rescue_service_1.AuthRescueService))),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => settings_service_1.SettingsService))),
    __param(5, (0, common_1.Inject)('RESET_JWT')),
    __metadata("design:paramtypes", [user_service_1.UserService,
        tenant_service_1.TenantService,
        auth_rescue_service_1.AuthRescueService,
        settings_service_1.SettingsService,
        jwt_1.JwtService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
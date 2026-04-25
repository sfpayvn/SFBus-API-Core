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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRescueService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const auth_rescue_schema_1 = require("./schema/auth-rescue.schema");
let AuthRescueService = class AuthRescueService {
    constructor(authRescueModel) {
        this.authRescueModel = authRescueModel;
        this.MAX_ATTEMPTS = 5;
        this.LOCK_MINUTES = 10;
        this.TOKEN_LENGTH = 6;
        this.TOKEN_TTL_MINUTES = 5;
    }
    generateNumericToken(len, purpose = '2fa') {
        const digits = Array.from(crypto.getRandomValues(new Uint32Array(len)))
            .map((n) => (n % 10).toString())
            .join('');
        return digits;
    }
    async requestAuthRescue(identifier, purpose, tenantId) {
        const tokenPlain = this.generateNumericToken(this.TOKEN_LENGTH);
        const tokenHashed = (0, auth_rescue_schema_1.hashToken)(tokenPlain);
        const expiresAt = new Date(Date.now() + this.TOKEN_TTL_MINUTES * 60 * 1000);
        await this.authRescueModel
            .deleteMany({
            tenantId,
            identifier,
            purpose,
            consumed: false,
        })
            .exec();
        await this.authRescueModel.create({
            tenantId,
            identifier,
            purpose,
            tokenHash: tokenHashed,
            expiresAt,
            attempts: 0,
            consumed: false,
        });
        return { expiresAt, debugToken: tokenPlain };
    }
    async verifyAuthRescue(identifier, purpose, token, tenantId) {
        const rec = await this.authRescueModel
            .findOne({
            tenantId,
            identifier,
            purpose,
            consumed: false,
        })
            .sort({ createdAt: -1 })
            .exec();
        if (!rec) {
            throw new common_1.BadRequestException('OTP not found or already used');
        }
        const now = new Date();
        if (rec.lockedUntil && rec.lockedUntil > now) {
            throw new common_1.ForbiddenException(`Too many attempts. Try again after ${rec.lockedUntil.toISOString()}`);
        }
        if (rec.expiresAt <= now) {
            await this.authRescueModel.deleteOne({ _id: rec._id }).lean().exec();
            throw new common_1.BadRequestException('OTP expired');
        }
        const isMatch = rec.tokenHash === (0, auth_rescue_schema_1.hashToken)(token);
        if (!isMatch) {
            rec.attempts += 1;
            if (rec.attempts >= this.MAX_ATTEMPTS) {
                rec.lockedUntil = new Date(now.getTime() + this.LOCK_MINUTES * 60 * 1000);
            }
            await rec.save();
            throw new common_1.BadRequestException('OTP invalid');
        }
        rec.consumed = true;
        await rec.save();
        return true;
    }
    async checkOtpAlreadyVerified(identifier, purpose, token, tenantId) {
        const rec = await this.authRescueModel
            .findOne({
            tenantId,
            identifier,
            purpose,
            consumed: true,
        })
            .sort({ createdAt: -1 })
            .exec();
        if (!rec) {
            return false;
        }
        const now = new Date();
        if (rec.expiresAt <= now) {
            return false;
        }
        const isMatch = rec.tokenHash === (0, auth_rescue_schema_1.hashToken)(token);
        return isMatch;
    }
};
exports.AuthRescueService = AuthRescueService;
exports.AuthRescueService = AuthRescueService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(auth_rescue_schema_1.AuthRescueDocument.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AuthRescueService);
//# sourceMappingURL=auth-rescue.service.js.map
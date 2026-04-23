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
exports.UpdateAuditFieldsInterceptor = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
let UpdateAuditFieldsInterceptor = class UpdateAuditFieldsInterceptor {
    constructor(options = { updateCreatedBy: true, updateUpdatedBy: true }) {
        this.options = options;
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const body = request.body;
        if (user && user._id && body) {
            const userId = user._id;
            if (Array.isArray(body)) {
                request.body = body.map((item) => this.updateAuditFields(item, userId));
            }
            else {
                request.body = this.updateAuditFields(body, userId);
            }
        }
        return next.handle();
    }
    updateAuditFields(obj, userId) {
        if (!obj || typeof obj !== 'object') {
            return obj;
        }
        if (this.options.updateCreatedBy) {
            obj.createdBy = userId;
        }
        if (this.options.updateUpdatedBy) {
            obj.updatedBy = userId;
        }
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const value = obj[key];
                if (Array.isArray(value)) {
                    obj[key] = value.map((item) => {
                        if (typeof item === 'object' && item !== null) {
                            return this.updateAuditFields(item, userId);
                        }
                        return item;
                    });
                }
                else if (value && typeof value === 'object' && !(value instanceof mongoose_1.Types.ObjectId) && !(value instanceof Date)) {
                    obj[key] = this.updateAuditFields(value, userId);
                }
            }
        }
        return obj;
    }
};
exports.UpdateAuditFieldsInterceptor = UpdateAuditFieldsInterceptor;
exports.UpdateAuditFieldsInterceptor = UpdateAuditFieldsInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], UpdateAuditFieldsInterceptor);
//# sourceMappingURL=update-audit-fields.interceptor.js.map
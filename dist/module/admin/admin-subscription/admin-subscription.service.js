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
exports.AdminSubscriptionService = void 0;
const common_1 = require("@nestjs/common");
const subscription_service_1 = require("../../core/subscription/subscription.service");
let AdminSubscriptionService = class AdminSubscriptionService {
    constructor(subscriptionService) {
        this.subscriptionService = subscriptionService;
    }
    create(createSubscriptionDto) {
        return this.subscriptionService.create(createSubscriptionDto);
    }
    update(updateSubscriptionDto) {
        return this.subscriptionService.update(updateSubscriptionDto);
    }
    delete(id) {
        return this.subscriptionService.delete(id);
    }
    findAllAvailable() {
        return this.subscriptionService.findAllAvailable();
    }
    findAll() {
        return this.subscriptionService.findAll();
    }
    findOne(id) {
        return this.subscriptionService.findOne(id);
    }
    async search(pageIdx, pageSize, keyword, sortBy, filters) {
        return this.subscriptionService.search(pageIdx, pageSize, keyword, sortBy, filters);
    }
};
exports.AdminSubscriptionService = AdminSubscriptionService;
exports.AdminSubscriptionService = AdminSubscriptionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [subscription_service_1.SubscriptionService])
], AdminSubscriptionService);
//# sourceMappingURL=admin-subscription.service.js.map
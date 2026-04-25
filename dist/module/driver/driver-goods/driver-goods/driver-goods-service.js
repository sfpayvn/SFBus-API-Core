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
exports.DriverGoodsService = void 0;
const goods_schema_1 = require("../../../core/goods/goods/schema/goods.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const nanoid_1 = require("nanoid");
const goods_service_1 = require("../../../core/goods/goods/goods-service");
const status_constants_1 = require("../../../../common/constants/status.constants");
const tracking_types_1 = require("../../../core/tracking/constants/tracking-types");
const driver_tracking_service_1 = require("../../driver-tracking/driver-tracking.service");
const roles_constants_1 = require("../../../../common/constants/roles.constants");
let DriverGoodsService = class DriverGoodsService {
    constructor(goodsModel, goodsService, driverTrackingService) {
        this.goodsModel = goodsModel;
        this.goodsService = goodsService;
        this.driverTrackingService = driverTrackingService;
        this.alphabet = process.env.ALPHABET || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        this.nanoid = (0, nanoid_1.customAlphabet)(this.alphabet, 6);
    }
    async findAllGoodsForBusSchedule(busScheduleId, tenantId) {
        const filters = [];
        const filterByStatus = {
            key: 'status',
            value: [
                status_constants_1.GOODS_STATUS.PENDING,
                status_constants_1.GOODS_STATUS.ON_BOARD,
                status_constants_1.GOODS_STATUS.ARRIVED_FINAL_STATION,
                status_constants_1.GOODS_STATUS.OUT_FOR_DELIVERY,
                status_constants_1.GOODS_STATUS.COMPLETED,
            ],
        };
        filters.push(filterByStatus);
        return this.goodsService.findAllGoodsForBusSchedule(busScheduleId, tenantId, filters);
    }
    async findOne(id, tenantId) {
        return this.goodsService.findOne(id, tenantId);
    }
    async updateGoodsScheduleBoarding(driverRequestUpdateGoodsBoardingDto, tenantId, updatedBy) {
        const goodses = await this.goodsService.updatesGoodsBoarding(driverRequestUpdateGoodsBoardingDto, tenantId);
        for (const goodsDto of goodses) {
            await this.driverTrackingService.create({
                type: tracking_types_1.TRACKING_TYPES.GOODS_BOARDING,
                platform: roles_constants_1.ROLE_CONSTANTS.POS,
                metadata: {
                    goodsId: goodsDto._id,
                    goodsName: goodsDto.name,
                    busRouteId: goodsDto.busRouteId,
                    busScheduleId: goodsDto.busScheduleId,
                    status: goodsDto.status,
                },
                createdBy: updatedBy,
            }, tenantId);
        }
        return goodses;
    }
};
exports.DriverGoodsService = DriverGoodsService;
exports.DriverGoodsService = DriverGoodsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(goods_schema_1.GoodsDocument.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => goods_service_1.GoodsService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => driver_tracking_service_1.DriverTrackingService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        goods_service_1.GoodsService,
        driver_tracking_service_1.DriverTrackingService])
], DriverGoodsService);
//# sourceMappingURL=driver-goods-service.js.map
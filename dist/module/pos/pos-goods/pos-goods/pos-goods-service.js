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
exports.PosGoodsService = void 0;
const goods_schema_1 = require("../../../core/goods/goods/schema/goods.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const nanoid_1 = require("nanoid");
const goods_service_1 = require("../../../core/goods/goods/goods-service");
const pos_tracking_service_1 = require("../../pos-tracking/pos-tracking.service");
const tracking_types_1 = require("../../../core/tracking/constants/tracking-types");
const status_constants_1 = require("../../../../common/constants/status.constants");
const roles_constants_1 = require("../../../../common/constants/roles.constants");
let PosGoodsService = class PosGoodsService {
    constructor(goodsModel, goodsService, posTrackingService) {
        this.goodsModel = goodsModel;
        this.goodsService = goodsService;
        this.posTrackingService = posTrackingService;
        this.alphabet = process.env.ALPHABET || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        this.nanoid = (0, nanoid_1.customAlphabet)(this.alphabet, 6);
    }
    async create(PosCreateGoodsDto, tenantId, createdBy) {
        const goodsDto = await this.goodsService.create(PosCreateGoodsDto, tenantId);
        await this.posTrackingService.create({
            type: tracking_types_1.TRACKING_TYPES.GOODS_CREATED,
            platform: roles_constants_1.ROLE_CONSTANTS.POS,
            metadata: {
                goodsId: goodsDto._id,
                goodsName: goodsDto.name,
                busRouteId: goodsDto.busRouteId,
                busScheduleId: goodsDto.busScheduleId,
            },
            createdBy: createdBy,
        }, tenantId);
        return goodsDto;
    }
    async update(PosUpdateGoodsDto, tenantId, updatedBy) {
        const goodsDto = await this.goodsService.update(PosUpdateGoodsDto, tenantId);
        const changes = this.prepareChanges(PosUpdateGoodsDto, goodsDto._oldData);
        await this.posTrackingService.create({
            type: tracking_types_1.TRACKING_TYPES.GOODS_UPDATED,
            platform: roles_constants_1.ROLE_CONSTANTS.POS,
            metadata: {
                goodsId: goodsDto._id,
                goodsName: goodsDto.name,
                busRouteId: goodsDto.busRouteId,
                busScheduleId: goodsDto.busScheduleId,
                oldValue: goodsDto._oldData ? JSON.stringify(goodsDto._oldData) : null,
                newValue: JSON.stringify(goodsDto),
                changes: JSON.stringify(changes),
                updatedFields: Object.keys(changes),
            },
            createdBy: updatedBy,
        }, tenantId);
        if (goodsDto && goodsDto._oldData)
            delete goodsDto._oldData;
        return goodsDto;
    }
    async updates(PosUpdateGoodsDto, tenantId, updatedBy) {
        const goodsesDto = await this.goodsService.updates(PosUpdateGoodsDto, tenantId);
        for (const goodsDto of goodsesDto) {
            const changes = this.prepareChanges(goodsDto, goodsDto._oldData);
            await this.posTrackingService.create({
                type: tracking_types_1.TRACKING_TYPES.GOODS_UPDATED,
                platform: roles_constants_1.ROLE_CONSTANTS.POS,
                metadata: {
                    goodsId: goodsDto._id,
                    goodsName: goodsDto.name,
                    busRouteId: goodsDto.busRouteId,
                    busScheduleId: goodsDto.busScheduleId,
                    oldValue: goodsDto._oldData ? JSON.stringify(goodsDto._oldData) : null,
                    newValue: JSON.stringify(goodsDto),
                    changes: changes ? JSON.stringify(changes) : null,
                    updatedFields: changes ? Object.keys(changes) : [],
                },
                createdBy: updatedBy,
            }, tenantId);
            if (goodsDto && goodsDto._oldData)
                delete goodsDto._oldData;
        }
        return goodsesDto;
    }
    async remove(id, tenantId, deletedBy) {
        const goodsDto = await this.goodsService.remove(id, tenantId);
        await this.posTrackingService.create({
            type: tracking_types_1.TRACKING_TYPES.GOODS_DELETED,
            platform: roles_constants_1.ROLE_CONSTANTS.POS,
            metadata: {},
            createdBy: deletedBy,
        }, tenantId);
        return goodsDto;
    }
    async findAll(tenantId) {
        return this.goodsService.findAll(tenantId);
    }
    async findOne(id, tenantId) {
        return this.goodsService.findOne(id, tenantId);
    }
    async findAllGoodsForBusSchedule(busScheduleId, tenantId) {
        return this.goodsService.findAllGoodsForBusSchedule(busScheduleId, tenantId);
    }
    async findAllGoodsAvailable(busRouteId, tenantId) {
        const filters = [];
        const filterByStatus = {
            key: 'status',
            value: [status_constants_1.GOODS_STATUS.NEW],
        };
        filters.push(filterByStatus);
        return this.goodsService.findAllGoodsAvailable(busRouteId, tenantId, filters);
    }
    async searchGoodsPaging(pageIdx, pageSize, keyword, sortBy, filters, tenantId) {
        return this.goodsService.searchGoodsPaging(pageIdx, pageSize, keyword, sortBy, filters, tenantId);
    }
    async updatesGoodsScheduleAssignment(posRequestUpdateGoodsScheduleAssignmentDto, tenantId, updatedBy) {
        const goodses = await this.goodsService.updatesGoodsScheduleAssignment(posRequestUpdateGoodsScheduleAssignmentDto, tenantId);
        for (const goodsDto of goodses) {
            await this.posTrackingService.create({
                type: tracking_types_1.TRACKING_TYPES.GOODS_ASSIGNMENT,
                platform: roles_constants_1.ROLE_CONSTANTS.POS,
                metadata: {
                    goodsId: goodsDto._id,
                    goodsName: goodsDto.name,
                    busRouteId: goodsDto.busRouteId,
                    busScheduleId: goodsDto.busScheduleId,
                },
                createdBy: updatedBy,
            }, tenantId);
        }
        return goodses;
    }
    prepareChanges(updateDto, oldData) {
        const changes = {};
        Object.keys(updateDto).forEach((key) => {
            if (key !== '_id' && oldData && oldData[key] !== undefined) {
                const oldValue = oldData[key];
                const newValue = updateDto[key];
                if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
                    changes[key] = {
                        oldValue,
                        newValue,
                    };
                }
            }
        });
        return changes;
    }
};
exports.PosGoodsService = PosGoodsService;
exports.PosGoodsService = PosGoodsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(goods_schema_1.GoodsDocument.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => goods_service_1.GoodsService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => pos_tracking_service_1.PosTrackingService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        goods_service_1.GoodsService,
        pos_tracking_service_1.PosTrackingService])
], PosGoodsService);
//# sourceMappingURL=pos-goods-service.js.map
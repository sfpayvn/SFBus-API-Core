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
exports.GoodsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const goods_schema_1 = require("./schema/goods.schema");
const nanoid_1 = require("nanoid");
const goods_dto_1 = require("./dto/goods.dto");
const class_transformer_1 = require("class-transformer");
const goods_category_service_1 = require("../good-category/goods-category-service");
const bus_schedule_schema_1 = require("../../bus/bus-schedule/schema/bus-schedule.schema");
const bus_route_schema_1 = require("../../bus/bus-route/schema/bus-route.schema");
const goods__categoryschema_1 = require("../good-category/schema/goods.-categoryschema");
const bus_schedule_service_1 = require("../../bus/bus-schedule/bus-schedule.service");
const good_gateway_1 = require("./good.gateway");
const file_service_1 = require("../../file/file/file.service");
const payment_service_1 = require("../../payment/payment-service");
const status_constants_1 = require("../../../../common/constants/status.constants");
const utils_1 = require("../../../../utils/utils");
const goods_types_1 = require("../types/goods.types");
const bus_route_service_1 = require("../../bus/bus-route/bus-route.service");
let GoodsService = class GoodsService {
    constructor(goodsModel, busScheduleService, busRouteService, goodsCategoryService, fileService, paymentService, goodsGateway) {
        this.goodsModel = goodsModel;
        this.busScheduleService = busScheduleService;
        this.busRouteService = busRouteService;
        this.goodsCategoryService = goodsCategoryService;
        this.fileService = fileService;
        this.paymentService = paymentService;
        this.goodsGateway = goodsGateway;
        this.alphabet = process.env.ALPHABET || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        this.nanoid = (0, nanoid_1.customAlphabet)(this.alphabet, 6);
        this.rootTenantId = new mongoose_2.Types.ObjectId(process.env.ROOT_TENANT_ID || '000000000000000000000000');
        this.watchChanges();
    }
    buildEventForStatus(status, scheduleId, note) {
        if (!status)
            return null;
        return { type: status, scheduleId: scheduleId || null, note: note || '', createdAt: new Date() };
    }
    async watchChanges() {
        try {
            const changeStream = this.goodsModel.watch();
            changeStream.on('change', async (nodeChange) => {
                try {
                    if (!['insert', 'update', 'replace'].includes(nodeChange.operationType)) {
                        return;
                    }
                    const _id = nodeChange.documentKey._id;
                    const goodsDocument = await this.goodsModel
                        .findById(_id)
                        .populate({ path: 'busSchedule', model: bus_schedule_schema_1.BusScheduleDocument.name })
                        .populate({ path: 'busRoute', model: bus_route_schema_1.BusRouteDocument.name })
                        .populate({ path: 'categories', model: goods__categoryschema_1.GoodsCategoryDocument.name })
                        .lean()
                        .exec();
                    if (!goodsDocument) {
                        return;
                    }
                    const goods = (0, class_transformer_1.plainToInstance)(goods_dto_1.GoodsDto, goodsDocument);
                    this.goodsGateway.goodsChangeOfBusRouteId(goods, goods.busRouteId);
                }
                catch (innerError) {
                    console.error('Lỗi khi xử lý change event:', innerError);
                }
            });
        }
        catch (error) {
            console.error('Lỗi khi theo dõi thay đổi:', error);
        }
    }
    async create(createGoodsDto, tenantId) {
        createGoodsDto.goodsNumber = this.generateGoodsNumber();
        await this.renameGoodsImages(createGoodsDto.imageIds, createGoodsDto.goodsNumber, tenantId);
        const totalPrice = createGoodsDto.shippingCost + createGoodsDto.cod;
        if (totalPrice <= 0) {
            createGoodsDto.paymentStatus = 'paid';
        }
        const goodsEvent = {
            type: goods_types_1.GOODS_EVENT_TYPES.CREATED,
            stationId: createGoodsDto.currentStationId,
            scheduleId: createGoodsDto.busScheduleId,
            createdAt: new Date(),
        };
        createGoodsDto.events = [goodsEvent];
        const goods = await this.goodsModel.create({ ...createGoodsDto, tenantId, status: status_constants_1.GOODS_STATUS.NEW });
        const goodsDto = (0, class_transformer_1.plainToInstance)(goods_dto_1.GoodsDto, goods.toObject()) || null;
        await this.mapGoodsImageUrl([goodsDto]);
        return goodsDto;
    }
    async findAll(tenantId) {
        const rootTenantIdObjectId = (0, utils_1.toObjectId)(this.rootTenantId);
        const goods = await this.goodsModel
            .find({ tenantId })
            .populate({
            path: 'busSchedule',
            model: bus_schedule_schema_1.BusScheduleDocument.name,
            match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
        })
            .populate({
            path: 'busRoute',
            model: bus_route_schema_1.BusRouteDocument.name,
            match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
        })
            .populate({
            path: 'categories',
            model: goods__categoryschema_1.GoodsCategoryDocument.name,
            match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
        })
            .lean()
            .exec();
        return ((0, class_transformer_1.plainToInstance)(goods_dto_1.GoodsDto, goods.map((good) => good)) || null);
    }
    async findOne(id, tenantId) {
        const query = { _id: id };
        if (tenantId) {
            query.tenantId = tenantId;
        }
        const rootTenantIdObjectId = (0, utils_1.toObjectId)(this.rootTenantId);
        const goods = await this.goodsModel
            .findOne(query)
            .populate({
            path: 'busSchedule',
            model: bus_schedule_schema_1.BusScheduleDocument.name,
            match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
        })
            .populate({
            path: 'busRoute',
            model: bus_route_schema_1.BusRouteDocument.name,
            match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
        })
            .populate({
            path: 'categories',
            model: goods__categoryschema_1.GoodsCategoryDocument.name,
            match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
        })
            .lean()
            .exec();
        if (!goods) {
            throw new common_1.NotFoundException('goods not found.');
        }
        const goodsDto = (0, class_transformer_1.plainToInstance)(goods_dto_1.GoodsDto, goods) || null;
        await this.mapGoodsImageUrl([goodsDto]);
        return goodsDto;
    }
    async findAllGoodsForBusSchedule(busScheduleId, tenantId, filters) {
        const match = { busScheduleId, tenantId };
        const ands = [];
        if (filters && Array.isArray(filters)) {
            for (const { key, value } of filters) {
                ands.push((0, utils_1.processFilterValue)(key, value));
            }
        }
        if (ands.length)
            match.$and = ands;
        const pipeline = [{ $match: match }];
        const items = await this.goodsModel.aggregate(pipeline).exec();
        const rootTenantIdObjectId = (0, utils_1.toObjectId)(this.rootTenantId);
        const categories = await this.goodsCategoryService.findByIds(items.flatMap((good) => good.categoriesIds), [tenantId, rootTenantIdObjectId]);
        const goodses = (0, class_transformer_1.plainToInstance)(goods_dto_1.GoodsDto, items.map((good) => ({
            ...good,
            categories: categories.filter((category) => good.categoriesIds.includes(category._id)),
        }))) || null;
        await this.mapGoodsImageUrl(goodses);
        return goodses;
    }
    async findAllGoodsAvailable(busRouteId, tenantId, filters) {
        const match = {
            $and: [
                { tenantId },
                {
                    $or: [
                        {
                            $and: [{ busRouteId: busRouteId }],
                        },
                        {
                            busRouteId: '',
                        },
                    ],
                },
            ],
        };
        const ands = [];
        if (filters && Array.isArray(filters)) {
            for (const { key, value } of filters) {
                ands.push((0, utils_1.processFilterValue)(key, value));
            }
        }
        if (ands.length) {
            match.$and.push(...ands);
        }
        const pipeline = [{ $match: match }];
        const items = await this.goodsModel.aggregate(pipeline).exec();
        const rootTenantIdObjectId = (0, utils_1.toObjectId)(this.rootTenantId);
        const categories = await this.goodsCategoryService.findByIds(items.flatMap((good) => good.categoriesIds), [tenantId, rootTenantIdObjectId]);
        const goodses = (0, class_transformer_1.plainToInstance)(goods_dto_1.GoodsDto, items.map((good) => ({
            ...good,
            categories: categories.filter((category) => good.categoriesIds.includes(category._id)),
        }))) || null;
        await this.mapGoodsImageUrl(goodses);
        return goodses;
    }
    async findAllByBookingGroupNumber(goodsNumber, tenantId) {
        const rootTenantIdObjectId = (0, utils_1.toObjectId)(this.rootTenantId);
        const goodses = await this.goodsModel
            .findOne({ goodsNumber, tenantId })
            .populate({
            path: 'busSchedule',
            model: bus_schedule_schema_1.BusScheduleDocument.name,
            match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
        })
            .populate({
            path: 'busRoute',
            model: bus_route_schema_1.BusRouteDocument.name,
            match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
        })
            .populate({
            path: 'categories',
            model: goods__categoryschema_1.GoodsCategoryDocument.name,
            match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
        })
            .lean()
            .exec();
        return (0, class_transformer_1.plainToInstance)(goods_dto_1.GoodsDto, goodses);
    }
    async update(updateGoodsDto, tenantId) {
        const rootTenantIdObjectId = (0, utils_1.toObjectId)(this.rootTenantId);
        const goodsDocument = await this.goodsModel
            .findOne({ _id: updateGoodsDto._id, tenantId })
            .populate({
            path: 'busSchedule',
            model: bus_schedule_schema_1.BusScheduleDocument.name,
            match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
        })
            .populate({
            path: 'busRoute',
            model: bus_route_schema_1.BusRouteDocument.name,
            match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
        })
            .populate({
            path: 'categories',
            model: goods__categoryschema_1.GoodsCategoryDocument.name,
            match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
        })
            .exec();
        if (!goodsDocument) {
            throw new common_1.NotFoundException('Goods not found');
        }
        const oldData = goodsDocument.toObject();
        await this.determineAndSetPaymentStatus(updateGoodsDto, goodsDocument, tenantId);
        try {
            const oldScheduleId = oldData.busScheduleId ? oldData.busScheduleId.toString() : null;
            const newScheduleId = updateGoodsDto.busScheduleId ? updateGoodsDto.busScheduleId.toString() : null;
            if (oldScheduleId !== newScheduleId) {
                goodsDocument.events = goodsDocument.events || [];
                const assignStatus = newScheduleId ? status_constants_1.GOODS_STATUS.PENDING : status_constants_1.GOODS_STATUS.NEW;
                goodsDocument.events.push(this.buildEventForStatus(assignStatus, updateGoodsDto.busScheduleId));
            }
            if (updateGoodsDto.status && updateGoodsDto.status !== oldData.status) {
                goodsDocument.events = goodsDocument.events || [];
                goodsDocument.events.push(this.buildEventForStatus(updateGoodsDto.status, (updateGoodsDto.busScheduleId || goodsDocument.busScheduleId) ?? undefined));
            }
        }
        catch (err) {
        }
        if (updateGoodsDto.imageIds) {
            const oldImageIds = goodsDocument.imageIds || [];
            await this.handleImageUpdates(oldImageIds, updateGoodsDto.imageIds, goodsDocument.goodsNumber, tenantId);
        }
        await this.determineAndSetPaymentStatus(updateGoodsDto, goodsDocument, tenantId);
        Object.assign(goodsDocument, updateGoodsDto);
        const saved = await goodsDocument.save();
        const result = (0, class_transformer_1.plainToInstance)(goods_dto_1.GoodsDto, saved.toObject());
        await this.mapGoodsImageUrl([result]);
        result._oldData = oldData;
        return result;
    }
    async updates(updateGoodsDto, tenantId) {
        const updatePromises = await Promise.all(updateGoodsDto.map(async (dto) => {
            const rootTenantIdObjectId = (0, utils_1.toObjectId)(this.rootTenantId);
            const goodsDocument = await this.goodsModel
                .findOne({ _id: dto._id, tenantId })
                .populate({
                path: 'busSchedule',
                model: bus_schedule_schema_1.BusScheduleDocument.name,
                match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
            })
                .populate({
                path: 'busRoute',
                model: bus_route_schema_1.BusRouteDocument.name,
                match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
            })
                .populate({
                path: 'categories',
                model: goods__categoryschema_1.GoodsCategoryDocument.name,
                match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
            })
                .exec();
            if (!goodsDocument) {
                throw new common_1.NotFoundException('Goods not found');
            }
            const oldData = goodsDocument.toObject();
            await this.determineAndSetPaymentStatus(dto, goodsDocument, tenantId);
            try {
                const oldScheduleId = oldData.busScheduleId ? oldData.busScheduleId.toString() : null;
                const newScheduleId = dto.busScheduleId ? dto.busScheduleId.toString() : null;
                if (oldScheduleId !== newScheduleId) {
                    goodsDocument.events = goodsDocument.events || [];
                    const assignStatus = newScheduleId ? status_constants_1.GOODS_STATUS.PENDING : status_constants_1.GOODS_STATUS.NEW;
                    goodsDocument.events.push(this.buildEventForStatus(assignStatus, dto.busScheduleId));
                }
                if (dto.status && dto.status !== oldData.status) {
                    goodsDocument.events = goodsDocument.events || [];
                    goodsDocument.events.push(this.buildEventForStatus(dto.status, (dto.busScheduleId || goodsDocument.busScheduleId) ?? undefined));
                }
            }
            catch (err) {
            }
            if (dto.imageIds) {
                const oldImageIds = goodsDocument.imageIds || [];
                await this.handleImageUpdates(oldImageIds, dto.imageIds, goodsDocument.goodsNumber, tenantId);
            }
            Object.assign(goodsDocument, dto);
            const saved = await goodsDocument.save();
            const result = (0, class_transformer_1.plainToInstance)(goods_dto_1.GoodsDto, saved.toObject());
            result._oldData = oldData;
            return result;
        }));
        await this.mapGoodsImageUrl(updatePromises);
        return updatePromises;
    }
    async updatePaymentGoodsStatus(updateGoodsDto, tenantId) {
        const rootTenantIdObjectId = (0, utils_1.toObjectId)(this.rootTenantId);
        const goodsDocument = await this.goodsModel
            .findOne({ _id: updateGoodsDto._id || updateGoodsDto._id, tenantId })
            .populate({
            path: 'busSchedule',
            model: bus_schedule_schema_1.BusScheduleDocument.name,
            match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
        })
            .populate({
            path: 'busRoute',
            model: bus_route_schema_1.BusRouteDocument.name,
            match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
        })
            .populate({
            path: 'categories',
            model: goods__categoryschema_1.GoodsCategoryDocument.name,
            match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
        })
            .exec();
        if (!goodsDocument) {
            throw new common_1.NotFoundException('Goods not found');
        }
        const oldData = goodsDocument.toObject();
        Object.assign(goodsDocument, updateGoodsDto);
        const saved = await goodsDocument.save();
        const result = (0, class_transformer_1.plainToInstance)(goods_dto_1.GoodsDto, saved.toObject());
        result._oldData = oldData;
        await this.mapGoodsImageUrl([result]);
        return result;
    }
    async updatesGoodsScheduleAssignment(requestUpdateGoodsScheduleAssignmentDto, tenantId) {
        const rootTenantIdObjectId = (0, utils_1.toObjectId)(this.rootTenantId);
        const allIds = requestUpdateGoodsScheduleAssignmentDto.flatMap((d) => d.goodsIds || []);
        if (!allIds || allIds.length === 0) {
            return [];
        }
        const oldDocs = await this.goodsModel
            .find({ _id: { $in: allIds }, tenantId })
            .lean()
            .exec();
        if (!oldDocs || oldDocs.length === 0) {
            throw new common_1.NotFoundException('Goods not found');
        }
        for (const dto of requestUpdateGoodsScheduleAssignmentDto) {
            const ids = dto.goodsIds || [];
            const busScheduleId = dto.busScheduleId;
            if (!ids || ids.length === 0)
                continue;
            if (!busScheduleId) {
                const ev = this.buildEventForStatus(status_constants_1.GOODS_STATUS.NEW, undefined);
                await this.goodsModel.updateMany({ _id: { $in: ids }, tenantId }, {
                    $set: { busScheduleId: null, status: status_constants_1.GOODS_STATUS.NEW, currentStationId: dto.currentStationId },
                    $push: { events: ev },
                });
            }
            else {
                const ev = this.buildEventForStatus(status_constants_1.GOODS_STATUS.PENDING, busScheduleId);
                await this.goodsModel.updateMany({ _id: { $in: ids }, tenantId }, {
                    $set: {
                        busScheduleId: busScheduleId,
                        status: status_constants_1.GOODS_STATUS.PENDING,
                        currentStationId: dto.currentStationId,
                    },
                    $push: { events: ev },
                });
            }
        }
        const updatedDocs = await this.goodsModel
            .find({ _id: { $in: allIds }, tenantId })
            .populate({
            path: 'busSchedule',
            model: bus_schedule_schema_1.BusScheduleDocument.name,
            match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
        })
            .populate({
            path: 'busRoute',
            model: bus_route_schema_1.BusRouteDocument.name,
            match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
        })
            .populate({
            path: 'categories',
            model: goods__categoryschema_1.GoodsCategoryDocument.name,
            match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
        })
            .lean()
            .exec();
        const oldById = new Map();
        for (const o of oldDocs)
            oldById.set(o._id.toString(), o);
        const updatedById = new Map();
        for (const u of updatedDocs)
            updatedById.set(u._id.toString(), u);
        const results = [];
        for (const dto of requestUpdateGoodsScheduleAssignmentDto) {
            for (const id of dto.goodsIds || []) {
                const idStr = id.toString();
                const updated = updatedById.get(idStr);
                const oldData = oldById.get(idStr) || null;
                if (!updated)
                    continue;
                const res = (0, class_transformer_1.plainToInstance)(goods_dto_1.GoodsDto, updated);
                res._oldData = oldData;
                results.push(res);
            }
        }
        await this.mapGoodsImageUrl(results);
        return results;
    }
    async updatesGoodsBoarding(requestUpdateGoodsScheduleBoardingDto, tenantId) {
        const rootTenantIdObjectId = (0, utils_1.toObjectId)(this.rootTenantId);
        const goodsIds = requestUpdateGoodsScheduleBoardingDto.goodsIds;
        const oldDocs = await this.goodsModel
            .find({ _id: { $in: goodsIds }, tenantId, busScheduleId: requestUpdateGoodsScheduleBoardingDto.busScheduleId })
            .lean()
            .exec();
        if (!oldDocs || oldDocs.length === 0) {
            throw new common_1.NotFoundException('Goods not found');
        }
        const pushEvent = this.buildEventForStatus(requestUpdateGoodsScheduleBoardingDto.status, requestUpdateGoodsScheduleBoardingDto.busScheduleId);
        await this.goodsModel.updateMany({ _id: { $in: goodsIds }, tenantId, busScheduleId: requestUpdateGoodsScheduleBoardingDto.busScheduleId }, {
            $set: {
                status: requestUpdateGoodsScheduleBoardingDto.status,
                currentStationId: requestUpdateGoodsScheduleBoardingDto.currentStationId,
            },
            $push: { events: pushEvent },
        });
        const updatedDocs = await this.goodsModel
            .find({ _id: { $in: goodsIds }, tenantId })
            .populate({
            path: 'busSchedule',
            model: bus_schedule_schema_1.BusScheduleDocument.name,
            match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
        })
            .populate({
            path: 'busRoute',
            model: bus_route_schema_1.BusRouteDocument.name,
            match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
        })
            .populate({
            path: 'categories',
            model: goods__categoryschema_1.GoodsCategoryDocument.name,
            match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
        })
            .lean()
            .exec();
        const oldById = new Map();
        for (const o of oldDocs)
            oldById.set(o._id.toString(), o);
        const updatedById = new Map();
        for (const u of updatedDocs)
            updatedById.set(u._id.toString(), u);
        const results = [];
        for (const id of goodsIds) {
            const idStr = id.toString();
            const updated = updatedById.get(idStr);
            const oldData = oldById.get(idStr) || null;
            if (!updated)
                continue;
            const dto = (0, class_transformer_1.plainToInstance)(goods_dto_1.GoodsDto, updated);
            dto._oldData = oldData;
            results.push(dto);
        }
        await this.mapGoodsImageUrl(results);
        return results;
    }
    updatesGoodsStatus(goodsIds, status, tenantId) {
        const updatePromises = goodsIds.map(async (id) => {
            const rootTenantIdObjectId = (0, utils_1.toObjectId)(this.rootTenantId);
            const goodsDocument = await this.goodsModel
                .findOne({ _id: id, tenantId })
                .populate({
                path: 'busSchedule',
                model: bus_schedule_schema_1.BusScheduleDocument.name,
                match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
            })
                .populate({
                path: 'busRoute',
                model: bus_route_schema_1.BusRouteDocument.name,
                match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
            })
                .populate({
                path: 'categories',
                model: goods__categoryschema_1.GoodsCategoryDocument.name,
                match: { tenantId: { $in: [tenantId, rootTenantIdObjectId] } },
            })
                .exec();
            if (!goodsDocument) {
                throw new common_1.NotFoundException(`Goods with id ${id} not found`);
            }
            goodsDocument.events = goodsDocument.events || [];
            goodsDocument.events.push(this.buildEventForStatus(status, goodsDocument.busScheduleId ?? undefined));
            goodsDocument.status = status;
            const updatedGoods = await goodsDocument.save();
            return (0, class_transformer_1.plainToInstance)(goods_dto_1.GoodsDto, updatedGoods.toObject());
        });
        return Promise.all(updatePromises);
    }
    async determineAndSetPaymentStatus(updateGoodsDto, goodsDocument, tenantId) {
        if (updateGoodsDto.shippingCost !== goodsDocument.shippingCost || updateGoodsDto.cod !== goodsDocument.cod) {
            const totalPrice = (updateGoodsDto.shippingCost || goodsDocument.shippingCost) + (updateGoodsDto.cod || goodsDocument.cod);
            if (totalPrice <= 0) {
                updateGoodsDto.paymentStatus = 'paid';
                return;
            }
            const payments = await this.paymentService.findAllByReferrentId(updateGoodsDto._id, tenantId);
            const totalPaidAmount = payments.reduce((sum, p) => sum + (p.chargedAmount || 0), 0);
            if (totalPaidAmount >= totalPrice) {
                updateGoodsDto.paymentStatus = 'paid';
            }
            else if (totalPaidAmount > 0 && totalPaidAmount < totalPrice) {
                updateGoodsDto.paymentStatus = 'deposited';
            }
            else {
                updateGoodsDto.paymentStatus = 'new';
            }
        }
    }
    async remove(id, tenantId) {
        const goods = await this.goodsModel.findOneAndDelete({ _id: id, tenantId });
        if (!goods) {
            throw new common_1.NotFoundException('goods not found.');
        }
        return goods !== null;
    }
    async searchGoodsPaging(pageIdx, pageSize, keyword, sortBy, filters, tenantId) {
        {
            const pipeline = await this.buildQuerySearchGoodsPaging(pageIdx, pageSize, keyword, sortBy, filters, tenantId);
            const goods = await this.goodsModel.aggregate(pipeline).exec();
            const countPipeline = await this.buildQuerySearchGoodsPaging(0, 0, keyword, sortBy, filters, tenantId);
            const countOnlyPipeline = countPipeline.filter((stage) => !stage.$skip && !stage.$limit);
            const countResult = await this.goodsModel.aggregate([...countOnlyPipeline, { $count: 'total' }]).exec();
            const totalItem = countResult.length > 0 ? countResult[0].total : 0;
            const countByStatus = await this.countByStatus(tenantId, keyword, filters);
            const filteredGoods = await Promise.all(goods.map(async (goods) => {
                let busSchedule = null;
                if (goods.busScheduleId) {
                    busSchedule = await this.busScheduleService.findOne(goods.busScheduleId, tenantId);
                }
                let busRoute = null;
                if (goods.busRouteId) {
                    const rootTenantIdObjectId = (0, utils_1.toObjectId)(this.rootTenantId);
                    busRoute = await this.busRouteService.findOne(goods.busRouteId, [rootTenantIdObjectId, tenantId]);
                }
                const categories = await this.goodsCategoryService.findByIds(goods.categoriesIds || [], [
                    tenantId,
                    (0, utils_1.toObjectId)(this.rootTenantId),
                ]);
                goods.categories = categories;
                return (0, class_transformer_1.plainToInstance)(goods_dto_1.GoodsDto, {
                    ...goods,
                    busSchedule,
                    busRoute,
                });
            }));
            await this.mapGoodsImageUrl(filteredGoods);
            return {
                pageIdx,
                goods: filteredGoods,
                totalPage: Math.ceil(totalItem / pageSize),
                totalItem,
                countByStatus,
            };
        }
    }
    async buildQuerySearchGoodsPaging(pageIdx, pageSize, keyword, sortBy, filters, tenantId) {
        const skip = pageIdx ? (pageIdx - 1) * pageSize : 0;
        const pipeline = [];
        const matchConditions = [{ tenantId }];
        if (keyword) {
            matchConditions.push({
                $or: [
                    { name: { $regex: keyword, $options: 'i' } },
                    { goodsNumber: { $regex: keyword, $options: 'i' } },
                    { customerName: { $regex: keyword, $options: 'i' } },
                    { customerPhoneNumber: { $regex: keyword, $options: 'i' } },
                    { customerAddress: { $regex: keyword, $options: 'i' } },
                    { senderName: { $regex: keyword, $options: 'i' } },
                    { senderPhoneNumber: { $regex: keyword, $options: 'i' } },
                ],
            });
        }
        let startDateValue = null;
        let endDateValue = null;
        if (Array.isArray(filters)) {
            await Promise.all(filters.map(async ({ key, value }) => {
                if (!key)
                    return;
                if (key === 'startDate') {
                    const dateValue = (0, utils_1.getFirstValue)(value);
                    startDateValue = new Date(dateValue);
                }
                else if (key === 'endDate') {
                    const dateValue = (0, utils_1.getFirstValue)(value);
                    endDateValue = new Date(dateValue);
                }
                else if (key === 'phoneNumber') {
                    const phoneValue = (0, utils_1.getFirstValue)(value);
                    matchConditions.push({ customerPhoneNumber: { $regex: phoneValue, $options: 'i' } });
                }
                else {
                    matchConditions.push((0, utils_1.processFilterValue)(key, value));
                }
            }));
        }
        if (startDateValue || endDateValue) {
            const rangeCond = {};
            if (startDateValue)
                rangeCond.$gte = startDateValue;
            if (endDateValue)
                rangeCond.$lte = endDateValue;
            matchConditions.push({ createdAt: rangeCond });
        }
        pipeline.push({
            $match: { $and: matchConditions },
        });
        if (sortBy?.key === 'startDateSchedule') {
            pipeline.push({
                $lookup: {
                    from: 'bus_schedules',
                    localField: 'busScheduleId',
                    foreignField: '_id',
                    as: 'busScheduleData',
                },
            });
            pipeline.push({
                $unwind: {
                    path: '$busScheduleData',
                    preserveNullAndEmptyArrays: true,
                },
            });
        }
        if (sortBy?.key) {
            let sortDirection = sortBy.value === 'ascend' ? 1 : -1;
            let sortField = sortBy.key;
            if (sortBy.key === 'goodsImportant') {
                sortDirection = sortBy.value === 'ascend' ? -1 : 1;
            }
            else if (sortBy.key === 'startDateSchedule') {
                sortField = 'busScheduleData.startDate';
            }
            pipeline.push({
                $sort: { [sortField]: sortDirection },
            });
        }
        if (sortBy?.key === 'startDateSchedule') {
            pipeline.push({
                $project: {
                    busScheduleData: 0,
                },
            });
        }
        if (pageSize > 0) {
            pipeline.push({ $skip: skip }, { $limit: pageSize });
        }
        return pipeline;
    }
    generateGoodsNumber() {
        return this.nanoid();
    }
    async renameGoodsImages(imageIds, goodsNumber, tenantId) {
        if (!imageIds || imageIds.length === 0) {
            return;
        }
        await Promise.all(imageIds.map(async (imageId, index) => {
            const newFileName = `${goodsNumber}-${index + 1}`;
            await this.fileService.update({
                _id: imageId,
                filename: newFileName,
            }, tenantId);
        }));
    }
    async handleImageUpdates(oldImageIds, newImageIds, goodsNumber, tenantId) {
        const deletedImageIds = oldImageIds.filter((oldId) => !newImageIds.some((newId) => newId.toString() === oldId.toString()));
        if (deletedImageIds.length > 0) {
            await this.fileService.deleteFiles(deletedImageIds, tenantId);
        }
        await this.renameGoodsImages(newImageIds, goodsNumber, tenantId);
    }
    async mapGoodsImageUrl(goods) {
        const port = process.env.PUBLIC_PORT ? `:${process.env.PUBLIC_PORT}` : '';
        return await Promise.all(goods.map(async (good) => {
            if (good.imageIds) {
                good.images = good.imageIds.map((id) => `${process.env.DOMAIN}${port}/file/view/${id.toString()}`);
            }
            await this.mapGoodsCategoryImageUrl(good.categories);
            return good;
        }));
    }
    mapGoodsCategoryImageUrl(goodsCategories) {
        if (!goodsCategories || goodsCategories.length === 0) {
            return goodsCategories;
        }
        const port = process.env.PUBLIC_PORT ? `:${process.env.PUBLIC_PORT}` : '';
        return goodsCategories.map((category) => {
            if (category.iconId) {
                category.icon = `${process.env.DOMAIN}${port}/file/view/${category.iconId.toString()}`;
            }
            return category;
        });
    }
    async countByField(tenantId, field, keyword, filters) {
        const matchConditions = [{ tenantId }];
        if (keyword) {
            matchConditions.push({
                $or: [
                    { name: { $regex: keyword, $options: 'i' } },
                    { goodsNumber: { $regex: keyword, $options: 'i' } },
                    { customerName: { $regex: keyword, $options: 'i' } },
                    { customerPhoneNumber: { $regex: keyword, $options: 'i' } },
                    { customerAddress: { $regex: keyword, $options: 'i' } },
                    { senderName: { $regex: keyword, $options: 'i' } },
                    { senderPhoneNumber: { $regex: keyword, $options: 'i' } },
                ],
            });
        }
        let startDateValue = null;
        let endDateValue = null;
        if (Array.isArray(filters)) {
            await Promise.all(filters.map(async ({ key, value }) => {
                if (!key || value == null)
                    return;
                if (key === 'status')
                    return;
                if (key === 'startDate') {
                    const dateValue = (0, utils_1.getFirstValue)(value);
                    startDateValue = new Date(dateValue);
                }
                else if (key === 'endDate') {
                    const dateValue = (0, utils_1.getFirstValue)(value);
                    endDateValue = new Date(dateValue);
                }
                else if (key === 'phoneNumber') {
                    const phoneValue = (0, utils_1.getFirstValue)(value);
                    matchConditions.push({ customerPhoneNumber: { $regex: phoneValue, $options: 'i' } });
                }
                else {
                    matchConditions.push((0, utils_1.processFilterValue)(key, value));
                }
            }));
        }
        if (startDateValue || endDateValue) {
            const rangeCond = {};
            if (startDateValue)
                rangeCond.$gte = startDateValue;
            if (endDateValue)
                rangeCond.$lte = endDateValue;
            matchConditions.push({ createdAt: rangeCond });
        }
        const groupField = `$${field}`;
        const counts = await this.goodsModel.aggregate([
            { $match: { $and: matchConditions } },
            { $group: { _id: groupField, count: { $sum: 1 } } },
            { $project: { _id: 0, key: '$_id', count: 1 } },
        ]);
        const result = {};
        let totalAll = 0;
        counts.forEach((item) => {
            const k = item.key === null || item.key === undefined ? 'null' : String(item.key);
            result[k] = item.count;
            totalAll += item.count;
        });
        result['all'] = totalAll;
        return result;
    }
    async countByStatus(tenantId, keyword, filters) {
        return this.countByField(tenantId, 'status', keyword, filters);
    }
};
exports.GoodsService = GoodsService;
exports.GoodsService = GoodsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(goods_schema_1.GoodsDocument.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => bus_schedule_service_1.BusScheduleService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => bus_route_service_1.BusRouteService))),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => goods_category_service_1.GoodsCategoryService))),
    __param(4, (0, common_1.Inject)((0, common_1.forwardRef)(() => file_service_1.FileService))),
    __param(5, (0, common_1.Inject)((0, common_1.forwardRef)(() => payment_service_1.PaymentService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        bus_schedule_service_1.BusScheduleService,
        bus_route_service_1.BusRouteService,
        goods_category_service_1.GoodsCategoryService,
        file_service_1.FileService,
        payment_service_1.PaymentService,
        good_gateway_1.GoodsGateway])
], GoodsService);
//# sourceMappingURL=goods-service.js.map
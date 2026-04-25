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
exports.DriverService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const driver_schema_1 = require("./schema/driver.schema");
const driver_dto_1 = require("./dto/driver.dto");
const class_transformer_1 = require("class-transformer");
const user_service_1 = require("../user/user.service");
const roles_constants_1 = require("../../../../common/constants/roles.constants");
let DriverService = class DriverService {
    constructor(driverModel, userService) {
        this.driverModel = driverModel;
        this.userService = userService;
    }
    async create(createDriverDto, tenantId) {
        const createDriver = new this.driverModel({
            ...createDriverDto,
            tenantId,
        });
        const savedDriver = await createDriver.save();
        return (0, class_transformer_1.plainToInstance)(driver_dto_1.DriverDto, savedDriver.toObject());
    }
    async update(updateDriverDto, tenantId) {
        const updatedDriver = await this.driverModel
            .findOneAndUpdate({ _id: updateDriverDto._id, tenantId }, updateDriverDto, { new: true })
            .lean()
            .exec();
        if (!updatedDriver) {
            throw new common_1.NotFoundException(`Driver with ID "${updateDriverDto._id}" not found.`);
        }
        return (0, class_transformer_1.plainToInstance)(driver_dto_1.DriverDto, updatedDriver);
    }
    async delete(id, tenantId) {
        const result = await this.driverModel.findOneAndDelete({ _id: id, tenantId }).lean().exec();
        return result !== null;
    }
    async deleteByUserId(userId, tenantId) {
        const result = await this.driverModel.findOneAndDelete({ userId, tenantId }).lean().exec();
        return result !== null;
    }
    async findAllUserDriver(tenantId) {
        const userDrivers = await this.userService.findAllByRole(roles_constants_1.ROLE_CONSTANTS.DRIVER, tenantId);
        const userIds = userDrivers.map((user) => user._id);
        const drivers = await this.driverModel
            .find({ userId: { $in: userIds }, tenantId })
            .lean()
            .exec();
        const result = userDrivers.map((user) => {
            const driver = drivers.find((d) => d.userId.toString() === user._id.toString());
            return {
                ...new driver_dto_1.DriverDto(),
                ...user,
                ...driver,
                licenseNumber: driver?.licenseNumber || null,
                licenseExpirationDate: driver?.licenseExpirationDate || null,
                licenseType: driver?.licenseType || null,
                licenseImage: driver?.licenseImage || null,
            };
        });
        return (0, class_transformer_1.plainToInstance)(driver_dto_1.DriverDto, result.map((driver) => driver));
    }
    async findOne(id, tenantId) {
        const driver = await this.driverModel.findOne({ _id: id, tenantId }).lean().exec();
        if (!driver) {
            throw new common_1.NotFoundException(`Driver with ID "${id}" not found.`);
        }
        return (0, class_transformer_1.plainToInstance)(driver_dto_1.DriverDto, driver);
    }
    async findUserDriverByIds(ids, tenantId) {
        const userDrivers = await this.userService.findByIds(ids, tenantId);
        if (!userDrivers || userDrivers.length === 0) {
            return [];
        }
        const userIds = userDrivers.map((user) => user._id);
        const drivers = await this.driverModel
            .find({ userId: { $in: userIds }, tenantId })
            .lean()
            .exec();
        const result = userDrivers.map((user) => {
            const driver = drivers.find((d) => d.userId.toString() === user._id.toString());
            return {
                ...new driver_dto_1.DriverDto(),
                ...user,
                ...driver,
                licenseNumber: driver?.licenseNumber || null,
                licenseExpirationDate: driver?.licenseExpirationDate || null,
                licenseType: driver?.licenseType || null,
                licenseImage: driver?.licenseImage || null,
            };
        });
        return (0, class_transformer_1.plainToInstance)(driver_dto_1.DriverDto, result.map((driver) => driver));
    }
    async findOneByUser(userId, tenantId) {
        const driver = await this.driverModel.findOne({ userId, tenantId }).lean().exec();
        if (!driver) {
            return null;
        }
        return (0, class_transformer_1.plainToInstance)(driver_dto_1.DriverDto, driver);
    }
    async search(pageIdx, pageSize, keyword, sortBy, filters, tenantId) {
        const userDrivers = await this.userService.findAllByRole(roles_constants_1.ROLE_CONSTANTS.DRIVER, tenantId);
        const userIds = userDrivers.map((user) => user._id);
        const pipeline = await this.buildQuerySearchBusTypes(userIds, pageIdx, pageSize, keyword, sortBy, filters, tenantId);
        const drivers = await this.driverModel.aggregate(pipeline).exec();
        const totalItem = await this.driverModel.countDocuments({ tenantId });
        const result = userDrivers.map((user) => {
            const driver = drivers.find((d) => d.userId.toString() === user._id.toString());
            return {
                ...new driver_dto_1.DriverDto(),
                ...user,
                ...driver,
                licenseNumber: driver?.licenseNumber || null,
                licenseExpirationDate: driver?.licenseExpirationDate || null,
                licenseType: driver?.licenseType || null,
                licenseImage: driver?.licenseImage || null,
            };
        });
        return {
            pageIdx,
            userDrivers: result,
            totalPage: Math.ceil(userDrivers.length / pageSize),
            totalItem: drivers.length > 0 ? totalItem : userDrivers.length,
        };
    }
    async buildQuerySearchBusTypes(userIds, pageIdx, pageSize, keyword, sortBy, filters, tenantId) {
        const skip = pageIdx ? (pageIdx - 1) * pageSize : 0;
        const pipeline = [];
        const matchConditions = [{ userId: { $in: userIds }, tenantId }];
        if (keyword) {
            matchConditions.push({
                $or: [{ name: { $regex: keyword, $options: 'i' } }],
            });
        }
        let startDateValue = '';
        let endDateValue = '';
        if (Array.isArray(filters)) {
            await Promise.all(filters.map(async ({ key, value }) => {
                if (!key || value == null)
                    return;
                if (key === 'startDate') {
                    startDateValue = value;
                }
                else if (key === 'endDate') {
                    endDateValue = value;
                }
                else {
                    matchConditions.push({ [key]: value });
                }
            }));
        }
        if (startDateValue || endDateValue) {
            const rangeCond = {};
            if (startDateValue)
                rangeCond.$gte = startDateValue;
            if (endDateValue)
                rangeCond.$lte = endDateValue;
            matchConditions.push({ startDate: rangeCond });
        }
        if (matchConditions.length) {
            pipeline.push({
                $match: { $and: matchConditions },
            });
        }
        if (sortBy?.key) {
            pipeline.push({
                $sort: { [sortBy.key]: sortBy.value === 'ascend' ? 1 : -1 },
            });
        }
        pipeline.push({ $skip: skip }, { $limit: pageSize });
        return pipeline;
    }
};
exports.DriverService = DriverService;
exports.DriverService = DriverService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(driver_schema_1.DriverDocument.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService])
], DriverService);
//# sourceMappingURL=driver.service.js.map
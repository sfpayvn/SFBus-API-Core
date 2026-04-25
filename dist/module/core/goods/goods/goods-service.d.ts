import { Model, Types } from 'mongoose';
import { GoodsDocument } from './schema/goods.schema';
import { CreateGoodsDto } from './dto/create-goods.dto';
import { RequestUpdateGoodsScheduleAssignmentDto, RequestUpdateGoodsScheduleBoardingDto, RequestUpdatePaymentGoodsStatusDto, UpdateGoodsDto } from './dto/update-goods.dto';
import { GoodsDto, GoodsSortFilter, SearchGoodsPagingRes } from './dto/goods.dto';
import { GoodsCategoryService } from '../good-category/goods-category-service';
import { BusScheduleService } from '../../bus/bus-schedule/bus-schedule.service';
import { GoodsGateway } from './good.gateway';
import { FileService } from '../../file/file/file.service';
import { PaymentService } from '../../payment/payment-service';
import { GoodsCategoryDto } from '../good-category/dto/goods-category.dto';
import { BusRouteService } from '../../bus/bus-route/bus-route.service';
export declare class GoodsService {
    private readonly goodsModel;
    private readonly busScheduleService;
    private readonly busRouteService;
    private readonly goodsCategoryService;
    private readonly fileService;
    private readonly paymentService;
    private readonly goodsGateway;
    private alphabet;
    private nanoid;
    private rootTenantId;
    constructor(goodsModel: Model<GoodsDocument>, busScheduleService: BusScheduleService, busRouteService: BusRouteService, goodsCategoryService: GoodsCategoryService, fileService: FileService, paymentService: PaymentService, goodsGateway: GoodsGateway);
    private buildEventForStatus;
    watchChanges(): Promise<void>;
    create(createGoodsDto: CreateGoodsDto, tenantId: Types.ObjectId): Promise<GoodsDto>;
    findAll(tenantId: Types.ObjectId): Promise<GoodsDto[]>;
    findOne(id: string, tenantId?: Types.ObjectId): Promise<GoodsDto>;
    findAllGoodsForBusSchedule(busScheduleId: Types.ObjectId, tenantId: Types.ObjectId, filters?: GoodsSortFilter[]): Promise<GoodsDto[]>;
    findAllGoodsAvailable(busRouteId: Types.ObjectId, tenantId: Types.ObjectId, filters?: GoodsSortFilter[]): Promise<GoodsDto[]>;
    findAllByBookingGroupNumber(goodsNumber: string, tenantId: Types.ObjectId): Promise<GoodsDto>;
    update(updateGoodsDto: UpdateGoodsDto, tenantId: Types.ObjectId): Promise<GoodsDto & {
        _oldData?: any;
    }>;
    updates(updateGoodsDto: UpdateGoodsDto[], tenantId: Types.ObjectId): Promise<(GoodsDto & {
        _oldData?: any;
    })[]>;
    updatePaymentGoodsStatus(updateGoodsDto: RequestUpdatePaymentGoodsStatusDto, tenantId: Types.ObjectId): Promise<GoodsDto>;
    updatesGoodsScheduleAssignment(requestUpdateGoodsScheduleAssignmentDto: RequestUpdateGoodsScheduleAssignmentDto[], tenantId: Types.ObjectId): Promise<GoodsDto[]>;
    updatesGoodsBoarding(requestUpdateGoodsScheduleBoardingDto: RequestUpdateGoodsScheduleBoardingDto, tenantId: Types.ObjectId): Promise<GoodsDto[] & {
        _oldData?: any;
    }>;
    updatesGoodsStatus(goodsIds: string[], status: string, tenantId: Types.ObjectId): Promise<GoodsDto[]>;
    private determineAndSetPaymentStatus;
    remove(id: string, tenantId: Types.ObjectId): Promise<boolean>;
    searchGoodsPaging(pageIdx: number, pageSize: number, keyword: string, sortBy: GoodsSortFilter, filters: GoodsSortFilter[], tenantId: Types.ObjectId): Promise<SearchGoodsPagingRes>;
    buildQuerySearchGoodsPaging(pageIdx: number, pageSize: number, keyword: string, sortBy: GoodsSortFilter, filters: GoodsSortFilter[], tenantId: Types.ObjectId): Promise<any>;
    generateGoodsNumber(): string;
    renameGoodsImages(imageIds: Types.ObjectId[], goodsNumber: string, tenantId: Types.ObjectId): Promise<void>;
    handleImageUpdates(oldImageIds: Types.ObjectId[], newImageIds: Types.ObjectId[], goodsNumber: string, tenantId: Types.ObjectId): Promise<void>;
    mapGoodsImageUrl(goods: GoodsDto[]): Promise<GoodsDto[]>;
    mapGoodsCategoryImageUrl(goodsCategories: GoodsCategoryDto[]): GoodsCategoryDto[];
    private countByField;
    countByStatus(tenantId: Types.ObjectId, keyword?: string, filters?: GoodsSortFilter[]): Promise<Record<string, number>>;
}

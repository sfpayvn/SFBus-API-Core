import { GoodsDocument } from '@/module/core/goods/goods/schema/goods.schema';
import { Model, Types } from 'mongoose';
import { GoodsDto } from '@/module/core/goods/goods/dto/goods.dto';
import { PosCreateGoodsDto } from './dto/pos-create-goods.dto';
import { PosGoodsDto, PosGoodsSortFilter, PosSearchGoodsPagingRes } from './dto/pos-goods.dto';
import { PosRequestUpdateGoodsScheduleAssignmentDto, PosUpdateGoodsDto } from './dto/pos-update-goods.dto';
import { GoodsService } from '@/module/core/goods/goods/goods-service';
import { PosTrackingService } from '../../pos-tracking/pos-tracking.service';
export declare class PosGoodsService {
    private readonly goodsModel;
    private readonly goodsService;
    private readonly posTrackingService;
    private alphabet;
    private nanoid;
    constructor(goodsModel: Model<GoodsDocument>, goodsService: GoodsService, posTrackingService: PosTrackingService);
    create(PosCreateGoodsDto: PosCreateGoodsDto, tenantId: Types.ObjectId, createdBy: Types.ObjectId): Promise<PosGoodsDto>;
    update(PosUpdateGoodsDto: PosUpdateGoodsDto, tenantId: Types.ObjectId, updatedBy: Types.ObjectId): Promise<PosGoodsDto>;
    updates(PosUpdateGoodsDto: PosUpdateGoodsDto[], tenantId: Types.ObjectId, updatedBy: Types.ObjectId): Promise<PosGoodsDto[]>;
    remove(id: string, tenantId: Types.ObjectId, deletedBy: Types.ObjectId): Promise<boolean>;
    findAll(tenantId: Types.ObjectId): Promise<PosGoodsDto[]>;
    findOne(id: string, tenantId: Types.ObjectId): Promise<GoodsDto>;
    findAllGoodsForBusSchedule(busScheduleId: Types.ObjectId, tenantId: Types.ObjectId): Promise<GoodsDto[]>;
    findAllGoodsAvailable(busRouteId: Types.ObjectId, tenantId: Types.ObjectId): Promise<PosGoodsDto[]>;
    searchGoodsPaging(pageIdx: number, pageSize: number, keyword: string, sortBy: PosGoodsSortFilter, filters: PosGoodsSortFilter[], tenantId: Types.ObjectId): Promise<PosSearchGoodsPagingRes>;
    updatesGoodsScheduleAssignment(posRequestUpdateGoodsScheduleAssignmentDto: PosRequestUpdateGoodsScheduleAssignmentDto[], tenantId: Types.ObjectId, updatedBy: Types.ObjectId): Promise<PosGoodsDto[]>;
    private prepareChanges;
}

import { GoodsDocument } from '@/module/core/goods/goods/schema/goods.schema';
import { Model, Types } from 'mongoose';
import { GoodsDto } from '@/module/core/goods/goods/dto/goods.dto';
import { AdminCreateGoodsDto } from './dto/admin-create-goods.dto';
import { AdminGoodsDto, AdminGoodsSortFilter, AdminSearchGoodsPagingRes } from './dto/admin-goods.dto';
import { AdminUpdateGoodsDto } from './dto/admin-update-goods.dto';
import { GoodsService } from '@/module/core/goods/goods/goods-service';
export declare class AdminGoodsService {
    private readonly goodsModel;
    private readonly goodsService;
    private alphabet;
    private nanoid;
    constructor(goodsModel: Model<GoodsDocument>, goodsService: GoodsService);
    create(adminCreateGoodsDto: AdminCreateGoodsDto, tenantId: Types.ObjectId): Promise<AdminGoodsDto>;
    findAll(tenantId: Types.ObjectId): Promise<AdminGoodsDto[]>;
    findOne(id: string, tenantId: Types.ObjectId): Promise<GoodsDto>;
    findAllGoodsForBusSchedule(busScheduleId: Types.ObjectId, tenantId: Types.ObjectId): Promise<GoodsDto[]>;
    findAllGoodsAvailable(busRouteId: Types.ObjectId, tenantId: Types.ObjectId): Promise<AdminGoodsDto[]>;
    update(adminUpdateGoodsDto: AdminUpdateGoodsDto, tenantId: Types.ObjectId): Promise<AdminGoodsDto>;
    updates(adminUpdateGoodsDto: AdminUpdateGoodsDto[], tenantId: Types.ObjectId): Promise<AdminGoodsDto[]>;
    remove(id: string, tenantId: Types.ObjectId): Promise<boolean>;
    searchGoodsPaging(pageIdx: number, pageSize: number, keyword: string, sortBy: AdminGoodsSortFilter, filters: AdminGoodsSortFilter[], tenantId: Types.ObjectId): Promise<AdminSearchGoodsPagingRes>;
}

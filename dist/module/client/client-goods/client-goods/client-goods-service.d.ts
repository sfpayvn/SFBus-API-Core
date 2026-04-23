import { GoodsDocument } from '@/module/core/goods/goods/schema/goods.schema';
import { Model, Types } from 'mongoose';
import { GoodsService } from '@/module/core/goods/goods/goods-service';
export declare class ClientGoodsService {
    private readonly goodsModel;
    private readonly goodsService;
    private alphabet;
    private nanoid;
    constructor(goodsModel: Model<GoodsDocument>, goodsService: GoodsService);
    findOne(id: string, tenantId: Types.ObjectId): Promise<import("../../../core/goods/goods/dto/goods.dto").GoodsDto>;
}

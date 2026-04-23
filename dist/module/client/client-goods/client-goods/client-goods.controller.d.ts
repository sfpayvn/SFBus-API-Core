import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { ClientGoodsService } from './client-goods-service';
export declare class ClientGoodsController {
    private readonly ClientGoodsService;
    constructor(ClientGoodsService: ClientGoodsService);
    findOne(id: string, user: UserTokenDto): Promise<import("../../../core/goods/goods/dto/goods.dto").GoodsDto>;
}

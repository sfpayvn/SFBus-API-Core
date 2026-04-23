import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Types } from 'mongoose';
import { Server } from 'socket.io';
import { GoodsDto } from './dto/goods.dto';
export declare class GoodsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private connectedClients;
    constructor();
    afterInit(server: Server): void;
    handleConnection(client: any): void;
    handleDisconnect(client: any): void;
    goodsChangeOfBusRouteId(goods: GoodsDto, busRouteId: Types.ObjectId): Promise<void>;
}

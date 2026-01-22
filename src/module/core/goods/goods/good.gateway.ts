// notification.gateway.ts
import { defaultWebSocketGatewayConfig } from '@/config/websocket-gateway.config';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Types } from 'mongoose';
import { Server } from 'socket.io';
import { GoodsDto } from './dto/goods.dto';

@WebSocketGateway(defaultWebSocketGatewayConfig)
export class GoodsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private connectedClients = new Map<string, any>();

  constructor() {}

  afterInit(server: Server) {
    // Tăng giới hạn listeners để tránh cảnh báo memory leak
    server.setMaxListeners(20);
  }

  handleConnection(client: any) {
    this.connectedClients.set(client.id, client);

    // Tăng giới hạn listeners cho từng client
    client.setMaxListeners(20);
  }

  handleDisconnect(client: any) {
    this.connectedClients.delete(client.id);

    // Cleanup listeners khi client disconnect
    client.removeAllListeners();
  }

  async goodsChangeOfBusRouteId(goods: GoodsDto, busRouteId: Types.ObjectId) {
    this.server.emit(`goodsChangeOfBusRouteId/${busRouteId}`, goods);
  }
}

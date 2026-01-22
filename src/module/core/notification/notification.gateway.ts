// notification.gateway.ts
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { NotificationService } from './notification.service';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:8100'], // Địa chỉ nguồn của ứng dụng Ionic
    methods: ['GET', 'POST'],
    credentials: true,
  },
  path: '/socket.io',
})
export class NotificationGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
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

  async notifyChange(notification) {
    this.server.emit('notificationChange', notification);
  }
}

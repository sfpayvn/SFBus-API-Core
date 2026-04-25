import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

export abstract class BaseWebSocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  protected connectedClients = new Map<string, any>();

  afterInit(server: Server) {
    // Tăng giới hạn listeners để tránh cảnh báo memory leak
    server.setMaxListeners(30);
  }

  handleConnection(client: any) {
    this.connectedClients.set(client.id, client);

    // Tăng giới hạn listeners cho từng client
    client.setMaxListeners(30);
  }

  handleDisconnect(client: any) {
    this.connectedClients.delete(client.id);

    // Cleanup listeners khi client disconnect
    client.removeAllListeners();
  }

  protected getConnectedClientCount(): number {
    return this.connectedClients.size;
  }

  protected emitToRoom(room: string, event: string, data: any) {
    this.server.to(room).emit(event, data);
  }

  protected emitToAll(event: string, data: any) {
    this.server.emit(event, data);
  }
}

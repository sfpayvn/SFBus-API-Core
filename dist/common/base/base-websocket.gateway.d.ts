import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';
export declare abstract class BaseWebSocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    protected connectedClients: Map<string, any>;
    afterInit(server: Server): void;
    handleConnection(client: any): void;
    handleDisconnect(client: any): void;
    protected getConnectedClientCount(): number;
    protected emitToRoom(room: string, event: string, data: any): void;
    protected emitToAll(event: string, data: any): void;
}

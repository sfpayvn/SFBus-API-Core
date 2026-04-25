import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';
export declare class NotificationGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private connectedClients;
    constructor();
    afterInit(server: Server): void;
    handleConnection(client: any): void;
    handleDisconnect(client: any): void;
    notifyChange(notification: any): Promise<void>;
}

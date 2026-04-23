import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Types } from 'mongoose';
import { Server } from 'socket.io';
export declare class BookingGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private connectedClients;
    constructor();
    afterInit(server: Server): void;
    handleConnection(client: any): void;
    handleDisconnect(client: any): void;
    bookingChangeOfBusSchedule(booking: any, busScheduleId: Types.ObjectId): Promise<void>;
}

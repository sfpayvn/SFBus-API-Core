"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverBookingGateway = void 0;
const websocket_gateway_config_1 = require("../../../config/websocket-gateway.config");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let DriverBookingGateway = class DriverBookingGateway {
    constructor() { }
    afterInit(server) { }
    handleConnection(client) { }
    handleDisconnect(client) { }
    async bookingChangeOfBusSchedule(booking, busScheduleId) {
        this.server.emit(`bookingChangeOfBusSchedule/${busScheduleId}`, booking);
    }
};
exports.DriverBookingGateway = DriverBookingGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], DriverBookingGateway.prototype, "server", void 0);
exports.DriverBookingGateway = DriverBookingGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(websocket_gateway_config_1.defaultWebSocketGatewayConfig),
    __metadata("design:paramtypes", [])
], DriverBookingGateway);
//# sourceMappingURL=driver-booking.gateway.js.map
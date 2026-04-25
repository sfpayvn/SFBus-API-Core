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
exports.PosNotificationGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let PosNotificationGateway = class PosNotificationGateway {
    constructor() { }
    afterInit(server) { }
    handleConnection(client) { }
    handleDisconnect(client) { }
    async notifyChange(notification) {
        this.server.emit('notificationChange', notification);
    }
};
exports.PosNotificationGateway = PosNotificationGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], PosNotificationGateway.prototype, "server", void 0);
exports.PosNotificationGateway = PosNotificationGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: ['http://localhost:8100'],
            methods: ['GET', 'Post'],
            credentials: true,
        },
        path: '/socket.io',
    }),
    __metadata("design:paramtypes", [])
], PosNotificationGateway);
//# sourceMappingURL=pos-notification.gateway.js.map
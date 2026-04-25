"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultWebSocketGatewayConfig = void 0;
exports.defaultWebSocketGatewayConfig = {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true,
    },
    path: '/socket.io',
};
//# sourceMappingURL=websocket-gateway.config.js.map
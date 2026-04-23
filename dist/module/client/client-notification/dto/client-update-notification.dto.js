"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientUpdateNotificationDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const client_create_notificationdto_1 = require("./client-create-notificationdto");
class ClientUpdateNotificationDto extends (0, mapped_types_1.PartialType)(client_create_notificationdto_1.ClientCreateNotificationDto) {
}
exports.ClientUpdateNotificationDto = ClientUpdateNotificationDto;
//# sourceMappingURL=client-update-notification.dto.js.map
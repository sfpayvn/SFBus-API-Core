"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientCreateNotificationDto = void 0;
const client_notification_dto_1 = require("./client-notification.dto");
const mapped_types_1 = require("@nestjs/mapped-types");
class ClientCreateNotificationDto extends (0, mapped_types_1.OmitType)(client_notification_dto_1.ClientNotificationDto, [
    '_id',
    'createdAt',
    'updatedAt',
    '__v',
]) {
}
exports.ClientCreateNotificationDto = ClientCreateNotificationDto;
//# sourceMappingURL=client-create-notificationdto.js.map
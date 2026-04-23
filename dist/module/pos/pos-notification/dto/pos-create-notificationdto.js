"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PosCreateNotificationDto = void 0;
const pos_notification_dto_1 = require("./pos-notification.dto");
const mapped_types_1 = require("@nestjs/mapped-types");
class PosCreateNotificationDto extends (0, mapped_types_1.OmitType)(pos_notification_dto_1.PosNotificationDto, [
    '_id',
    'createdAt',
    'updatedAt',
    '__v',
]) {
}
exports.PosCreateNotificationDto = PosCreateNotificationDto;
//# sourceMappingURL=pos-create-notificationdto.js.map
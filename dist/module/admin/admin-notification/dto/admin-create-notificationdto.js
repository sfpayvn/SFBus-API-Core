"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminCreateNotificationDto = void 0;
const admin_notification_dto_1 = require("./admin-notification.dto");
const mapped_types_1 = require("@nestjs/mapped-types");
class AdminCreateNotificationDto extends (0, mapped_types_1.OmitType)(admin_notification_dto_1.AdminNotificationDto, [
    '_id',
    'createdAt',
    'updatedAt',
    '__v',
]) {
}
exports.AdminCreateNotificationDto = AdminCreateNotificationDto;
//# sourceMappingURL=admin-create-notificationdto.js.map
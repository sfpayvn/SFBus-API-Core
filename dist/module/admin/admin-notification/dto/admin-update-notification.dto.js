"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUpdateNotificationDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const admin_create_notificationdto_1 = require("./admin-create-notificationdto");
class AdminUpdateNotificationDto extends (0, mapped_types_1.PartialType)(admin_create_notificationdto_1.AdminCreateNotificationDto) {
}
exports.AdminUpdateNotificationDto = AdminUpdateNotificationDto;
//# sourceMappingURL=admin-update-notification.dto.js.map
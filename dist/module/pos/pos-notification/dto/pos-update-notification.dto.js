"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PosUpdateNotificationDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const pos_create_notificationdto_1 = require("./pos-create-notificationdto");
class PosUpdateNotificationDto extends (0, mapped_types_1.PartialType)(pos_create_notificationdto_1.PosCreateNotificationDto) {
}
exports.PosUpdateNotificationDto = PosUpdateNotificationDto;
//# sourceMappingURL=pos-update-notification.dto.js.map
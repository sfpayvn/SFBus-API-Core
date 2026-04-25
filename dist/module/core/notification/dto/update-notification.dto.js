"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNotificationDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_notificationdto_1 = require("./create-notificationdto");
class UpdateNotificationDto extends (0, mapped_types_1.PartialType)(create_notificationdto_1.CreateNotificationDto) {
}
exports.UpdateNotificationDto = UpdateNotificationDto;
//# sourceMappingURL=update-notification.dto.js.map
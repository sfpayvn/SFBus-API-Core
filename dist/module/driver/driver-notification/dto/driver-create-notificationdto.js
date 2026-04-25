"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverCreateNotificationDto = void 0;
const driver_notification_dto_1 = require("./driver-notification.dto");
const mapped_types_1 = require("@nestjs/mapped-types");
class DriverCreateNotificationDto extends (0, mapped_types_1.OmitType)(driver_notification_dto_1.DriverNotificationDto, [
    '_id',
    'createdAt',
    'updatedAt',
    '__v',
]) {
}
exports.DriverCreateNotificationDto = DriverCreateNotificationDto;
//# sourceMappingURL=driver-create-notificationdto.js.map
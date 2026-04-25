"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverSignInUserDto = void 0;
const driver_login_user_dto_1 = require("./driver-login-user.dto");
const mapped_types_1 = require("@nestjs/mapped-types");
class DriverSignInUserDto extends (0, mapped_types_1.OmitType)(driver_login_user_dto_1.DriverLoginUserDto, ['tenantCode']) {
}
exports.DriverSignInUserDto = DriverSignInUserDto;
//# sourceMappingURL=driver-sign-user.dto.js.map
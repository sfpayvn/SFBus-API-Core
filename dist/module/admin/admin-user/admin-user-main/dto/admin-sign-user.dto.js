"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminSignInUserDto = void 0;
const admin_login_user_dto_1 = require("./admin-login-user.dto");
const mapped_types_1 = require("@nestjs/mapped-types");
class AdminSignInUserDto extends (0, mapped_types_1.OmitType)(admin_login_user_dto_1.AdminLoginUserDto, ['tenantCode']) {
}
exports.AdminSignInUserDto = AdminSignInUserDto;
//# sourceMappingURL=admin-sign-user.dto.js.map
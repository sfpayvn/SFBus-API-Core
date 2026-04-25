"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientSignInUserDto = void 0;
const client_login_user_dto_1 = require("./client-login-user.dto");
const mapped_types_1 = require("@nestjs/mapped-types");
class ClientSignInUserDto extends (0, mapped_types_1.OmitType)(client_login_user_dto_1.ClientLoginUserDto, ['tenantCode']) {
}
exports.ClientSignInUserDto = ClientSignInUserDto;
//# sourceMappingURL=client-sign-user.dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PosSignInUserDto = void 0;
const pos_login_user_dto_1 = require("./pos-login-user.dto");
const mapped_types_1 = require("@nestjs/mapped-types");
class PosSignInUserDto extends (0, mapped_types_1.OmitType)(pos_login_user_dto_1.PosLoginUserDto, ['tenantCode']) {
}
exports.PosSignInUserDto = PosSignInUserDto;
//# sourceMappingURL=pos-sign-user.dto.js.map
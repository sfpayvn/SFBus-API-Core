import { PosLoginUserDto } from './pos-login-user.dto';
declare const PosSignInUserDto_base: import("@nestjs/mapped-types").MappedType<Omit<PosLoginUserDto, "tenantCode">>;
export declare class PosSignInUserDto extends PosSignInUserDto_base {
}
export {};

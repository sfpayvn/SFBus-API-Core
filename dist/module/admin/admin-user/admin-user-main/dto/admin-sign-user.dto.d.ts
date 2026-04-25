import { AdminLoginUserDto } from './admin-login-user.dto';
declare const AdminSignInUserDto_base: import("@nestjs/mapped-types").MappedType<Omit<AdminLoginUserDto, "tenantCode">>;
export declare class AdminSignInUserDto extends AdminSignInUserDto_base {
}
export {};

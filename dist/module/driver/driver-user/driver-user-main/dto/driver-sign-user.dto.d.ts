import { DriverLoginUserDto } from './driver-login-user.dto';
declare const DriverSignInUserDto_base: import("@nestjs/mapped-types").MappedType<Omit<DriverLoginUserDto, "tenantCode">>;
export declare class DriverSignInUserDto extends DriverSignInUserDto_base {
}
export {};

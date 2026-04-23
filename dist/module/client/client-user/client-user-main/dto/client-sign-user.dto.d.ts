import { ClientLoginUserDto } from './client-login-user.dto';
declare const ClientSignInUserDto_base: import("@nestjs/mapped-types").MappedType<Omit<ClientLoginUserDto, "tenantCode">>;
export declare class ClientSignInUserDto extends ClientSignInUserDto_base {
}
export {};

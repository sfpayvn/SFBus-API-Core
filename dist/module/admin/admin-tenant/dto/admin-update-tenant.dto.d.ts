import { Types } from 'mongoose';
import { AdminCreateTenantDto } from './admin-create-tenant.dto';
declare const UpdateAdminTenantDto_base: import("@nestjs/mapped-types").MappedType<Partial<AdminCreateTenantDto>>;
export declare class UpdateAdminTenantDto extends UpdateAdminTenantDto_base {
    _id: Types.ObjectId;
}
export {};

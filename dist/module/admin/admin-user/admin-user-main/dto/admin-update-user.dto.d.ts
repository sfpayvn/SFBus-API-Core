import { Types } from 'mongoose';
import { AdminCreateUserAddressDto, AdminCreateUserDto } from './admin-create-user.dto';
declare const AdminUpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<AdminCreateUserDto>>;
export declare class AdminUpdateUserDto extends AdminUpdateUserDto_base {
    _id: Types.ObjectId;
    isEmailVerified: boolean;
    isLocked: boolean;
    isDeleted: boolean;
}
export declare class AdminUpdateUserProfileDto {
    _id: Types.ObjectId;
    avatarId?: Types.ObjectId;
    name?: string;
    addresses?: AdminCreateUserAddressDto[];
    email?: string;
    gender?: string;
    birthdate?: string;
}
export declare class AdminUpdatePasswordUserDto {
    oldPassword: string;
    password: string;
}
export {};

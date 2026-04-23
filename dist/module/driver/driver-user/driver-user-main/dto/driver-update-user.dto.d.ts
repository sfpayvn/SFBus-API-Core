import { Types } from 'mongoose';
import { DriverCreateUserAddressDto, DriverCreateUserDto } from './driver-create-user.dto';
declare const DriverUpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<DriverCreateUserDto>>;
export declare class DriverUpdateUserDto extends DriverUpdateUserDto_base {
    _id: Types.ObjectId;
    isEmailVerified: boolean;
    isLocked: boolean;
    isDeleted: boolean;
}
export declare class DriverUpdateUserProfileDto {
    _id: Types.ObjectId;
    avatarId?: Types.ObjectId;
    name?: string;
    addresses?: DriverCreateUserAddressDto[];
    email?: string;
    gender?: string;
    birthdate?: string;
}
export declare class DriverUpdatePasswordUserDto {
    oldPassword: string;
    password: string;
}
export {};

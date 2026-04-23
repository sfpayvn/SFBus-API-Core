import { Types } from 'mongoose';
import { PosCreateUserAddressDto, PosCreateUserDto } from './pos-create-user.dto';
declare const PosUpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<PosCreateUserDto>>;
export declare class PosUpdateUserDto extends PosUpdateUserDto_base {
    _id: Types.ObjectId;
    isEmailVerified: boolean;
    isLocked: boolean;
    isDeleted: boolean;
}
export declare class PosUpdateUserProfileDto {
    _id: Types.ObjectId;
    avatarId?: Types.ObjectId;
    name?: string;
    addresses?: PosCreateUserAddressDto[];
    email?: string;
    gender?: string;
    birthdate?: string;
}
export declare class PosUpdatePasswordUserDto {
    oldPassword: string;
    password: string;
}
export {};

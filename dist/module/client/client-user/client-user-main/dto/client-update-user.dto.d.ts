import { Types } from 'mongoose';
import { ClientCreateUserAddressDto, ClientCreateUserDto } from './client-create-user.dto';
declare const ClientUpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Omit<ClientCreateUserDto, "password">>;
export declare class ClientUpdateUserDto extends ClientUpdateUserDto_base {
    _id: Types.ObjectId;
    isEmailVerified: boolean;
    isLocked: boolean;
    isDeleted: boolean;
}
export declare class ClientUpdateUserProfileDto {
    _id: Types.ObjectId;
    avatarId?: Types.ObjectId;
    name?: string;
    addresses?: ClientCreateUserAddressDto[];
    email?: string;
    gender?: string;
    birthdate?: string;
}
export declare class ClientUpdatePasswordUserDto {
    oldPassword?: string;
    password: string;
    otpToken?: string;
    phoneNumber?: string;
}
export {};

import { CreateUserAddressDto } from './create-user.dto';
import { Types } from 'mongoose';
export declare class UpdateUserProfileDto {
    _id: Types.ObjectId;
    avatarId?: Types.ObjectId;
    name?: string;
    addresses?: CreateUserAddressDto[];
    email?: string;
    gender?: string;
    birthdate?: string;
}
export declare class UpdatePasswordUserDto {
    oldPassword?: string;
    password: string;
}

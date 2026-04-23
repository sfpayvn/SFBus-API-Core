import { UserDocument } from '@/module/core/user/user/schema/user.schema';
import { Model, Types } from 'mongoose';
import { UserService } from '@/module/core/user/user/user.service';
import { PosUserDto } from './dto/pos-user.dto';
import { PosCreateUserDto } from './dto/pos-create-user.dto';
import { PosUpdatePasswordUserDto, PosUpdateUserProfileDto } from './dto/pos-update-user.dto';
export declare class PosUserService {
    private userModel;
    private readonly userService;
    constructor(userModel: Model<UserDocument>, userService: UserService);
    create(PosCreateUserDto: PosCreateUserDto, tenantId?: Types.ObjectId): Promise<PosUserDto>;
    update(posUpdateUserProfileDto: PosUpdateUserProfileDto, tenantId: Types.ObjectId): Promise<PosUserDto>;
    updateUserField(userId: Types.ObjectId, fieldName: string, value: any, tenantId: Types.ObjectId): Promise<PosUserDto>;
    updatePassword(userId: Types.ObjectId, PosUpdatePasswordUserDto: PosUpdatePasswordUserDto, tenantId: Types.ObjectId): Promise<PosUserDto>;
    findById(userId: Types.ObjectId, tenantId: Types.ObjectId): Promise<PosUserDto | null>;
    findByIds(userIds: Types.ObjectId[], tenantId: Types.ObjectId): Promise<PosUserDto[] | null>;
    findByPhoneNumber(phoneNumber: string, tenantId?: Types.ObjectId): Promise<PosUserDto | null>;
    findAll(tenantId: Types.ObjectId): Promise<PosUserDto[]>;
    findAllByRole(role: string, tenantId: Types.ObjectId): Promise<PosUserDto[]>;
    findOne(id: string, tenantId: Types.ObjectId): Promise<PosUserDto>;
    findByPhone(phoneNumber: string, tenantId: Types.ObjectId): Promise<PosUserDto>;
    findByEmail(email: string, tenantId: Types.ObjectId): Promise<PosUserDto>;
    findOneByRole(role: string, tenantId: Types.ObjectId): Promise<PosUserDto>;
}

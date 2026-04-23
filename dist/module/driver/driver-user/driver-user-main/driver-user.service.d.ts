import { UserDocument } from '@/module/core/user/user/schema/user.schema';
import { Model, Types } from 'mongoose';
import { UserService } from '@/module/core/user/user/user.service';
import { DriverUserDto } from './dto/driver-user.dto';
import { DriverCreateUserDto } from './dto/driver-create-user.dto';
import { DriverUpdatePasswordUserDto, DriverUpdateUserProfileDto } from './dto/driver-update-user.dto';
export declare class DriverUserService {
    private userModel;
    private readonly userService;
    constructor(userModel: Model<UserDocument>, userService: UserService);
    create(DriverCreateUserDto: DriverCreateUserDto, tenantId?: Types.ObjectId): Promise<DriverUserDto>;
    update(driverUpdateUserProfileDto: DriverUpdateUserProfileDto, tenantId: Types.ObjectId): Promise<DriverUserDto>;
    updateUserField(userId: Types.ObjectId, fieldName: string, value: any, tenantId: Types.ObjectId): Promise<DriverUserDto>;
    updatePassword(userId: Types.ObjectId, DriverUpdatePasswordUserDto: DriverUpdatePasswordUserDto, tenantId: Types.ObjectId): Promise<DriverUserDto>;
    findById(userId: Types.ObjectId, tenantId: Types.ObjectId): Promise<DriverUserDto | null>;
    findByIds(userIds: Types.ObjectId[], tenantId: Types.ObjectId): Promise<DriverUserDto[] | null>;
    findByPhoneNumber(phoneNumber: string, tenantId?: Types.ObjectId): Promise<DriverUserDto | null>;
    findAll(tenantId: Types.ObjectId): Promise<DriverUserDto[]>;
    findAllByRole(role: string, tenantId: Types.ObjectId): Promise<DriverUserDto[]>;
    findOne(id: string, tenantId: Types.ObjectId): Promise<DriverUserDto>;
    findByPhone(phoneNumber: string, tenantId: Types.ObjectId): Promise<DriverUserDto>;
    findByEmail(email: string, tenantId: Types.ObjectId): Promise<DriverUserDto>;
    findOneByRole(role: string, tenantId: Types.ObjectId): Promise<DriverUserDto>;
}

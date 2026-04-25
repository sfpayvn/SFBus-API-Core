import { Model, Types } from 'mongoose';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateUserProfileDto, UpdatePasswordUserDto } from '../user/dto/update-user.dto';
import { UserDto, SearchUsersRes, SearchUserQuerySortFilter } from '../user/dto/user.dto';
import { UserDocument } from '../user/schema/user.schema';
export declare class UserPosService {
    private userModel;
    private readonly userService;
    constructor(userModel: Model<UserDocument>, userService: UserService);
    create(createUserDto: CreateUserDto, tenantId?: Types.ObjectId): Promise<UserDto>;
    update(updateUserProfileDto: UpdateUserProfileDto, tenantId: Types.ObjectId): Promise<UserDto>;
    updateUserField(userId: Types.ObjectId, fieldName: string, value: any, tenantId: Types.ObjectId): Promise<UserDto>;
    updatePassword(userId: Types.ObjectId, updatePasswordUserDto: UpdatePasswordUserDto, tenantId: Types.ObjectId): Promise<UserDto>;
    setPasswordAsTemp(userId: Types.ObjectId, tempPassword: string, tenantId: Types.ObjectId): Promise<boolean>;
    delete(id: Types.ObjectId): Promise<boolean>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: SearchUserQuerySortFilter, filters: SearchUserQuerySortFilter[], tenantId: Types.ObjectId): Promise<SearchUsersRes>;
}

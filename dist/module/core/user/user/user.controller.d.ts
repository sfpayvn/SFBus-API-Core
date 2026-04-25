import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordUserDto } from './dto/update-user.dto';
import { SearchUsersTypesQuery, UserDto } from './dto/user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    register(createUserDto: CreateUserDto): Promise<{
        message: string;
        user: {
            phoneNumber: string;
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    updatePassword(user: UserTokenDto, updatePasswordUserDto: UpdatePasswordUserDto): Promise<{
        message: string;
        user: {
            email: string;
            name: string;
        };
    }>;
    findOne(id: string, user: UserTokenDto): Promise<UserDto>;
    findOneByRole(role: string, user: UserTokenDto): Promise<UserDto>;
    findAllByRole(role: string, user: UserTokenDto): Promise<UserDto[]>;
    findAll(user: UserTokenDto): Promise<UserDto[]>;
    getCurrentUser(user: UserTokenDto): Promise<UserDto>;
    search(query: SearchUsersTypesQuery, user: UserTokenDto): Promise<import("./dto/user.dto").SearchUsersRes>;
}

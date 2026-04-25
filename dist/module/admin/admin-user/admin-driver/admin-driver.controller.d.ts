import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { AdminDriverService } from './admin-driver.service';
import { Types } from 'mongoose';
import { AdminCreateDriverDto } from './dto/admin-create-driver.dto';
import { AdminUpdateDriverDto } from './dto/admin-update-driver.dto';
import { AdminSearchDriversQuery } from './dto/admin-driver.dto';
export declare class AdminDriverController {
    private adminDriverService;
    constructor(adminDriverService: AdminDriverService);
    create(adminCreateDriverDto: AdminCreateDriverDto, user: UserTokenDto): Promise<import("./dto/admin-driver.dto").AdminDriverDto>;
    update(adminUpdateDriverDto: AdminUpdateDriverDto, user: UserTokenDto): Promise<import("./dto/admin-driver.dto").AdminDriverDto>;
    deleteByUserId(userId: Types.ObjectId, user: UserTokenDto): Promise<boolean>;
    findOne(id: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/admin-driver.dto").AdminDriverDto>;
    findOneByUser(userId: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/admin-driver.dto").AdminDriverDto | null>;
    findAllUserDriver(user: UserTokenDto): Promise<import("./dto/admin-driver.dto").AdminDriverDto[]>;
    search(query: AdminSearchDriversQuery, user: UserTokenDto): Promise<import("./dto/admin-driver.dto").AdminSearchDriversRes>;
}

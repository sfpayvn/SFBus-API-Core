import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Types } from 'mongoose';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { SearchDriversQuery } from './dto/driver.dto';
export declare class DriverController {
    private driverService;
    constructor(driverService: DriverService);
    create(createDriverDto: CreateDriverDto, user: UserTokenDto): Promise<import("./dto/driver.dto").DriverDto>;
    update(updateDriverDto: UpdateDriverDto, user: UserTokenDto): Promise<import("./dto/driver.dto").DriverDto>;
    delete(id: Types.ObjectId, user: UserTokenDto): Promise<boolean>;
    findOne(id: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/driver.dto").DriverDto>;
    findOneByUser(userId: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/driver.dto").DriverDto | null>;
    findAllUserDriver(user: UserTokenDto): Promise<import("./dto/driver.dto").DriverDto[]>;
    search(query: SearchDriversQuery, user: UserTokenDto): Promise<import("./dto/driver.dto").SearchDriversRes>;
}

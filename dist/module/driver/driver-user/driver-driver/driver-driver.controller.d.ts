import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { DriverDriverService } from './driver-driver.service';
import { Types } from 'mongoose';
import { DriverUpdateDriverDto } from './dto/driver-update-driver.dto';
export declare class DriverDriverController {
    private DriverDriverService;
    constructor(DriverDriverService: DriverDriverService);
    update(DriverUpdateDriverDto: DriverUpdateDriverDto, user: UserTokenDto): Promise<import("./dto/driver-driver.dto").DriverDriverDto>;
    findOne(id: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/driver-driver.dto").DriverDriverDto>;
    findOneByUser(userId: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/driver-driver.dto").DriverDriverDto | null>;
    findAllUserDriver(user: UserTokenDto): Promise<import("./dto/driver-driver.dto").DriverDriverDto[]>;
}

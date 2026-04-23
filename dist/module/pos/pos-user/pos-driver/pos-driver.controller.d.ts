import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { PosDriverService } from './pos-driver.service';
import { Types } from 'mongoose';
export declare class PosDriverController {
    private PosDriverService;
    constructor(PosDriverService: PosDriverService);
    findOne(id: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/pos-driver.dto").PosDriverDto>;
    findOneByUser(userId: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/pos-driver.dto").PosDriverDto | null>;
    findAllUserDriver(user: UserTokenDto): Promise<import("./dto/pos-driver.dto").PosDriverDto[]>;
}

import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { ClientDriverService } from './client-driver.service';
import { Types } from 'mongoose';
export declare class ClientDriverController {
    private ClientDriverService;
    constructor(ClientDriverService: ClientDriverService);
    findOne(id: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/client-driver.dto").ClientDriverDto>;
    findOneByUser(userId: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/client-driver.dto").ClientDriverDto | null>;
    findAllUserDriver(user: UserTokenDto): Promise<import("./dto/client-driver.dto").ClientDriverDto[]>;
}

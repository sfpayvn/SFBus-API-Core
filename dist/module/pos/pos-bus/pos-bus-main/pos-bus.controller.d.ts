import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { PosBusService } from './pos-bus.service';
import { Types } from 'mongoose';
import { TenantScopeResult } from '@/common/tenant/tenant-scope';
export declare class PosBusController {
    private readonly PosBusService;
    constructor(PosBusService: PosBusService);
    findAll(user: UserTokenDto): Promise<import("./dto/pos-bus.dto").PosBusDto[]>;
    findOne(id: Types.ObjectId, user: UserTokenDto): Promise<import("./dto/pos-bus.dto").PosBusDto | null>;
    findByBusTemplate(busTemplateId: Types.ObjectId, tenantScope: TenantScopeResult): Promise<import("./dto/pos-bus.dto").PosBusDto[]>;
}

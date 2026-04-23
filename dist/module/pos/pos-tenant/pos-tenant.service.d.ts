import { TenantService } from '../../core/tenant/tenant.service';
export declare class PosTenantService {
    private readonly tenantService;
    constructor(tenantService: TenantService);
    findByCode(code: string): Promise<import("../../core/tenant/dto/tenant.dto").TenantDto>;
}

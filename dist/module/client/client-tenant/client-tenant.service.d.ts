import { TenantService } from '../../core/tenant/tenant.service';
export declare class ClientTenantService {
    private readonly tenantService;
    constructor(tenantService: TenantService);
    findOne(id: string): Promise<import("../../core/tenant/dto/tenant.dto").TenantDto | null>;
    findByCode(code: string): Promise<import("../../core/tenant/dto/tenant.dto").TenantDto>;
    findByPhoneNumber(phoneNumber: string): Promise<import("../../core/tenant/dto/tenant.dto").TenantDto>;
}

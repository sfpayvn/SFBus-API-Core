import { TenantService } from '../../core/tenant/tenant.service';
export declare class DriverTenantService {
    private readonly tenantService;
    constructor(tenantService: TenantService);
    findOne(id: string): Promise<import("../../core/tenant/dto/tenant.dto").TenantDto | null>;
    findByPhoneNumber(phoneNumber: string): Promise<import("../../core/tenant/dto/tenant.dto").TenantDto>;
    findByCode(code: string): Promise<import("../../core/tenant/dto/tenant.dto").TenantDto>;
}

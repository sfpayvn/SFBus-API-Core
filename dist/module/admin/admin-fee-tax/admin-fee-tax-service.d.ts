import { FeeTaxService } from '@/module/core/fee-tax/fee-tax.service';
import { CreateFeeTaxDto, UpdateFeeTaxDto, FeeTaxDto } from '@/module/core/fee-tax/dto/fee-tax.dto';
import { AdminSearchFeeTaxPagingRes, FeeTaxSortFilter } from './dto/admin-fee-tax.dto';
import { Types } from 'mongoose';
export declare class AdminFeeTaxService {
    private readonly feeTaxService;
    constructor(feeTaxService: FeeTaxService);
    create(tenantId: Types.ObjectId, createDto: CreateFeeTaxDto, userId?: Types.ObjectId): Promise<FeeTaxDto>;
    findByTenant(tenantId: Types.ObjectId, enabled?: boolean): Promise<FeeTaxDto[]>;
    findById(id: string, tenantId: Types.ObjectId): Promise<FeeTaxDto>;
    update(id: string, tenantId: Types.ObjectId, updateDto: UpdateFeeTaxDto, userId?: Types.ObjectId): Promise<FeeTaxDto>;
    delete(id: string, tenantId: Types.ObjectId): Promise<void>;
    getApplicableFeesTaxes(tenantId: Types.ObjectId, params: {
        total: number;
        ticketCount: number;
        routeId?: string;
        feeType?: 'fee' | 'tax';
    }): Promise<FeeTaxDto[]>;
    calculateFeesAndTaxes(tenantId: Types.ObjectId, params: {
        bookingTotal: number;
        afterDiscountTotal: number;
        ticketCount: number;
        routeId?: string;
        tickets?: Array<{
            price: number;
        }>;
    }): Promise<{
        fees: Array<{
            name: string;
            amount: number;
            feeType: string;
        }>;
        taxes: Array<{
            name: string;
            amount: number;
            feeType: string;
        }>;
        totalFees: number;
        totalTaxes: number;
        finalTotal: number;
    }>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: FeeTaxSortFilter, filters: FeeTaxSortFilter[], tenantId: Types.ObjectId): Promise<AdminSearchFeeTaxPagingRes>;
}

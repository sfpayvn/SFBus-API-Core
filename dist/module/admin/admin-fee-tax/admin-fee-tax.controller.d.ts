import { AdminFeeTaxService } from './admin-fee-tax-service';
import { CreateFeeTaxDto, UpdateFeeTaxDto, FeeTaxDto, AdminSearchFeeTaxPagingQuery, AdminSearchFeeTaxPagingRes } from './dto/admin-fee-tax.dto';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
export declare class AdminFeeTaxController {
    private readonly adminFeeTaxService;
    constructor(adminFeeTaxService: AdminFeeTaxService);
    getApplicable(user: UserTokenDto, total?: number, ticketCount?: number, routeId?: string, feeType?: 'fee' | 'tax'): Promise<FeeTaxDto[]>;
    calculateFeesAndTaxes(params: {
        bookingTotal: number;
        afterDiscountTotal: number;
        ticketCount: number;
        routeId?: string;
        tickets?: Array<{
            price: number;
        }>;
    }, user: UserTokenDto): Promise<{
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
    searchFeeTaxPaging(query: AdminSearchFeeTaxPagingQuery, user: UserTokenDto): Promise<AdminSearchFeeTaxPagingRes>;
    create(createDto: CreateFeeTaxDto, user: UserTokenDto): Promise<FeeTaxDto>;
    getAll(user: UserTokenDto, enabled?: string): Promise<FeeTaxDto[]>;
    getById(id: string, user: UserTokenDto): Promise<FeeTaxDto>;
    update(id: string, updateDto: UpdateFeeTaxDto, user: UserTokenDto): Promise<FeeTaxDto>;
    delete(id: string, user: UserTokenDto): Promise<{
        message: string;
    }>;
}

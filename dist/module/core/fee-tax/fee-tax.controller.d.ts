import { FeeTaxService } from './fee-tax.service';
import { CreateFeeTaxDto, UpdateFeeTaxDto, FeeTaxDto } from './dto/fee-tax.dto';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
export declare class FeeTaxController {
    private readonly feeTaxService;
    constructor(feeTaxService: FeeTaxService);
    create(createDto: CreateFeeTaxDto, user: UserTokenDto): Promise<FeeTaxDto>;
    getAll(user: UserTokenDto, enabled?: string): Promise<FeeTaxDto[]>;
    getById(id: string, user: UserTokenDto): Promise<FeeTaxDto>;
    update(id: string, updateDto: UpdateFeeTaxDto, user: UserTokenDto): Promise<FeeTaxDto>;
    delete(id: string, user: UserTokenDto): Promise<{
        message: string;
    }>;
    getApplicable(user: UserTokenDto, total?: number, ticketCount?: number, routeId?: string, feeType?: 'fee' | 'tax'): Promise<FeeTaxDto[]>;
}

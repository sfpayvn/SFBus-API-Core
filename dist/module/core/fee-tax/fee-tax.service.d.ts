import { Model, Types } from 'mongoose';
import { FeeTaxDocument } from './schema/fee-tax.schema';
import { CreateFeeTaxDto, UpdateFeeTaxDto, FeeTaxDto } from './dto/fee-tax.dto';
export declare class FeeTaxService {
    private readonly feeTaxModel;
    constructor(feeTaxModel: Model<FeeTaxDocument>);
    create(tenantId: string, createDto: CreateFeeTaxDto, userId?: string): Promise<FeeTaxDto>;
    findByTenant(tenantId: string, enabled?: boolean): Promise<FeeTaxDto[]>;
    findById(id: string, tenantId: string): Promise<FeeTaxDto>;
    getApplicableFeesTaxes(tenantId: string, params: {
        total: number;
        ticketCount: number;
        routeId?: string;
        feeType?: 'fee' | 'tax';
    }): Promise<FeeTaxDto[]>;
    update(id: string, tenantId: string, updateDto: UpdateFeeTaxDto, userId?: string): Promise<FeeTaxDto>;
    delete(id: string, tenantId: string): Promise<void>;
    calculateFeesAndTaxes(tenantId: string, params: {
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
    private calculateAmount;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: {
        key: string;
        value: 'ascend' | 'desc';
    }, filters: {
        key: string;
        value: string | string[] | Types.ObjectId | Types.ObjectId[];
    }[], tenantId: Types.ObjectId): Promise<{
        pageIdx: number;
        feeTaxes: FeeTaxDto[];
        totalPage: number;
        totalItem: number;
    }>;
    buildQuerySearchFeeTaxPaging(pageIdx: number, pageSize: number, keyword: string, sortBy: {
        key: string;
        value: 'ascend' | 'desc';
    }, filters: {
        key: string;
        value: string | string[] | Types.ObjectId | Types.ObjectId[];
    }[], tenantId: Types.ObjectId): Promise<any>;
    private toDto;
}

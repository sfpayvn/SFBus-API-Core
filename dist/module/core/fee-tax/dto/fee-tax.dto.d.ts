export declare class FeeTaxConditionsDto {
    minTotal?: number;
    maxTotal?: number;
    minTickets?: number;
    maxTickets?: number;
    appliedRoutes?: string[];
    excludedRoutes?: string[];
}
export declare class CreateFeeTaxDto {
    feeType: 'fee' | 'tax';
    name: string;
    calculationType: 'fixed' | 'percentage';
    appliedOn: 'ticket_price' | 'total_booking' | 'after_discount';
    value: number;
    priority?: number;
    enabled?: boolean;
    description?: string;
    conditions?: FeeTaxConditionsDto;
    startDate?: string;
    endDate?: string;
}
export declare class UpdateFeeTaxDto {
    feeType?: 'fee' | 'tax';
    name?: string;
    calculationType?: 'fixed' | 'percentage';
    appliedOn?: 'ticket_price' | 'total_booking' | 'after_discount';
    value?: number;
    priority?: number;
    enabled?: boolean;
    description?: string;
    conditions?: FeeTaxConditionsDto;
    startDate?: string;
    endDate?: string;
}
export declare class FeeTaxDto {
    _id: string;
    tenantId: string;
    feeType: 'fee' | 'tax';
    name: string;
    calculationType: 'fixed' | 'percentage';
    appliedOn: 'ticket_price' | 'total_booking' | 'after_discount';
    value: number;
    priority: number;
    enabled: boolean;
    description?: string;
    conditions?: FeeTaxConditionsDto;
    startDate?: Date;
    endDate?: Date;
    createdAt: Date;
    updatedAt: Date;
    createdBy?: string;
    updatedBy?: string;
}

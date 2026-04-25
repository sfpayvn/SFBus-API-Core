export declare class TopRoutesQueryDto {
    startDate: Date;
    endDate: Date;
    platform?: string;
    userId?: string;
}
export declare class TopRouteItemDto {
    routeId: string;
    routeName: string;
    ticketCount: number;
    percentage: number;
    revenue: number;
}
export declare class TopRoutesResponseDto {
    data: TopRouteItemDto[];
    total: number;
    totalRevenue: number;
    metadata: {
        startDate: string;
        endDate: string;
    };
}

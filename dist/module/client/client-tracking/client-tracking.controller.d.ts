import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { ClientTrackingService } from './client-tracking.service';
import { CreateTrackingDto } from '@/module/core/tracking/dto/create-tracking.dto';
import { SearchTrackingQuerySortFilter } from '@/module/core/tracking/dto/tracking.dto';
export declare class ClientTrackingController {
    private readonly trackingService;
    constructor(trackingService: ClientTrackingService);
    create(createTrackingDto: CreateTrackingDto, user: UserTokenDto): Promise<import("@/module/core/tracking/dto/tracking.dto").TrackingDto>;
    findAll(user: UserTokenDto): Promise<import("@/module/core/tracking/dto/tracking.dto").TrackingDto[]>;
    findByType(type: string, user: UserTokenDto): Promise<import("@/module/core/tracking/dto/tracking.dto").TrackingDto[]>;
    findOne(id: string, user: UserTokenDto): Promise<import("@/module/core/tracking/dto/tracking.dto").TrackingDto>;
    search(body: {
        pageIdx: number;
        pageSize: number;
        keyword: string;
        sortBy: SearchTrackingQuerySortFilter;
        filters: SearchTrackingQuerySortFilter[];
    }, user: UserTokenDto): Promise<import("@/module/core/tracking/dto/tracking.dto").SearchTrackingRes>;
}

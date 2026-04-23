import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { PosTrackingService } from './pos-tracking.service';
import { CreateTrackingDto } from '@/module/core/tracking/dto/create-tracking.dto';
import { UpdateTrackingDto } from '@/module/core/tracking/dto/update-tracking.dto';
import { SearchTrackingQuerySortFilter } from '@/module/core/tracking/dto/tracking.dto';
export declare class PosTrackingController {
    private readonly trackingService;
    constructor(trackingService: PosTrackingService);
    create(createTrackingDto: CreateTrackingDto, user: UserTokenDto): Promise<import("@/module/core/tracking/dto/tracking.dto").TrackingDto>;
    findAll(user: UserTokenDto): Promise<import("@/module/core/tracking/dto/tracking.dto").TrackingDto[]>;
    findByType(type: string, user: UserTokenDto): Promise<import("@/module/core/tracking/dto/tracking.dto").TrackingDto[]>;
    findOne(id: string, user: UserTokenDto): Promise<import("@/module/core/tracking/dto/tracking.dto").TrackingDto>;
    update(updateTrackingDto: UpdateTrackingDto, user: UserTokenDto): Promise<import("@/module/core/tracking/dto/tracking.dto").TrackingDto>;
    remove(id: string, user: UserTokenDto): Promise<boolean>;
    search(body: {
        pageIdx: number;
        pageSize: number;
        keyword: string;
        sortBy: SearchTrackingQuerySortFilter;
        filters: SearchTrackingQuerySortFilter[];
    }, user: UserTokenDto): Promise<import("@/module/core/tracking/dto/tracking.dto").SearchTrackingRes>;
}

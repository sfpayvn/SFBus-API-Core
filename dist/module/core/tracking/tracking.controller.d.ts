import { TrackingService } from './tracking.service';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { UpdateTrackingDto } from './dto/update-tracking.dto';
import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { SearchTrackingQuerySortFilter } from './dto/tracking.dto';
export declare class TrackingController {
    private readonly trackingService;
    constructor(trackingService: TrackingService);
    create(createTrackingDto: CreateTrackingDto, user: UserTokenDto): Promise<import("./dto/tracking.dto").TrackingDto>;
    findAll(user: UserTokenDto): Promise<import("./dto/tracking.dto").TrackingDto[]>;
    findByType(type: string, user: UserTokenDto): Promise<import("./dto/tracking.dto").TrackingDto[]>;
    findOne(id: string, user: UserTokenDto): Promise<import("./dto/tracking.dto").TrackingDto>;
    update(updateTrackingDto: UpdateTrackingDto, user: UserTokenDto): Promise<import("./dto/tracking.dto").TrackingDto>;
    remove(id: string, user: UserTokenDto): Promise<boolean>;
    search(body: {
        pageIdx: number;
        pageSize: number;
        keyword: string;
        sortBy: SearchTrackingQuerySortFilter;
        filters: SearchTrackingQuerySortFilter[];
    }, user: UserTokenDto): Promise<import("./dto/tracking.dto").SearchTrackingRes>;
}

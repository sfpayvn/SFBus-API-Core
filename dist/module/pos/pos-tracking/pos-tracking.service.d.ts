import { Types } from 'mongoose';
import { TrackingService } from '@/module/core/tracking/tracking.service';
import { CreateTrackingDto } from '@/module/core/tracking/dto/create-tracking.dto';
import { UpdateTrackingDto } from '@/module/core/tracking/dto/update-tracking.dto';
import { TrackingDto, SearchTrackingQuerySortFilter, SearchTrackingRes } from '@/module/core/tracking/dto/tracking.dto';
export declare class PosTrackingService {
    private readonly trackingService;
    constructor(trackingService: TrackingService);
    create(createTrackingDto: CreateTrackingDto, tenantId: Types.ObjectId): Promise<TrackingDto>;
    findAll(tenantId: Types.ObjectId): Promise<TrackingDto[]>;
    findOne(id: string, tenantId: Types.ObjectId): Promise<TrackingDto>;
    findByType(type: string, tenantId: Types.ObjectId): Promise<TrackingDto[]>;
    update(updateTrackingDto: UpdateTrackingDto, tenantId: Types.ObjectId): Promise<TrackingDto>;
    remove(id: string, tenantId: Types.ObjectId): Promise<boolean>;
    searchTracking(pageIdx: number, pageSize: number, keyword: string, sortBy: SearchTrackingQuerySortFilter, filters: SearchTrackingQuerySortFilter[], tenantId: Types.ObjectId): Promise<SearchTrackingRes>;
}

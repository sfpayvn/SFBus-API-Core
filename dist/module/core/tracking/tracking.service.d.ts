import { Model, Types } from 'mongoose';
import { TrackingDocument } from './schema/tracking.schema';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { UpdateTrackingDto } from './dto/update-tracking.dto';
import { TrackingDto, SearchTrackingQuerySortFilter, SearchTrackingRes } from './dto/tracking.dto';
export declare class TrackingService {
    private readonly trackingModel;
    constructor(trackingModel: Model<TrackingDocument>);
    create(createTrackingDto: CreateTrackingDto, tenantId: Types.ObjectId): Promise<TrackingDto>;
    findAll(tenantId: Types.ObjectId): Promise<TrackingDto[]>;
    findOne(id: string, tenantId: Types.ObjectId): Promise<TrackingDto>;
    findByType(type: string, tenantId: Types.ObjectId): Promise<TrackingDto[]>;
    update(updateTrackingDto: UpdateTrackingDto, tenantId: Types.ObjectId): Promise<TrackingDto>;
    remove(id: string, tenantId: Types.ObjectId): Promise<boolean>;
    searchTracking(pageIdx: number, pageSize: number, keyword: string, sortBy: SearchTrackingQuerySortFilter, filters: SearchTrackingQuerySortFilter[], tenantId: Types.ObjectId): Promise<SearchTrackingRes>;
}

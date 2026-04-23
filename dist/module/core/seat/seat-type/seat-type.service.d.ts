import { Model, Types } from 'mongoose';
import { SearchSeatTypeQuerySortFilter, SearchSeatTypeRes, SeatTypeDto } from './dto/seat-type.dto';
import { CreateSeatTypeDto } from './dto/create-seat-type.dto';
import { SeatTypeDocument } from './schema/seat-type.schema';
import { UpdateSeatTypeDto } from './dto/update-seat-type.dto';
export declare class SeatTypeService {
    private readonly seatTypeModel;
    constructor(seatTypeModel: Model<SeatTypeDocument>);
    create(createSeatTypeDto: CreateSeatTypeDto, tenantId: Types.ObjectId): Promise<SeatTypeDto>;
    update(updateSeatTypeDto: UpdateSeatTypeDto, tenantId: Types.ObjectId): Promise<SeatTypeDto>;
    delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean>;
    findAll(tenantIds: Types.ObjectId[]): Promise<SeatTypeDto[]>;
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<SeatTypeDto>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: SearchSeatTypeQuerySortFilter, filters: SearchSeatTypeQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<SearchSeatTypeRes>;
    buildQuerySearchBusTypes(pageIdx: number, pageSize: number, keyword: string, sortBy: SearchSeatTypeQuerySortFilter, filters: SearchSeatTypeQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<any>;
    mapSeatTypeIconUrl(seatTypes: SeatTypeDto[]): SeatTypeDto[];
}

import { SeatTypeDocument } from '@/module/core/seat/seat-type/schema/seat-type.schema';
import { SeatTypeService } from '@/module/core/seat/seat-type/seat-type.service';
import { Model, Types } from 'mongoose';
import { PosSeatTypeDto, PosSearchSeatTypesQuerySortFilter, PosSearchSeatTypeRes } from './dto/pos-seat-type.dto';
export declare class PosSeatTypeService {
    private readonly seatTypeModel;
    private readonly seatTypeService;
    ROOT_TENANT_ID: string;
    constructor(seatTypeModel: Model<SeatTypeDocument>, seatTypeService: SeatTypeService);
    findAll(tenantIds: Types.ObjectId[]): Promise<PosSeatTypeDto[]>;
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<PosSeatTypeDto>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: PosSearchSeatTypesQuerySortFilter, filters: PosSearchSeatTypesQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<PosSearchSeatTypeRes>;
}

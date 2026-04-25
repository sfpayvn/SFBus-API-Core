import { SeatTypeDocument } from '@/module/core/seat/seat-type/schema/seat-type.schema';
import { SeatTypeService } from '@/module/core/seat/seat-type/seat-type.service';
import { Model, Types } from 'mongoose';
import { DriverSeatTypeDto, DriverSearchSeatTypesQuerySortFilter, DriverSearchSeatTypeRes } from './dto/driver-seat-type.dto';
export declare class DriverSeatTypeService {
    private readonly seatTypeModel;
    private readonly seatTypeService;
    ROOT_TENANT_ID: string;
    constructor(seatTypeModel: Model<SeatTypeDocument>, seatTypeService: SeatTypeService);
    findAll(tenantIds: Types.ObjectId[]): Promise<DriverSeatTypeDto[]>;
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<DriverSeatTypeDto>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: DriverSearchSeatTypesQuerySortFilter, filters: DriverSearchSeatTypesQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<DriverSearchSeatTypeRes>;
}

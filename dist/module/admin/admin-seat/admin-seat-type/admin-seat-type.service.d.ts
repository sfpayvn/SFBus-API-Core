import { SeatTypeDocument } from '@/module/core/seat/seat-type/schema/seat-type.schema';
import { SeatTypeService } from '@/module/core/seat/seat-type/seat-type.service';
import { Model, Types } from 'mongoose';
import { AdminCreateSeatTypeDto } from './dto/admin-create-seat-type.dto';
import { AdminSeatTypeDto, AdminSearchSeatTypesQuerySortFilter, AdminSearchSeatTypeRes } from './dto/admin-seat-type.dto';
import { AdminUpdateSeatTypeDto } from './dto/admin-update-seat-type.dto';
export declare class AdminSeatTypeService {
    private readonly seatTypeModel;
    private readonly seatTypeService;
    ROOT_TENANT_ID: string;
    constructor(seatTypeModel: Model<SeatTypeDocument>, seatTypeService: SeatTypeService);
    create(adminCreateSeatTypeDto: AdminCreateSeatTypeDto, tenantId: Types.ObjectId): Promise<AdminSeatTypeDto>;
    update(adminUpdateSeatTypeDto: AdminUpdateSeatTypeDto, tenantId: Types.ObjectId): Promise<AdminSeatTypeDto>;
    delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean>;
    findAll(tenantIds: Types.ObjectId[]): Promise<AdminSeatTypeDto[]>;
    findOne(id: Types.ObjectId, tenantIds: Types.ObjectId[]): Promise<AdminSeatTypeDto>;
    search(pageIdx: number, pageSize: number, keyword: string, sortBy: AdminSearchSeatTypesQuerySortFilter, filters: AdminSearchSeatTypesQuerySortFilter[], tenantIds: Types.ObjectId[]): Promise<AdminSearchSeatTypeRes>;
}

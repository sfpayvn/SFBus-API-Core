import { BusDocument } from '@/module/core/bus/bus/schema/bus.schema';
import { Model, Types } from 'mongoose';
import { PosBusDto } from './dto/pos-bus.dto';
import { BusService } from '@/module/core/bus/bus/bus.service';
export declare class PosBusService {
    private readonly busModel;
    private readonly busService;
    constructor(busModel: Model<BusDocument>, busService: BusService);
    findOne(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<PosBusDto | null>;
    findByBusTemplate(busTemplateId: Types.ObjectId, tenantId: Types.ObjectId, rootTenantId: Types.ObjectId): Promise<PosBusDto[]>;
    findAll(tenantId: Types.ObjectId): Promise<PosBusDto[]>;
}

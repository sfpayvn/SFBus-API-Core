import { Types } from 'mongoose';
import { AdminCreateBusLayoutTemplateDto } from './admin-create-bus-layout-template.dto';
declare const AdminUpdateBusLayoutTemplateDto_base: import("@nestjs/mapped-types").MappedType<Partial<AdminCreateBusLayoutTemplateDto>>;
export declare class AdminUpdateBusLayoutTemplateDto extends AdminUpdateBusLayoutTemplateDto_base {
    _id: Types.ObjectId;
}
export {};

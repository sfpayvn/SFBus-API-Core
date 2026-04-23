import { Types } from 'mongoose';
import { AdminCreateBusTemplateDto } from './admin-create-bus-template.dto';
declare const AdminUpdateBusTemplateDto_base: import("@nestjs/mapped-types").MappedType<Partial<AdminCreateBusTemplateDto>>;
export declare class AdminUpdateBusTemplateDto extends AdminUpdateBusTemplateDto_base {
    _id: Types.ObjectId;
}
export {};

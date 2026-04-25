import { CreateBusLayoutTemplateDto } from './create-bus-layout-template.dto';
import { Types } from 'mongoose';
declare const UpdateBusLayoutTemplateDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateBusLayoutTemplateDto>>;
export declare class UpdateBusLayoutTemplateDto extends UpdateBusLayoutTemplateDto_base {
    _id: Types.ObjectId;
}
export {};

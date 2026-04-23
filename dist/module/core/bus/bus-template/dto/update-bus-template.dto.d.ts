import { Types } from 'mongoose';
import { CreateBusTemplateDto } from './create-bus-template.dto';
declare const UpdateBusTemplateDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateBusTemplateDto>>;
export declare class UpdateBusTemplateDto extends UpdateBusTemplateDto_base {
    _id: Types.ObjectId;
}
export {};

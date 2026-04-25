import { CreateBusProvinceDto } from './create-bus-province.dto';
import { Types } from 'mongoose';
declare const UpdateBusProvinceDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateBusProvinceDto>>;
export declare class UpdateBusProvinceDto extends UpdateBusProvinceDto_base {
    _id: Types.ObjectId;
}
export {};

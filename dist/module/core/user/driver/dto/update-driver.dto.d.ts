import { CreateDriverDto } from './create-driver.dto';
import { Types } from 'mongoose';
declare const UpdateDriverDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateDriverDto>>;
export declare class UpdateDriverDto extends UpdateDriverDto_base {
    _id: Types.ObjectId;
}
export {};

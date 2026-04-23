import { DriverCreateSettingDto } from './driver-create-setting.dto';
import { Types } from 'mongoose';
declare const DriverUpdateSettingDto_base: import("@nestjs/mapped-types").MappedType<Partial<DriverCreateSettingDto>>;
export declare class DriverUpdateSettingDto extends DriverUpdateSettingDto_base {
    _id: Types.ObjectId;
}
export {};

import { PosCreateSettingDto } from './pos-create-setting.dto';
import { Types } from 'mongoose';
declare const PosUpdateSettingDto_base: import("@nestjs/mapped-types").MappedType<Partial<PosCreateSettingDto>>;
export declare class PosUpdateSettingDto extends PosUpdateSettingDto_base {
    _id: Types.ObjectId;
}
export {};

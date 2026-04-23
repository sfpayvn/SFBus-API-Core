import { CreateSettingDto } from './create-setting.dto';
import { Types } from 'mongoose';
declare const UpdateSettingDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateSettingDto>>;
export declare class UpdateSettingDto extends UpdateSettingDto_base {
    _id: Types.ObjectId;
}
export {};

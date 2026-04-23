import { AdminCreateSettingDto } from './admin-create-setting.dto';
import { Types } from 'mongoose';
declare const AdminUpdateSettingDto_base: import("@nestjs/mapped-types").MappedType<Partial<AdminCreateSettingDto>>;
export declare class AdminUpdateSettingDto extends AdminUpdateSettingDto_base {
    _id: Types.ObjectId;
}
export {};

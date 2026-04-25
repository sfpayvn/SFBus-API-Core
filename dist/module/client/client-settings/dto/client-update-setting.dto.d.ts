import { ClientCreateSettingDto } from './client-create-setting.dto';
import { Types } from 'mongoose';
declare const ClientUpdateSettingDto_base: import("@nestjs/mapped-types").MappedType<Partial<ClientCreateSettingDto>>;
export declare class ClientUpdateSettingDto extends ClientUpdateSettingDto_base {
    _id: Types.ObjectId;
}
export {};

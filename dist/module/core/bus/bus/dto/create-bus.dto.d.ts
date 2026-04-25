import { Types } from 'mongoose';
export declare class CreateBusDto {
    name: string;
    licensePlate: string;
    description?: string;
    busTemplateId: Types.ObjectId;
}

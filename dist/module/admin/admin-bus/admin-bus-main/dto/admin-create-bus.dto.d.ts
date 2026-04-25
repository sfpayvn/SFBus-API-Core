import { Types } from 'mongoose';
export declare class AdminCreateBusDto {
    name: string;
    licensePlate: string;
    description?: string;
    busTemplateId: Types.ObjectId;
}

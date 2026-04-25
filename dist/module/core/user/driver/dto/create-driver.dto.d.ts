import { Types } from 'mongoose';
export declare class CreateDriverDto {
    userId: Types.ObjectId;
    licenseNumber: string;
    licenseExpirationDate: Date;
    licenseType: string;
    licenseImage: string;
}

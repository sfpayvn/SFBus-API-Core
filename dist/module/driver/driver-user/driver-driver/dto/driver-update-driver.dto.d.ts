import { Types } from 'mongoose';
export declare class DriverUpdateDriverDto {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    licenseNumber: string;
    licenseExpirationDate: Date;
    licenseType: string;
    licenseImage: string;
}

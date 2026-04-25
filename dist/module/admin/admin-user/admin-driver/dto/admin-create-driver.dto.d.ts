import { Types } from 'mongoose';
export declare class AdminCreateDriverDto {
    userId: Types.ObjectId;
    licenseNumber: string;
    licenseExpirationDate: Date;
    licenseType: string;
    licenseImage: string;
}

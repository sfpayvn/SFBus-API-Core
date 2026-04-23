import { Types } from 'mongoose';
export declare class AdminCreateBusStationDto {
    name: string;
    detailAddress: string;
    location: string;
    provinceId: Types.ObjectId;
    imageId?: Types.ObjectId;
    isOffice?: boolean;
    isActive?: boolean;
}

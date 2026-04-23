import { UserTokenDto } from '@/jwt/dto/user-token.dto';
import { SeatTypeService } from './seat-type.service';
import { CreateSeatTypeDto } from './dto/create-seat-type.dto';
import { SearchSeatTypeQuery } from './dto/seat-type.dto';
import { Types } from 'mongoose';
import { UpdateSeatTypeDto } from './dto/update-seat-type.dto';
export declare class SeatTypeController {
    private readonly seatTypeService;
    constructor(seatTypeService: SeatTypeService);
    create(createSeatTypeDto: CreateSeatTypeDto, user: UserTokenDto): Promise<import("./dto/seat-type.dto").SeatTypeDto>;
    findAll(user: UserTokenDto): Promise<import("./dto/seat-type.dto").SeatTypeDto[]>;
    update(updateSeatTypeDto: UpdateSeatTypeDto, user: UserTokenDto): Promise<import("./dto/seat-type.dto").SeatTypeDto>;
    delete(id: Types.ObjectId, user: UserTokenDto): Promise<boolean>;
    search(query: SearchSeatTypeQuery, user: UserTokenDto): Promise<import("./dto/seat-type.dto").SearchSeatTypeRes>;
}

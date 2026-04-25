import { ClientContentLayoutService } from './client-content-layout.service';
import { ClientAvailableBySlugQueryDto, ClientAvailableSlugQueryDto } from './dto/client-content-layout.dto';
import { Types } from 'mongoose';
export declare class ClientContentLayoutController {
    private readonly clientContentLayoutService;
    constructor(clientContentLayoutService: ClientContentLayoutService);
    findAvailableSlugs(query: ClientAvailableSlugQueryDto, tenantId: Types.ObjectId): Promise<string[]>;
    findAvailableBySlug(query: ClientAvailableBySlugQueryDto, tenantId: Types.ObjectId): Promise<import("./dto/client-content-layout.dto").ClientContentLayoutDto>;
}

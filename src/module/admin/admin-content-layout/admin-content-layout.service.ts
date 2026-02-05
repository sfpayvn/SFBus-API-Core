import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { Types } from 'mongoose';
import { ContentLayoutService } from '@/module/core/content-layout/content-layout.service';
import { AdminUpdateContentLayoutDto } from './dto/admin-update-content-layout.dto';
import { AdminSearchContentLayoutsResultDto, AdminContentLayoutDto } from './dto/admin-content-layout.dto';
import { AdminCreateContentLayoutDto } from './dto/admin-create-content-layout.dto';

@Injectable()
export class AdminContentLayoutService {
  constructor(
    @Inject(forwardRef(() => ContentLayoutService))
    private readonly contentLayoutService: ContentLayoutService,
  ) {}

  async create(
    createContentLayoutDto: AdminCreateContentLayoutDto,
    tenantId: Types.ObjectId,
  ): Promise<AdminContentLayoutDto> {
    return this.contentLayoutService.create(createContentLayoutDto, tenantId);
  }

  async update(
    updateContentLayoutDto: AdminUpdateContentLayoutDto,
    tenantId: Types.ObjectId,
  ): Promise<AdminContentLayoutDto> {
    return this.contentLayoutService.update(updateContentLayoutDto, tenantId);
  }

  async remove(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean> {
    return this.contentLayoutService.delete(id, tenantId);
  }

  async findAll(tenantIds: Types.ObjectId[]): Promise<AdminContentLayoutDto[]> {
    return this.contentLayoutService.findAll(tenantIds);
  }

  async findOne(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<AdminContentLayoutDto | null> {
    return this.contentLayoutService.findOne(id, tenantId);
  }

  search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: any,
    filters: any[],
    tenantIds: Types.ObjectId[],
  ): Promise<AdminSearchContentLayoutsResultDto> {
    return this.contentLayoutService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
  }
}

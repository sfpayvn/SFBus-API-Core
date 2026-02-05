import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { Types } from 'mongoose';
import { WidgetBlocksService } from '@/module/core/widget-blocks/widget-blocks.service';
import { AdminUpdateWidgetBlockDto } from './dto/admin-update-widget-block.dto';
import { AdminSearchWidgetBlocksResultDto, AdminWidgetBlockDto } from './dto/admin-widget-block.dto';

@Injectable()
export class AdminWidgetBlocksService {
  constructor(
    @Inject(forwardRef(() => WidgetBlocksService))
    private readonly widgetBlocksService: WidgetBlocksService,
  ) {}

  async create(createWidgetBlockDto: any, tenantId: Types.ObjectId): Promise<AdminWidgetBlockDto> {
    return this.widgetBlocksService.create(createWidgetBlockDto, tenantId);
  }

  async update(
    updateWidgetBlockDto: AdminUpdateWidgetBlockDto,
    tenantId: Types.ObjectId,
  ): Promise<AdminWidgetBlockDto> {
    return this.widgetBlocksService.update(updateWidgetBlockDto, tenantId);
  }

  async remove(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean> {
    return this.widgetBlocksService.delete(id, tenantId);
  }

  async findAll(tenantIds: Types.ObjectId[]): Promise<AdminWidgetBlockDto[]> {
    return this.widgetBlocksService.findAll(tenantIds);
  }

  async findOne(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<AdminWidgetBlockDto> {
    return this.widgetBlocksService.findOne(id, tenantId);
  }

  search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: any,
    filters: any[],
    tenantIds: Types.ObjectId[],
  ): Promise<AdminSearchWidgetBlocksResultDto> {
    return this.widgetBlocksService.search(pageIdx, pageSize, keyword, sortBy, filters, tenantIds);
  }
}

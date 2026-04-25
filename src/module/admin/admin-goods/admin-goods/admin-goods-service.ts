import { GoodsDocument } from '@/module/core/goods/goods/schema/goods.schema';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { customAlphabet } from 'nanoid';
import { GoodsDto } from '@/module/core/goods/goods/dto/goods.dto';
import { AdminCreateGoodsDto } from './dto/admin-create-goods.dto';
import { AdminGoodsDto, AdminGoodsSortFilter, AdminSearchGoodsPagingRes } from './dto/admin-goods.dto';
import { AdminUpdateGoodsDto } from './dto/admin-update-goods.dto';
import { GoodsService } from '@/module/core/goods/goods/goods-service';

@Injectable()
export class AdminGoodsService {
  private alphabet = process.env.ALPHABET || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  private nanoid = customAlphabet(this.alphabet, 6);

  constructor(
    @InjectModel(GoodsDocument.name) private readonly goodsModel: Model<GoodsDocument>,
    @Inject(forwardRef(() => GoodsService))
    private readonly goodsService: GoodsService,
  ) {}

  async create(adminCreateGoodsDto: AdminCreateGoodsDto, tenantId: Types.ObjectId): Promise<AdminGoodsDto> {
    return this.goodsService.create(adminCreateGoodsDto, tenantId);
  }

  async findAll(tenantId: Types.ObjectId): Promise<AdminGoodsDto[]> {
    return this.goodsService.findAll(tenantId);
  }

  async findOne(id: string, tenantId: Types.ObjectId) {
    return this.goodsService.findOne(id, tenantId);
  }

  async findAllGoodsForBusSchedule(busScheduleId: Types.ObjectId, tenantId: Types.ObjectId): Promise<GoodsDto[]> {
    return this.goodsService.findAllGoodsForBusSchedule(busScheduleId, tenantId);
  }

  async findAllGoodsAvailable(busRouteId: Types.ObjectId, tenantId: Types.ObjectId): Promise<AdminGoodsDto[]> {
    return this.goodsService.findAllGoodsAvailable(busRouteId, tenantId);
  }

  async update(adminUpdateGoodsDto: AdminUpdateGoodsDto, tenantId: Types.ObjectId): Promise<AdminGoodsDto> {
    return this.goodsService.update(adminUpdateGoodsDto, tenantId);
  }

  async updates(adminUpdateGoodsDto: AdminUpdateGoodsDto[], tenantId: Types.ObjectId): Promise<AdminGoodsDto[]> {
    return this.goodsService.updates(adminUpdateGoodsDto, tenantId);
  }

  async remove(id: string, tenantId: Types.ObjectId): Promise<boolean> {
    return this.goodsService.remove(id, tenantId);
  }

  async searchGoodsPaging(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: AdminGoodsSortFilter,
    filters: AdminGoodsSortFilter[],
    tenantId: Types.ObjectId,
  ): Promise<AdminSearchGoodsPagingRes> {
    return this.goodsService.searchGoodsPaging(pageIdx, pageSize, keyword, sortBy, filters, tenantId);
  }
}

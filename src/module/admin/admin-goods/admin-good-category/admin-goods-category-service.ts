import { GoodsCategoryService } from '@/module/core/goods/good-category/goods-category-service';
import { GoodsCategoryDocument } from '@/module/core/goods/good-category/schema/goods.-categoryschema';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { customAlphabet } from 'nanoid';
import {
  AdminGoodsCategoryDto,
  AdminSearchGoodsCategoryPagingQuerySortFilter,
  AdminSearchGoodsPagingRes,
} from './dto/admin-goods-category.dto';
import { AdminCreateGoodsCategoryDto } from './dto/admin-create-goods-category.dto';
import { AdminUpdateGoodsCategoryDto } from './dto/admin-update-goods-category.dto';

@Injectable()
export class AdminGoodsCategoryService {
  private alphabet = process.env.ALPHABET || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  private nanoid = customAlphabet(this.alphabet, 6);

  constructor(
    @InjectModel(GoodsCategoryDocument.name) private readonly goodsCategoryModel: Model<GoodsCategoryDocument>,
    @Inject(forwardRef(() => GoodsCategoryService))
    private readonly goodsCategoryService: GoodsCategoryService,
  ) {}

  async create(
    adminCreateGoodsCategoryDto: AdminCreateGoodsCategoryDto,
    tenantId: Types.ObjectId,
  ): Promise<AdminGoodsCategoryDto> {
    return this.goodsCategoryService.create(adminCreateGoodsCategoryDto, tenantId);
  }

  async update(
    adminUpdateGoodsCategoryDto: AdminUpdateGoodsCategoryDto,
    tenantId: Types.ObjectId,
  ): Promise<AdminGoodsCategoryDto> {
    return this.goodsCategoryService.update(adminUpdateGoodsCategoryDto, tenantId);
  }

  async remove(id: string, tenantId: Types.ObjectId): Promise<boolean> {
    return this.goodsCategoryService.remove(id, tenantId);
  }

  async findByIds(
    ids: Types.ObjectId[],
    tenantId: Types.ObjectId,
    rootTenantId: Types.ObjectId,
  ): Promise<AdminGoodsCategoryDto[]> {
    return this.goodsCategoryService.findByIds(ids, [tenantId, rootTenantId]);
  }

  async findAll(tenantId: Types.ObjectId): Promise<AdminGoodsCategoryDto[]> {
    return this.goodsCategoryService.findAll(tenantId);
  }

  async findOne(id: string, tenantId: Types.ObjectId): Promise<AdminGoodsCategoryDto> {
    return this.goodsCategoryService.findOne(id, tenantId);
  }

  async searchGoodsCategoryPaging(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: AdminSearchGoodsCategoryPagingQuerySortFilter,
    filters: AdminSearchGoodsCategoryPagingQuerySortFilter[],
    tenantId: Types.ObjectId,
  ): Promise<AdminSearchGoodsPagingRes> {
    return this.goodsCategoryService.searchGoodsCategoryPaging(pageIdx, pageSize, keyword, sortBy, filters, tenantId);
  }
}

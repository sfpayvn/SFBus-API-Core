import { GoodsDocument } from '@/module/core/goods/goods/schema/goods.schema';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { customAlphabet } from 'nanoid';
import { GoodsService } from '@/module/core/goods/goods/goods-service';

@Injectable()
export class ClientGoodsService {
  private alphabet = process.env.ALPHABET || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  private nanoid = customAlphabet(this.alphabet, 6);

  constructor(
    @InjectModel(GoodsDocument.name) private readonly goodsModel: Model<GoodsDocument>,
    @Inject(forwardRef(() => GoodsService))
    private readonly goodsService: GoodsService,
  ) {}

  async findOne(id: string, tenantId: Types.ObjectId) {
    return this.goodsService.findOne(id, tenantId);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ContentLayoutDocument } from './schemas/content-layout.schema';
import { plainToInstance } from 'class-transformer';
import {
  ContentLayoutDto,
  SearchContentLayoutQuerySortFilter,
  SearchContentLayoutsResultDto,
} from './dto/content-layout.dto';
import { CreateContentLayoutDto } from './dto/create-content-layout.dto';
import { UpdateContentLayoutDto } from './dto/update-content-layout.dto';

@Injectable()
export class ContentLayoutService {
  constructor(
    @InjectModel(ContentLayoutDocument.name)
    private contentLayoutModel: Model<ContentLayoutDocument>,
  ) {}

  async create(createContentLayoutDto: CreateContentLayoutDto, tenantId: Types.ObjectId): Promise<ContentLayoutDto> {
    try {
      const created = new this.contentLayoutModel({
        ...createContentLayoutDto,
        tenantId,
        isPublish: true,
      });
      const saved = await created.save();
      const contentLayout = await this.mapImageUrl([plainToInstance(ContentLayoutDto, saved.toObject())]);
      return contentLayout[0];
    } catch (error: any) {
      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        throw new NotFoundException(`${field} "${createContentLayoutDto[field]}" already exists.`);
      }
      throw error;
    }
  }

  async update(updateContentLayoutDto: UpdateContentLayoutDto, tenantId: Types.ObjectId): Promise<ContentLayoutDto> {
    try {
      const id = updateContentLayoutDto._id;
      const contentLayout = await this.contentLayoutModel.findOne({ _id: id, tenantId }).lean().exec();
      if (!contentLayout) {
        throw new NotFoundException(`Widget block with ID "${id}" not found.`);
      }

      // Handle image updates: xóa ảnh cũ nếu có thay đổi
      await this.handleImageUpdates(
        contentLayout.imageId,
        updateContentLayoutDto.imageId,
        updateContentLayoutDto.slug,
        tenantId,
      );

      const updated = await this.contentLayoutModel
        .findOneAndUpdate({ _id: id, tenantId }, updateContentLayoutDto, { new: true })
        .lean()
        .exec();

      const result = await this.mapImageUrl([plainToInstance(ContentLayoutDto, updated)]);
      return result[0];
    } catch (error: any) {
      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        throw new NotFoundException(`${field} already exists.`);
      }
      throw error;
    }
  }

  async delete(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean> {
    // Soft delete
    const res = await this.contentLayoutModel
      .findOneAndUpdate({ _id: id, tenantId }, { isPublish: false }, { new: true })
      .lean()
      .exec();
    return res !== null;
  }

  async findAll(tenantIds: Types.ObjectId[]): Promise<ContentLayoutDto[]> {
    const contentLayouts = await this.contentLayoutModel
      .find({ tenantId: { $in: tenantIds }, isPublish: true })
      .sort({ updatedAt: -1 })
      .lean()
      .exec();
    let result = plainToInstance(ContentLayoutDto, contentLayouts);
    result = await this.mapImageUrl(result);
    return result;
  }

  async findOne(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<ContentLayoutDto | null> {
    const contentLayout = await this.contentLayoutModel.findOne({ _id: id, tenantId, isPublish: true }).lean().exec();
    if (!contentLayout) {
      return null;
    }
    return plainToInstance(ContentLayoutDto, contentLayout);
  }

  async findByCode(code: string, tenantId: Types.ObjectId): Promise<ContentLayoutDto> {
    const contentLayout = await this.contentLayoutModel.findOne({ code, tenantId, isPublish: true }).lean().exec();
    if (!contentLayout) {
      throw new NotFoundException(`Widget block with code "${code}" not found.`);
    }
    const mapped = await this.mapImageUrl([plainToInstance(ContentLayoutDto, contentLayout)]);
    return mapped[0];
  }

  findAvailableSlug(appSource: string, platform: string, tenantId: Types.ObjectId): Promise<string[]> {
    return this.contentLayoutModel
      .find({ tenantId, appSource, platform, isPublish: true, slug: { $regex: '^/pages' } })
      .distinct('slug')
      .lean()
      .exec();
  }

  async findAvailableBySlug(
    appSource: string,
    platform: string,
    slug: string,
    tenantId: Types.ObjectId,
  ): Promise<ContentLayoutDto> {
    const contentLayout = this.contentLayoutModel
      .findOne({ tenantId, appSource, platform, isPublish: true, slug })
      .lean()
      .exec();

    const mapped = await this.mapImageUrl([plainToInstance(ContentLayoutDto, contentLayout)]);
    return mapped[0];
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: SearchContentLayoutQuerySortFilter,
    filters: SearchContentLayoutQuerySortFilter[],
    tenantIds: Types.ObjectId[],
  ): Promise<SearchContentLayoutsResultDto> {
    const pipeline = await this.buildQuerySearchContentLayouts(pageIdx, pageSize, tenantIds, keyword, sortBy, filters);

    const contentLayouts = await this.contentLayoutModel.aggregate(pipeline).exec();

    const totalItem = await this.contentLayoutModel.countDocuments({
      tenantId: { $in: tenantIds },
      isPublish: true,
    });

    let result = plainToInstance(ContentLayoutDto, contentLayouts);
    result = await this.mapImageUrl(result);

    return {
      pageIdx,
      contentLayouts: result,
      totalPage: Math.ceil(totalItem / pageSize),
      totalItem,
    };
  }

  async buildQuerySearchContentLayouts(
    pageIdx: number,
    pageSize: number,
    tenantIds: Types.ObjectId[],
    keyword: string,
    sortBy: SearchContentLayoutQuerySortFilter,
    filters: SearchContentLayoutQuerySortFilter[],
  ) {
    const skip = pageIdx ? (pageIdx - 1) * pageSize : 0;
    const pipeline: any = [];
    const matchConditions: any[] = [];

    // Add tenant filter
    matchConditions.push({ tenantId: { $in: tenantIds } });

    // 1. Search by keyword
    if (keyword) {
      matchConditions.push({
        $or: [
          { name: { $regex: keyword, $options: 'i' } },
          { code: { $regex: keyword, $options: 'i' } },
          { description: { $regex: keyword, $options: 'i' } },
        ],
      });
    }

    // 2. Process filters
    let startDateValue: string = '';
    let endDateValue: string = '';

    if (Array.isArray(filters)) {
      filters.forEach(({ key, value }) => {
        if (!key || value == null) return;

        if (key === 'startDate') {
          startDateValue = value;
        } else if (key === 'endDate') {
          endDateValue = value;
        } else {
          matchConditions.push({ [key]: value });
        }
      });
    }

    // 3. Add date range condition if provided
    if (startDateValue || endDateValue) {
      const rangeCond: any = {};
      if (startDateValue) rangeCond.$gte = startDateValue;
      if (endDateValue) rangeCond.$lte = endDateValue;
      matchConditions.push({ createdAt: rangeCond });
    }

    // 4. Add match stage if there are conditions
    if (matchConditions.length) {
      pipeline.push({
        $match: { $and: matchConditions },
      });
    }

    // 5. Sort
    if (sortBy?.key) {
      pipeline.push({
        $sort: { [sortBy.key]: sortBy.value === 'ascend' ? 1 : -1 },
      });
    } else {
      // Default sort by updatedAt descending
      pipeline.push({
        $sort: { updatedAt: -1 },
      });
    }

    // 6. Pagination
    pipeline.push({ $skip: skip }, { $limit: pageSize });

    return pipeline;
  }

  async validateContentLayout(code: string, tenantId: Types.ObjectId): Promise<any | null> {
    const contentLayout = await this.contentLayoutModel.findOne({ code, tenantId, isPublish: true }).lean().exec();
    if (!contentLayout) {
      return null;
    }
    return plainToInstance(ContentLayoutDto, contentLayout);
  }

  async mapImageUrl(contentLayouts: ContentLayoutDto[]): Promise<ContentLayoutDto[]> {
    return Promise.all(
      contentLayouts.map(async (block) => {
        if (block.imageId) {
          const port = process.env.PUBLIC_PORT ? `:${process.env.PUBLIC_PORT}` : '';
          block.imageUrl = `${process.env.DOMAIN}${port}/file/view/${block.imageId.toString()}`;
        }
        return block;
      }),
    );
  }

  async handleImageUpdates(
    oldImageId: Types.ObjectId,
    newImageId: Types.ObjectId,
    slug: string,
    tenantId: Types.ObjectId,
  ): Promise<void> {
    // Nếu imageId thay đổi, xóa file cũ
    if (oldImageId && oldImageId !== newImageId) {
      await this.deleteImage(oldImageId, tenantId);
    }

    // Nếu có imageId mới, có thể rename hoặc update tên file nếu cần
    if (newImageId && oldImageId !== newImageId) {
      // Optional: rename file theo slug nếu cần
      // await this.renameImage(newImageId, slug, tenantId);
    }
  }

  private async deleteImage(imageId: Types.ObjectId, tenantId: Types.ObjectId): Promise<void> {
    try {
      // Gọi file service hoặc API để xóa file
      // await this.fileService.deleteFile(imageId, tenantId);
      // Nếu không có file service, có thể skip hoặc log lại
      console.log(`Deleting image ${imageId} for tenant ${tenantId}`);
    } catch (error) {
      console.error(`Failed to delete image ${imageId}:`, error);
      // Không throw error để không làm gián đoạn quá trình update
    }
  }
}

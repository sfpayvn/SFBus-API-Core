import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { TrackingDocument } from './schema/tracking.schema';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { UpdateTrackingDto } from './dto/update-tracking.dto';
import { TrackingDto, SearchTrackingQuerySortFilter, SearchTrackingRes } from './dto/tracking.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class TrackingService {
  constructor(@InjectModel(TrackingDocument.name) private readonly trackingModel: Model<TrackingDocument>) {}

  async create(createTrackingDto: CreateTrackingDto, tenantId: Types.ObjectId): Promise<TrackingDto> {
    const tracking = await this.trackingModel.create({ ...createTrackingDto, tenantId });
    return plainToInstance(TrackingDto, tracking.toObject());
  }

  async findAll(tenantId: Types.ObjectId): Promise<TrackingDto[]> {
    const trackings = await this.trackingModel.find({ tenantId }).lean().exec();
    return trackings.map((tracking) => plainToInstance(TrackingDto, tracking));
  }

  async findOne(id: string, tenantId: Types.ObjectId): Promise<TrackingDto> {
    const tracking = await this.trackingModel.findOne({ _id: id, tenantId }).lean().exec();
    if (!tracking) {
      throw new NotFoundException(`Tracking with ID "${id}" not found.`);
    }
    return plainToInstance(TrackingDto, tracking);
  }

  async findByType(type: string, tenantId: Types.ObjectId): Promise<TrackingDto[]> {
    const trackings = await this.trackingModel.find({ type, tenantId }).lean().exec();
    return trackings.map((tracking) => plainToInstance(TrackingDto, tracking));
  }

  async update(updateTrackingDto: UpdateTrackingDto, tenantId: Types.ObjectId): Promise<TrackingDto> {
    const updatedTracking = await this.trackingModel
      .findOneAndUpdate({ _id: updateTrackingDto._id, tenantId }, { $set: updateTrackingDto }, { new: true })
      .lean()
      .exec();

    if (!updatedTracking) {
      throw new NotFoundException(`Tracking with ID "${updateTrackingDto._id}" not found.`);
    }

    return plainToInstance(TrackingDto, updatedTracking);
  }

  async remove(id: string, tenantId: Types.ObjectId): Promise<boolean> {
    const result = await this.trackingModel.findOneAndDelete({ _id: id, tenantId }).lean().exec();
    if (!result) {
      throw new NotFoundException(`Tracking with ID "${id}" not found.`);
    }
    return true;
  }

  async searchTracking(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: SearchTrackingQuerySortFilter,
    filters: SearchTrackingQuerySortFilter[],
    tenantId: Types.ObjectId,
  ): Promise<SearchTrackingRes> {
    const skip = pageIdx ? (pageIdx - 1) * pageSize : 0;
    const pipeline: any = [];
    const matchConditions: any[] = [{ tenantId }];

    // Tìm theo keyword
    if (keyword) {
      matchConditions.push({
        $or: [{ type: { $regex: keyword, $options: 'i' } }],
      });
    }

    // Xử lý filters
    if (Array.isArray(filters)) {
      filters.forEach(({ key, value }) => {
        if (key && value != null) {
          if (key === 'type') {
            matchConditions.push({ type: value });
          } else if (key.startsWith('metadata.')) {
            // Cho phép filter theo metadata fields
            matchConditions.push({ [key]: value });
          } else {
            matchConditions.push({ [key]: value });
          }
        }
      });
    }

    pipeline.push({ $match: { $and: matchConditions } });

    // Sort
    if (sortBy?.key) {
      pipeline.push({
        $sort: { [sortBy.key]: sortBy.value === 'ascend' ? 1 : -1 },
      });
    } else {
      pipeline.push({ $sort: { createdAt: -1 } });
    }

    // Paging
    pipeline.push({ $skip: skip }, { $limit: pageSize });

    const trackings = await this.trackingModel.aggregate(pipeline).exec();
    const totalItem = await this.trackingModel.countDocuments({ $and: matchConditions });

    return {
      pageIdx,
      trackings: trackings.map((t) => plainToInstance(TrackingDto, t)),
      totalPage: Math.ceil(totalItem / pageSize),
      totalItem,
    };
  }
}

import { Expose } from 'class-transformer';
import { Types } from 'mongoose';

export class TrackingDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  tenantId: Types.ObjectId;

  @Expose()
  type: string;

  @Expose()
  platform: string;

  @Expose()
  metadata: Record<string, any>;

  @Expose()
  createdBy: Types.ObjectId;

  @Expose()
  updatedBy: Types.ObjectId;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}

export class SearchTrackingQuerySortFilter {
  key: string;
  value: any;
}

export class SearchTrackingRes {
  pageIdx: number;
  trackings: TrackingDto[];
  totalPage: number;
  totalItem: number;
}

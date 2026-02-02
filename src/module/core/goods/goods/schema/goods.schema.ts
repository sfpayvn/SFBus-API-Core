import { GOODS_PAYMENT_STATUS, GOODS_STATUS } from '@/common/constants/status.constants';
import { Type } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';
import { DeliveryType, FulfillmentMode } from '../../types/goods.types';

@Schema({ collection: 'goods', timestamps: true })
export class GoodsDocument extends Document {
  @Prop({ required: true })
  tenantId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, default: null })
  busScheduleId: Types.ObjectId | null;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  goodsNumber: string;

  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true })
  customerPhoneNumber: string;

  @Prop({ required: true })
  senderName: string;

  @Prop({ type: String, default: null })
  senderPhoneNumber: string | null;

  @Prop({ required: true, default: 1 })
  goodsPriority: number;

  @Prop({ required: true, default: false })
  goodsImportant: boolean;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  shippingCost: number;

  @Prop({ required: true })
  cod: number;

  @Prop({ required: true })
  goodsValue: number;

  @Prop({ required: true })
  categoriesIds: Types.ObjectId[];

  @Prop({ required: true })
  busRouteId: Types.ObjectId;

  @Prop({ required: true })
  weight: number;

  @Prop({ required: true })
  length: number;

  @Prop({ required: true })
  width: number;

  @Prop({ required: true })
  height: number;

  @Prop()
  note: string;

  @Prop({
    required: true,
    enum: [
      GOODS_STATUS.NEW,
      GOODS_STATUS.PENDING,
      GOODS_STATUS.ON_BOARD,
      GOODS_STATUS.WAITING_CONTINUE_DELIVERY,
      GOODS_STATUS.ARRIVED_FINAL_STATION,
      GOODS_STATUS.OUT_FOR_DELIVERY,
      GOODS_STATUS.COMPLETED,
      GOODS_STATUS.CANCELLED,
    ],
    default: GOODS_STATUS.NEW,
  })
  status: string;

  @Prop({
    required: true,
    enum: [
      GOODS_PAYMENT_STATUS.NEW,
      GOODS_PAYMENT_STATUS.DEPOSITED,
      GOODS_PAYMENT_STATUS.PAID,
      GOODS_PAYMENT_STATUS.READY_REFUND,
      GOODS_PAYMENT_STATUS.REFUNDED,
    ],
    default: GOODS_PAYMENT_STATUS.NEW,
  })
  paymentStatus: string;

  @Prop({
    required: true,
    enum: ['sender', 'customer'],
    default: 'sender',
  })
  paidBy: string;

  @Prop({ type: [Types.ObjectId], default: [] })
  imageIds: Types.ObjectId[];

  // Station relationship fields
  @Prop({ type: Types.ObjectId, default: null })
  originStationId: Types.ObjectId | null; // station gửi (office gửi)

  @Prop({ type: Types.ObjectId, default: null })
  destinationStationId: Types.ObjectId | null; // station nhận (office nhận / hub cuối)

  @Prop({ type: Types.ObjectId, default: null })
  currentStationId: Types.ObjectId | null; // station hiện tại đang giữ hàng (null khi ON_BOARD)

  @Prop({ type: Types.ObjectId, default: null })
  currentScheduleId: Types.ObjectId | null; // schedule hiện tại (alias cho busScheduleId)

  @Prop({
    type: [
      {
        type: { type: String, enum: ['CREATED','ASSIGNED_TO_SCHEDULE','UNASSIGNED_FROM_SCHEDULE','LOADED_ON_BUS','DROPPED_AT_STATION','DELIVERED'] },
        stationId: { type: Types.ObjectId, default: null },
        scheduleId: { type: Types.ObjectId, default: null },
        note: { type: String, default: '' },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    default: [],
  })
  events: any[];

  // Delivery type & address
  @Prop({
    type: String,
    enum: ['STATION', 'ADDRESS'],
    default: 'STATION',
  })
  deliveryType: DeliveryType; // STATION | ADDRESS

  @Prop({
    type: String,
    enum: ['ROADSIDE', 'STATION'],
    default: 'STATION',
  })
  pickupFulfillmentMode: FulfillmentMode; // ROADSIDE | STATION

  @Prop({
    type: String,
    enum: ['ROADSIDE', 'STATION'],
    default: 'STATION',
  })
  deliveryFulfillmentMode: FulfillmentMode; // ROADSIDE | STATION

  @Prop({ type: String, default: null })
  pickupAddress: string | null; // nếu nhận dọc đường

  @Prop({ type: String, default: null })
  deliveryAddress: string | null; // nếu giao tận nhà
}

export const GoodsSchema = SchemaFactory.createForClass(GoodsDocument);

// Virtual populate for busSchedule
GoodsSchema.virtual('busSchedule', {
  ref: 'BusScheduleDocument',
  localField: 'busScheduleId',
  foreignField: '_id',
  justOne: true,
});

// Virtual populate for busRoute
GoodsSchema.virtual('busRoute', {
  ref: 'BusRouteDocument',
  localField: 'busRouteId',
  foreignField: '_id',
  justOne: true,
});

// Virtual populate for categories
GoodsSchema.virtual('categories', {
  ref: 'GoodsCategoryDocument',
  localField: 'categoriesIds',
  foreignField: '_id',
  justOne: false,
});

GoodsSchema.set('toJSON', { virtuals: true });
GoodsSchema.set('toObject', { virtuals: true });

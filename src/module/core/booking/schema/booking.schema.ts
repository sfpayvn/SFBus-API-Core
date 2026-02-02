import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PromotionDocument } from '../../promotion/schema/promotion.schema';
import { BusRouteDocument } from '../../bus/bus-route/schema/bus-route.schema';
import { BusScheduleDocument } from '../../bus/bus-schedule/schema/bus-schedule.schema';
import { UserDocument } from '../../user/user/schema/user.schema';
import { PaymentDocument } from '../../payment/schema/payment.schema';
import { BOOKING_STATUS, SEAT_STATUS } from '@/common/constants/status.constants';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

export class UserInforBookingDocument {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phoneNumber: string;
}
export class UserPaymentInforBookingDocument {
  name: string;
  email: string;
  phoneNumber: string;
}

export class BookingItemSeatDocument extends Document {
  @Prop({ required: true })
  _id: Types.ObjectId;

  @Prop({ required: true })
  seatNumber: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  typeId: Types.ObjectId;

  @Prop({
    required: true,
    enum: Object.values(SEAT_STATUS),
    default: SEAT_STATUS.NOT_PICKED_UP,
  })
  status: string;

  @Prop({ required: true })
  createdBy: Types.ObjectId;

  @Prop({ required: true })
  updatedBy: Types.ObjectId;
}

export class BookingItemDocument extends Document {
  @Prop({ required: true })
  _id: Types.ObjectId;

  @Prop({ required: true })
  tenantId: Types.ObjectId;

  @Prop({ required: true })
  bookingItemNumber: string;

  @Prop({ required: true })
  seat: BookingItemSeatDocument;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  discountAmount: number;

  @Prop({ required: true })
  afterDiscountPrice: number;

  @Prop({ required: true })
  departure: Types.ObjectId;

  @Prop({ required: true })
  destination: Types.ObjectId;

  @Prop({ required: true })
  createdBy: Types.ObjectId;

  @Prop({ required: true })
  updatedBy: Types.ObjectId;
}

@Schema({ collection: 'bookings', timestamps: true })
export class BookingDocument extends Document {
  @Prop({ required: true })
  tenantId: Types.ObjectId;

  // Thêm field thực tế quantity
  @Prop({ required: true, default: 0 })
  quantity: number;

  @Prop({ required: true })
  bookingNumber: string;

  @Prop({ required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  userInfo: UserInforBookingDocument;

  @Prop({ required: true })
  busScheduleId: Types.ObjectId;

  @Prop({ required: true })
  busRouteId: Types.ObjectId;

  @Prop({ required: true })
  bookingItems: BookingItemDocument[];

  @Prop()
  promotion: PromotionDocument;

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ required: true, default: 0 })
  discountTotalAmount: number;

  @Prop({ required: true })
  afterDiscountTotalPrice: number;

  @Prop({ required: true })
  paymentTime?: Date; // Thêm trường thời gian thanh toán

  @Prop({ required: true })
  bookingGroupNumber: string;

  @Prop({ required: true, enum: Object.values(BOOKING_STATUS), default: BOOKING_STATUS.RESERVED })
  status: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true })
  idempotencyKey: string;

  @Prop({ required: true, enum: Object.values(ROLE_CONSTANTS) })
  source: string;

  @Prop({ required: false })
  expiresAt: Date;

  @Prop({ required: true })
  createdBy: Types.ObjectId;

  @Prop({ required: false })
  updatedBy: Types.ObjectId;
}

export const BookingSchema = SchemaFactory.createForClass(BookingDocument);

// Tự động cập nhật quantity trước khi lưu
BookingSchema.pre('save', function (next) {
  if (Array.isArray(this.bookingItems)) {
    this.quantity = this.bookingItems.length;
  } else {
    this.quantity = 0;
  }
  next();
});

// ========================================
// INDEXES for Idempotency & Anti Double-Booking
// ========================================

// 1. TTL Index - Auto delete expired bookings
BookingSchema.index(
  { expiresAt: 1 },
  {
    expireAfterSeconds: 0,
    partialFilterExpression: {
      source: ROLE_CONSTANTS.CLIENT,
      status: BOOKING_STATUS.RESERVED, // chỉ auto-xóa khi còn giữ chỗ
    },
  },
);

// 2. Unique Idempotency Key - Prevent duplicate booking requests
BookingSchema.index(
  { tenantId: 1, userId: 1, idempotencyKey: 1 },
  { unique: true, sparse: true }, // sparse: true để không áp dụng cho old bookings without idempotencyKey
);

// 3. Unique Seat per Schedule - Prevent double booking of seats (atomic level)
BookingSchema.index(
  { tenantId: 1, busScheduleId: 1, 'bookingItems.seat._id': 1 },
  {
    unique: true,
    partialFilterExpression: {
      status: { $in: [BOOKING_STATUS.RESERVED, BOOKING_STATUS.PAID, BOOKING_STATUS.DEPOSITED] },
    },
  },
);

// ========================================
// Virtual Populates
// ========================================

// Virtual populate for busRoute
BookingSchema.virtual('busRoute', {
  ref: BusRouteDocument.name,
  localField: 'busRouteId',
  foreignField: '_id',
  justOne: true,
});

// Virtual populate for busSchedule
BookingSchema.virtual('busSchedule', {
  ref: BusScheduleDocument.name,
  localField: 'busScheduleId',
  foreignField: '_id',
  justOne: true,
});

// Virtual populate for user
BookingSchema.virtual('user', {
  ref: UserDocument.name,
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

// Virtual populate for payments
BookingSchema.virtual('payments', {
  ref: PaymentDocument.name,
  localField: '_id',
  foreignField: 'referrentId',
  justOne: false,
});

BookingSchema.set('toJSON', { virtuals: true });
BookingSchema.set('toObject', { virtuals: true });

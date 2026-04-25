import { IsString, IsOptional, IsNumber, IsArray, IsDate, IsBoolean, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

/**
 * Seat detail info trong report
 */
export class SeatDetailReportDto {
  seatId: string;
  seatNumber: number;
  seatName: string;
  seatType: string;
  status: string;
  passenger?: {
    name: string;
    phoneNumber: string;
    email: string;
  };
  price: number;
  discountAmount: number;
  finalPrice: number;
}

/**
 * Booking item detail
 */
export class BookingItemDetailDto {
  bookingItemNumber: string;
  seat: SeatDetailReportDto;
  departureStation: {
    _id: string;
    name: string;
  };
  destinationStation: {
    _id: string;
    name: string;
  };
  price: number;
  discountAmount: number;
  finalPrice: number;
}

/**
 * Booking detail info trong report
 */
export class BookingDetailReportDto {
  bookingId: string;
  bookingNumber: string;
  bookingGroupNumber: string;
  status: string;
  passenger: {
    name: string;
    phoneNumber: string;
    email: string;
  };
  quantity: number;
  bookingItems: BookingItemDetailDto[];
  totalPrice: number;
  discountTotalAmount: number;
  afterDiscountTotalPrice: number;
  paymentStatus: string;
  paymentTime?: Date;
  createdAt: Date;
}

/**
 * Goods detail info trong report
 */
export class GoodsDetailReportDto {
  goodsId: string;
  goodsNumber: string;
  name: string;
  status: string;
  paymentStatus: string;
  quantity: number;
  weight: number;
  goodsValue: number;
  shippingCost: number;
  cod: number;
  sender: {
    name: string;
    phoneNumber: string;
  };
  customer: {
    name: string;
    phoneNumber: string;
  };
  note?: string;
  createdAt: Date;
}

/**
 * Booking Statistics
 */
export class BookingStatsDto {
  totalBookings: number;
  totalSeatsBooked: number;
  totalSeatsAvailable: number;
  occupancyRate: number; // percentage
  totalRevenue: number;
  totalDiscount: number;
  netRevenue: number;
}

/**
 * Goods Statistics
 */
export class GoodsStatsDto {
  totalGoods: number;
  totalItemsShipped: number; // tổng số lượng hàng đã gửi
  totalItemsRemaining: number; // tổng số lượng hàng còn lại
  shipmentRate: number; // percentage
  totalShippingCost: number; // phí vận chuyển
  totalCod: number; // tiền COD thu hộ
  totalGoodsRevenue: number; // doanh thu từ vận chuyển
  netGoodsRevenue: number; // revenue ròng
}

/**
 * Statistics của report
 */
export class ScheduleReportStatsDto {
  booking: BookingStatsDto;
  goods: GoodsStatsDto;
}

/**
 * Main Schedule Report Detail DTO
 */
export class ScheduleReportDetailDto {
  // Bus Schedule Info
  scheduleId: string;
  scheduleNumber: string;
  scheduleName: string;
  tripDate: Date;
  status: string;

  // Bus Info
  bus?: {
    _id: string;
    name: string;
    registrationNumber: string;
    licensePlate: string;
  };

  // Route Info
  route: {
    _id: string;
    name: string;
  };

  // Driver Info
  drivers: Array<{
    _id: string;
    name: string;
    phoneNumber: string;
  }>;

  // Seat Capacity
  totalCapacity: number;

  // Booking Details
  bookings: BookingDetailReportDto[];

  // Goods Details
  goods: GoodsDetailReportDto[];

  // Statistics
  stats: ScheduleReportStatsDto;

  // Generation Info
  generatedAt: Date;
  generatedBy?: string;
}

/**
 * Query DTO for schedule report
 * Note: busScheduleId is passed as route parameter, not in query
 */
export class ScheduleReportQueryDto {
  @IsOptional()
  @IsBoolean()
  includeBookings?: boolean = true;

  @IsOptional()
  @IsBoolean()
  includeGoods?: boolean = true;

  @IsOptional()
  @IsBoolean()
  includeStats?: boolean = true;
}

/**
 * Paginated schedule report
 */
export class PaginatedScheduleReportDto {
  data: ScheduleReportDetailDto;
  bookings: {
    total: number;
    items: BookingDetailReportDto[];
  };
  goods: {
    total: number;
    items: GoodsDetailReportDto[];
  };
}

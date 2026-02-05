# Bus Schedule Report Implementation

## Overview
Triển khai báo cáo chi tiết cho chuyến xe (Bus Schedule Report) theo dữ liệu thực tế của hệ thống SFBus.

## Files Created/Modified

### 1. New DTO File
**File:** [src/module/core/report/dto/schedule-report-detail.dto.ts](src/module/core/report/dto/schedule-report-detail.dto.ts)

**Includes:**
- `SeatDetailReportDto` - Thông tin chi tiết về ghế
- `BookingItemDetailDto` - Thông tin chi tiết mục booking
- `BookingDetailReportDto` - Thông tin chi tiết booking (vé khách)
- `GoodsDetailReportDto` - Thông tin chi tiết hàng hóa
- `ScheduleReportStatsDto` - Thống kê báo cáo
- `ScheduleReportDetailDto` - Báo cáo chính cho một chuyến xe
- `ScheduleReportQueryDto` - Query parameters
- `PaginatedScheduleReportDto` - Kết quả phân trang

### 2. Service Layer
**File:** [src/module/core/report/services/report-schedule.service.ts](src/module/core/report/services/report-schedule.service.ts)

**Methods Added:**
```typescript
// Lấy chi tiết báo cáo cho một chuyến xe cụ thể
async getScheduleReportDetail(
  busScheduleId: string,
  tenantId: Types.ObjectId,
  query?: ScheduleReportQueryDto,
): Promise<ScheduleReportDetailDto>

// Helper methods:
private calculateScheduleStats()    // Tính toán thống kê
private formatBookings()             // Format dữ liệu booking
private formatGoods()                // Format dữ liệu hàng hóa
```

**Dependencies Injected:**
- `BookingDocument` model
- `GoodsDocument` model

### 3. Main Report Service
**File:** [src/module/core/report/report.service.ts](src/module/core/report/report.service.ts)

**Method Added:**
```typescript
async getScheduleReportDetail(
  busScheduleId: string,
  tenantId: Types.ObjectId,
  query?: ScheduleReportQueryDto,
): Promise<ScheduleReportDetailDto>
```

### 4. Controller Layer
**File:** [src/module/core/report/report.controller.ts](src/module/core/report/report.controller.ts)

**Endpoint Added:**
```
GET /report/schedule/:busScheduleId
```

**Query Parameters:**
- `includeBookings` (boolean, optional) - Bao gồm danh sách booking, mặc định: true
- `includeGoods` (boolean, optional) - Bao gồm danh sách hàng hóa, mặc định: true
- `includeStats` (boolean, optional) - Bao gồm thống kê, mặc định: true

## API Usage

### Request
```bash
GET /report/schedule/65f8a1b2c3d4e5f6g7h8i9j0?includeBookings=true&includeGoods=true
Authorization: Bearer {jwt_token}
```

### Response
```json
{
  "scheduleId": "65f8a1b2c3d4e5f6g7h8i9j0",
  "scheduleNumber": "SCH-2024-001",
  "scheduleName": "Hà Nội - Hải Phòng",
  "tripDate": "2024-03-15T08:00:00Z",
  "status": "completed",
  "bus": {
    "_id": "65f8a1b2c3d4e5f6g7h8i9j1",
    "name": "Xe 001",
    "registrationNumber": "30A-12345",
    "licensePlate": "30A12345"
  },
  "route": {
    "_id": "65f8a1b2c3d4e5f6g7h8i9j2",
    "name": "Hà Nội - Hải Phòng",
    "departureStation": {
      "_id": "65f8a1b2c3d4e5f6g7h8i9j3",
      "name": "Bến xe Mỹ Đình"
    },
    "destinationStation": {
      "_id": "65f8a1b2c3d4e5f6g7h8i9j4",
      "name": "Bến xe Hải Phòng"
    }
  },
  "drivers": [
    {
      "_id": "65f8a1b2c3d4e5f6g7h8i9j5",
      "name": "Nguyễn Văn A",
      "phoneNumber": "0912345678"
    }
  ],
  "totalCapacity": 30,
  "bookings": [
    {
      "bookingId": "65f8a1b2c3d4e5f6g7h8i9j6",
      "bookingNumber": "BK-2024-001",
      "bookingGroupNumber": "GRP-001",
      "status": "CONFIRMED",
      "passenger": {
        "name": "Trần Văn B",
        "phoneNumber": "0987654321",
        "email": "tranvanb@example.com"
      },
      "quantity": 2,
      "bookingItems": [
        {
          "bookingItemNumber": "BKI-001",
          "seat": {
            "seatId": "65f8a1b2c3d4e5f6g7h8i9j7",
            "seatNumber": 1,
            "seatName": "A1",
            "seatType": "standard",
            "status": "booked",
            "price": 250000,
            "discountAmount": 0,
            "finalPrice": 250000
          },
          "departureStation": {
            "_id": "65f8a1b2c3d4e5f6g7h8i9j3",
            "name": "Bến xe Mỹ Đình"
          },
          "destinationStation": {
            "_id": "65f8a1b2c3d4e5f6g7h8i9j4",
            "name": "Bến xe Hải Phòng"
          },
          "price": 250000,
          "discountAmount": 0,
          "finalPrice": 250000
        }
      ],
      "totalPrice": 500000,
      "discountTotalAmount": 0,
      "afterDiscountTotalPrice": 500000,
      "paymentStatus": "PAID",
      "paymentTime": "2024-03-15T08:30:00Z",
      "createdAt": "2024-03-14T15:00:00Z"
    }
  ],
  "goods": [
    {
      "goodsId": "65f8a1b2c3d4e5f6g7h8i9j8",
      "goodsNumber": "GD-2024-001",
      "name": "Kiện hàng 001",
      "status": "COMPLETED",
      "paymentStatus": "PAID",
      "quantity": 5,
      "weight": 25,
      "goodsValue": 1000000,
      "shippingCost": 50000,
      "cod": 0,
      "sender": {
        "name": "Công Ty ABC",
        "phoneNumber": "0911111111"
      },
      "customer": {
        "name": "Công Ty XYZ",
        "phoneNumber": "0922222222"
      },
      "departureStation": {
        "_id": "65f8a1b2c3d4e5f6g7h8i9j3",
        "name": "Bến xe Mỹ Đình"
      },
      "destinationStation": {
        "_id": "65f8a1b2c3d4e5f6g7h8i9j4",
        "name": "Bến xe Hải Phòng"
      },
      "note": "Ghi chú hàng hóa",
      "createdAt": "2024-03-14T10:00:00Z"
    }
  ],
  "stats": {
    "totalBookings": 15,
    "totalSeatsBooked": 28,
    "totalSeatsAvailable": 2,
    "occupancyRate": 93,
    "totalRevenue": 7000000,
    "totalDiscount": 500000,
    "netRevenue": 6500000,
    "totalGoods": 12,
    "totalGoodsValue": 15000000,
    "totalShippingCost": 600000,
    "totalCod": 0,
    "bookingsByStatus": {
      "CONFIRMED": 14,
      "PENDING": 1
    },
    "goodsByStatus": {
      "COMPLETED": 10,
      "ON_BOARD": 2
    },
    "paymentStatus": {
      "PAID": 14,
      "PENDING": 1
    }
  },
  "generatedAt": "2024-03-15T16:30:00Z"
}
```

## Data Included in Report

### Schedule Info
- Mã, tên, ngày khởi hành
- Trạng thái chuyến xe

### Bus Information
- ID, tên, số đăng ký, biển số

### Route Information
- Tuyến đường, ga đi, ga đến
- Các điểm dừng chính

### Driver Information
- Tên, số điện thoại tài xế

### Bookings (Vé khách)
- Số vé, nhóm vé, trạng thái
- Thông tin hành khách
- Chi tiết ghế (số ghế, giá, chiết khấu)
- Ga đi, ga đến
- Tổng giá, tình trạng thanh toán

### Goods (Hàng hóa)
- Số kiện hàng, tên hàng
- Trạng thái, tình trạng thanh toán
- Cân nặng, giá trị, phí vận chuyển, COD
- Thông tin người gửi, người nhận
- Ga đi, ga đến

### Statistics
- Tổng booking, ghế đã đặt, tỷ lệ sử dụng
- Tổng doanh thu, chiết khấu, doanh thu ròng
- Tổng hàng hóa, giá trị hàng, phí vận chuyển, COD
- Phân bố theo trạng thái (booking, hàng hóa, thanh toán)

## Features

✅ Populate dữ liệu từ các collections liên quan (Bus, Driver, Route, Booking, Goods)
✅ Tính toán thống kê tự động
✅ Format dữ liệu sạch, dễ sử dụng
✅ Hỗ trợ query tùy chọn (include/exclude bookings, goods, stats)
✅ Error handling khi schedule không tồn tại
✅ Sử dụng Tenant ID để isolation dữ liệu

## Example curl command

```bash
curl -X GET "http://localhost:3000/report/schedule/65f8a1b2c3d4e5f6g7h8i9j0" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

## Integration Notes

1. Đảm bảo `BookingDocument` và `GoodsDocument` được import và inject vào `ReportScheduleService`
2. Endpoint sử dụng `@Get` decorator (REST GET request)
3. Yêu cầu authentication với `JwtAuthGuard`
4. Sử dụng `CurrentUser` decorator để lấy `tenantId`
5. Tất cả method đã follow validation pattern của project

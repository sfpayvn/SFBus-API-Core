"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientPaymentService = void 0;
const payment_schema_1 = require("../../core/payment/schema/payment.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const client_payment_dto_1 = require("./dto/client-payment.dto");
const class_transformer_1 = require("class-transformer");
const client_booking_service_1 = require("../client-booking/client-booking-service");
const booking_service_1 = require("../../core/booking/booking-service");
const payment_service_1 = require("../../core/payment/payment-service");
let ClientPaymentService = class ClientPaymentService {
    constructor(paymentModel, ClientBookingService, bookingService, paymentService) {
        this.paymentModel = paymentModel;
        this.ClientBookingService = ClientBookingService;
        this.bookingService = bookingService;
        this.paymentService = paymentService;
    }
    async findPaymentByBookingId(bookingId, tenantId) {
        const conditions = {
            referrentId: bookingId,
            tenantId,
        };
        const paymentsModel = await this.paymentModel.find(conditions).lean().exec();
        return paymentsModel.map((payment) => (0, class_transformer_1.plainToInstance)(client_payment_dto_1.ClientPaymentDto, payment));
    }
    async findAllByBookingId(bookingId, tenantId) {
        const conditions = {
            referrentId: bookingId,
            tenantId,
        };
        const paymentsModel = await this.paymentModel.find(conditions).lean().exec();
        return paymentsModel.map((payment) => (0, class_transformer_1.plainToInstance)(client_payment_dto_1.ClientPaymentDto, payment));
    }
};
exports.ClientPaymentService = ClientPaymentService;
exports.ClientPaymentService = ClientPaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(payment_schema_1.PaymentDocument.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => client_booking_service_1.ClientBookingService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => booking_service_1.BookingService))),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => payment_service_1.PaymentService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        client_booking_service_1.ClientBookingService,
        booking_service_1.BookingService,
        payment_service_1.PaymentService])
], ClientPaymentService);
//# sourceMappingURL=client-payment-service.js.map
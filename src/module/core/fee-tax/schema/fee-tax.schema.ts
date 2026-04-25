import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type FeeTaxDocument = FeeTax & Document;

@Schema({ collection: 'fee_taxes', timestamps: true })
export class FeeTax {
  @Prop({ required: true })
  tenantId: Types.ObjectId;

  @Prop({ required: true, enum: ['fee', 'tax'], default: 'fee' })
  feeType: 'fee' | 'tax';

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: ['fixed', 'percentage'] })
  calculationType: 'fixed' | 'percentage';

  /**
   * Applied on:
   * - ticket_price: Tính trên giá vé từng cái
   * - total_booking: Tính trên tổng giá booking
   * - after_discount: Tính trên giá sau khi được discount
   */
  @Prop({ required: true, enum: ['ticket_price', 'total_booking', 'after_discount'] })
  appliedOn: 'ticket_price' | 'total_booking' | 'after_discount';

  /**
   * Value: 
   * - Nếu fixed: số tiền cụ thể (e.g., 50000)
   * - Nếu percentage: phần trăm (e.g., 10 = 10%)
   */
  @Prop({ required: true, type: Number })
  value: number;

  /**
   * Priority: Thứ tự áp dụng (0-1000)
   * Fee/tax có priority thấp được áp dụng trước
   */
  @Prop({ required: true, default: 0, type: Number })
  priority: number;

  /**
   * Enabled: Có áp dụng hay không
   */
  @Prop({ required: true, default: true })
  enabled: boolean;

  /**
   * Description: Mô tả chi tiết
   */
  @Prop()
  description?: string;

  /**
   * Conditions: Điều kiện áp dụng (optional)
   * Ví dụ: { minTotal: 1000000, maxTotal: 5000000 }
   */
  @Prop({ type: Object, default: null })
  conditions?: {
    minTotal?: number; // Tối thiểu tổng tiền
    maxTotal?: number; // Tối đa tổng tiền
    minTickets?: number; // Tối thiểu số vé
    maxTickets?: number; // Tối đa số vé
    appliedRoutes?: Types.ObjectId[]; // Chỉ áp dụng cho routes này
    excludedRoutes?: Types.ObjectId[]; // Không áp dụng cho routes này
  };

  @Prop({ type: Date, default: null })
  startDate?: Date;

  @Prop({ type: Date, default: null })
  endDate?: Date;

  createdAt?: Date;
  updatedAt?: Date;

  @Prop({ type: Types.ObjectId })
  createdBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId })
  updatedBy: Types.ObjectId;
}

export const FeeTaxSchema = SchemaFactory.createForClass(FeeTax);

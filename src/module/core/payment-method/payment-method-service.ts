import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { plainToInstance } from 'class-transformer';
import { PaymentMethodDocument } from './schema/payment-method.schema';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { PaymentMethodDto, PaymentMethodSortFilter, SearchPaymentMethodPagingRes } from './dto/payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { getFirstValue, processFilterValue } from '@/utils/utils';

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectModel(PaymentMethodDocument.name) private readonly paymentMethodModel: Model<PaymentMethodDocument>,
  ) {}

  async create(createPaymentMethodDto: CreatePaymentMethodDto, tenantId: Types.ObjectId): Promise<PaymentMethodDto> {
    // Check if there's any existing payment method for this tenant
    const existingPaymentMethod = await this.paymentMethodModel.findOne({ tenantId }).lean().exec();

    // If no existing payment method, set isDefault to true
    if (!existingPaymentMethod) {
      createPaymentMethodDto.isPaymentMethodDefault = true;
    }

    const createPayment = new this.paymentMethodModel({ ...createPaymentMethodDto, tenantId });
    const savedPayment = await createPayment.save();

    if (createPaymentMethodDto.isPaymentMethodDefault && existingPaymentMethod) {
      // If this is set as default and there were existing methods, unset others
      await this.makePaymentMethodSelectDefault(savedPayment._id as Types.ObjectId, tenantId);
    }

    return plainToInstance(PaymentMethodDto, savedPayment);
  }

  async update(updatePaymentMethodDto: UpdatePaymentMethodDto, tenantId: Types.ObjectId): Promise<PaymentMethodDto> {
    const updatedPayment = await this.paymentMethodModel
      .findOneAndUpdate({ _id: updatePaymentMethodDto._id, tenantId }, updatePaymentMethodDto, { new: true })
      .lean()
      .exec();
    if (!updatedPayment) {
      throw new NotFoundException(`payment with ID "${updatePaymentMethodDto._id}" not found.`);
    }

    if (updatedPayment.isPaymentMethodDefault) {
      // cast updatedPayment._id to Types.ObjectId and await the operation
      await this.makePaymentMethodSelectDefault(updatedPayment._id as Types.ObjectId, tenantId);
    }

    return plainToInstance(PaymentMethodDto, updatedPayment);
  }

  async remove(id: Types.ObjectId, tenantId: Types.ObjectId): Promise<boolean> {
    const result = await this.paymentMethodModel.findOneAndDelete({ _id: id, tenantId }).lean().exec();
    if (!result) {
      throw new NotFoundException(`payment with ID "${id}" not found.`);
    }
    return result !== null;
  }

  async makePaymentMethodSelectDefault(
    paymentMethodId: Types.ObjectId,
    tenantId: Types.ObjectId,
  ): Promise<PaymentMethodDto> {
    // Kiểm tra xem payment method có tồn tại không
    const paymentMethod = await this.paymentMethodModel.findOne({ _id: paymentMethodId, tenantId }).lean().exec();
    if (!paymentMethod) {
      throw new NotFoundException(`Payment method with ID "${paymentMethodId}" not found.`);
    }

    // Đặt tất cả payment methods của tenant thành isDefault = false
    await this.paymentMethodModel.updateMany({ tenantId }, { isDefault: false }).lean().exec();

    // Đặt payment method được chọn thành isDefault = true
    const updatedPaymentMethod = await this.paymentMethodModel
      .findOneAndUpdate({ _id: paymentMethodId, tenantId }, { isDefault: true }, { new: true })
      .lean()
      .exec();

    if (!updatedPaymentMethod) {
      throw new NotFoundException(`Failed to update payment method with ID "${paymentMethodId}".`);
    }

    return plainToInstance(PaymentMethodDto, updatedPaymentMethod);
  }

  async findAll(tenantIds: Types.ObjectId[], filters?: PaymentMethodSortFilter[]): Promise<PaymentMethodDto[]> {
    const match: any = { tenantId: { $in: tenantIds } };

    // Xử lý filters
    if (Array.isArray(filters) && filters.length > 0) {
      for (const filter of filters) {
        if (filter.key && filter.value !== null && filter.value !== undefined) {
          match[filter.key] = filter.value;
        }
      }
    }

    const paymentMethodModels = await this.paymentMethodModel.find(match).lean().exec();

    let paymentMethods = paymentMethodModels.map((item) => plainToInstance(PaymentMethodDto, item));
    paymentMethods = await this.mapImageUrl(paymentMethods);

    return paymentMethods;
  }

  async findOne(
    id: Types.ObjectId,
    tenantIds: Types.ObjectId[],
    filters?: PaymentMethodSortFilter[],
  ): Promise<PaymentMethodDto> {
    const match: any = { tenantId: { $in: tenantIds } };

    // Xử lý filters
    if (Array.isArray(filters) && filters.length > 0) {
      for (const filter of filters) {
        if (filter.key && filter.value !== null && filter.value !== undefined) {
          match[filter.key] = filter.value;
        }
      }
    }

    const paymentMethodModel = await this.paymentMethodModel.findOne(match).lean().exec();
    if (!paymentMethodModel) {
      throw new NotFoundException(`payment method with ID "${id}" not found.`);
    }

    let paymentMethod = plainToInstance(PaymentMethodDto, paymentMethodModel);
    const mappedMethods = await this.mapImageUrl([paymentMethod]);
    paymentMethod = mappedMethods[0];
    return paymentMethod;
  }

  async findDefault(
    tenantIds: Types.ObjectId[],
    filters?: PaymentMethodSortFilter[],
  ): Promise<PaymentMethodDto | null> {
    const match: any = { tenantId: { $in: tenantIds }, isPaymentMethodDefault: true };

    // Xử lý filters
    if (Array.isArray(filters) && filters.length > 0) {
      for (const filter of filters) {
        if (filter.key && filter.value !== null && filter.value !== undefined) {
          match[filter.key] = filter.value;
        }
      }
    }

    const paymentMethodModel = await this.paymentMethodModel.findOne(match).lean().exec();
    if (!paymentMethodModel) {
      throw new NotFoundException(`payment method default not found.`);
    }

    let paymentMethod = plainToInstance(PaymentMethodDto, paymentMethodModel);
    const mappedMethods = await this.mapImageUrl([paymentMethod]);
    paymentMethod = mappedMethods[0];
    if (!paymentMethod) {
      return null;
    }

    return paymentMethod;
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: PaymentMethodSortFilter,
    filters: PaymentMethodSortFilter[],
    tenantIds: Types.ObjectId[],
  ): Promise<SearchPaymentMethodPagingRes> {
    const { pipeline, matchForCount } = await this.buildQuerySearchPaymentMethodPaging(
      pageIdx,
      pageSize,
      keyword,
      sortBy,
      filters,
      tenantIds,
    );

    const items = await this.paymentMethodModel.aggregate(pipeline).exec();
    const totalItem = await this.paymentMethodModel.countDocuments(matchForCount);

    let paymentMethods = items.map((item) => plainToInstance(PaymentMethodDto, item));
    paymentMethods = await this.mapImageUrl(paymentMethods);

    return {
      pageIdx,
      paymentMethods,
      totalPage: Math.ceil(totalItem / pageSize),
      totalItem,
    };
  }

  async buildQuerySearchPaymentMethodPaging(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: PaymentMethodSortFilter,
    filters: PaymentMethodSortFilter[],
    tenantIds: Types.ObjectId[],
  ) {
    const skip = pageIdx ? (pageIdx - 1) * pageSize : 0;

    const match: any = { tenantId: { $in: tenantIds } };
    const ands: any[] = [];

    if (keyword) {
      ands.push({
        $or: [{ name: { $regex: keyword, $options: 'i' } }],
      });
    }

    let startDateValue: Date | null = null;
    let endDateValue: Date | null = null;

    if (Array.isArray(filters)) {
      for (const { key, value } of filters) {
        if (!key || value == null) continue;
        if (key === 'startDate') {
          const dateValue = getFirstValue(value);
          startDateValue = new Date(dateValue);
        } else if (key === 'endDate') {
          const dateValue = getFirstValue(value);
          endDateValue = new Date(dateValue);
        } else {
          ands.push(processFilterValue(key, value));
        }
      }
    }

    if (startDateValue || endDateValue) {
      const range: any = {};
      if (startDateValue) range.$gte = startDateValue;
      if (endDateValue) range.$lte = endDateValue;
      ands.push({ createdAt: range });
    }

    if (ands.length) match.$and = ands;

    const pipeline: any[] = [{ $match: match }];

    if (sortBy?.key) {
      pipeline.push({ $sort: { [sortBy.key]: sortBy.value === 'ascend' ? 1 : -1 } });
    }

    pipeline.push({ $skip: skip }, { $limit: pageSize });

    return { pipeline, matchForCount: match };
  }

  async mapImageUrl(paymentMethods: PaymentMethodDto[]): Promise<PaymentMethodDto[]> {
    return await Promise.all(
      paymentMethods.map(async (paymentMethod) => {
        if (paymentMethod.imageId) {
          paymentMethod.image = `${process.env.DOMAIN}:${process.env.PORT}/file/view/${paymentMethod.imageId.toString()}`;
        }
        return paymentMethod;
      }),
    );
  }
}

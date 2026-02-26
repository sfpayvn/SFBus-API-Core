import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { plainToInstance } from 'class-transformer';

import { SearchTenantQuerySortFilter, SearchTenantsRes, TenantDto } from './dto/tenant.dto';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { TenantDocument } from './schema/tenant.schema';
import { TenantSubscriptionService } from '../tenant-subscription/tenant-subscription.service';
import { FileService } from '../file/file/file.service';
import { UserService } from '../user/user/user.service';
import { DEFAULT_TENANT_USER_ROLES } from '@/common/constants/roles.constants';
import { SubscriptionService } from '../subscription/subscription.service';
import { RegisterSubscriptionDto } from '../tenant-subscription/dto/tenant-subscription.dto';

@Injectable()
export class TenantService {
  constructor(
    @InjectModel(TenantDocument.name)
    private readonly tenantModel: Model<TenantDocument>,
    @Inject(forwardRef(() => TenantSubscriptionService))
    private readonly tenantSubscriptionService: TenantSubscriptionService,
    @Inject(forwardRef(() => FileService))
    private readonly fileService: FileService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(forwardRef(() => SubscriptionService))
    private readonly subscriptionService: SubscriptionService,
  ) {}

  async create(createTenantDto: CreateTenantDto): Promise<TenantDto> {
    try {
      const popularSubscription = this.subscriptionService.findPopular();

      if (!popularSubscription) {
        throw new NotFoundException('No popular subscription found to assign to new tenant.');
      }

      const created = new this.tenantModel(createTenantDto);
      const saved = await created.save();

      const tenantId = saved._id as any;

      const registerSubscriptionDto: RegisterSubscriptionDto = {
        subscriptionId: (await popularSubscription)._id as any,
        startAt: new Date().toISOString(),
      };

      await this.tenantSubscriptionService.registerForTenant(tenantId, registerSubscriptionDto);

      // Create a user with tenant, pos, and driver roles after creating tenant
      try {
        await this.userService.create(
          {
            tenantId,
            phoneNumber: createTenantDto.phoneNumber,
            password: process.env.DEFAULT_TENANT_USER_PASSWORD || 'Abc@12345',
            name: createTenantDto.name,
            roles: DEFAULT_TENANT_USER_ROLES,
            isTempPassWord: true,
          } as any,
          tenantId,
        );
      } catch (userError) {
        // Log user creation error but continue with tenant creation
        console.error(`Failed to create user for tenant: ${userError.message}`);
      }

      const dto = plainToInstance(TenantDto, saved.toObject());
      const [result] = await this.mapLogoUrl([dto]);
      return result;
    } catch (error: any) {
      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        if (field === 'code') {
          throw new NotFoundException(`Code "${createTenantDto.code}" already exists.`);
        } else if (field === 'phoneNumber') {
          throw new NotFoundException(`Phone number "${createTenantDto.phoneNumber}" already exists.`);
        }
      }
      throw error;
    }
  }

  async update(updateTenantDto: UpdateTenantDto): Promise<TenantDto> {
    try {
      // Fetch old tenant to get old logoId
      const oldTenant = await this.tenantModel.findById(updateTenantDto._id).lean().exec();
      if (!oldTenant) {
        throw new NotFoundException(`Tenant with ID "${updateTenantDto._id}" not found.`);
      }

      // Check if logoId is being updated and delete old file if different
      if (
        updateTenantDto.logoId &&
        oldTenant.logoId &&
        oldTenant.logoId.toString() !== updateTenantDto.logoId.toString()
      ) {
        try {
          await this.fileService.delete(oldTenant.logoId, updateTenantDto._id);
        } catch (error) {
          // Log error but continue with update
          console.error(`Failed to delete old logo file: ${error.message}`);
        }
      }

      // Remove code from update to prevent updating it
      const { code, ...updateData } = updateTenantDto as any;

      const updated = await this.tenantModel
        .findByIdAndUpdate(updateTenantDto._id, updateData, { new: true })
        .lean()
        .exec();

      const dto = plainToInstance(TenantDto, updated);
      const [result] = await this.mapLogoUrl([dto]);
      return result;
    } catch (error: any) {
      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        if (field === 'code') {
          throw new NotFoundException(`Code "${updateTenantDto.code}" already exists.`);
        } else if (field === 'phoneNumber') {
          throw new NotFoundException(`Phone number "${updateTenantDto.phoneNumber}" already exists.`);
        }
      }
      throw error;
    }
  }

  async delete(id: Types.ObjectId): Promise<boolean> {
    const res = await this.tenantModel.findByIdAndDelete(id).lean().exec();
    return res !== null;
  }

  async findAll(): Promise<TenantDto[]> {
    const tenants = await this.tenantModel.find().lean().exec();
    const dtosArray = tenants.map((t) => plainToInstance(TenantDto, t));
    return await this.mapLogoUrl(dtosArray);
  }

  async validateTenant(phoneNumber: string): Promise<TenantDto | null> {
    const tenantModel = await this.tenantModel.findOne({ 'contact.phoneNumber': phoneNumber }).lean().exec();
    if (!tenantModel) {
      return null;
    }
    const dto = plainToInstance(TenantDto, tenantModel);
    const [result] = await this.mapLogoUrl([dto]);
    return result;
  }

  async findOne(id: Types.ObjectId): Promise<TenantDto | null> {
    const tenant = await this.tenantModel.findById(id).lean().exec();
    if (!tenant) {
      return null;
    }
    const dto = plainToInstance(TenantDto, tenant);
    const [result] = await this.mapLogoUrl([dto]);
    return result;
  }

  async findByCode(code: string): Promise<TenantDto> {
    const tenant = await this.tenantModel.findOne({ code }).lean().exec();
    if (!tenant) {
      throw new NotFoundException(`Tenant with code "${code}" not found.`);
    }
    const dto = plainToInstance(TenantDto, tenant);
    const [result] = await this.mapLogoUrl([dto]);
    return result;
  }

  async findByPhoneNumber(phoneNumber: string): Promise<TenantDto> {
    const tenant = await this.tenantModel.findOne({ phoneNumber }).lean().exec();
    if (!tenant) {
      throw new NotFoundException(`Tenant with phone number "${phoneNumber}" not found.`);
    }
    const dto = plainToInstance(TenantDto, tenant);
    const [result] = await this.mapLogoUrl([dto]);
    return result;
  }

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: SearchTenantQuerySortFilter,
    filters: SearchTenantQuerySortFilter[],
  ): Promise<SearchTenantsRes> {
    const pipeline = await this.buildQuerySearchTenants(pageIdx, pageSize, keyword, sortBy, filters);

    // Thực hiện tìm kiếm
    const tenants = await this.tenantModel.aggregate(pipeline).exec();

    // Đếm tổng số mục
    const totalItem = await this.tenantModel.countDocuments({});

    let result = plainToInstance(
      TenantDto,
      await Promise.all(
        tenants.map(async (tenant) => {
          const subscription = await this.tenantSubscriptionService.getActive(tenant._id);
          const subscriptionId = subscription ? subscription.subscriptionId : null;
          return { ...tenant, subscriptionId };
        }),
      ),
    );

    return {
      pageIdx,
      tenants: await this.mapLogoUrl(result),
      totalPage: Math.ceil(totalItem / pageSize),
      totalItem,
    };
  }

  async buildQuerySearchTenants(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: SearchTenantQuerySortFilter,
    filters: SearchTenantQuerySortFilter[],
  ) {
    // Thêm điều kiện kiểm tra điểm khởi hành nếu có

    const skip = pageIdx ? (pageIdx - 1) * pageSize : 0;

    const pipeline: any = [];
    const matchConditions: any[] = [];

    // 1. Tìm theo keyword
    if (keyword) {
      matchConditions.push({
        $or: [{ name: { $regex: keyword, $options: 'i' } }],
      });
    }

    // 2. Xác định start/end date và các filter còn lại
    let startDateValue: string = '';
    let endDateValue: string = '';

    if (Array.isArray(filters)) {
      await Promise.all(
        filters.map(async ({ key, value }) => {
          if (!key || value == null) return;

          if (key === 'startDate') {
            startDateValue = value;
          } else if (key === 'endDate') {
            endDateValue = value;
          } else {
            matchConditions.push({ [key]: value });
          }
        }),
      );
    }

    // 3. Tạo điều kiện range cho createdAt nếu có startDate và/hoặc endDate
    if (startDateValue || endDateValue) {
      const rangeCond: any = {};
      if (startDateValue) rangeCond.$gte = startDateValue;
      if (endDateValue) rangeCond.$lte = endDateValue;

      matchConditions.push({ createDate: rangeCond });
    }

    // 4. Đẩy $match nếu có bất kỳ điều kiện nào
    if (matchConditions.length) {
      pipeline.push({
        $match: { $and: matchConditions },
      });
    }

    // 4. $sort
    if (sortBy?.key) {
      pipeline.push({
        $sort: { [sortBy.key]: sortBy.value === 'ascend' ? 1 : -1 },
      });
    }

    // 5. paging: $skip + $limit
    pipeline.push({ $skip: skip }, { $limit: pageSize });
    return pipeline;
  }

  private async mapLogoUrl(tenants: TenantDto[]): Promise<TenantDto[]> {
    const port = process.env.PUBLIC_PORT ? `:${process.env.PUBLIC_PORT}` : '';

    return tenants.map((tenant) => ({
      ...tenant,
      logo: tenant.logoId
        ? `${process.env.DOMAIN}${port}/file/view/${tenant.logoId.toString()}`
        : undefined,
    }));
  }
}

// user.service.ts

import {
  Injectable,
  BadRequestException,
  NotFoundException,
  forwardRef,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { TenantService } from '../../tenant/tenant.service';
import { TenantSubscriptionService } from '../../tenant-subscription/tenant-subscription.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateUserProfileDto, UpdatePasswordUserDto } from '../user/dto/update-user.dto';
import { UserDto, UserAddressDto, SearchUserQuerySortFilter, SearchUsersRes } from '../user/dto/user.dto';
import { UserDocument } from '../user/schema/user.schema';
import { ROLE_CONSTANTS } from '@/common/constants/roles.constants';

@Injectable()
export class UserTenantService {
  constructor(
    @InjectModel(UserDocument.name) private userModel: Model<UserDocument>,
    @Inject(forwardRef(() => TenantService)) private readonly tenantService: TenantService,
    private readonly tenantSubscriptionService: TenantSubscriptionService,
  ) {}

  // Tạo mới người dùng
  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const { password, phoneNumber } = createUserDto;

    // Kiểm tra tính duy nhất của username, email và phoneNumber
    const baseQuery = {};
    const userExists = await this.userModel.findOne({
      $and: [baseQuery, { $or: [{ phoneNumber }] }],
    });

    if (userExists) {
      if (userExists.phoneNumber === phoneNumber) {
        throw new BadRequestException('Số điện thoại đã được sử dụng.');
      }
    }

    createUserDto.addresses?.map((address: UserAddressDto) => {
      address._id = new Types.ObjectId();
    });

    // Băm mật khẩu
    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS ?? 10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new this.userModel({
      ...createUserDto,
      roles: [ROLE_CONSTANTS.TENANT],
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    return plainToInstance(UserDto, savedUser.toObject());
  }

  // Cập nhật thông tin người dùng
  async update(updateUserDto: UpdateUserProfileDto): Promise<UserDto> {
    const userModel = await this.userModel.findOne({ _id: updateUserDto._id });
    if (!userModel) {
      throw new NotFoundException('Người dùng không tồn tại.');
    }

    // Nếu cập nhật email hoặc phoneNumber, cần kiểm tra tính duy nhất
    const { email } = updateUserDto;

    if (email && email !== userModel.email) {
      const emailExists = await this.userModel.findOne({ email });
      if (emailExists && emailExists._id != updateUserDto._id) {
        throw new BadRequestException('Email đã được sử dụng.');
      }
    }

    updateUserDto.addresses =
      updateUserDto.addresses &&
      (await updateUserDto.addresses.map((address: any) => {
        // Check if the address does not have an _id
        if (!address._id) {
          address._id = new Types.ObjectId(); // Assign a new ObjectId
        }
        return address; // Return the updated address
      }));

    Object.assign(userModel, updateUserDto);
    const updatedUser = await userModel.save();

    let user = plainToInstance(UserDto, updatedUser.toObject());
    const usersMaped = await this.mapUserAvatarUrl([user]);

    if (!usersMaped || usersMaped.length === 0) {
      return user;
    }
    user = usersMaped[0];
    return user;
  }

  // Cập nhật thông tin người dùng
  async updateUserProfile(updateUserDto: UpdateUserProfileDto): Promise<UserDto> {
    const userModel = await this.userModel.findOne({ _id: updateUserDto._id });
    if (!userModel) {
      throw new NotFoundException('Người dùng không tồn tại.');
    }

    // Nếu cập nhật email, cần kiểm tra tính duy nhất
    const { email, avatarId, name, addresses, gender, birthdate } = updateUserDto;

    if (email !== undefined && email !== userModel.email) {
      const emailExists = await this.userModel.findOne({ email });
      if (emailExists && (emailExists as any)._id.toString() !== updateUserDto._id.toString()) {
        throw new BadRequestException('Email đã được sử dụng.');
      }
      userModel.email = email;
    }

    if (avatarId !== undefined) {
      userModel.avatarId = new Types.ObjectId(avatarId);
    }

    if (name !== undefined) {
      userModel.name = name;
    }

    if (addresses !== undefined) {
      userModel.addresses = addresses.map((address: any) => {
        if (!address._id) {
          address._id = new Types.ObjectId();
        }
        return address;
      });
    }

    if (gender !== undefined) {
      userModel.gender = gender;
    }

    if (birthdate !== undefined) {
      userModel.birthdate = new Date(birthdate);
    }

    const updatedUser = await userModel.save();

    let user = plainToInstance(UserDto, updatedUser.toObject());
    const usersMaped = await this.mapUserAvatarUrl([user]);

    if (!usersMaped || usersMaped.length === 0) {
      return user;
    }
    user = usersMaped[0];
    return user;
  }

  async updateUserField(userId: Types.ObjectId, fieldName: string, value: any): Promise<boolean> {
    // Prevent updating sensitive fields via this generic method
    const forbidden = ['phoneNumber', 'email', 'password'];
    if (forbidden.includes(fieldName)) {
      throw new BadRequestException('Updating phoneNumber, email or password is not allowed via this method.');
    }

    const userModel = await this.userModel.findOneAndUpdate(
      { _id: userId },
      { $set: { [fieldName]: value } },
      { new: true, runValidators: true },
    );
    if (!userModel) {
      return false;
    }
    return true;
  }

  async updatePassword(userId: Types.ObjectId, updatePasswordUserDto: UpdatePasswordUserDto): Promise<UserDto> {
    const user = await this.userModel.findOne({ _id: userId });
    if (!user) throw new NotFoundException('Người dùng không tồn tại.');

    const { oldPassword, password } = updatePasswordUserDto;

    const isOldPasswordRequired = !user.isTempPassWord && !oldPassword;
    const isOldPasswordInvalid = !user.isTempPassWord && !(await bcrypt.compare(oldPassword, user.password));

    if (isOldPasswordRequired || isOldPasswordInvalid) {
      throw new BadRequestException('Mật khẩu cũ không đúng');
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await user.save();
    await this.updateUserField(userId, 'isTempPassWord', false);
    if (!updatedUser) {
      throw new BadRequestException('Cập nhật mật khẩu thất bại.');
    }
    return plainToInstance(UserDto, updatedUser.toObject());
  }

  async setPasswordAsTemp(userId: Types.ObjectId, tempPassword: string): Promise<boolean> {
    const query = { _id: userId };

    const user = await this.userModel.findOne(query);
    if (!user) throw new NotFoundException('Người dùng không tồn tại.');
    user.password = await bcrypt.hash(tempPassword, 10);
    user.isTempPassWord = true;
    const updatedUser = await user.save();
    if (!updatedUser) {
      throw new BadRequestException('Cập nhật mật khẩu tạm thời thất bại.');
    }
    return true;
  }

  async markIdentifierAsVerified(userId: Types.ObjectId, identifier: string): Promise<UserDto> {
    // Implementation to mark the identifier as verified for the user
    const updatedUser = await this.userModel
      .updateOne({ _id: userId, phoneNumber: identifier }, { isPhoneNumberVerified: true }, { new: true })
      .lean()
      .exec();
    return plainToInstance(UserDto, updatedUser);
  }

  async delete(id: Types.ObjectId): Promise<boolean> {
    const res = await this.userModel.findByIdAndDelete(id).lean().exec();
    return res !== null;
  }

  async validateUser(phoneNumber: string, password: string, tenantCode: string): Promise<UserDto | null> {
    const tenant = await this.tenantService.findByCode(tenantCode);
    if (!tenant) {
      throw new UnauthorizedException('Tenant không tồn tại.');
    }
    // Validate the user credentials

    const query = { phoneNumber, tenantId: tenant._id };
    const userModel = await this.userModel.findOne(query).lean().exec();
    if (!userModel) {
      return null;
    }
    const isMatch = await bcrypt.compare(password, userModel.password);
    if (!isMatch) {
      return null;
    }

    const user = plainToInstance(UserDto, userModel);

    if (tenant) {
      user.tenant = tenant;

      const tenantSubscription = await this.tenantSubscriptionService.findByTenantId(user.tenantId);

      if (tenantSubscription) {
        user.tenant.subscriptionId = tenantSubscription.subscriptionId;
      }
    }

    return user;
  }

  // Tìm người dùng theo ID
  async findById(userId: Types.ObjectId): Promise<UserDto | null> {
    const userModel = await this.userModel.findOne({ _id: userId }).lean().exec();
    if (!userModel) {
      throw new NotFoundException(`User with ID "${userId}" not found.`);
    }

    let user = plainToInstance(UserDto, userModel);
    const userMap = await this.mapUserAvatarUrl([user]);
    user = userMap[0];
    return user;
  }

  async findByIds(userIds: Types.ObjectId[]): Promise<UserDto[] | null> {
    const usersModel = await this.userModel
      .find({ _id: { $in: userIds } })
      .lean()
      .exec();
    if (!usersModel || usersModel.length === 0) {
      return null;
    }

    let users = usersModel.map((user) => plainToInstance(UserDto, user));
    users = await this.mapUserAvatarUrl(users);

    return users;
  }

  // Tìm người dùng theo tên đăng nhập
  async findByPhoneNumber(phoneNumber: string): Promise<UserDto | null> {
    const query = { phoneNumber: phoneNumber };
    const userModel = await this.userModel.findOne(query).lean().exec();
    if (!userModel) {
      return null;
    }

    const user = plainToInstance(UserDto, userModel);
    const userAfterMap = await this.mapUserAvatarUrl([user]);

    return userAfterMap[0];
  }

  async findAll(): Promise<UserDto[]> {
    const usersModel = await this.userModel.find().lean().exec();

    let users = usersModel.map((user) => plainToInstance(UserDto, user));
    users = await this.mapUserAvatarUrl(users);

    return users;
  }

  async findAllByRole(role: string): Promise<UserDto[]> {
    const usersModel = await this.userModel
      .find({ roles: { $in: [role] } })
      .lean()
      .exec();

    let users = usersModel.map((user) => plainToInstance(UserDto, user));
    users = await this.mapUserAvatarUrl(users);

    return users;
  }

  async findOne(id: string): Promise<UserDto> {
    const userModel = await this.userModel.findOne({ _id: id }).lean().exec();
    if (!userModel) {
      throw new NotFoundException(`Bus type with ID "${id}" not found.`);
    }

    const user = plainToInstance(UserDto, userModel);
    const userAfterMap = await this.mapUserAvatarUrl([user]);

    return userAfterMap[0];
  }

  async findByPhone(phoneNumber: string): Promise<UserDto> {
    const userModel = await this.userModel.findOne({ phoneNumber }).lean().exec();
    if (!userModel) {
      throw new NotFoundException(`Bus type with phone number "${phoneNumber}" not found.`);
    }

    const user = plainToInstance(UserDto, userModel);
    const userAfterMap = await this.mapUserAvatarUrl([user]);

    return userAfterMap[0];
  }

  async findByEmail(email: string): Promise<UserDto> {
    const userModel = await this.userModel.findOne({ email }).lean().exec();
    if (!userModel) {
      throw new NotFoundException(`Bus type with email "${email}" not found.`);
    }

    const user = plainToInstance(UserDto, userModel);
    const userAfterMap = await this.mapUserAvatarUrl([user]);

    return userAfterMap[0];
  }

  async findOneByRole(role: string): Promise<UserDto> {
    const userModel = await this.userModel.findOne({ role }).lean().exec();
    if (!userModel) {
      throw new NotFoundException(`Bus type with role "${role}" not found.`);
    }
    const user = plainToInstance(UserDto, userModel);
    const userAfterMap = await this.mapUserAvatarUrl([user]);

    return userAfterMap[0];
  }
  // Xác thực người dùng

  async search(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: SearchUserQuerySortFilter,
    filters: SearchUserQuerySortFilter[],
  ): Promise<SearchUsersRes> {
    const pipeline = await this.buildQuerySearch(pageIdx, pageSize, keyword, sortBy, filters);

    // Add role filter to the pipeline
    // Find the $match stage and add role filter
    let matchStageIndex = pipeline.findIndex((stage: any) => stage.$match);
    if (matchStageIndex !== -1) {
      // Modify existing $match stage to include role filter
      pipeline[matchStageIndex].$match = {
        ...pipeline[matchStageIndex].$match,
        roles: { $in: [ROLE_CONSTANTS.TENANT] },
      };
    } else {
      // If no $match stage, add one at the beginning
      pipeline.unshift({
        $match: { roles: { $in: [ROLE_CONSTANTS.TENANT] } },
      });
      matchStageIndex = 0;
    }

    // Thực hiện tìm kiếm
    const usersModel = await this.userModel.aggregate(pipeline).exec();

    // Đếm tổng số mục dựa vào điều kiện match
    const matchConditions = pipeline[matchStageIndex].$match;
    const totalItem = await this.userModel.countDocuments(matchConditions);

    let users = await Promise.all(
      usersModel.map(async (user) => {
        const tenant = await this.tenantService.findOne(user.tenantId);
        if (tenant) {
          user.tenant = tenant;
        }
        return plainToInstance(UserDto, user);
      }),
    );
    users = await this.mapUserAvatarUrl(users);

    return {
      pageIdx,
      users: users,
      totalPage: Math.ceil(totalItem / pageSize),
      totalItem,
    };
  }

  async buildQuerySearch(
    pageIdx: number,
    pageSize: number,
    keyword: string,
    sortBy: SearchUserQuerySortFilter,
    filters: SearchUserQuerySortFilter[],
  ) {
    // Thêm điều kiện kiểm tra điểm khởi hành nếu có

    const skip = pageIdx ? (pageIdx - 1) * pageSize : 0;

    const pipeline: any = [{ $match: {} }];
    const matchConditions: any[] = [];

    // 1. Tìm theo keyword
    if (keyword) {
      matchConditions.push({
        $or: [{ name: { $regex: keyword, $options: 'i' } }],
      });
    }

    if (Array.isArray(filters)) {
      await Promise.all(
        filters.map(async ({ key, value }) => {
          if (!key || value == null) return;
          else {
            matchConditions.push({ [key]: { $in: value } });
          }
        }),
      );
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

  async mapUserAvatarUrl(users: UserDto[]): Promise<UserDto[]> {
    return await Promise.all(
      users.map(async (user) => {
        if (user.avatarId) {
          user.avatar = `${process.env.DOMAIN}:${process.env.PORT}/file/view/${user.avatarId.toString()}`;
        }
        return user;
      }),
    );
  }
}

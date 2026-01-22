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
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdatePasswordUserDto, UpdateUserProfileDto } from './dto/update-user.dto';
import { UserDocument } from './schema/user.schema';
import { SearchUserQuerySortFilter, SearchUsersRes, UserAddressDto, UserDto } from './dto/user.dto';
import { plainToInstance } from 'class-transformer';
import { TenantService } from '../../tenant/tenant.service';
import { TenantSubscriptionService } from '../../tenant-subscription/tenant-subscription.service';
import { of } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserDocument.name) private userModel: Model<UserDocument>,
    @Inject(forwardRef(() => TenantService)) private readonly tenantService: TenantService,
    private readonly tenantSubscriptionService: TenantSubscriptionService,
  ) {}

  // Tạo mới người dùng
  async create(createUserDto: CreateUserDto, tenantId?: Types.ObjectId): Promise<UserDto> {
    const { password, phoneNumber } = createUserDto;

    // Kiểm tra tính duy nhất của username, email và phoneNumber
    const baseQuery = tenantId ? { tenantId } : {};
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
      password: hashedPassword,
      ...(tenantId && { tenantId }),
    });

    const savedUser = await newUser.save();
    return plainToInstance(UserDto, savedUser.toObject());
  }

  // Cập nhật thông tin người dùng
  async update(updateUserDto: UpdateUserProfileDto, tenantId: Types.ObjectId): Promise<UserDto> {
    const userModel = await this.userModel.findOne({ _id: updateUserDto._id, tenantId });
    if (!userModel) {
      throw new NotFoundException('Người dùng không tồn tại.');
    }

    // Nếu cập nhật email hoặc phoneNumber, cần kiểm tra tính duy nhất
    const { email } = updateUserDto;

    if (email && email !== userModel.email) {
      const emailExists = await this.userModel.findOne({ email, tenantId });
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
  async updateUserProfile(updateUserDto: UpdateUserProfileDto, tenantId: Types.ObjectId): Promise<UserDto> {
    const userModel = await this.userModel.findOne({ _id: updateUserDto._id, tenantId });
    if (!userModel) {
      throw new NotFoundException('Người dùng không tồn tại.');
    }

    // Nếu cập nhật email, cần kiểm tra tính duy nhất
    const { email, avatarId, name, addresses, gender, birthdate } = updateUserDto;

    if (email !== undefined && email !== userModel.email) {
      const emailExists = await this.userModel.findOne({ email, tenantId });
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

  async updateUserField(
    userId: Types.ObjectId,
    fieldName: string,
    value: any,
    tenantId: Types.ObjectId,
  ): Promise<UserDto> {
    // Prevent updating sensitive fields via this generic method
    const forbidden = ['phoneNumber', 'email', 'password'];
    if (forbidden.includes(fieldName)) {
      throw new BadRequestException('Updating phoneNumber, email or password is not allowed via this method.');
    }

    const userModel = await this.userModel.findOneAndUpdate(
      { _id: userId, tenantId },
      { $set: { [fieldName]: value } },
      { new: true, runValidators: true },
    );
    if (!userModel) {
      throw new NotFoundException('Người dùng không tồn tại.');
    }
    return plainToInstance(UserDto, userModel);
  }

  async updatePassword(
    userId: Types.ObjectId,
    updatePasswordUserDto: UpdatePasswordUserDto,
    tenantId: Types.ObjectId,
  ): Promise<UserDto> {
    const user = await this.userModel.findOne({ _id: userId, tenantId });
    if (!user) throw new NotFoundException('Người dùng không tồn tại.');

    const { oldPassword, password } = updatePasswordUserDto;

    if (oldPassword === password) {
      throw new BadRequestException('Mật khẩu mới không được trùng với mật khẩu cũ');
    }

    const isOldPasswordRequired = !user.isTempPassWord && !oldPassword;
    const isOldPasswordInvalid = !user.isTempPassWord && !(await bcrypt.compare(oldPassword, user.password));

    if (isOldPasswordRequired || isOldPasswordInvalid) {
      throw new BadRequestException('Mật khẩu cũ không đúng');
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await user.save();
    await this.updateUserField(userId, 'isTempPassWord', false, tenantId);
    if (!updatedUser) {
      throw new BadRequestException('Cập nhật mật khẩu thất bại.');
    }
    return plainToInstance(UserDto, updatedUser.toObject());
  }

  async setPasswordAsTemp(userId: Types.ObjectId, tempPassword: string, tenantId: Types.ObjectId): Promise<boolean> {
    const isRootTenant = tenantId.toString() === process.env.ROOT_TENANT_ID;
    const query = isRootTenant ? { _id: userId } : { _id: userId, tenantId };

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

  async markIdentifierAsVerified(
    userId: Types.ObjectId,
    tenantId: Types.ObjectId,
    identifier: string,
  ): Promise<UserDto> {
    // Implementation to mark the identifier as verified for the user
    const updatedUser = await this.userModel
      .updateOne({ _id: userId, tenantId, phoneNumber: identifier }, { isPhoneNumberVerified: true }, { new: true })
      .lean()
      .exec();
    return plainToInstance(UserDto, updatedUser);
  }

  async delete(id: Types.ObjectId): Promise<boolean> {
    const res = await this.userModel.findByIdAndDelete(id).lean().exec();
    return res !== null;
  }

  // Tìm người dùng theo ID
  async findById(userId: Types.ObjectId, tenantId: Types.ObjectId): Promise<UserDto | null> {
    const userModel = await this.userModel.findOne({ _id: userId, tenantId }).lean().exec();
    if (!userModel) {
      throw new NotFoundException(`User with ID "${userId}" not found.`);
    }

    let user = plainToInstance(UserDto, userModel);
    const userMap = await this.mapUserAvatarUrl([user]);
    user = userMap[0];
    return user;
  }

  async findByIds(userIds: Types.ObjectId[], tenantId: Types.ObjectId): Promise<UserDto[] | null> {
    const usersModel = await this.userModel
      .find({ _id: { $in: userIds }, tenantId })
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
  async findByPhoneNumber(phoneNumber: string, tenantId?: Types.ObjectId): Promise<UserDto | null> {
    const query = tenantId ? { phoneNumber: phoneNumber, tenantId } : { phoneNumber: phoneNumber };
    const userModel = await this.userModel.findOne(query).lean().exec();
    if (!userModel) {
      return null;
    }

    const user = plainToInstance(UserDto, userModel);
    const userAfterMap = await this.mapUserAvatarUrl([user]);

    return userAfterMap[0];
  }

  async findAll(tenantId: Types.ObjectId): Promise<UserDto[]> {
    const usersModel = await this.userModel.find({ tenantId }).lean().exec();

    let users = usersModel.map((user) => plainToInstance(UserDto, user));
    users = await this.mapUserAvatarUrl(users);

    return users;
  }

  async findAllByRole(role: string, tenantId: Types.ObjectId): Promise<UserDto[]> {
    const usersModel = await this.userModel
      .find({ roles: { $in: [role] }, tenantId })
      .lean()
      .exec();

    let users = usersModel.map((user) => plainToInstance(UserDto, user));
    users = await this.mapUserAvatarUrl(users);

    return users;
  }

  async findOne(id: string, tenantId: Types.ObjectId): Promise<UserDto> {
    const userModel = await this.userModel.findOne({ _id: id, tenantId }).lean().exec();
    if (!userModel) {
      throw new NotFoundException(`Bus type with ID "${id}" not found.`);
    }

    const user = plainToInstance(UserDto, userModel);
    const userAfterMap = await this.mapUserAvatarUrl([user]);

    return userAfterMap[0];
  }

  async findByPhone(phoneNumber: string, tenantId: Types.ObjectId): Promise<UserDto> {
    const userModel = await this.userModel.findOne({ phoneNumber, tenantId }).lean().exec();
    if (!userModel) {
      throw new NotFoundException(`Bus type with phone number "${phoneNumber}" not found.`);
    }

    const user = plainToInstance(UserDto, userModel);
    const userAfterMap = await this.mapUserAvatarUrl([user]);

    return userAfterMap[0];
  }

  async findByEmail(email: string, tenantId: Types.ObjectId): Promise<UserDto> {
    const userModel = await this.userModel.findOne({ email, tenantId }).lean().exec();
    if (!userModel) {
      throw new NotFoundException(`Bus type with email "${email}" not found.`);
    }

    const user = plainToInstance(UserDto, userModel);
    const userAfterMap = await this.mapUserAvatarUrl([user]);

    return userAfterMap[0];
  }

  async findOneByRole(role: string, tenantId: Types.ObjectId): Promise<UserDto> {
    const userModel = await this.userModel.findOne({ role, tenantId }).lean().exec();
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
    tenantId: Types.ObjectId,
  ): Promise<SearchUsersRes> {
    const pipeline = await this.buildQuerySearch(pageIdx, pageSize, keyword, sortBy, filters, tenantId);
    // Thực hiện tìm kiếm
    const usersModel = await this.userModel.aggregate(pipeline).exec();
    // Đếm tổng số mục
    const totalItem = await this.userModel.countDocuments({ tenantId });

    let users = usersModel.map((user) => plainToInstance(UserDto, user));
    users = await await this.mapUserAvatarUrl(users);

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
    tenantId: Types.ObjectId,
  ) {
    // Thêm điều kiện kiểm tra điểm khởi hành nếu có

    const skip = pageIdx ? (pageIdx - 1) * pageSize : 0;

    const pipeline: any = [{ $match: { tenantId } }];
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

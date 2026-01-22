import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    return this.parseValue(value);
  }

  private parseValue(value: any): any {
    if (Array.isArray(value)) {
      // Nếu là mảng, chuyển đổi từng phần tử bằng cách gọi lại hàm parseValue
      // và lọc bỏ các phần tử trả về `undefined` (ví dụ chuỗi rỗng)
      return value.map((item) => this.parseValue(item)).filter((v) => v !== undefined);
    } else if (typeof value === 'object' && value !== null) {
      // Nếu là object, kiểm tra và chuyển đổi các giá trị bằng cách gọi lại hàm parseValue
      Object.keys(value).forEach((key) => {
        const parsed = this.parseValue(value[key]);
        if (parsed === undefined) {
          delete value[key];
        } else {
          value[key] = parsed;
        }
      });
      return value;
    } else if (this.isValidObjectId(value)) {
      // Nếu là chuỗi, chuyển đổi trực tiếp
      return new Types.ObjectId(value);
    } else if (value === '') {
      // Bỏ qua các giá trị chuỗi rỗng
      return undefined;
    } else {
      return value; // Trả về giá trị gốc nếu không cần chuyển đổi
    }
  }

  private isValidObjectId(id: any): boolean {
    // Kiểm tra nếu id là một ObjectId và có độ dài chính xác
    return Types.ObjectId.isValid(id) && new Types.ObjectId(id).toString() === id;
  }
}

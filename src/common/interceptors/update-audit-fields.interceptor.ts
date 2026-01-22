import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Types } from 'mongoose';

export interface UpdateAuditFieldsOptions {
  updateCreatedBy?: boolean;
  updateUpdatedBy?: boolean;
}

@Injectable()
export class UpdateAuditFieldsInterceptor implements NestInterceptor {
  constructor(private readonly options: UpdateAuditFieldsOptions = { updateCreatedBy: true, updateUpdatedBy: true }) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const body = request.body;

    if (user && user._id && body) {
      const userId = user._id;

      // Handle arrays
      if (Array.isArray(body)) {
        request.body = body.map((item) => this.updateAuditFields(item, userId));
      } else {
        request.body = this.updateAuditFields(body, userId);
      }
    }

    return next.handle();
  }

  private updateAuditFields(obj: any, userId: Types.ObjectId): any {
    if (!obj || typeof obj !== 'object') {
      return obj;
    }

    // Update createdBy if option is enabled and field exists
    if (this.options.updateCreatedBy) {
      obj.createdBy = userId;
    }

    // Update updatedBy if option is enabled and field exists
    if (this.options.updateUpdatedBy) {
      obj.updatedBy = userId;
    }

    // Recursively update nested objects
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];

        // Handle nested arrays
        if (Array.isArray(value)) {
          obj[key] = value.map((item) => {
            if (typeof item === 'object' && item !== null) {
              return this.updateAuditFields(item, userId);
            }
            return item;
          });
        }
        // Handle nested objects (but not ObjectId instances or Dates)
        else if (value && typeof value === 'object' && !(value instanceof Types.ObjectId) && !(value instanceof Date)) {
          obj[key] = this.updateAuditFields(value, userId);
        }
      }
    }

    return obj;
  }
}

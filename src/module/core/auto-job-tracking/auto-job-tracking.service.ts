import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AutoJobTrackingDocument } from './schema/auto-job-tracking.schema';
import moment from 'moment-timezone';
import { toObjectId } from '@/utils/utils';
import { ppid } from 'process';

@Injectable()
export class AutoJobTrackingService {
  ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';
  private readonly logger = new Logger(AutoJobTrackingService.name);

  constructor(
    @InjectModel('AutoJobTracking')
    private readonly trackingModel: Model<AutoJobTrackingDocument>,
  ) {}

  /**
   * Try to run auto schedule job for today
   * Only runs once per day per tenant using atomic upsert
   * @param tenantId - Tenant ID
   * @param jobName - Name of the job to run (default: 'auto_schedule')
   * @param timezoneOffset - Timezone offset in milliseconds (e.g., 25200000 for UTC+7)
   * @returns true if job was executed, false if already ran today
   */
  async tryRunToday(
    tenantId: Types.ObjectId,
    jobName: string = 'auto_schedule',
    timezoneOffset: number = 25200000,
  ): Promise<boolean> {
    // Convert milliseconds to minutes for moment.utcOffset()
    const offsetMinutes = timezoneOffset / 60000;
    const today = moment().utcOffset(offsetMinutes).format('YYYY-MM-DD');

    try {
      const rootTenantId = toObjectId(this.ROOT_TENANT_ID);
      if (tenantId == rootTenantId) return false;
      // Clean up old tracking records for this tenant and jobName (runDate < today)
      try {
        await this.trackingModel.deleteMany({ tenantId, runDate: { $lt: today } }).exec();
      } catch (cleanupErr) {
        // proceed even if cleanup fails
      }

      const result = await this.trackingModel.findOneAndUpdate(
        {
          tenantId,
          jobName,
          runDate: today,
        },
        {
          $setOnInsert: {
            tenantId,
            jobName,
            runDate: today,
            createdAt: new Date(),
          },
        },
        {
          upsert: true,
          new: false,
        },
      );

      // If result is null, it means this is the first run today
      if (!result) {
        return true;
      } else {
        this.logger.debug(`Job '${jobName}' already ran today for tenant ${tenantId}`);
        return false;
      }
    } catch (err) {
      // Duplicate key error (code 11000) means another request beat us to it
      if (err.code === 11000) {
        this.logger.debug(`Job '${jobName}' race condition handled for tenant ${tenantId}`);
        return false;
      }
      // For other errors, log but don't throw to avoid disrupting login
      this.logger.error(`Error in tryRunToday for tenant ${tenantId}, job '${jobName}':`, err);
      return false;
    }
  }
}

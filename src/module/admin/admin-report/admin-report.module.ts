import { Module } from '@nestjs/common';
import { AdminReportController } from './admin-report.controller';
import { ReportModule } from '../../core/report/report.module';

@Module({
  imports: [ReportModule],
  controllers: [AdminReportController],
})
export class AdminReportModule {}

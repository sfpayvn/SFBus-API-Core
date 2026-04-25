import { Injectable } from '@nestjs/common';
import { SettingsService } from '../../../core/settings/settings.service';
import { toObjectId } from '@/utils/utils';
import { Types } from 'mongoose';

/**
 * Wrapper service for app version checking in POS module
 * Uses root tenant to get the app version
 */
@Injectable()
export class PosAppVersionService {
  private ROOT_TENANT_ID = process.env.ROOT_TENANT_ID?.trim() || '';

  constructor(private readonly settingsService: SettingsService) {}

  /**
   * Get current app version from settings
   * Uses root tenant for app version
   * @returns App version string
   */
  async getAppVersion(): Promise<string> {
    const rootTenantId = toObjectId(this.ROOT_TENANT_ID);
    return this.settingsService.getAppVersion(rootTenantId);
  }

  /**
   * Get app version for a specific tenant
   * Falls back to root tenant if not found
   * @param tenantId - Tenant ID to get settings for
   * @returns App version string
   */
  async getAppVersionForTenant(tenantId: Types.ObjectId): Promise<string> {
    return this.settingsService.getAppVersion(tenantId);
  }
}

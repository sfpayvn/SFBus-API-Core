type CapabilityItem = {
  moduleKey: string;
  functionKey: string | null; // null = module-level
  type: 'unlimited' | 'count';
  quota: number | null; // null nếu unlimited
  remaining: number | null; // null nếu unlimited
  resetAt: string | null; // ISO
};

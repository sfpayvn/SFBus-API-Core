type CapabilityItem = {
    moduleKey: string;
    functionKey: string | null;
    type: 'unlimited' | 'count';
    quota: number | null;
    remaining: number | null;
    resetAt: string | null;
};

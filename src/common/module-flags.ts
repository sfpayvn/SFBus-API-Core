// src/common/module-flags.ts
export type ModuleKey = 'core' | 'admin' | 'pos' | 'client' | 'driver';

const ALL_KEYS: ModuleKey[] = ['core', 'admin', 'pos', 'client', 'driver'];

export function parseModules(input?: string): Set<ModuleKey> {
  const raw = (input ?? '').trim().toLowerCase();

  // Nếu muốn: rỗng => all
  if (!raw || raw === 'all') return new Set(ALL_KEYS);

  const set = new Set(
    raw
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean),
  );

  // Nếu có "all" lẫn trong list => all
  if (set.has('all')) return new Set(ALL_KEYS);

  // chỉ giữ key hợp lệ
  const enabled = new Set<ModuleKey>();
  for (const k of ALL_KEYS) {
    if (set.has(k)) enabled.add(k);
  }
  return enabled;
}

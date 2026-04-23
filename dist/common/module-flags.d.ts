export type ModuleKey = 'core' | 'admin' | 'pos' | 'client' | 'driver';
export declare function parseModules(input?: string): Set<ModuleKey>;

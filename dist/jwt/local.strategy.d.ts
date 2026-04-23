import { Strategy } from 'passport-local';
import type { Request } from 'express';
import { AuthService } from '@/module/core/auth/auth/auth.service';
declare const LocalStrategy_base: new (...args: [] | [options: import("passport-local").IStrategyOptionsWithRequest] | [options: import("passport-local").IStrategyOptions]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(req: Request, phoneNumber: string, password: string): Promise<any>;
}
export {};

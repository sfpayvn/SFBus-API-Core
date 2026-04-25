import { CallHandler, ExecutionContext, Logger, NestInterceptor } from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
export type RequestHandler = (request: Request, logger: Logger) => void;
export type ResponseHandler = (request: Request, response: Response, body: unknown, logger: Logger) => void;
export type ErrorHandler = (request: Request, error: Error, logger: Logger) => void;
export declare const defaultRequestHandler: RequestHandler;
export declare const defaultResponseHandler: ResponseHandler;
export declare const defaultErrorHandler: ErrorHandler;
export type LoggingInterceptorConfig = {
    requestHandler: RequestHandler | null;
    responseHandler: ResponseHandler | null;
    errorHandler: ErrorHandler | null;
    context: string;
};
export declare class CustomInterceptor implements NestInterceptor {
    private readonly logger;
    private readonly config;
    constructor(config?: Partial<LoggingInterceptorConfig> | string);
    intercept(context: ExecutionContext, callHandler: CallHandler): Observable<unknown>;
    private logNext;
    private logError;
}

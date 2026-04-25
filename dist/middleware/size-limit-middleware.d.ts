import { NestMiddleware } from '@nestjs/common';
export declare class SizeLimitMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void): any;
}

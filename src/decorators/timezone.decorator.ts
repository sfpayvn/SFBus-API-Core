import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Decorator để lấy timezone offset
 * Priority:
 * 1. Từ header 'x-timezone-offset' (nếu có)
 * 2. Từ body.startDate (tự động detect)
 * 3. Default GMT+7
 */
export const TimezoneOffset = createParamDecorator((data: unknown, ctx: ExecutionContext): number => {
  const request = ctx.switchToHttp().getRequest();

  // Try header first
  const headerOffset = request.headers['x-timezone-offset'];
  if (headerOffset) {
    const offset = parseInt(headerOffset, 10);
    if (!isNaN(offset)) {
      return offset;
    }
  }

  // Default GMT+7
  return 7 * 60 * 60 * 1000;
});

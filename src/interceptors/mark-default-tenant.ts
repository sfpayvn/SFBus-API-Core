import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Type, mixin } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Types } from 'mongoose';
import { bufferToObjectIdHex, eqObjectId } from '@/utils/utils';

type Plain = Record<string, any>;

// (Tuỳ môi trường build) dùng require an toàn cho Buffer

function toPlain(value: any): any {
  if (value && typeof value.toObject === 'function') {
    return value.toObject({ virtuals: true, getters: false, versionKey: false });
  }
  return value;
}

// --- ObjectId ↔ string detection ---

/**
 * Chuẩn hoá scalar:
 * - ObjectId (mọi biến thể) → string 24-hex
 * - Buffer/Uint8Array/{type:'Buffer'} → nếu dài 12 bytes → 24-hex, nếu là ascii-hex → giữ chuỗi, còn lại → hex
 * - Date/primitives → giữ nguyên
 * Trả về `undefined` nếu cần tiếp tục duyệt sâu (tức là plain object/array).
 */
function normalizeScalar(value: any): any {
  if (value == null) return value;
  if (value instanceof Date) return value;

  // Mongoose/BSON ObjectId → string
  if (value instanceof Types.ObjectId) return value.toHexString();
  if (value?._bsontype === 'ObjectID' && typeof value.toHexString === 'function') {
    return value.toHexString();
  }

  // Buffer-like → hex (ưu tiên 24-hex nếu 12 bytes)
  const fromBuf = bufferToObjectIdHex(value);
  if (fromBuf) return fromBuf;

  // primitives
  if (typeof value !== 'object') return value;

  // JSON Buffer shape handled trên; các object khác → tiếp tục duyệt
  return undefined;
}

/**
 * Duyệt và xử lý object/array:
 * - Luôn xoá tenantId
 * - Nếu có tenantId và trùng ROOT_TENANT_ID thì set isDefault=true
 * - **Nhưng nếu người gọi là ROOT (viewerIsRoot = true) thì KHÔNG set isDefault**
 */
function walk(value: any, rootId: string | null, viewerIsRoot: boolean): any {
  // Thử chuẩn hoá scalar trước
  const scalar = normalizeScalar(value);
  if (scalar !== undefined) return scalar;

  // Array
  if (Array.isArray(value)) return value.map((v) => walk(v, rootId, viewerIsRoot));

  // Plain object (bao gồm Mongoose Doc)
  const plain = toPlain(value);
  if (Array.isArray(plain)) return walk(plain, rootId, viewerIsRoot);

  const out: Plain = {};
  let sawTenant = false;
  let isRootMatch = false;

  for (const [k, v] of Object.entries(plain ?? {})) {
    if (k === 'tenantId') {
      sawTenant = true;
      if (rootId) isRootMatch = eqObjectId(v, rootId);
      // luôn bỏ tenantId
      continue;
    }
    out[k] = walk(v, rootId, viewerIsRoot);
  }

  // Chỉ set isDefault khi:
  // - có field tenantId trong object
  // - tenantId của object trùng ROOT_TENANT_ID
  // - và NGƯỜI GỌI KHÔNG PHẢI là ROOT (viewerIsRoot = false)
  if (sawTenant && isRootMatch && !viewerIsRoot) {
    out.isDefault = true;
  }

  return out;
}

/** Lấy tenantId từ request (đã qua guard JWT) hoặc header dự phòng */
function getViewerTenantId(ctx: ExecutionContext): any {
  // HTTP
  const http = ctx.switchToHttp();
  const req = http?.getRequest?.();
  if (req) {
    // Tuỳ hệ thống auth của bạn: thường là req.user.tenantId
    const fromUser = req.user?.tenantId ?? req.user?.tenant?.id ?? req.user?.tenant?._id;
    if (fromUser) return fromUser;

    // Dự phòng: đọc header (nếu bạn có set)
    const fromHeader = req.headers?.['x-tenant-id'] ?? req.headers?.['x-tenant'];
    if (fromHeader) return fromHeader;
  }

  // Có thể bổ sung: GraphQL/RPC nếu bạn dùng
  return null;
}

/**
 * Dùng:
 *   @UseInterceptors(MarkDefaultTenant())
 * - Lấy ROOT_TENANT_ID từ process.env.ROOT_TENANT_ID
 * - Xoá mọi field tenantId; set isDefault=true nếu trùng root
 * - **Nếu tenantId của NGƯỜI GỌI = ROOT_TENANT_ID thì KHÔNG set isDefault (luôn false)**
 * - Chuẩn hoá mọi ObjectId/buffer → string 24-hex
 */
export function MarkDefaultTenant(): Type<NestInterceptor> {
  @Injectable()
  class MarkDefaultTenantInterceptor implements NestInterceptor {
    private readonly rootId: string | null = process.env.ROOT_TENANT_ID ?? null;

    intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
      const viewerTenantId = getViewerTenantId(ctx);
      const viewerIsRoot = !!this.rootId && eqObjectId(viewerTenantId, this.rootId);

      return next.handle().pipe(map((data) => walk(data, this.rootId, viewerIsRoot)));
    }
  }
  return mixin(MarkDefaultTenantInterceptor);
}

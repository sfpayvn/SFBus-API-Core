import { Types } from 'mongoose';
import moment from 'moment-timezone';

export function isValidDate(date: Date): boolean {
  return !isNaN(date.getTime());
}

export function getFirstValue(value: string | string[] | Types.ObjectId | Types.ObjectId[]): string {
  const firstValue = Array.isArray(value) ? value[0] : value;
  return firstValue instanceof Types.ObjectId ? firstValue.toHexString() : firstValue;
}

export function generateNumberAlphabet(): string {
  return this.nanoid();
}

const _Buffer = typeof Buffer !== 'undefined' ? Buffer : (undefined as any);

// --- Buffer helpers ---
function isNodeBuffer(x: any): boolean {
  return !!_Buffer && _Buffer.isBuffer?.(x);
}
function isUint8(x: any): boolean {
  return x instanceof Uint8Array;
}
function isJsonBufferShape(x: any): boolean {
  return x && typeof x === 'object' && x.type === 'Buffer' && Array.isArray(x.data);
}
function fromJsonBuffer(x: any): any {
  try {
    return _Buffer.from(x.data);
  } catch {
    return null;
  }
}

export function toObjectId(id: any | undefined): Types.ObjectId {
  return new Types.ObjectId(id ?? undefined);
}

export function bufferToObjectIdHex(bufLike: any): string | null {
  try {
    const b: any = isNodeBuffer(bufLike)
      ? bufLike
      : isUint8(bufLike)
        ? _Buffer.from(bufLike)
        : isJsonBufferShape(bufLike)
          ? fromJsonBuffer(bufLike)
          : null;

    if (!b) return null;

    // ObjectId raw bytes = 12 bytes → hex 24 chars
    if (b.length === 12) return b.toString('hex');

    // Một số lib có thể đưa về chuỗi hex dưới dạng bytes ascii (24)
    const asText = b.toString('utf8');
    if (/^[0-9a-f]{24}$/i.test(asText)) return asText;

    // Fallback: dùng hex (dù không chắc là ObjectId, vẫn convert nhất quán)
    return b.toString('hex');
  } catch {
    return null;
  }
}

export function idToString(x: any): string | null {
  if (x == null) return null;

  // Mongoose/BSON ObjectId
  if (x instanceof Types.ObjectId) return x.toHexString();
  if (x?._bsontype === 'ObjectID' && typeof x.toHexString === 'function') return x.toHexString();

  // Buffer-like → hex
  const fromBuf = bufferToObjectIdHex(x);
  if (fromBuf) return fromBuf;

  // string
  if (typeof x === 'string') return x;

  // populated object { _id: ... }
  if (typeof x === 'object' && x._id != null) return idToString(x._id);

  return null;
}

export function eqObjectId(a: any, b: any): boolean {
  const as = idToString(a);
  const bs = idToString(b);
  return !!as && !!bs && as.toLowerCase() === bs.toLowerCase();
}

export function processFilterValue(key: string, value: string | string[] | Types.ObjectId | Types.ObjectId[]): any {
  if (Array.isArray(value)) {
    if (value.length === 1) {
      // Nếu mảng chỉ có 1 phần tử, dùng equality
      return { [key]: value[0] };
    } else {
      // Nếu mảng có nhiều phần tử, dùng $in
      return { [key]: { $in: value } };
    }
  } else {
    // Nếu là string đơn
    return { [key]: value };
  }
}

export function getCurrentDate(timezone = 'Asia/Ho_Chi_Minh'): Date {
  return moment.tz(timezone).toDate();
}

/**
 * Parses a time string with hours(h) and minutes(m) units to milliseconds
 * Accepts formats: 1, 1h, 1.5h, 1m, 1.5m, h, m
 * - If no unit: treated as hours (default)
 * - h: hours
 * - m: minutes
 * Examples: 1 => 3600000ms, 1h => 3600000ms, 1.5h => 5400000ms, 1m => 60000ms
 */
export function parseTimeHmToMilliseconds(value: string): number {
  if (!value) return 60 * 60 * 1000; // Default: 1 hour

  const trimmed = value.trim().toLowerCase();

  // Match number with optional unit
  const match = trimmed.match(/^(\d+(?:\.\d+)?)?([hm])?$/);
  if (!match) return 60 * 60 * 1000; // Default if invalid format

  const number = match[1] ? parseFloat(match[1]) : 1; // Default number is 1
  const unit = match[2] || 'h'; // Default unit is 'h' (hours)

  if (unit === 'h') {
    return number * 60 * 60 * 1000; // Convert hours to milliseconds
  } else if (unit === 'm') {
    return number * 60 * 1000; // Convert minutes to milliseconds
  }

  return 60 * 60 * 1000; // Default: 1 hour
}

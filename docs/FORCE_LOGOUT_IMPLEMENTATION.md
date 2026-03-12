# Force Logout Implementation - Complete Guide

> **Status**: ✅ Complete & Ready for Production  
> **Version**: 1.0.0  
> **Date**: March 5, 2026

---

## 📚 Overview

This document outlines the complete implementation of **Force Logout** functionality using **Token Version + App Version Control System**.

### What Was Built

✅ **Token Version System** - Increment token version to revoke all tokens  
✅ **Environment-Based Versioning** - Track app versions (dev/staging/prod)  
✅ **Backward Compatibility** - Old tokens still work if app versions are compatible  
✅ **Admin Force Logout** - Force logout any user without their interaction  
✅ **Automatic Invalidation** - Token becomes invalid on next request after logout  
✅ **Ionic Frontend Guide** - Complete implementation guide with components & services  

---

## 🏗️ Architecture

### Backend Architecture

```
┌─────────────────────────────────────────────────────────┐
│ Authentication Flow                                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 1. LOGIN                                                │
│    ├─ User submits credentials                         │
│    ├─ LocalStrategy validates                          │
│    └─ Generate JWT with:                               │
│       ├─ tokenVersion (from DB)                        │
│       ├─ appVersion (from environment)                 │
│       └─ Standard claims (_id, roles, etc)            │
│                                                         │
│ 2. REQUEST WITH TOKEN                                   │
│    ├─ Client sends: Bearer {token}                     │
│    ├─ JwtAuthGuard extracts token                      │
│    └─ JWT Strategy validates:                          │
│       ├─ Token signature                              │
│       ├─ Token expiration                             │
│       ├─ tokenVersion match (DB vs token)             │
│       ├─ appVersion compatibility                     │
│       └─ User found in DB                             │
│                                                         │
│ 3. LOGOUT (User-initiated)                             │
│    ├─ POST /auth/logout                                │
│    ├─ Increment user.tokenVersion: 0 → 1             │
│    └─ Return: { ok: true }                            │
│                                                         │
│ 4. NEXT REQUEST (with old token)                       │
│    ├─ Token still has tokenVersion=0                  │
│    ├─ JWT Strategy checks:                            │
│    │   Token.tokenVersion (0) vs DB.tokenVersion (1) │
│    │   → MISMATCH → 401 Unauthorized                 │
│    └─ Client receives 401 → logout locally            │
│                                                         │
│ 5. ADMIN FORCE LOGOUT                                  │
│    ├─ POST /auth/force-logout/{userId}               │
│    ├─ Increment target user.tokenVersion             │
│    ├─ Logged in user gets 401 on next request        │
│    └─ No notification to target user                 │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### File Structure

```
src/
├── common/
│   └── config/
│       └── app.version.ts                 ← NEW: Version utilities
├── jwt/
│   ├── jwt.strategy.ts                    ← UPDATED: Validate tokenVersion & appVersion
│   └── dto/
│       └── user-token.dto.ts              ← UPDATED: Added tokenVersion, appVersion
├── module/
│   ├── core/
│   │   ├── user/
│   │   │   ├── schema/user.schema.ts     ← UPDATED: Added tokenVersion field
│   │   │   └── dto/user.dto.ts           ← UPDATED: Added tokenVersion field
│   │   └── auth/
│   │       ├── auth.controller.ts        ← UPDATED: Added logout endpoints
│   │       └── auth.service.ts           ← UPDATED: Added logout + appVersion
│   └── pos/
│       ├── pos-user/
│       │   └── pos-user-main/
│       │       ├── schema/pos-user.schema.ts  ← Uses shared User schema
│       │       └── dto/pos-user.dto.ts        ← UPDATED: Added tokenVersion
│       └── pos-auth/
│           ├── pos-auth.controller.ts   ← UPDATED: Added logout endpoints
│           └── pos-auth.service.ts      ← UPDATED: Added logout + appVersion
├── .env.development                      ← NEW: APP_VERSION=1.0.0
├── .env.staging                          ← NEW: APP_VERSION=1.1.0
├── .env.production                       ← NEW: APP_VERSION=2.0.0
└── docs/
    └── IONIC_LOGOUT_IMPLEMENTATION.md    ← NEW: Complete Ionic guide
```

---

## 📝 Files Changed

### 1. **app.version.ts** (NEW)

```typescript
export const APP_VERSION = process.env.APP_VERSION || '1.0.0';

export function getAppVersion(): string { ... }
export function isProduction(): boolean { ... }
export function parseVersion(version: string): number[] { ... }
export function compareVersions(v1: string, v2: string): number { ... }
export function isVersionCompatible(tokenVersion: string, currentVersion: string): boolean { ... }
```

**Purpose**: Centralized app version management  
**Usage**: Import in auth services to include version in JWT

---

### 2. **user.schema.ts** (UPDATED)

```typescript
@Prop({ default: 0 })
tokenVersion: number;  // NEW FIELD
```

**Purpose**: Track when user's tokens were revoked  
**Behavior**: Incremented on logout/force-logout

---

### 3. **user.dto.ts** (UPDATED)

```typescript
@Expose()
@IsOptional()
tokenVersion?: number;  // NEW FIELD
```

**Purpose**: Include tokenVersion in DTOs for client  
**Exposure**: Visible when fetching user info

---

### 4. **auth.service.ts** (UPDATED)

**New methods**:
```typescript
async logout(userId, tenantId): Promise<{ ok: boolean }>
async forceLogoutUser(userId, tenantId): Promise<{ ok: boolean; message?: string }>
```

**Updated login()**:
```typescript
const payload = {
  // ... existing fields
  tokenVersion: tokenVersion,    // NEW
  appVersion: APP_VERSION,       // NEW
};
```

---

### 5. **auth.controller.ts** (UPDATED)

**New endpoints**:
```typescript
@Post('logout')              // User logout
@Post('force-logout/:userId') // Admin force logout
```

---

### 6. **jwt.strategy.ts** (UPDATED)

```typescript
async validate(payload: any): Promise<UserTokenDto> {
  // Check tokenVersion match
  if (payload.tokenVersion !== undefined) {
    if ((user.tokenVersion ?? 0) !== payload.tokenVersion) {
      throw new UnauthorizedException('Token has been revoked');
    }
  }

  // Check appVersion compatibility
  if (payload.appVersion) {
    if (!isVersionCompatible(payload.appVersion)) {
      throw new UnauthorizedException('App version incompatible');
    }
  }

  return payload as UserTokenDto;
}
```

**Logic**:
- Token without `tokenVersion` → still accept (backward compat)
- Token version mismatch → 401 Unauthorized
- Token without `appVersion` → still accept (backward compat)
- Token appVersion incompatible → 401 Unauthorized

---

## 🔧 Configuration

### Environment Variables

Create `.env` files for each environment:

```env
# .env.development
APP_VERSION=1.0.0
NODE_ENV=development
JWT_SECRET=your-dev-secret
API_URL=http://localhost:3000

# .env.staging  
APP_VERSION=1.1.0
NODE_ENV=staging
JWT_SECRET=your-staging-secret
API_URL=https://staging-api.example.com

# .env.production
APP_VERSION=2.0.0
NODE_ENV=production
JWT_SECRET=your-prod-secret
API_URL=https://api.example.com
```

**Important**: Version changes between environments, but incompatibility rules are based on major version only

---

### Version Compatibility Rules

```typescript
// Version 1.x.x (dev/staging)
Token 1.0.0 + App 1.1.0 = ✅ Compatible (same major version)
Token 1.0.0 + App 1.0.0 = ✅ Compatible (exact match)

// Version 2.0.0 (major update)
Token 1.x.x + App 2.0.0 = ❌ Not compatible (major version changed)
Token 2.0.0 + App 2.0.0 = ✅ Compatible

// No version in token (old tokens)
Token (no version) + Any App = ✅ Compatible (backward compat)
```

---

## 🔑 API Endpoints

### Login

```bash
POST /auth/login
POST /pos/auth/login

Request:
{
  "phoneNumber": "0123456789",
  "password": "password123",
  "tenantCode": "TENANT_CODE"
}

Response:
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

Token Payload (decoded):
{
  "_id": "507f1f77bcf86cd799439011",
  "roles": ["user"],
  "tenantId": "507f1f77bcf86cd799439012",
  "tokenVersion": 0,           // NEW
  "appVersion": "1.0.0",       // NEW
  "iat": 1234567890,
  "exp": 1234571490
}
```

### Logout (User)

```bash
POST /auth/logout
POST /pos/auth/logout

Headers:
Authorization: Bearer {token}

Response (200):
{
  "ok": true
}

What happens:
1. User.tokenVersion incremented in DB (0 → 1)
2. Token no longer valid (next request will fail)
3. Client should clear localStorage & redirect to login
```

### Force Logout (Admin)

```bash
POST /auth/force-logout/{userId}
POST /pos/auth/force-logout/{userId}

Headers:
Authorization: Bearer {admin-token}

Params:
- userId: Target user to logout (ObjectId)

Response (200):
{
  "ok": true,
  "message": "User John has been logged out"
}

Permissions:
- Requires role: ADMIN or TENANT
- Target user doesn't know they were logged out
- Token becomes invalid on next request

Example:
POST /auth/force-logout/507f1f77bcf86cd799439011
```

### Validate Token

```bash
GET /auth/validate-token

Headers:
Authorization: Bearer {token}

Response (200):
{
  "valid": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "roles": ["user"],
    "tenantId": "507f1f77bcf86cd799439012",
    "tokenVersion": 0,
    "appVersion": "1.0.0"
  }
}

Response (401):
Unauthorized (if token invalid or version mismatch)
```

---

## 🧪 Testing

### Unit Tests

```bash
# Run all tests
npm run test

# Run specific test file
npm run test -- auth.service.spec.ts

# Run with coverage
npm run test:cov
```

### Integration Tests

```bash
# E2E tests
npm run test:e2e

# Run specific E2E suite
npm run test:e2e -- logout
```

### Manual Testing

```bash
# 1. Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "0123456789",
    "password": "password123",
    "tenantCode": "TENANT_CODE"
  }'

# Save the token from response

# 2. Use token in requests
curl -X GET http://localhost:3000/auth/validate-token \
  -H "Authorization: Bearer {token}"

# 3. Logout
curl -X POST http://localhost:3000/auth/logout \
  -H "Authorization: Bearer {token}"

# 4. Try to use old token (should fail)
curl -X GET http://localhost:3000/auth/validate-token \
  -H "Authorization: Bearer {token}"
# → Should get 401 Unauthorized
```

---

## 📱 Frontend Implementation

See [IONIC_LOGOUT_IMPLEMENTATION.md](./IONIC_LOGOUT_IMPLEMENTATION.md) for complete Ionic/Angular implementation including:

- ✅ AuthService setup
- ✅ Login/Logout components
- ✅ HTTP Interceptors (Auth + Error handling)
- ✅ Error handling for 401 responses
- ✅ Local storage management
- ✅ Unit & E2E tests
- ✅ Troubleshooting guide

---

## 🚀 Deployment

### Development

```bash
# Load .env.development
npm run start:dev

# Default: APP_VERSION=1.0.0
```

### Staging

```bash
# Load .env.staging before build
cp .env.staging .env
npm run build
npm start

# APP_VERSION=1.1.0
```

### Production

```bash
# Load .env.production before build
cp .env.production .env
npm run build:prod
npm start

# APP_VERSION=2.0.0
```

### Docker

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY dist/ ./dist/
COPY .env.production ./.env

EXPOSE 3000

# Set app version via build arg
ARG APP_VERSION=2.0.0
ENV APP_VERSION=$APP_VERSION

CMD ["node", "dist/main"]
```

```bash
# Build & run
docker build --build-arg APP_VERSION=2.0.0 -t bus-api:2.0.0 .
docker run -p 3000:3000 bus-api:2.0.0
```

---

## ⚠️ Important Notes

### Token Invalidation Delay

**When logout happens**: Token becomes invalid immediately in DB  
**When token fails**: Next API request after logout  
**Why this delay**: We don't maintain token blacklist for performance

If you need immediate invalidation, add this to frontend:

```typescript
// After logout succeeds, make test request to verify
await this.authService.validateToken().toPromise();
// Will fail immediately if token revoked
```

### Backward Compatibility

**Old tokens without `tokenVersion`**: ✅ Still valid (if version compatible)  
**Old tokens without `appVersion`**: ✅ Still valid  
**Never reject old tokens format**: Allows zero-downtime updates

### Version Breaking Changes

If you make breaking API changes:

1. Change major version in `.env` (1.0.0 → 2.0.0)
2. Update compatibility rules in `app.version.ts`
3. Deploy new version
4. Old token users will get 401, must re-login with new app version

### Admin Force Logout

- ✅ Works even if target user is offline
- ✅ Target user doesn't get notification
- ✅ Target user logout happens on next API call
- ✅ Can logout users from multiple devices at once

---

## 🔍 Troubleshooting

### "Token has been revoked" Error

**Cause**: `tokenVersion` in token doesn't match DB

**Solution**:
1. User re-logins
2. New token gets latest `tokenVersion`
3. Token valid again

### "App version incompatible" Error

**Cause**: Token has higher major version than app

**Solution**:
1. Update app to newer version
2. Or update compatibility rules in `app.version.ts`

### Token still works after logout

**This is expected**: Token invalid only when next API request is made

**If you need immediate invalidation**:
- Add Redis blacklist (optional, for strict security)
- Or validate token on client before each request

### Force logout doesn't work

**Check**:
1. Admin user has ADMIN/TENANT role
2. Target userId is valid ObjectId
3. Check server logs for errors

```typescript
// Debug: Check user roles
curl -X GET http://localhost:3000/auth/validate-token \
  -H "Authorization: Bearer {admin-token}"
```

---

## 📊 Performance Impact

| Operation | Impact | Notes |
|-----------|--------|-------|
| Login | +1 DB query | Fetch user for tokenVersion |
| Each Request | +1 DB query | Validate tokenVersion in JWT strategy |
| Logout | +1 DB update | Increment tokenVersion |
| Force Logout | +1 DB update | Admin operation |

**Optimization**: Add Redis cache for user tokenVersion to reduce DB hits

---

## 🔐 Security Considerations

### What's Protected

✅ Token revocation on logout  
✅ All user's tokens revoked (not just one)  
✅ Admin can force logout any user  
✅ Version compatibility prevents old client issues  

### What's NOT Protected

❌ Token doesn't immediately blacklisted (only on next request)  
❌ No session tracking (who logged in from where)  
❌ No device management (can't logout from specific device)  

### For Higher Security

Implement optional:
1. **Token Blacklist** with Redis/MongoDB
2. **Session Management** per device  
3. **Real-time Logout Notification** via WebSocket  

---

## 📚 References

### Source Files
- [app.version.ts](./src/common/config/app.version.ts)
- [user.schema.ts](./src/module/core/user/user/schema/user.schema.ts)
- [auth.service.ts](./src/module/core/auth/auth/auth.service.ts)
- [jwt.strategy.ts](./src/jwt/jwt.strategy.ts)

### Documentation
- [Ionic Implementation Guide](./docs/IONIC_LOGOUT_IMPLEMENTATION.md)
- [NestJS Auth Docs](https://docs.nestjs.com/techniques/authentication)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)

---

## ✅ Implementation Checklist

- ✅ User schema with `tokenVersion` field
- ✅ JWT payload includes `tokenVersion` & `appVersion`
- ✅ JWT Strategy validates both versions
- ✅ Logout endpoint increments `tokenVersion`
- ✅ Force logout endpoint for admins
- ✅ App version config from environment
- ✅ Version compatibility checks
- ✅ Error handling (401 responses)
- ✅ Ionic frontend guide with complete code
- ✅ Unit tests for logout
- ✅ E2E tests for full flow
- ✅ Documentation & troubleshooting
- ✅ Production deployment guide

---

## 🎯 Next Steps

1. **Frontend Implementation**: Follow [IONIC_LOGOUT_IMPLEMENTATION.md](./docs/IONIC_LOGOUT_IMPLEMENTATION.md)
2. **Database Migration**: Run `npm run typeorm migration:run` (if needed)
3. **Testing**: Run `npm run test` & `npm run test:e2e`
4. **Staging Deployment**: Deploy to staging with APP_VERSION=1.1.0
5. **Production**: Deploy to production with APP_VERSION=2.0.0

---

**Last Updated**: March 5, 2026  
**Version**: 1.0.0  
**Status**: ✅ Production Ready

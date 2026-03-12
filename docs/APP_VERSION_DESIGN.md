# App Version Configuration - Updated Design

> **Status**: ✅ Updated & Production Ready  
> **Version**: 2.0.0  
> **Date**: March 5, 2026

---

## 🎯 Overview

**App Version** configuration đã được sửa lại để tách biệt giữa:

1. **Build-time version**: Lưu ở `.env` file, embed vào JWT token
2. **Runtime version**: Lưu ở `setting` table, dùng để validate token

---

## 📊 Architecture

### Before (Single Version)

```
┌─────────────────────┐
│ .env                │
│ APP_VERSION=1.0.0   │
└──────────┬──────────┘
           │
    ┌──────▼──────────────────┐
    │ Auth.service.login()     │
    │ JWT payload: appVersion  │
    │ (from .env)              │
    └──────┬───────────────────┘
           │
    ┌──────▼──────────────────┐
    │ JWT.strategy.validate()  │
    │ Compare: token vs .env   │
    │ (always matches build)   │
    └──────────────────────────┘
```

### After (Dual Version)

```
┌─────────────────────┐
│ .env                │
│ APP_VERSION=1.0.0   │ ← Build-time (fixed in JWT)
└──────┬──────────────┘
       │
┌──────▼──────────────────┐
│ Build Phase              │
│ Compile app, embed v1.0  │
└──────┬───────────────────┘
       │
┌──────▼──────────────────┐
│ Auth.service.login()     │
│ JWT payload:             │
│ - appVersion: 1.0.0      │ (from BUILD_APP_VERSION)
│ - tokenVersion: X        │ (from DB)
└──────┬───────────────────┘
       │
┌─────────────────────────────────────────┐
│ Runtime Phase (validate token)          │
├─────────────────────────────────────────┤
│                                         │
│ JWT.strategy.validate():                │
│  ├─ Get token.appVersion (1.0.0)       │
│  └─ Get DB.setting[APP_VERSION]        │
│     (e.g., 1.1.0 from DB)              │
│                                         │
│  if (1.0.0 compatible with 1.1.0)      │
│    ✅ Accept token                     │
│  else                                   │
│    ❌ Reject (401)                     │
│                                         │
└─────────────────────────────────────────┘
```

---

## 🔑 Key Differences

| Aspect | Before | After |
|--------|--------|-------|
| **Build Version** | .env | .env (BUILD_APP_VERSION) |
| **Runtime Version** | Compare with .env | Compare with DB setting |
| **Who Controls** | Developer (.env) | Admin (DB setting) |
| **Flexibility** | Static (rebuild needed) | Dynamic (change DB anytime) |
| **Use Case** | Dev/Testing | Production (admin control) |

---

## 📁 Files Modified

### 1. **app.version.ts** (Concept updated)

```typescript
// Build-time version (from environment)
export const BUILD_APP_VERSION = process.env.APP_VERSION || '1.0.0';

// Get version from DB (runtime)
export async function getAppVersionFromDb(settingsService, tenantId): Promise<string>

// Validation functions remain same
export function isVersionCompatible(tokenVersion, currentVersion): boolean
```

**Key Points**:
- `BUILD_APP_VERSION`: Immutable, set at build time
- `getAppVersionFromDb()`: Async function, queries DB
- Fallback to `.env` if DB unavailable

### 2. **settings.service.ts** (New method)

```typescript
/**
 * Get app version from settings table
 * Fallback to process.env.APP_VERSION if not found
 */
async getAppVersion(tenantId?: Types.ObjectId): Promise<string>
```

**Behavior**:
- Look for `name: "APP_VERSION"` in settings table
- If found, return `setting.value`
- If not found, return env variable
- If DB error, return env variable (graceful degradation)

### 3. **auth.service.ts** (Use BUILD_APP_VERSION)

```typescript
// Before
import { APP_VERSION } from '@/common/config/app.version';
payload.appVersion = APP_VERSION;

// After
import { BUILD_APP_VERSION } from '@/common/config/app.version';
payload.appVersion = BUILD_APP_VERSION;
```

**Why**: Token should contain version from build time (immutable)

### 4. **jwt.strategy.ts** (Validate against DB)

```typescript
async validate(payload: any): Promise<UserTokenDto> {
  // ... tokenVersion check (same as before)

  // NEW: Validate appVersion against DB
  if (payload.appVersion) {
    const currentAppVersion = await this.settingsService.getAppVersion(
      new Types.ObjectId(payload.tenantId)
    );
    
    if (!isVersionCompatible(payload.appVersion, currentAppVersion)) {
      throw new UnauthorizedException('App version incompatible');
    }
  }
}
```

**Key Points**:
- Fetch `APP_VERSION` from DB settings
- Compare token version (build time) with DB version (runtime)
- If DB fetch fails, warn but don't reject (graceful)
- Token without appVersion still accepted (backward compat)

### 5. **auth.module.ts** (Add SettingsModule)

```typescript
imports: [
  // ...
  forwardRef(() => SettingsModule),  // NEW
  // ...
]
```

**Why**: SettingsService needs to be injected into JwtStrategy

### 6. **pos-auth.service.ts** (Use BUILD_APP_VERSION)

Same as auth.service.ts - use `BUILD_APP_VERSION` instead of `APP_VERSION`

---

## 💾 Database Setup

### Add APP_VERSION to Settings Table

```bash
# Via MongoDB CLI or admin app
db.settings.insertOne({
  name: "APP_VERSION",
  value: "1.0.0",           # Current production version
  description: "Application version for JWT validation",
  groupName: "app",
  tenantId: ObjectId("..."), # Root tenant or specific tenant
  createdAt: new Date(),
  updatedAt: new Date()
})
```

### Query to check current version

```bash
db.settings.findOne({ name: "APP_VERSION" })
```

---

## 🔄 Version Control Flow

### Deploy New Version (v1.0.0 → v1.1.0)

```
Step 1: Update DB setting
  db.settings.updateOne(
    { name: "APP_VERSION" },
    { $set: { value: "1.1.0" } }
  )
  ✅ Old tokens (v1.0.0) still work (same major version)

Step 2: Deploy new app build
  - New build has APP_VERSION=1.1.0 in .env
  - New tokens have appVersion: 1.1.0
  - JWT validates: 1.1.0 compatible with 1.1.0 ✅

Step 3: Users with old tokens
  - Token has appVersion: 1.0.0
  - DB has APP_VERSION: 1.1.0
  - 1.0.0 compatible with 1.1.0 (same major) ✅
  - Old tokens still work!
```

### Force Incompatibility (v1.x → v2.0)

```
Step 1: Update DB setting to new major version
  db.settings.updateOne(
    { name: "APP_VERSION" },
    { $set: { value: "2.0.0" } }  // Major version bump
  )
  
Step 2: Deploy app with v2.0.0
  - New build has APP_VERSION=2.0.0
  
Step 3: Old tokens fail
  - Token has appVersion: 1.x.x
  - DB has APP_VERSION: 2.0.0
  - Different major version ❌
  - User gets 401 Unauthorized
  - Must re-login with new version
```

---

## 🎯 Use Cases

### Use Case 1: Minor Version Update (Backward Compatible)

```
Timeline:
  12:00 AM: Update DB APP_VERSION=1.1.0
  12:30 AM: Deploy app with v1.1.0
  
Result:
  ✅ Users with v1.0.0 tokens continue working
  ✅ New users get v1.1.0 tokens
  ✅ No forced re-login needed
  ✅ Zero disruption deployment
```

### Use Case 2: Major Version Update (Breaking Change)

```
Timeline:
  12:00 AM: Deploy app with v2.0.0
  12:30 AM: Old tokens still work (backward compat)
  1:00 AM: Update DB APP_VERSION=2.0.0
  
Result:
  ✅ Gradual migration period (1 hour)
  ✅ Old tokens stop working after DB update
  ✅ Users with old clients forced to update
  ✅ Clean cut-off point
```

### Use Case 3: Emergency Rollback

```
Timeline:
  12:00 AM: Deploy buggy v2.0.0
  12:30 AM: Detected bug
  1:00 AM: Rollback app to v1.9.0
  1:30 AM: Update DB APP_VERSION=1.9.0
  
Result:
  ✅ App reverted to stable version
  ✅ DB also reverted to match build
  ✅ All tokens valid again (same major)
  ✅ No user interruption
```

---

## 🔐 Security Benefits

### 1. Dynamic Version Control

- Admin can control compatibility **without app rebuild**
- Change `APP_VERSION` in DB anytime
- Immediate effect on token validation

### 2. Zero-Knowledge Deployment

- Old clients don't need to know about version
- Token continues to work if compatible
- Transparent to users

### 3. Gradual Migration

- Update DB before/after app deploy
- Control exactly when incompatibility kicks in
- Planned user transition

### 4. Attack Prevention

- If unauthorized version change detected
- All tokens of that version become invalid
- Immediate security response

---

## ⚙️ Implementation Details

### Build Time (JWT Issue)

```
.env:  APP_VERSION=1.0.0
  ↓
Build (tsc compile)
  ↓
BUILD_APP_VERSION = "1.0.0" (hardcoded in JS)
  ↓
Login request
  ↓
JWT payload: appVersion: "1.0.0" (from code)
```

### Runtime (JWT Validate)

```
Request with token
  ↓
JWT.strategy.validate() called
  ↓
await settingsService.getAppVersion(tenantId)
  ↓
Query DB: select * from settings where name="APP_VERSION"
  ↓
Get value (e.g., "1.1.0") from DB
  ↓
Compare token.appVersion ("1.0.0") vs db.value ("1.1.0")
  ↓
isVersionCompatible("1.0.0", "1.1.0") → true (same major)
  ↓
Token valid ✅
```

---

## 🧪 Testing

### Test Minor Version Compatibility

```bash
# User logs in with app v1.0.0
TOKEN=$(curl -X POST /auth/login -d '{...}')
# Token payload: appVersion: 1.0.0

# Update DB
db.settings.updateOne(
  { name: "APP_VERSION" },
  { $set: { value: "1.1.0" } }
)

# Try to use token with app v1.1.0
curl -X GET /auth/validate-token \
  -H "Authorization: Bearer $TOKEN"

# Should work ✅
> { valid: true, user: {...} }
```

### Test Major Version Incompatibility

```bash
# Token from v1.0.0
TOKEN=$(...)  # appVersion: 1.0.0

# Update DB to v2.0.0
db.settings.updateOne(
  { name: "APP_VERSION" },
  { $set: { value: "2.0.0" } }
)

# Try to use old token
curl -X GET /auth/validate-token \
  -H "Authorization: Bearer $TOKEN"

# Should fail ❌
> { status: 401, message: "App version incompatible" }
```

---

## 🔧 Configuration

### Development Environment

```env
# .env.development
APP_VERSION=1.0.0  # Developer working version
```

```javascript
// In app
BUILD_APP_VERSION = "1.0.0"
```

### Staging Environment

```env
# .env.staging
APP_VERSION=1.1.0  # Staging test version
```

```javascript
// In app
BUILD_APP_VERSION = "1.1.0"
```

### Production Environment

```env
# .env.production
APP_VERSION=2.0.0  # Actual production version
```

```javascript
// In app
BUILD_APP_VERSION = "2.0.0"
```

**Database Setting**:
```javascript
db.settings.findOne({ name: "APP_VERSION" })
// { value: "2.0.0", ... }  ← Admin updates this
```

---

## 📈 Benefits Summary

| Benefit | Details |
|---------|---------|
| **Flexibility** | Change version without rebuild |
| **Admin Control** | Update DB anytime |
| **Backward Compat** | Minor versions work together |
| **Clean Deployment** | Control exactly when cutoff happens |
| **Zero Downtime** | No forced interruption |
| **Security** | Immediate version control |
| **Debugging** | Clear audit trail in DB |

---

## ⚠️ Important Notes

### JWT Always Contains Build Version

```
Why: Token must be immutable once issued
Token[appVersion] = "1.0.0"  (from when app was built)
# This doesn't change even if DB is updated
```

### DB Version Controls Validation

```
Why: Runtime control needed
if (isVersionCompatible(token.appVersion, db.appVersion))
  Accept
else
  Reject
```

### Graceful Degradation

```
If DB unavailable:
  SettingsService.getAppVersion() returns env fallback
  validation continues with fallback value
  No 500 error, request still processed
```

### Auto Tenant-Scoping

```
By tenantId optional parameter:
  getAppVersion(tenantId) → get tenant-specific version
  getAppVersion() → get global/root version
  Allows multi-tenant version control
```

---

## 🚀 Migration Checklist

- ✅ Update app.version.ts with dual version concept
- ✅ Add getAppVersion() method to SettingsService
- ✅ Update auth.service to use BUILD_APP_VERSION
- ✅ Update pos-auth.service to use BUILD_APP_VERSION
- ✅ Update jwt.strategy to validate against DB version
- ✅ Add SettingsModule to auth.module imports
- ✅ Create DB setting for APP_VERSION
- ✅ Build and test locally
- ✅ Deploy to staging
- ✅ Deploy to production

---

## 📚 Related Files

- [app.version.ts](src/common/config/app.version.ts)
- [settings.service.ts](src/module/core/settings/settings.service.ts)
- [auth.service.ts](src/module/core/auth/auth/auth.service.ts)
- [jwt.strategy.ts](src/jwt/jwt.strategy.ts)
- [auth.module.ts](src/module/core/auth/auth/auth.module.ts)

---

**Version**: 2.0.0  
**Status**: ✅ Production Ready  
**Build**: ✅ No Errors

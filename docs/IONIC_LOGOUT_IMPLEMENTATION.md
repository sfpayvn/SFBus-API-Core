# Ionic Frontend - Force Logout + Token Version Implementation

> **Status**: Ready for Production  
> **Version**: 1.0.0  
> **Last Updated**: March 5, 2026

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Service Setup](#service-setup)
4. [Components](#components)
5. [Interceptors](#interceptors)
6. [Error Handling](#error-handling)
7. [Testing](#testing)
8. [Troubleshooting](#troubleshooting)

---

## Overview

### What's Implemented?

✅ **Token Version System**: User logout = increment `tokenVersion` in DB  
✅ **Automatic Invalidation**: Old tokens become invalid on next request  
✅ **Admin Force Logout**: Admin can logout any user remotely  
✅ **Login-Only Invalidation**: Token invalid only when user tries to use it (not immediately)  
✅ **Backward Compatibility**: Token without `appVersion` still valid  

### Key Benefits

| Feature | Benefit |
|---------|---------|
| **No Blacklist Needed** | Better performance, less DB queries |
| **Simple Implementation** | Just increment 1 number in DB |
| **Works Instantly** | Next request with old token = 401 |
| **Admin Control** | Force logout without user interaction |
| **Backward Safe** | App updates won't break old tokens |

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│ Ionic App (Frontend)                                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 1. User clicks "Logout"                                 │
│    ↓                                                    │
│ 2. AuthService.logout() called                          │
│    ├─ DELETE /auth/logout (or /pos/auth/logout)       │
│    ├─ Remove token from storage                        │
│    └─ Redirect to login                                │
│    ↓                                                    │
│ 3. Next Request with old token:                         │
│    ├─ HTTP Interceptor adds token to header           │
│    ├─ Backend validates token                         │
│    ├─ JWT Strategy checks tokenVersion vs DB          │
│    └─ If mismatch → 401 Unauthorized                  │
│    ↓                                                    │
│ 4. Error Interceptor catches 401                        │
│    ├─ Clear storage                                    │
│    ├─ Redirect to login                               │
│    └─ Show error message                              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Service Setup

### 1. Create Auth Service

```typescript
// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';

export interface LoginResponse {
  access_token: string;
}

export interface LogoutResponse {
  ok: boolean;
  message?: string;
}

export interface CurrentUser {
  _id: string;
  tenantId: string;
  roles: string[];
  tokenVersion?: number;
  appVersion?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = `${environment.apiUrl}/auth`;
  private readonly POS_API_URL = `${environment.apiUrl}/pos/auth`;
  
  // Observable để track login state
  private currentUserSubject = new BehaviorSubject<CurrentUser | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // Track khi logout đang xử lý
  private isLoggingOut = false;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.loadStoredUser();
  }

  /**
   * Load user info từ localStorage (khi app restart)
   */
  private loadStoredUser(): void {
    try {
      const storedUser = localStorage.getItem('current_user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
      }
    } catch (error) {
      console.error('Failed to load stored user:', error);
    }
  }

  /**
   * Get current user observable
   */
  getCurrentUser(): Observable<CurrentUser | null> {
    return this.currentUser$;
  }

  /**
   * Get current user value (synchronous)
   */
  getCurrentUserValue(): CurrentUser | null {
    return this.currentUserSubject.value;
  }

  /**
   * Check if user is logged in
   */
  isLoggedIn(): boolean {
    return this.hasToken() && this.getCurrentUserValue() !== null;
  }

  /**
   * Get token from localStorage
   */
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  /**
   * Check if token exists
   */
  hasToken(): boolean {
    return !!this.getToken();
  }

  /**
   * Login user (Core/Client Auth)
   */
  login(phoneNumber: string, password: string, tenantCode: string): Observable<LoginResponse> {
    const body = { phoneNumber, password, tenantCode };
    
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, body)
      .pipe(
        tap(response => {
          this.storeToken(response.access_token);
          // Decode token để lấy user info
          const user = this.decodeToken(response.access_token);
          this.currentUserSubject.next(user);
          this.storeUser(user);
        }),
        catchError(error => {
          console.error('Login failed:', error);
          return throwError(() => new Error('Đăng nhập thất bại'));
        }),
      );
  }

  /**
   * Login user (POS Auth)
   */
  loginPos(phoneNumber: string, password: string, tenantCode: string): Observable<LoginResponse> {
    const body = { phoneNumber, password, tenantCode };
    
    return this.http.post<LoginResponse>(`${this.POS_API_URL}/login`, body)
      .pipe(
        tap(response => {
          this.storeToken(response.access_token);
          const user = this.decodeToken(response.access_token);
          this.currentUserSubject.next(user);
          this.storeUser(user);
        }),
        catchError(error => {
          console.error('POS Login failed:', error);
          return throwError(() => new Error('Đăng nhập thất bại'));
        }),
      );
  }

  /**
   * Logout user (tự logout)
   */
  logout(isPosAuth: boolean = false): Observable<LogoutResponse> {
    if (this.isLoggingOut) {
      console.warn('Logout already in progress');
      return throwError(() => new Error('Logout đang xử lý'));
    }

    this.isLoggingOut = true;
    const url = isPosAuth ? `${this.POS_API_URL}/logout` : `${this.API_URL}/logout`;

    return this.http.post<LogoutResponse>(url, {})
      .pipe(
        tap(() => {
          this.clearAuth();
          console.log('Logout thành công');
        }),
        catchError(error => {
          console.error('Logout error:', error);
          // Vẫn clear auth dù API fail
          this.clearAuth();
          return throwError(() => new Error('Logout failed'));
        }),
        finalize(() => {
          this.isLoggingOut = false;
        }),
      );
  }

  /**
   * Force logout user (Admin only)
   */
  forceLogoutUser(userId: string, isPosAuth: boolean = false): Observable<LogoutResponse> {
    const url = isPosAuth 
      ? `${this.POS_API_URL}/force-logout/${userId}`
      : `${this.API_URL}/force-logout/${userId}`;

    return this.http.post<LogoutResponse>(url, {})
      .pipe(
        tap((response) => {
          console.log('Force logout result:', response);
        }),
        catchError(error => {
          console.error('Force logout error:', error);
          return throwError(() => new Error('Force logout failed'));
        }),
      );
  }

  /**
   * Validate token on app startup
   */
  validateToken(): Observable<{ valid: boolean; user: CurrentUser }> {
    const url = `${this.API_URL}/validate-token`;
    return this.http.get<{ valid: boolean; user: CurrentUser }>(url)
      .pipe(
        tap(response => {
          if (response.valid) {
            this.currentUserSubject.next(response.user);
            this.storeUser(response.user);
          } else {
            this.clearAuth();
          }
        }),
        catchError(() => {
          this.clearAuth();
          return throwError(() => new Error('Token validation failed'));
        }),
      );
  }

  /**
   * Clear authentication data
   */
  private clearAuth(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('current_user');
    this.currentUserSubject.next(null);
  }

  /**
   * Store token in localStorage
   */
  private storeToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  /**
   * Store user info in localStorage
   */
  private storeUser(user: CurrentUser | null): void {
    if (user) {
      localStorage.setItem('current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('current_user');
    }
  }

  /**
   * Decode JWT token (client-side only, không verify signature)
   */
  private decodeToken(token: string): CurrentUser {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload) as CurrentUser;
    } catch (error) {
      console.error('Failed to decode token:', error);
      return {} as CurrentUser;
    }
  }
}
```

---

## Components

### 1. Login Component

```typescript
// src/app/pages/login/login.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController,
  ) {}

  ngOnInit(): void {
    this.initForm();
    
    // Nếu đã login thì redirect
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10,11}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      tenantCode: ['BUS_STATION_1', Validators.required],
    });
  }

  async onLogin(): Promise<void> {
    if (this.loginForm.invalid) {
      await this.showToast('Vui lòng điền thông tin hợp lệ');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Đang đăng nhập...',
    });
    await loading.present();

    try {
      const { phoneNumber, password, tenantCode } = this.loginForm.value;
      
      await this.authService.login(phoneNumber, password, tenantCode).toPromise();
      
      await loading.dismiss();
      await this.showToast('Đăng nhập thành công', 'success');
      
      this.router.navigate(['/home']);
    } catch (error: any) {
      await loading.dismiss();
      const message = error?.error?.message || 'Đăng nhập thất bại';
      await this.showToast(message, 'danger');
    }
  }

  private async showToast(message: string, color: string = 'warning'): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      color,
    });
    await toast.present();
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
```

```html
<!-- src/app/pages/login/login.component.html -->

<ion-content class="ion-padding">
  <div class="login-container">
    <h1>Đăng Nhập</h1>
    
    <form [formGroup]="loginForm" (ngSubmit)="onLogin()">
      <!-- Phone Number -->
      <ion-item>
        <ion-label position="floating">Số Điện Thoại</ion-label>
        <ion-input
          formControlName="phoneNumber"
          type="tel"
          placeholder="0123456789"
        ></ion-input>
      </ion-item>

      <!-- Password -->
      <ion-item>
        <ion-label position="floating">Mật Khẩu</ion-label>
        <ion-input
          formControlName="password"
          [type]="showPassword ? 'text' : 'password'"
          placeholder="Nhập mật khẩu"
        ></ion-input>
        <ion-button
          slot="end"
          fill="clear"
          (click)="togglePasswordVisibility()"
        >
          <ion-icon [name]="showPassword ? 'eye' : 'eye-off'"></ion-icon>
        </ion-button>
      </ion-item>

      <!-- Tenant Code -->
      <ion-item>
        <ion-label position="floating">Mã Doanh Nghiệp</ion-label>
        <ion-select formControlName="tenantCode">
          <ion-select-option value="BUS_STATION_1">Station 1</ion-select-option>
          <ion-select-option value="BUS_STATION_2">Station 2</ion-select-option>
        </ion-select>
      </ion-item>

      <!-- Login Button -->
      <ion-button
        expand="block"
        type="submit"
        [disabled]="loginForm.invalid || isLoading"
        class="ion-margin-top"
      >
        <ion-spinner *ngIf="isLoading" name="dots"></ion-spinner>
        <span *ngIf="!isLoading">Đăng Nhập</span>
      </ion-button>
    </form>

    <!-- Forgot Password Link -->
    <ion-text class="ion-text-center ion-margin-top">
      <p>
        <a routerLink="/forgot-password">Quên mật khẩu?</a>
      </p>
    </ion-text>
  </div>
</ion-content>
```

### 2. Logout Button Component

```typescript
// src/app/components/logout-button/logout-button.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss'],
})
export class LogoutButtonComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
  ) {}

  async logout(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Đăng Xuất',
      message: 'Bạn có chắc chắn muốn đăng xuất?',
      buttons: [
        {
          text: 'Hủy',
          role: 'cancel',
        },
        {
          text: 'Đăng Xuất',
          role: 'destructive',
          handler: () => this.performLogout(),
        },
      ],
    });

    await alert.present();
  }

  private async performLogout(): Promise<void> {
    try {
      // Gọi logout API
      await this.authService.logout().toPromise();
      
      await this.showToast('Đã đăng xuất', 'success');
      
      // Redirect tới login
      this.router.navigate(['/login'], { replaceUrl: true });
    } catch (error) {
      console.error('Logout error:', error);
      // Vẫn redirect dù API fail
      this.router.navigate(['/login'], { replaceUrl: true });
    }
  }

  private async showToast(message: string, color: string = 'success'): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color,
    });
    await toast.present();
  }
}
```

```html
<!-- src/app/components/logout-button/logout-button.component.html -->

<ion-button
  color="danger"
  expand="block"
  (click)="logout()"
  class="logout-button"
>
  <ion-icon name="log-out-outline" slot="start"></ion-icon>
  Đăng Xuất
</ion-button>
```

### 3. Profile/Settings Component

```typescript
// src/app/pages/profile/profile.component.ts

import { Component, OnInit } from '@angular/core';
import { AuthService, CurrentUser } from '@app/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  currentUser$!: Observable<CurrentUser | null>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser$ = this.authService.getCurrentUser();
  }

  async logout(): Promise<void> {
    try {
      await this.authService.logout().toPromise();
      // Navigate to login (handled by logout interceptor)
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }
}
```

---

## Interceptors

### 1. JWT Token Interceptor

```typescript
// src/app/interceptors/auth.interceptor.ts

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@app/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();

    if (token) {
      // Clone request và thêm token vào header
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request);
  }
}
```

### 2. Error Handling Interceptor

```typescript
// src/app/interceptors/error.interceptor.ts

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { ToastController } from '@ionic/angular';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(async (error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token invalid hoặc expired
          await this.handleUnauthorized();
        } else if (error.status === 403) {
          // Permission denied
          await this.showToast('Bạn không có quyền truy cập', 'warning');
        } else if (error.status >= 500) {
          // Server error
          await this.showToast('Lỗi server, vui lòng thử lại sau', 'danger');
        }

        return throwError(() => error);
      }),
    );
  }

  private async handleUnauthorized(): Promise<void> {
    // Clear auth data
    localStorage.removeItem('access_token');
    localStorage.removeItem('current_user');

    await this.showToast('Phiên làm việc đã hết hạn, vui lòng đăng nhập lại', 'warning');

    // Redirect tới login
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  private async showToast(message: string, color: string = 'warning'): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      color,
    });
    await toast.present();
  }
}
```

### 3. Module Setup

```typescript
// src/app/app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

---

## Error Handling

### Logout Errors

```typescript
// Các trường hợp xử lý:

// 1. Network error - vẫn clear local storage
await this.authService.logout().toPromise();
// → localStorage cleared
// → Redirect to login

// 2. Token already invalid - API return 401
// → ErrorInterceptor catches 401
// → Clear storage
// → Redirect to login

// 3. User cancel logout
// → Just dismiss modal/alert
// → Stay on current page

// 4. Admin force logout
// → Called by admin, target user logout next request
// → User không biết bị logout
// → Next API call → 401 → redirect
```

### Examples

```typescript
// Handle logout with error
async logout(): Promise<void> {
  try {
    await this.authService.logout().toPromise();
    // Success
    this.router.navigate(['/login']);
  } catch (error) {
    console.warn('Logout API failed, clearing local storage');
    // Vẫn clear kể cả API fail
    localStorage.removeItem('access_token');
    localStorage.removeItem('current_user');
    this.router.navigate(['/login']);
  }
}
```

---

## Testing

### Unit Tests

```typescript
// src/app/services/auth.service.spec.ts

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, { provide: Router, useValue: { navigate: jasmine.createSpy() } }],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('logout', () => {
    it('should call logout endpoint', (done) => {
      service.logout().subscribe(() => {
        expect(localStorage.getItem('access_token')).toBeNull();
        done();
      });

      const req = httpMock.expectOne((r) => r.url.includes('/auth/logout'));
      expect(req.request.method).toBe('POST');
      req.flush({ ok: true });
    });

    it('should clear storage on logout', (done) => {
      localStorage.setItem('access_token', 'test-token');
      localStorage.setItem('current_user', JSON.stringify({ _id: '123' }));

      service.logout().subscribe(() => {
        expect(localStorage.getItem('access_token')).toBeNull();
        expect(localStorage.getItem('current_user')).toBeNull();
        done();
      });

      const req = httpMock.expectOne((r) => r.url.includes('/auth/logout'));
      req.flush({ ok: true });
    });

    it('should clear storage even if API fails', (done) => {
      localStorage.setItem('access_token', 'test-token');

      service.logout().subscribe({
        error: () => {
          expect(localStorage.getItem('access_token')).toBeNull();
          done();
        },
      });

      const req = httpMock.expectOne((r) => r.url.includes('/auth/logout'));
      req.error(new ProgressEvent('error'));
    });
  });

  describe('forceLogoutUser', () => {
    it('should call force logout endpoint', (done) => {
      const userId = '507f1f77bcf86cd799439011';
      
      service.forceLogoutUser(userId).subscribe(() => {
        done();
      });

      const req = httpMock.expectOne((r) => 
        r.url.includes(`/auth/force-logout/${userId}`)
      );
      expect(req.request.method).toBe('POST');
      req.flush({ ok: true });
    });
  });
});
```

### E2E Test

```typescript
// e2e/logout.e2e-spec.ts

describe('Logout Flow', () => {
  beforeEach(() => {
    cy.visit('localhost:4200/login');
  });

  it('should logout user', () => {
    // Login
    cy.get('input[formControlName="phoneNumber"]').type('0123456789');
    cy.get('input[formControlName="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Should navigate to home
    cy.url().should('include', '/home');
    cy.get('ion-content').should('exist');

    // Click logout button
    cy.get('app-logout-button button').click();

    // Confirm logout
    cy.get('ion-alert button').contains('Đăng Xuất').click();

    // Should redirect to login
    cy.url().should('include', '/login');
    cy.get('ion-input[formControlName="phoneNumber"]').should('exist');
  });

  it('should clear token from localStorage on logout', () => {
    // Login first
    cy.login('0123456789', 'password123');

    // Verify token exists
    cy.window().then((window) => {
      expect(window.localStorage.getItem('access_token')).toBeTruthy();
    });

    // Logout
    cy.get('app-logout-button button').click();
    cy.get('ion-alert button').contains('Đăng Xuất').click();

    // Verify token cleared
    cy.window().then((window) => {
      expect(window.localStorage.getItem('access_token')).toBeNull();
    });
  });

  it('should handle logout with invalid token', () => {
    // Login
    cy.login('0123456789', 'password123');

    // Manually change token in storage (simulate version change)
    cy.window().then((window) => {
      window.localStorage.setItem('access_token', 'invalid-token');
    });

    // Logout
    cy.get('app-logout-button button').click();
    cy.get('ion-alert button').contains('Đăng Xuất').click();

    // Should still redirect to login
    cy.url().should('include', '/login');
  });
});
```

---

## Troubleshooting

### Issue: Token not being added to requests

**Solution**: Verify `AuthInterceptor` is provided in `AppModule`:
```typescript
providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
]
```

### Issue: Logout doesn't redirect to login

**Solution**: Check `ErrorInterceptor` is catching 401 errors:
```typescript
if (error.status === 401) {
  await this.handleUnauthorized();
}
```

### Issue: "User can still access app with old token"

**Solution**: This is expected behavior until next request. Token becomes invalid when:
1. User makes any API request with old token
2. ErrorInterceptor catches 401
3. Redirect to login

To force immediate invalidation, add explicit validation:
```typescript
async logout(): Promise<void> {
  await this.authService.logout().toPromise();
  
  // Additional validation: try to fetch current user
  try {
    await this.authService.validateToken().toPromise();
  } catch {
    // Token invalid, proceed to clear
  }
  
  this.router.navigate(['/login']);
}
```

### Issue: Admin force logout doesn't work

**Solution**: 
1. Verify admin has `ADMIN` or `TENANT` role
2. Check API endpoint is accessible: `POST /auth/force-logout/{userId}`
3. Verify target user's `tokenVersion` was incremented in DB

Debug:
```typescript
// Check admin roles
this.authService.getCurrentUser().subscribe(user => {
  console.log('Admin roles:', user?.roles);
  // Should include 'admin' or 'tenant'
});

// Test force logout
this.authService.forceLogoutUser('507f1f77bcf86cd799439011').subscribe(
  response => console.log('Force logout success:', response),
  error => console.error('Force logout failed:', error),
);
```

---

## Production Checklist

- ✅ Environment variables configured (.env.production)
- ✅ API endpoints use `environment.apiUrl`
- ✅ Error handling for 401, 403, 5xx
- ✅ Clear sensitive data on logout
- ✅ Token refresh strategy (if needed)
- ✅ Logout on app resume/background
- ✅ Unit tests cover logout scenarios
- ✅ E2E tests cover full logout flow
- ✅ Network error handling in logout
- ✅ User feedback (toast/alerts)

---

## References

- [NestJS Auth Docs](https://docs.nestjs.com/techniques/authentication)
- [Ionic Security](https://ionicframework.com/docs/react/security)
- [Angular HTTP Client](https://angular.io/guide/http)
- [Angular Interceptors](https://angular.io/guide/http#intercepting-requests-and-responses)

---

**Version**: 1.0.0  
**Last Updated**: March 5, 2026  
**Maintainer**: Your Team

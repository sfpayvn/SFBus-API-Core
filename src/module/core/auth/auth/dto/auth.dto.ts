export class ForgotPasswordDto {
  email: string;
  tenantCode: string;
  redirectBaseUrl?: string;
}
export class ResetPasswordDto {
  token: string;
  newPassword: string;
}

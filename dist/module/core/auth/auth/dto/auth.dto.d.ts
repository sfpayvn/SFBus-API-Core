export declare class ForgotPasswordDto {
    email: string;
    tenantCode: string;
    redirectBaseUrl?: string;
}
export declare class ResetPasswordDto {
    token: string;
    newPassword: string;
}

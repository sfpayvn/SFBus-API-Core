export declare class AdminSignUpDto {
    tenantName: string;
    tenantCode: string;
    phoneNumber: string;
    password: string;
}
export declare class AdminForgotPasswordDto {
    phoneNumber: string;
    tenantCode: string;
    redirectBaseUrl?: string;
}
export declare class AdminResetPasswordDto {
    token: string;
    newPassword: string;
}

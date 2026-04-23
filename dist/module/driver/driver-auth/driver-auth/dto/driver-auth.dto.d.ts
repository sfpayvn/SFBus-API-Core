export declare class DriverSignUpDto {
    tenantName: string;
    tenantCode: string;
    phoneNumber: string;
    password: string;
}
export declare class DriverForgotPasswordDto {
    phoneNumber: string;
    tenantCode: string;
    redirectBaseUrl?: string;
}
export declare class DriverResetPasswordDto {
    token: string;
    newPassword: string;
}

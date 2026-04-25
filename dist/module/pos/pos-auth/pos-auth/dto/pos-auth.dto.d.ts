export declare class PosSignUpDto {
    tenantName: string;
    tenantCode: string;
    phoneNumber: string;
    password: string;
}
export declare class PosForgotPasswordDto {
    phoneNumber: string;
    tenantCode: string;
    redirectBaseUrl?: string;
}
export declare class PosResetPasswordDto {
    token: string;
    newPassword: string;
}

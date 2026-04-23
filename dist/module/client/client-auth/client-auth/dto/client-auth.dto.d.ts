export declare class ClientForgotPasswordDto {
    phoneNumber: string;
    redirectBaseUrl?: string;
}
export declare class ClientResetPasswordDto {
    token: string;
    newPassword: string;
}

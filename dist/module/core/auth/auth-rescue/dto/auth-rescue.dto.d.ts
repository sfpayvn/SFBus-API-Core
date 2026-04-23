export declare class RequestAuthRescueDto {
    identifier: string;
    purpose: 'login' | 'reset_password' | '2fa';
}
export declare class VerifyAuthRescueDto {
    identifier: string;
    purpose: 'login' | 'reset_password' | '2fa';
    token: string;
}

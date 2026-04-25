export declare class ClientRequestAuthRescueDto {
    identifier: string;
    purpose: '2fa';
}
export declare class ClientVerifyAuthRescueDto {
    identifier: string;
    purpose: '2fa';
    token: string;
}

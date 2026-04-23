export declare class DriverRequestAuthRescueDto {
    identifier: string;
    purpose: '2fa';
}
export declare class DriverVerifyAuthRescueDto {
    identifier: string;
    tenantCode: string;
    purpose: '2fa';
    token: string;
}

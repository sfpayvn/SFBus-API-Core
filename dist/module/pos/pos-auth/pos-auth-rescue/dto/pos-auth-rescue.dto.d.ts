export declare class PosRequestAuthRescueDto {
    identifier: string;
    purpose: '2fa';
}
export declare class PosVerifyAuthRescueDto {
    identifier: string;
    tenantCode: string;
    purpose: '2fa';
    token: string;
}

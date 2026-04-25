export declare const SETTING_CONSTANTS: {
    readonly TRANSIT_POLICY: "transit_policy";
    readonly BOOKING_CANCELLATION_POLICY: "booking_cancellation_policy";
    readonly BOARDING_REQUIREMENTS_POLICY: "boarding_requirements_policy";
    readonly CARRY_ON_BAGGAGE_POLICY: "carry_on_baggage_policy";
    readonly CHILD_AND_PREGNANCY_POLICY: "child_and_pregnancy_policy";
    readonly ROADSIDE_PICKUP_POLICY: "roadside_pickup_policy";
    readonly OTHER_POLICY: "other_policy";
    readonly BUS_SCHEDULE_AVAILABILITY_CUTOFF: "bus_schedule_availability_cutoff";
    readonly TENANT_NAME: "tenantName";
    readonly PRIMARY_COLOR: "primaryColor";
    readonly SECONDARY_COLOR: "secondaryColor";
    readonly TENANT_LOGO: "tenantLogo";
};
export type SettingConstantKeys = keyof typeof SETTING_CONSTANTS;
export type SettingConstantValues = typeof SETTING_CONSTANTS[SettingConstantKeys];
export declare const SETTING_CONSTANTS_GROUPS: {
    readonly BUS_SCHEDULE: "bus_schedule";
    readonly THEME: "theme";
};

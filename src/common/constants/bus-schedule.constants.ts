export const BUS_SCHEDULE_DIRECTION = {
  ARRIVAL: 'arrival',
  DEPARTURE: 'departure',
} as const;

export type BusScheduleDirectionType = (typeof BUS_SCHEDULE_DIRECTION)[keyof typeof BUS_SCHEDULE_DIRECTION];

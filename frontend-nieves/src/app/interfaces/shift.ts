export interface Shift {
  day: Date;
  startHour: number;
  endHour: number;
  title?: string;
}

export interface Resource {
  name: string;
  shifts: Shift[];
}
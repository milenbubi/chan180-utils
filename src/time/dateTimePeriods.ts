export interface IPeriodOptions {
  text: string;
  value: PeriodLengthInDays;
}


export enum PeriodLengthInDays {
  AllTime = -1,
  Custom = 0,
  One = 1,
  Seven = 7,
  Thirty = 30,
  ThisWeek = 77,
  ThisMonth = 33,
  ThreeMonths = 90,
  Today = 11
}


export const getPeriodOptions = (excludePeriods: PeriodLengthInDays[] = []) => {
  const options: IPeriodOptions[] = [
    { text: "Today", value: PeriodLengthInDays.Today },
    { text: "Last 24 hours", value: PeriodLengthInDays.One },
    { text: "This Week", value: PeriodLengthInDays.ThisWeek },
    { text: "Last 7 Days", value: PeriodLengthInDays.Seven },
    { text: "This Month", value: PeriodLengthInDays.ThisMonth },
    { text: "Last 30 Days", value: PeriodLengthInDays.Thirty },
    { text: "Last 3 Months", value: PeriodLengthInDays.ThreeMonths },
    { text: "All Time", value: PeriodLengthInDays.AllTime },
    { text: "Custom", value: PeriodLengthInDays.Custom }
  ];

  return options.filter(o => !excludePeriods.includes(o.value));
};
import { PeriodLengthInDays } from "./dateTimePeriods";


export interface IPeriodBoundaries {
  start: number;
  end: number;
}


/**
 * Calculates the start and end timestamps (in milliseconds) for a given fixed period.
 *
 * The function converts relative periods (e.g. "Today", "This Week", "Last 7 Days")
 * into concrete UNIX timestamps, based on the current time.
 *
 * Supported periods (from {@link PeriodLengthInDays}):
 * - `One`, `Seven`, `Thirty`, `ThreeMonths` → last X days from now
 * - `Today` → from midnight to now
 * - `ThisWeek` → from the beginning of the week (Monday) to now
 * - `ThisMonth` → from the start of the month to now
 * - `Custom` → returns `{ start: now, end: now }`
 * - `AllTime` → returns `{ start: 0, end: now }`
 *
 * @param {PeriodLengthInDays} fixedPeriod - Enum value defining which time period to calculate.
 * @returns {IPeriodBoundaries} Object with numeric `start` and `end` timestamps in milliseconds.
 *
 * @example
 * // Get the start and end timestamps for the last 7 days
 * const { start, end } = calculatePeriodBoundaries(PeriodLengthInDays.Seven);
 * console.log(new Date(start), new Date(end));
 */
export function calculatePeriodBoundaries(fixedPeriod: PeriodLengthInDays): IPeriodBoundaries {
  let now = _nowInSeconds();
  let result: IPeriodBoundaries = { start: 0, end: now };  // Matches All Time

  // One, Seven, 30 days or Three months
  if (
    [
      PeriodLengthInDays.One,
      PeriodLengthInDays.Three,
      PeriodLengthInDays.Seven,
      PeriodLengthInDays.Thirty,
      PeriodLengthInDays.ThreeMonths,
    ].includes(fixedPeriod)
  ) {
    result.end = now;
    result.start = now - fixedPeriod * 24 * 60 * 60;
  }

  // Today
  else if (fixedPeriod === PeriodLengthInDays.Today) {
    result.end = now;
    result.start = now - _todaySeconds();
  }

  // This Week
  else if (fixedPeriod === PeriodLengthInDays.ThisWeek) {
    result.end = now;
    result.start = now - _thisWeekSeconds();
  }

  // This Month
  else if (fixedPeriod === PeriodLengthInDays.ThisMonth) {
    result.end = now;
    result.start = now - _thisMonthSeconds();
  }

  // Custom Period
  else if (fixedPeriod === PeriodLengthInDays.Custom) {
    result.end = now;
    result.start = now;
  }

  // All Time
  else if (fixedPeriod === PeriodLengthInDays.AllTime) {
    result.end = now;
    result.start = 0;
  }

  return { start: result.start * 1000, end: result.end * 1000 };
}


function _todaySeconds(): number {
  let now = _nowInSeconds();
  let midnight = new Date().setHours(0, 0, 0, 0) / 1000; //Today - midnight

  return now - midnight;
}


function _thisWeekSeconds(): number {
  let dayOfWeek = new Date().getDay() || 7; // adjust when day is sunday
  let timeInSeconds = (dayOfWeek - 1) * 24 * 60 * 60 + _todaySeconds();

  return timeInSeconds;
}


function _thisMonthSeconds(): number {
  let dayOfMonth = new Date().getDate();
  let timeInSeconds = (dayOfMonth - 1) * 24 * 60 * 60 + _todaySeconds();

  return timeInSeconds;
}


function _nowInSeconds() {
  return Date.now() / 1000;
}
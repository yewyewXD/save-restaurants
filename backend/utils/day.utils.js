export const ONE_DAY_IN_SEC = 24 * 60 * 60 * 1000;

export function getOneDayFromNow() {
  return new Date().getTime() + ONE_DAY_IN_SEC;
}

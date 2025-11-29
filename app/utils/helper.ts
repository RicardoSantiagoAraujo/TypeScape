export function timeFormat(time: number): string {
  return String(Math.round((time / 1000) * 100) / 100) + " s";
}

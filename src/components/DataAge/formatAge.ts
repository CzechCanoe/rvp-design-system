/**
 * Czech relative age: `právě teď`, `před 5 s`, `před 2 min`, `před 1 h`.
 * Floors to the shown unit, so the text never claims fresher data than it is.
 */
export function formatAgeCs(ageSeconds: number): string {
  const s = Math.max(0, Math.floor(ageSeconds));
  if (s < 1) return 'právě teď';
  if (s < 60) return `před ${s} s`;
  if (s < 3600) return `před ${Math.floor(s / 60)} min`;
  return `před ${Math.floor(s / 3600)} h`;
}

/** Milliseconds until the default relative text changes (next whole second / minute / hour of age). */
export function msUntilNextAgeChange(ageMs: number): number {
  const age = Math.max(0, ageMs);
  const unit = age < 60_000 ? 1000 : age < 3_600_000 ? 60_000 : 3_600_000;
  return unit - (age % unit);
}

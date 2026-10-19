import type { SeasonSparklinePoint } from './SeasonSparkline';

/** Placements of the reference season (ProfilMobil.html), last point provisional. Deterministic. */
export const seasonPoints: SeasonSparklinePoint[] = [12, 7, 9, 5, 3, 5, 2, 1, 2].map((place, i) => ({
  label: `Závod ${i + 1}`,
  place,
  provisional: i === 8,
}));

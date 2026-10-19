import { forwardRef, useId, type HTMLAttributes, type ReactNode } from 'react';
import './SeasonSparkline.css';

export interface SeasonSparklinePoint {
  /** Race label for assistive technology, e.g. "ČP #2, Troja" */
  label: string;
  /** Final placement (1 = best). Lower is higher on the chart. */
  place: number;
  /** Not settled yet (provisional results): hollow amber marker instead of a filled one. */
  provisional?: boolean;
}

export interface SeasonSparklineLabels {
  /** Name of one point for the text alternative, e.g. "12. (ČP #1)" */
  point: (point: SeasonSparklinePoint, index: number) => string;
  /** Text alternative of the whole chart */
  description: (points: SeasonSparklinePoint[], pointTexts: string[]) => string;
  /** Appended to a provisional point in the text alternative */
  provisional: string;
}

export const SEASON_SPARKLINE_LABELS: SeasonSparklineLabels = {
  point: (point) => `${point.place}.`,
  description: (points, texts) => `Umístění v ${points.length} závodech sezóny: ${texts.join(', ')}`,
  provisional: 'předběžně',
};

export interface SeasonSparklineProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Placements in race order (oldest first). Fewer than 2 points draw markers only. */
  points: SeasonSparklinePoint[];
  /** Visible title above the chart (also names the SVG) */
  title?: ReactNode;
  /** Plain-text title for the SVG `<title>`; defaults to "Umístění v sezóně" */
  accessibleTitle?: string;
  /** Right of the title, e.g. "umístění v K1 muži" */
  meta?: ReactNode;
  /** Note under the chart, e.g. why the last point is provisional */
  note?: ReactNode;
  /** Worst placement on the axis; defaults to the worst of the points */
  worstPlace?: number;
  /** Czech defaults, overridable */
  labels?: Partial<SeasonSparklineLabels>;
}

const WIDTH = 340;
const HEIGHT = 90;
const X0 = 20;
const X1 = 335;
const Y_TOP = 14;
const Y_BOTTOM = 80;

/**
 * Placement curve over a season as inline SVG (higher = better). The best point is a filled
 * brand dot with its label, provisional points are hollow amber rings. The chart carries
 * `<title>` and `<desc>` with all values; no animation.
 */
export const SeasonSparkline = forwardRef<HTMLDivElement, SeasonSparklineProps>(
  (
    {
      points,
      title,
      accessibleTitle = 'Umístění v sezóně',
      meta,
      note,
      worstPlace,
      labels,
      className,
      ...props
    },
    ref
  ) => {
    const uid = useId();
    const l = { ...SEASON_SPARKLINE_LABELS, ...labels };
    const worst = Math.max(worstPlace ?? 0, ...points.map((p) => p.place), 2);
    const n = points.length;

    const xs = points.map((_, i) => (n === 1 ? X1 : X0 + ((X1 - X0) * i) / (n - 1)));
    const y = (place: number) => Y_TOP + ((place - 1) / (worst - 1)) * (Y_BOTTOM - Y_TOP);
    const coords = points.map((p, i) => ({ x: xs[i], y: y(p.place), p }));

    const bestPlace = Math.min(...points.map((p) => p.place));
    const bestIndex = points.findIndex((p) => p.place === bestPlace && !p.provisional);

    const texts = points.map((p, i) => `${l.point(p, i)}${p.provisional ? ` (${l.provisional})` : ''}`);
    const titleId = `${uid}-t`;
    const descId = `${uid}-d`;
    const classes = ['csk-season-sparkline', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {(title || meta) && (
          <div className="csk-season-sparkline__head">
            {title && <h3 className="csk-season-sparkline__title">{title}</h3>}
            {meta && <span className="csk-season-sparkline__meta">{meta}</span>}
          </div>
        )}
        <svg
          className="csk-season-sparkline__svg"
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          role="img"
          aria-labelledby={`${titleId} ${descId}`}
        >
          <title id={titleId}>{accessibleTitle}</title>
          <desc id={descId}>{l.description(points, texts)}</desc>
          <line className="csk-season-sparkline__axis" x1="0" y1={Y_BOTTOM} x2={WIDTH} y2={Y_BOTTOM} />
          <text className="csk-season-sparkline__tick" x="0" y="12" aria-hidden="true">
            1.
          </text>
          <text className="csk-season-sparkline__tick" x="0" y={Y_BOTTOM - 2} aria-hidden="true">
            {worst}.
          </text>
          {n > 1 && (
            <polyline
              className="csk-season-sparkline__line"
              points={coords.map((c) => `${c.x},${c.y}`).join(' ')}
            />
          )}
          {coords.map((c, i) => (
            <circle
              key={i}
              className={
                c.p.provisional
                  ? 'csk-season-sparkline__dot csk-season-sparkline__dot--provisional'
                  : i === bestIndex
                    ? 'csk-season-sparkline__dot csk-season-sparkline__dot--best'
                    : 'csk-season-sparkline__dot'
              }
              cx={c.x}
              cy={c.y}
              r={c.p.provisional ? 4 : i === bestIndex ? 5 : 3}
            />
          ))}
          {bestIndex >= 0 && (
            <text
              className="csk-season-sparkline__best"
              x={coords[bestIndex].x - 4}
              y={coords[bestIndex].y + 20}
              aria-hidden="true"
            >
              {points[bestIndex].place}.
            </text>
          )}
        </svg>
        {note && <div className="csk-season-sparkline__note">{note}</div>}
      </div>
    );
  }
);

SeasonSparkline.displayName = 'SeasonSparkline';

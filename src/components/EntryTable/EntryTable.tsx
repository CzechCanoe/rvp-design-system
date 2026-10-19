import { forwardRef, useId, type HTMLAttributes, type ReactNode } from "react";
import { Badge, type BadgeVariant } from "../Badge";
import { Button } from "../Button";
import { Select, type SelectOption } from "../Select";
import "./EntryTable.css";

/** Result of one check of a member (registration, fees, medical ...). Text is always shown, colour is only a hint. */
export type EntryCheckTone = "ok" | "warn" | "error" | "neutral";

export interface EntryCheck {
  /** Short text, e.g. `platná`, `propadla 3. 4.` */
  label: ReactNode;
  tone?: EntryCheckTone;
}

/** One person in a boat. */
export interface EntryMember {
  id: string;
  name: string;
  /** Role in the boat, e.g. `háček` / `zadák` (two-person boats). */
  role?: string;
  /** Registration number shown after the name, e.g. `RGC 118 203`. */
  regNo?: string;
  /** Year of birth. */
  year?: ReactNode;
  /** Ranking class (VT) column, e.g. `1`, `M`, `bez VT`. */
  rankingClass?: ReactNode;
  /** One entry per `checkColumns` column (same order). */
  checks: EntryCheck[];
}

/** One entered boat. One member = single boat (K1/C1), two members = C2 rendered as two rows. */
export interface EntryBoat {
  id: string;
  /** One or two members; the order is the row order. */
  members: EntryMember[];
  /** Selected age category (value of `categoryOptions`). */
  category: string;
  /** Hint under the category select, e.g. `ročník 2011 odpovídá U16`. A warning, never blocks. */
  categoryWarning?: ReactNode;
  /** Fee text for the boat, e.g. `300`. */
  fee?: ReactNode;
  /** Replaces the missing second member row of a C2 with an open seat (text + action to add the partner). */
  openSeat?: ReactNode;
}

export interface EntryTableLabels {
  athlete: ReactNode;
  crew: ReactNode;
  year: ReactNode;
  category: ReactNode;
  rankingClass: ReactNode;
  fee: ReactNode;
  /** Screen-reader header of the actions column. */
  actions: string;
  removeAthlete: ReactNode;
  removeBoat: ReactNode;
  replaceMember: ReactNode;
  /** Accessible names of the row actions, given the boat. */
  categoryOf: (boat: EntryBoat) => string;
  removeAthleteOf: (boat: EntryBoat) => string;
  removeBoatOf: (boat: EntryBoat) => string;
  replaceMemberOf: (boat: EntryBoat) => string;
  /** Screen-reader prefixes of non-ok checks. */
  warnPrefix: string;
  errorPrefix: string;
  /** Content shown when there is no boat. */
  empty: ReactNode;
}

const names = (b: EntryBoat) => b.members.map((m) => m.name).join(", ");

export const ENTRY_TABLE_LABELS: EntryTableLabels = {
  athlete: "Závodník",
  crew: "Posádka",
  year: "Roč.",
  category: "Věková kat.",
  rankingClass: "VT",
  fee: "Startovné",
  actions: "Akce",
  removeAthlete: "odebrat",
  removeBoat: "odebrat loď",
  replaceMember: "vyměnit člena",
  categoryOf: (b) => `Věková kategorie: ${names(b)}`,
  removeAthleteOf: (b) => `Odebrat závodníka: ${names(b)}`,
  removeBoatOf: (b) => `Odebrat loď: ${names(b)}`,
  replaceMemberOf: (b) => `Vyměnit člena lodi: ${names(b)}`,
  warnPrefix: "Upozornění: ",
  errorPrefix: "Chyba: ",
  empty: "Zatím žádná přihlášená loď",
};

export interface EntryTableProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  /** Accessible name of the table (e.g. the class: `K1 muži`). */
  caption: string;
  boats: EntryBoat[];
  /** Headers of the check columns (e.g. Registrace, Příspěvky, Prohlídka). */
  checkColumns: ReactNode[];
  /** Options of the age category select. */
  categoryOptions: SelectOption[];
  /** Overrides of the Czech texts. */
  labels?: Partial<EntryTableLabels>;
  onCategoryChange?: (boat: EntryBoat, category: string) => void;
  onRemove?: (boat: EntryBoat) => void;
  onReplaceMember?: (boat: EntryBoat) => void;
}

const TONE_VARIANT: Record<EntryCheckTone, BadgeVariant> = {
  ok: "success",
  warn: "warning",
  error: "error",
  neutral: "default",
};

/**
 * Office table of entered athletes/boats: checks as badges, age-category select in the cell and row actions.
 * A two-person boat (C2) is one entry rendered as two rows: category, fee and actions span both (`rowSpan`).
 * Checks are warnings: this component never disables or blocks anything.
 * On a phone the table scrolls horizontally inside the component (keyboard reachable).
 */
export const EntryTable = forwardRef<HTMLDivElement, EntryTableProps>(
  (
    {
      caption,
      boats,
      checkColumns,
      categoryOptions,
      labels: labelsProp,
      onCategoryChange,
      onRemove,
      onReplaceMember,
      className,
      ...props
    },
    ref,
  ) => {
    const text = { ...ENTRY_TABLE_LABELS, ...labelsProp };
    const uid = useId();
    const crew = boats.some((b) => b.members.length > 1 || b.openSeat);

    const prefix = (tone: EntryCheckTone) =>
      tone === "warn"
        ? text.warnPrefix
        : tone === "error"
          ? text.errorPrefix
          : "";

    return (
      <div
        ref={ref}
        className={["csk-entry-table", className].filter(Boolean).join(" ")}
        role="region"
        aria-label={caption}
        tabIndex={0}
        {...props}
      >
        {boats.length === 0 ? (
          <div className="csk-entry-table__empty">{text.empty}</div>
        ) : (
          <table className="csk-entry-table__table">
            <caption className="csk-entry-table__sr">{caption}</caption>
            <thead>
              <tr>
                <th scope="col">{crew ? text.crew : text.athlete}</th>
                <th scope="col">{text.year}</th>
                <th scope="col">{text.category}</th>
                <th scope="col">{text.rankingClass}</th>
                {checkColumns.map((c, i) => (
                  <th key={i} scope="col">
                    {c}
                  </th>
                ))}
                <th scope="col" className="csk-entry-table__num">
                  {text.fee}
                </th>
                <th scope="col">
                  <span className="csk-entry-table__sr">{text.actions}</span>
                </th>
              </tr>
            </thead>
            {boats.map((boat) => {
              const rows = boat.members.length > 1 || boat.openSeat ? 2 : 1;
              const hintId = `${uid}-${boat.id}-hint`;
              const warn = Boolean(boat.categoryWarning);
              return (
                <tbody key={boat.id} className="csk-entry-table__boat">
                  {Array.from({ length: rows }, (_, r) => {
                    const member = boat.members[r];
                    const first = r === 0;
                    const last = r === rows - 1;
                    return (
                      <tr
                        key={r}
                        className={
                          last
                            ? "csk-entry-table__row csk-entry-table__row--last"
                            : "csk-entry-table__row"
                        }
                      >
                        {member ? (
                          <>
                            <th
                              scope="row"
                              className="csk-entry-table__cell csk-entry-table__name"
                            >
                              <b>{member.name}</b>{" "}
                              <span className="csk-entry-table__muted">
                                {[member.role, member.regNo]
                                  .filter(Boolean)
                                  .join(" · ")}
                              </span>
                            </th>
                            <td className="csk-entry-table__cell csk-entry-table__num">
                              {member.year}
                            </td>
                          </>
                        ) : (
                          <td
                            className="csk-entry-table__cell csk-entry-table__open"
                            colSpan={2}
                          >
                            {boat.openSeat}
                          </td>
                        )}
                        {first && (
                          <td
                            rowSpan={rows}
                            className="csk-entry-table__cell csk-entry-table__category"
                          >
                            <Select
                              id={`${uid}-${boat.id}-cat`}
                              size="sm"
                              aria-label={text.categoryOf(boat)}
                              aria-describedby={warn ? hintId : undefined}
                              options={categoryOptions}
                              value={boat.category}
                              className={
                                warn
                                  ? "csk-entry-table__select csk-entry-table__select--warn"
                                  : "csk-entry-table__select"
                              }
                              onChange={(e) =>
                                onCategoryChange?.(boat, e.target.value)
                              }
                            />
                            {warn && (
                              <div
                                id={hintId}
                                className="csk-entry-table__hint"
                              >
                                {boat.categoryWarning}
                              </div>
                            )}
                          </td>
                        )}
                        <td className="csk-entry-table__cell csk-entry-table__num">
                          {member?.rankingClass}
                        </td>
                        {checkColumns.map((_, i) => {
                          const check = member?.checks[i];
                          const tone = check?.tone ?? "ok";
                          return (
                            <td key={i} className="csk-entry-table__cell">
                              {check && (
                                <Badge variant={TONE_VARIANT[tone]} size="sm">
                                  {prefix(tone) && (
                                    <span className="csk-entry-table__sr">
                                      {prefix(tone)}
                                    </span>
                                  )}
                                  {check.label}
                                </Badge>
                              )}
                            </td>
                          );
                        })}
                        {first && (
                          <>
                            <td
                              rowSpan={rows}
                              className="csk-entry-table__cell csk-entry-table__num csk-entry-table__fee"
                            >
                              {boat.fee}
                            </td>
                            <td
                              rowSpan={rows}
                              className="csk-entry-table__cell csk-entry-table__actions"
                            >
                              <div className="csk-entry-table__actions-inner">
                                {rows > 1 && onReplaceMember && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    aria-label={text.replaceMemberOf(boat)}
                                    onClick={() => onReplaceMember(boat)}
                                  >
                                    {text.replaceMember}
                                  </Button>
                                )}
                                {onRemove && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    aria-label={
                                      rows > 1
                                        ? text.removeBoatOf(boat)
                                        : text.removeAthleteOf(boat)
                                    }
                                    onClick={() => onRemove(boat)}
                                  >
                                    {rows > 1
                                      ? text.removeBoat
                                      : text.removeAthlete}
                                  </Button>
                                )}
                              </div>
                            </td>
                          </>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              );
            })}
          </table>
        )}
      </div>
    );
  },
);

EntryTable.displayName = "EntryTable";

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { Avatar } from '../Avatar';
import { StatTile } from '../StatTile';
import './ProfileHeader.css';

/**
 * - `page`: public profile on the white page (square-ish avatar, framed tiles, actions on the right)
 * - `band`: phone "Moje" profile on the navy band (round avatar, translucent tiles, actions in the top row)
 */
export type ProfileHeaderVariant = 'page' | 'band';

export interface ProfileHeaderTile {
  /** Stable key (defaults to the position) */
  id?: string;
  /** Small label above the value, e.g. "VT slalom K1" */
  label: ReactNode;
  /** Big value, e.g. "1", "2+", "4." */
  value: ReactNode;
  /** Line next to the value, e.g. "platí do 31. 12. 2027" or a `StatusBadge` */
  hint?: ReactNode;
  /** Change indicator, e.g. "▲2" */
  delta?: ReactNode;
}

export interface ProfileHeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Full name; also the source of the avatar initials */
  name: string;
  /** Layout variant (default `page`) */
  variant?: ProfileHeaderVariant;
  /** Replaces the default initials `Avatar` (e.g. a portrait). The portrait itself is the application's data. */
  avatar?: ReactNode;
  /** Badge row above the name (section, disciplines) */
  badges?: ReactNode;
  /** Meta items (club, birth year, RGC, active since); separated by a dot in `band` */
  meta?: ReactNode[];
  /** Number tiles (`StatTile`): VT, ranking, season */
  tiles?: ProfileHeaderTile[];
  /** Actions (follow, share); right of the block in `page`, top row in `band` */
  actions?: ReactNode;
  /** `band` only: row above the avatar (back link, "Upravit profil") */
  topbar?: ReactNode;
  /** Heading element (default `h1`) */
  as?: 'h1' | 'h2';
}

/**
 * Header of an athlete profile: avatar, name, badges, meta line, number tiles and actions.
 * What may be shown about minors is decided by the application: pass only public data.
 */
export const ProfileHeader = forwardRef<HTMLElement, ProfileHeaderProps>(
  (
    { name, variant = 'page', avatar, badges, meta, tiles, actions, topbar, as: Heading = 'h1', className, ...props },
    ref
  ) => {
    const isBand = variant === 'band';
    const classes = ['csk-profile-header', `csk-profile-header--${variant}`, className].filter(Boolean).join(' ');

    const avatarNode = avatar ?? (
      <Avatar
        name={name}
        size={isBand ? 'xl' : '3xl'}
        ring={isBand}
        shape={isBand ? 'circular' : 'rounded'}
        color="primary"
        aria-hidden="true"
      />
    );

    const tilesNode = tiles && tiles.length > 0 && (
      <div className="csk-profile-header__tiles">
        {tiles.map((tile, i) => (
          <StatTile
            key={tile.id ?? i}
            className="csk-profile-header__tile"
            label={tile.label}
            value={tile.value}
            hint={tile.hint}
            delta={tile.delta}
          />
        ))}
      </div>
    );

    const metaNode = meta && meta.length > 0 && (
      <ul className="csk-profile-header__meta">
        {meta.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    );

    return (
      <header ref={ref} className={classes} data-tone={isBand ? 'on-dark' : undefined} {...props}>
        {isBand && (topbar || actions) && (
          <div className="csk-profile-header__topbar">
            {topbar}
            {actions && <div className="csk-profile-header__actions">{actions}</div>}
          </div>
        )}

        <div className="csk-profile-header__row">
          <div className="csk-profile-header__avatar">{avatarNode}</div>
          <div className="csk-profile-header__main">
            {badges && <div className="csk-profile-header__badges">{badges}</div>}
            <Heading className="csk-profile-header__name">{name}</Heading>
            {metaNode}
            {!isBand && tilesNode}
          </div>
          {!isBand && actions && <div className="csk-profile-header__actions">{actions}</div>}
        </div>

        {isBand && tilesNode}
      </header>
    );
  }
);

ProfileHeader.displayName = 'ProfileHeader';

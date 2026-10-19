import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import './Card.css';

export type CardVariant = 'surface' | 'outlined';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';
/** `highlight`: brand-tinted frame for the card that matters now (last result, own deadlines) */
export type CardTone = 'default' | 'highlight';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Tone of the frame (default `default`) */
  tone?: CardTone;
  /** Visual variant of the card */
  variant?: CardVariant;
  /** Padding inside the card */
  padding?: CardPadding;
  /** Makes the card clickable with hover/active states */
  clickable?: boolean;
  /** Makes the card render as a link (requires href) */
  href?: string;
  /** Target for link (only used with href) */
  target?: string;
  /** Rel attribute for link (only used with href) */
  rel?: string;
  /** Header content */
  header?: ReactNode;
  /** Footer content */
  footer?: ReactNode;
  /** Children content */
  children?: ReactNode;
}

/**
 * Card component for grouping related content.
 *
 * Slots: `header`, body (children) and `footer`.
 * Supports variants (surface, outlined),
 * padding sizes (none, sm, md, lg), and clickable state.
 * Can render as a div or anchor based on props.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'surface',
      tone = 'default',
      padding = 'md',
      clickable = false,
      href,
      target,
      rel,
      header,
      footer,
      className,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    // Determine the element type
    const isLink = Boolean(href);
    const isClickable = clickable || isLink || Boolean(onClick);

    const classes = [
      'csk-card',
      `csk-card--${variant}`,
      `csk-card--padding-${padding}`,
      tone === 'highlight' && 'csk-card--highlight',
      isClickable && 'csk-card--clickable',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Clickable non-link props
    const interactiveProps =
      isClickable && !isLink
        ? {
            role: 'button' as const,
            tabIndex: 0,
            onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
              }
            },
          }
        : {};

    // Render as anchor when href is provided
    if (isLink) {
      return (
        <a
          className={classes}
          href={href}
          target={target}
          rel={target === '_blank' ? rel || 'noopener noreferrer' : rel}
          onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        >
          {header && <div className="csk-card__header">{header}</div>}
          <div className="csk-card__body">{children}</div>
          {footer && <div className="csk-card__footer">{footer}</div>}
        </a>
      );
    }

    // Render as div (default)
    return (
      <div
        ref={ref}
        className={classes}
        onClick={onClick}
        {...interactiveProps}
        {...props}
      >
        {header && <div className="csk-card__header">{header}</div>}
        <div className="csk-card__body">{children}</div>
        {footer && <div className="csk-card__footer">{footer}</div>}
      </div>
    );
  }
);

Card.displayName = 'Card';

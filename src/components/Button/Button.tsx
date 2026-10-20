import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ForwardedRef,
  type MouseEvent,
  type ReactNode,
} from 'react';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md';

/** Props shared by the button and the link form. */
export interface ButtonOwnProps {
  /**
   * Visual variant of the button
   * @default 'primary'
   */
  variant?: ButtonVariant;
  /**
   * Size of the button
   * @default 'md'
   */
  size?: ButtonSize;
  /**
   * Full width button
   * @default false
   */
  fullWidth?: boolean;
  /** Icon to display before the label */
  iconLeft?: ReactNode;
  /** Icon to display after the label */
  iconRight?: ReactNode;
  /**
   * Loading state (behaves as disabled)
   * @default false
   */
  loading?: boolean;
  /**
   * Disabled. A `<button>` gets `disabled`; a link cannot be disabled natively, so it drops `href`
   * (not focusable, not navigable), gets `role="link"` + `aria-disabled="true"` and ignores clicks.
   * Same look in both forms.
   */
  disabled?: boolean;
  /** Children content */
  children?: ReactNode;
}

/** `<button>` form (default). */
export interface ButtonAsButtonProps extends ButtonOwnProps, ButtonHTMLAttributes<HTMLButtonElement> {
  /** Element: `button` (default) or `a` (link form, needs `href`) */
  as?: 'button';
  href?: never;
}

/**
 * Link form: renders `<a>` with the same look, for navigation (documents, another page).
 * Chosen by `href` or `as="a"`.
 */
export interface ButtonAsLinkProps extends ButtonOwnProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Element: `button` (default) or `a` (link form, needs `href`) */
  as?: 'a';
  /**
   * Link target: renders `<a>` with the identical look and focus ring. `rel` is passed through;
   * without it `target="_blank"` gets `noopener noreferrer`.
   */
  href: string;
  /** Passed through as given. Without `rel`, `target="_blank"` gets `noopener noreferrer`. */
  rel?: string;
}

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const Spinner = () => (
  <span className="csk-button__spinner" aria-hidden="true">
    <svg className="csk-button__spinner-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="31.4 31.4"
      />
    </svg>
  </span>
);

/**
 * Button component for user actions.
 *
 * Supports multiple variants (primary, secondary, ghost, danger),
 * sizes (md 40 px, sm 32 px; touch width at least 44 px), and states (disabled, loading).
 *
 * With `href` (or `as="a"`) it renders a link with the identical look and focus ring,
 * for navigation such as "Propozice (PDF)" or "Přihlásit". Actions stay `<button>`.
 */
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>((props, ref) => {
  const {
    as,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    iconLeft,
    iconRight,
    loading = false,
    disabled,
    className,
    children,
    ...rest
  } = props;

  const classes = [
    'csk-button',
    `csk-button--${variant}`,
    `csk-button--${size}`,
    fullWidth && 'csk-button--full-width',
    loading && 'csk-button--loading',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {loading && <Spinner />}
      {!loading && iconLeft && (
        <span className="csk-button__icon csk-button__icon--left" aria-hidden="true">
          {iconLeft}
        </span>
      )}
      {children && <span className="csk-button__label">{children}</span>}
      {!loading && iconRight && (
        <span className="csk-button__icon csk-button__icon--right" aria-hidden="true">
          {iconRight}
        </span>
      )}
    </>
  );

  if (as === 'a' || rest.href !== undefined) {
    const { href, target, rel, onClick, role, ...anchorProps } = rest as Omit<
      ButtonAsLinkProps,
      keyof ButtonOwnProps | 'as'
    >;
    const isDisabled = Boolean(disabled || loading);
    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
      if (isDisabled) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };
    return (
      <a
        ref={ref as ForwardedRef<HTMLAnchorElement>}
        className={classes}
        {...anchorProps}
        href={isDisabled ? undefined : href}
        role={isDisabled ? 'link' : role}
        aria-disabled={isDisabled || undefined}
        aria-busy={loading || undefined}
        target={target}
        rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
        onClick={handleClick}
      >
        {content}
      </a>
    );
  }

  const buttonProps = rest as Omit<ButtonAsButtonProps, keyof ButtonOwnProps | 'as' | 'href'>;
  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref as ForwardedRef<HTMLButtonElement>}
      className={classes}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}
      {...buttonProps}
    >
      {content}
    </button>
  );
});

Button.displayName = 'Button';

import './CSKLogo.css';

export type CSKLogoSize = 'sm' | 'md' | 'lg';

export interface CSKLogoProps {
  /** Size variant */
  size?: CSKLogoSize;
  /** Optional subtitle (hidden on small screens) */
  subtitle?: string;
  /** Link URL when clickable */
  href?: string;
  /** Additional CSS class */
  className?: string;
}

/**
 * CSK (Český svaz kanoistů) logo component for consistent branding
 * across all CSK web properties.
 */
export const CSKLogo = ({
  size = 'md',
  subtitle,
  href,
  className = '',
}: CSKLogoProps) => {
  const content = (
    <>
      <span className="csk-logo__text">CSK</span>
      {subtitle && <span className="csk-logo__subtitle">{subtitle}</span>}
    </>
  );

  const classes = `csk-logo csk-logo--${size} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return <span className={classes}>{content}</span>;
};

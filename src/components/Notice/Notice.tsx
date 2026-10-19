import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import './Notice.css';

export type NoticeTone = 'info' | 'ok' | 'warn' | 'error';

export interface NoticeProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: NoticeTone;
  title?: ReactNode;
}

/** Static note. Never blocks anything around it (no disabling of nearby buttons). */
export const Notice = forwardRef<HTMLDivElement, NoticeProps>(
  ({ tone = 'info', title, className, children, ...props }, ref) => (
    <div
      ref={ref}
      role="note"
      className={['csk-notice', `csk-notice--${tone}`, className].filter(Boolean).join(' ')}
      {...props}
    >
      <div className="csk-notice__body">
        {title && <b className="csk-notice__title">{title}</b>}
        {title && children ? ' ' : null}
        {children}
      </div>
    </div>
  )
);

Notice.displayName = 'Notice';

import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { EventHeader } from './EventHeader';
import { DataAge } from '../DataAge';
import { createTestClock } from '../../clock/testClock';

const T0 = Date.UTC(2026, 9, 4, 12, 32, 10);

describe('EventHeader data age', () => {
  it('condensed renders the compact DataAge by itself', () => {
    const clock = createTestClock({ now: T0 + 4_000 });
    const { container } = render(
      <EventHeader title="Olympic Hopes 2026" condensed dataAge={<DataAge receivedAt={T0} clock={clock} />} />
    );
    const age = container.querySelector('.csk-event-header__age .csk-data-age')!;
    expect(age).toHaveClass('csk-data-age--compact');
    expect(age.querySelector('.csk-data-age__text')).toHaveTextContent(/^před 4 s$/);
    expect(age).toHaveAttribute('title', 'aktualizováno před 4 s');
  });

  it('puts the data age on the dark tone in both forms (lightened connection dot)', () => {
    const clock = createTestClock({ now: T0 + 4_000 });
    const { container } = render(
      <>
        <EventHeader title="A" dataAge={<DataAge receivedAt={T0} clock={clock} connection="offline" />} />
        <EventHeader title="B" condensed dataAge={<DataAge receivedAt={T0} clock={clock} connection="offline" />} />
      </>
    );
    const slots = container.querySelectorAll('.csk-event-header__age');
    expect(slots).toHaveLength(2);
    for (const slot of slots) expect(slot).toHaveAttribute('data-tone', 'on-dark');
  });

  it('not condensed keeps the default form; an explicit variant wins', () => {
    const clock = createTestClock({ now: T0 + 4_000 });
    const { container } = render(
      <>
        <EventHeader title="A" dataAge={<DataAge receivedAt={T0} clock={clock} />} />
        <EventHeader title="B" condensed dataAge={<DataAge receivedAt={T0} clock={clock} variant="default" />} />
      </>
    );
    const [open, condensedDefault] = container.querySelectorAll('.csk-data-age');
    for (const el of [open, condensedDefault]) {
      expect(el).not.toHaveClass('csk-data-age--compact');
      expect(el.querySelector('.csk-data-age__text')).toHaveTextContent('aktualizováno před 4 s');
    }
  });

  it('a plain text data age is rendered as it is', () => {
    const { container } = render(<EventHeader title="A" condensed dataAge="start za 1 h" />);
    expect(container.querySelector('.csk-event-header__age')).toHaveTextContent('start za 1 h');
  });
});

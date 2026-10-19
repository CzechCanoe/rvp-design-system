import { createTestClock } from '../../clock';
import { DataAge } from '../../components/DataAge';
import { STORY_NOW } from '../../components/ResultsTable/ResultsTable.fixtures';

/** One fixed clock for the page stories (2026-10-04 15:24:45 Europe/Prague): nothing ticks in screenshots. */
export const liveClock = createTestClock({ now: STORY_NOW });
export { STORY_NOW };

/** „Aktualizováno před N s“ on the fixed clock. */
export const ageAt = (secondsAgo: number) => <DataAge receivedAt={STORY_NOW - secondsAgo * 1000} clock={liveClock} />;

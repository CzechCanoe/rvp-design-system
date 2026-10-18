import type { test as base } from '@playwright/test';
import { QUARANTINE } from './config';

/** Key = describe blocks + test title joined by ' › ' (the leading file entry is dropped). */
export function quarantineKey(titlePath: string[]): string {
  return titlePath.slice(1).join(' › ');
}

/**
 * Registers a beforeEach hook that marks tests listed in QUARANTINE as fixme
 * (skipped, reason shown in the report). Call once per spec file.
 */
export function applyQuarantine(test: typeof base): void {
  test.beforeEach(({}, testInfo) => {
    const entry = QUARANTINE[quarantineKey(testInfo.titlePath)];
    test.fixme(Boolean(entry), entry ? `[${entry.owner}] ${entry.reason}` : '');
  });
}

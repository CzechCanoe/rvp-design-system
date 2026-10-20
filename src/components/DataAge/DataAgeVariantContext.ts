import { createContext } from 'react';

/** Form of the data age: `default` „aktualizováno před 4 s“, `compact` dot + „před 4 s“. */
export type DataAgeVariant = 'default' | 'compact';

/**
 * Variant for every `DataAge` below that has no `variant` prop of its own.
 * Internal: `EventHeader condensed` provides `compact`, so its data age slot stays short. Not exported from the package.
 */
export const DataAgeVariantContext = createContext<DataAgeVariant | undefined>(undefined);

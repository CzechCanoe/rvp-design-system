/**
 * Observation envelope for values that come from the outside world
 * (c123 contract, CONTRACTS §1.2), reduced to what the design system renders.
 *
 * The contract's own `Observed<T>` (with `observedAt`, `source`, `confidence`)
 * is assignable to this type, so applications pass contract values through
 * unchanged. Three states, never conflated:
 * - `known` – a real value; `0` is a real zero, not "missing".
 * - `not-yet` – the fact does not exist yet.
 * - `unavailable` – nothing can supply it; rendered exactly like `not-yet`
 *   ("not known"). Only a column/field that is `not-applicable` may be hidden,
 *   and that is the application's decision.
 */
export type UnavailableReason = 'not-configured' | 'source-unreachable' | 'not-applicable';

export type Observed<T> =
  | { state: 'known'; value: T; provisional?: boolean }
  | { state: 'not-yet' }
  | { state: 'unavailable'; reason?: UnavailableReason };

export type ObservedState = Observed<unknown>['state'];

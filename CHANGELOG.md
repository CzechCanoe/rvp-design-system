# Changelog

## [2.0.0](https://github.com/CzechCanoe/rvp-design-system/compare/v1.2.0...v2.0.0) (2026-10-23)


### ⚠ BREAKING CHANGES

* LiveIndicator and its types (LiveIndicatorProps, LiveIndicatorVariant, LiveIndicatorSize, LiveIndicatorColor) are removed; use StatusBadge state="live".
* removed exports MainNav (Navigation), HeroSection, HeroActionButton, SectionHeader, StatsBar, StatCard, ActionCard, AthleteCard, ListItem, ResultItem, PodiumCard, DateBadge and their types.
* ResultsTable props are replaced: results/ResultEntry (run1Time, run2Time, status, ...), variant, styleVariant, size, section, show* flags, columns/renderCell, onRowClick, stickyHeader, loading and energyHighlights are removed; use rows: ResultRow[], columns, density, expandedId, onToggle, renderDetail, onFavoriteChange, labels. RunDetailModal and its types (AthleteRunDetail, RunDetail data type, GatePenalty) are removed; RunDetail is now a component (inline detail). CSS: .csk-results-table-wrapper is gone, .csk-results-table is the container and .csk-results-table__table the table.
* Header variants are now site | satellite | app (default, elevated, gradient removed); props size, bordered, blurOnScroll, scrollThreshold removed. PageLayout variants are tribuna | urad | embed (was standalone | satellite | embed), new slots banner and bottomBar. Breadcrumbs moved out of Navigation (same export).
* v2 T4 – Button, Card, Badge, Tabs, Pills, SearchInput, Avatar (verdikt U) ([#56](https://github.com/CzechCanoe/rvp-design-system/issues/56))
* v2 T3 – token codemod and retokenized base components ([#47](https://github.com/CzechCanoe/rvp-design-system/issues/47))
* Inter and JetBrains Mono are replaced by Barlow Semi Condensed and IBM Plex.
* all 1.x CSS custom properties (--color-*, --spacing-*, --text-*, --radius-*, --shadow-*, --gradient-*, ...) are removed in favour of --csk-* tokens. ThemeProvider no longer accepts defaultMode/modeStorageKey, useTheme() no longer returns mode/setMode/toggleMode/toggleTheme, the DisplayMode type is removed and ColorTheme no longer includes 'dark'. Components keep referencing 1.x tokens until the T3 codemod.

### Features

* v2 T1 – new --csk-* token system ([#44](https://github.com/CzechCanoe/rvp-design-system/issues/44)) ([5b6a64e](https://github.com/CzechCanoe/rvp-design-system/commit/5b6a64e78be64d66975b6ed176502ff487935323))
* v2 T10 – OnCoursePanel + OnCourseRider ([#67](https://github.com/CzechCanoe/rvp-design-system/issues/67)) ([8c8c37b](https://github.com/CzechCanoe/rvp-design-system/commit/8c8c37b5d9068db1816d44e3e162f93e464dee65))
* v2 T11 – StartlistTable + ProgramList ([#65](https://github.com/CzechCanoe/rvp-design-system/issues/65)) ([aa2587b](https://github.com/CzechCanoe/rvp-design-system/commit/aa2587b4c1cd15b32aa394c5d9c153076db44ae2))
* v2 T12 – Page stories Live ([#71](https://github.com/CzechCanoe/rvp-design-system/issues/71)) ([be6df08](https://github.com/CzechCanoe/rvp-design-system/commit/be6df081af70e74148235669ac6531f0e8083eac))
* v2 T13 – WeekendCalendar + DeadlineBadge ([#79](https://github.com/CzechCanoe/rvp-design-system/issues/79)) ([90a5c49](https://github.com/CzechCanoe/rvp-design-system/commit/90a5c499ff87c865e86dee2a2d54e5bf5dbc3809))
* v2 T14 – EntryTable + ProposalList + SummaryCard ([#80](https://github.com/CzechCanoe/rvp-design-system/issues/80)) ([4164705](https://github.com/CzechCanoe/rvp-design-system/commit/41647051235d95590f2e4c0f1db4edf74b7c2f16))
* v2 T15 – ProfileHeader, SeasonSparkline, RivalsList + Athlete stories ([#78](https://github.com/CzechCanoe/rvp-design-system/issues/78)) ([84a42ae](https://github.com/CzechCanoe/rvp-design-system/commit/84a42aeab785edb75324260ebe4d8835d8ce1b6d))
* v2 T16 – Event/Detail page story ([#77](https://github.com/CzechCanoe/rvp-design-system/issues/77)) ([54d551a](https://github.com/CzechCanoe/rvp-design-system/commit/54d551a4491b08367fc838181c5a113c655dbf84))
* v2 T17a – remove 1.x components, prototypes and legacy test variants ([#69](https://github.com/CzechCanoe/rvp-design-system/issues/69)) ([8324690](https://github.com/CzechCanoe/rvp-design-system/commit/83246903b4658a25a5f1170d08961a5a8d329690))
* v2 T19 – EventHeader min-height, condensed token, TableToolbar detailToggle, Dropdown pill ([#94](https://github.com/CzechCanoe/rvp-design-system/issues/94)) ([95cd9d2](https://github.com/CzechCanoe/rvp-design-system/commit/95cd9d22441e8897aaee340942e4eb1a7b4096af))
* v2 T19a – gate chips, time format, marks, data age; remove LiveIndicator ([#89](https://github.com/CzechCanoe/rvp-design-system/issues/89)) ([af0cec4](https://github.com/CzechCanoe/rvp-design-system/commit/af0cec473125f0c53ba9982b52290116c71e3241))
* v2 T19b – Button link form, DocumentList, ResultsPanel, EventHeader width ([#90](https://github.com/CzechCanoe/rvp-design-system/issues/90)) ([6de8fcb](https://github.com/CzechCanoe/rvp-design-system/commit/6de8fcbd7416533c26b222a6ad15bd5d57dd8695))
* v2 T19z – ink-3 contrast token, as-built docs for T19, full browser run ([#91](https://github.com/CzechCanoe/rvp-design-system/issues/91)) ([1acd973](https://github.com/CzechCanoe/rvp-design-system/commit/1acd973b56245107ec97c5747f6260782a8ab8a1))
* v2 T2 – Barlow Semi Condensed + IBM Plex fonts ([#46](https://github.com/CzechCanoe/rvp-design-system/issues/46)) ([50f4c90](https://github.com/CzechCanoe/rvp-design-system/commit/50f4c90c03b7e95de2e6f3a00d0d53e38e0180b2))
* v2 T3 – token codemod and retokenized base components ([#47](https://github.com/CzechCanoe/rvp-design-system/issues/47)) ([249b996](https://github.com/CzechCanoe/rvp-design-system/commit/249b99602fca1c29fbabbbce49139e684f94805e))
* v2 T4 – Button, Card, Badge, Tabs, Pills, SearchInput, Avatar (verdikt U) ([#56](https://github.com/CzechCanoe/rvp-design-system/issues/56)) ([6c5588d](https://github.com/CzechCanoe/rvp-design-system/commit/6c5588d7ec37b565fafb2c3281389becb8a90495))
* v2 T5 - StatusBadge, MarkBadge, PenaltyChip, GateGrid, BibBadge, Notice, StatTile ([#55](https://github.com/CzechCanoe/rvp-design-system/issues/55)) ([79b6447](https://github.com/CzechCanoe/rvp-design-system/commit/79b6447e54e9a67a205d82b3b3c82008ad5106a7))
* v2 T6 – TimeValue, RunningTime, DataAge, Clock ([#57](https://github.com/CzechCanoe/rvp-design-system/issues/57)) ([361c790](https://github.com/CzechCanoe/rvp-design-system/commit/361c790d9773ec21549b146bc3186bc182ba834b))
* v2 T7 – SegmentedControl, StarButton, FavoritesToggle, TableToolbar ([#54](https://github.com/CzechCanoe/rvp-design-system/issues/54)) ([1c30e66](https://github.com/CzechCanoe/rvp-design-system/commit/1c30e667c788f5420bb0b375d3206388dd9d5325))
* v2 T8 – Header, Subbar, Breadcrumbs, PageTitle, BottomBar, EventHeader, PageLayout ([#58](https://github.com/CzechCanoe/rvp-design-system/issues/58)) ([7eb4657](https://github.com/CzechCanoe/rvp-design-system/commit/7eb46575814400b4e16358c7bb1d012c21ef8707))
* v2 T9 – ResultsTable v2 + RunDetail ([#64](https://github.com/CzechCanoe/rvp-design-system/issues/64)) ([a68544d](https://github.com/CzechCanoe/rvp-design-system/commit/a68544d6e5ec3228c96102bdf7b418db1850e75c))


### Bug Fixes

* cross-browser failures before 2.0.0 ([#95](https://github.com/CzechCanoe/rvp-design-system/issues/95)) ([29f6e51](https://github.com/CzechCanoe/rvp-design-system/commit/29f6e51debda45fae8caaa04194d84c9b8e890a2))
* EventHeader page gutter and compact DataAge in condensed mode ([#93](https://github.com/CzechCanoe/rvp-design-system/issues/93)) ([a423068](https://github.com/CzechCanoe/rvp-design-system/commit/a4230683f6f1c058dacf1f083856ba60ba51557a))
* keyboard-operable sortable Table headers ([#92](https://github.com/CzechCanoe/rvp-design-system/issues/92)) ([1645b99](https://github.com/CzechCanoe/rvp-design-system/commit/1645b992ca5a8f469118f8a649ee650146f23959))
* readable StatusBadge states on the navy EventHeader ([#72](https://github.com/CzechCanoe/rvp-design-system/issues/72)) ([56edb41](https://github.com/CzechCanoe/rvp-design-system/commit/56edb4118c4ed3970a923c60d5d8f297a6f541f1))
* v2 spec gaps – TableToolbar detail switch, PageLayout footer padding, filled star ([#81](https://github.com/CzechCanoe/rvp-design-system/issues/81)) ([861b782](https://github.com/CzechCanoe/rvp-design-system/commit/861b782a300c472a3b6b3aecd4264bef571bd81b))
* v2 T19c – keyboard-focusable Table scroll region on mobile ([#88](https://github.com/CzechCanoe/rvp-design-system/issues/88)) ([4f9465a](https://github.com/CzechCanoe/rvp-design-system/commit/4f9465a22c0f04c5ae0995b8d403cff77783d494))
* v2 T9 follow-ups – row memo, scoped overrides, pending penalty ([#66](https://github.com/CzechCanoe/rvp-design-system/issues/66)) ([ed9f801](https://github.com/CzechCanoe/rvp-design-system/commit/ed9f8013e986214fcd6198a16fb7ac5e246dc6b2))


### Documentation

* v2 live-mini migration patch for M5 ([#96](https://github.com/CzechCanoe/rvp-design-system/issues/96)) ([4c121dd](https://github.com/CzechCanoe/rvp-design-system/commit/4c121dd20621ff1ad8e9a8553a1a05954c9fdd8f))

## [1.2.0](https://github.com/CzechCanoe/rvp-design-system/compare/v1.1.1...v1.2.0) (2026-06-03)


### Features

* add React 19 support, update peer dependencies to ^18 || ^19 ([#6](https://github.com/CzechCanoe/rvp-design-system/issues/6)) ([c851be9](https://github.com/CzechCanoe/rvp-design-system/commit/c851be9115b90d5f3e3e00c534c44194108aa566))

## [1.1.1](https://github.com/CzechCanoe/rvp-design-system/compare/v1.1.0...v1.1.1) (2026-04-22)


### Bug Fixes

* **inputs:** prevent iOS Safari zoom on input focus ([#3](https://github.com/CzechCanoe/rvp-design-system/issues/3)) ([95a55f0](https://github.com/CzechCanoe/rvp-design-system/commit/95a55f0d233d1fadd5d6a9c13d964cebf0b7121c))

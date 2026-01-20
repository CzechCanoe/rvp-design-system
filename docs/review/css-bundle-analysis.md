# CSS Bundle Analysis

**Date:** 2026-01-20
**Phase:** 7.10 Finální polish - Performance check

## Summary

| Metric | Value |
|--------|-------|
| Source CSS files | 46 |
| Source total | 554.4 KB |
| Production bundle | 221.44 KB |
| Gzipped | 26.51 KB |
| Minification ratio | 40% |

## Bundle Breakdown

| Category | Size | % of total |
|----------|------|------------|
| Components | 332.1 KB | 60% |
| Prototypes | 131.8 KB | 24% |
| Tokens | 89.9 KB | 16% |

## Largest Files (Top 15)

| File | Size (bytes) | Category |
|------|--------------|----------|
| LivePage.css | 28,133 | Prototype |
| RegistrationPage.css | 27,057 | Prototype |
| DashboardPage.css | 24,412 | Prototype |
| ResultsTable.css | 23,937 | Component |
| AthleteCard.css | 23,188 | Component |
| Calendar.css | 22,668 | Component |
| ResultsPage.css | 20,370 | Prototype |
| Toast.css | 19,341 | Component |
| StatCard.css | 19,184 | Component |
| LiveIndicator.css | 18,951 | Component |
| Navigation.css | 18,579 | Component |
| ProfilePage.css | 18,116 | Prototype |
| colors.css | 17,276 | Tokens |
| CalendarPage.css | 16,896 | Prototype |
| Timeline.css | 13,667 | Component |

## Performance Assessment

### Gzip Size: 26.81 KB

This is **acceptable** for a comprehensive design system with:
- 22 components
- 6 prototype pages
- Full token system (colors, typography, spacing, shadows, transitions)
- Dark mode support
- Expressive mode variants
- Discipline-specific theming (DV/RY/VT)

### Comparison with Other Libraries

| Library | Gzipped CSS |
|---------|-------------|
| Bootstrap 5 | ~25 KB |
| Tailwind (full) | ~300 KB |
| Material UI (core) | ~30 KB |
| **RVP Design System** | **~27 KB** |

Our bundle is comparable to Bootstrap 5, which is a reasonable size for a full-featured design system.

### Optimization Opportunities

1. **Prototypes not in production bundle** - Currently prototypes are included in stories only, not exported from main index. This is correct behavior.

2. **CSS Custom Properties** - We use CSS variables extensively, which compresses well with gzip due to repetition.

3. **Dark mode duplication** - Some CSS is duplicated for dark mode. This is acceptable for maintainability.

4. **Potential tree-shaking** - If consumers only need specific components, they could import CSS per-component in the future.

## Build Warnings

**Status: FIXED**

Previously, the build showed CSS syntax warnings from invalid `@media` blocks without conditions:
```
Expected identifier but found ":" [css-syntax-error]
```

**Root cause:** Leftover code from automatic dark mode implementation that was replaced with explicit `[data-theme='dark']` selectors.

**Fixed files:**
- Progress.css - removed invalid @media block
- Avatar.css - removed invalid @media block
- Dropzone.css - removed invalid @media block
- Timeline.css - removed invalid @media block

**Result:** Build now completes without CSS warnings, and bundle size reduced by ~3 KB.

## Recommendations

1. **No immediate optimization needed** - 26.5 KB gzipped is acceptable
2. **Monitor size** - Set a budget of 35 KB gzipped for future additions
3. **Consider per-component CSS imports** - For applications needing only subset of components

## Conclusion

The CSS bundle size is **within acceptable limits** for a production design system. The gzipped size of 26.51 KB provides good value for the comprehensive feature set delivered.

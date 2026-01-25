#!/bin/bash

# More detailed CSS audit - looks for classes that are only referenced in CSS, not TSX

cd "$(dirname "$0")/.."

echo "=== Detailed CSS Audit ==="
echo ""

# Find CSS classes that appear ONLY in CSS selectors (as child selectors)
# These might be orphaned if their parent is never applied

echo "Looking for potentially orphaned child selectors..."
echo ""

# Extract all base class names from CSS (the main selector, not children)
# e.g., .csk-button becomes csk-button, but .csk-button .child stays as child

# Classes used directly in className attributes (exact matches)
echo "Extracting classes directly used in className..."
grep -rohE 'className="[^"]*"' src/ 2>/dev/null | \
    grep -oE '[a-zA-Z][a-zA-Z0-9_-]*' | \
    sort -u > scripts/audit-output/direct-classnames.txt

echo "Direct className classes: $(wc -l < scripts/audit-output/direct-classnames.txt)"

# Classes computed via template literals or cn()
echo ""
echo "Checking for dynamic class patterns..."
grep -rohE "csk-[a-zA-Z0-9_-]+" src/*.tsx src/**/*.tsx 2>/dev/null | sort -u | head -20

echo ""
echo "=== Checking specific potential dead patterns ==="

# Check for old variant names that might have been removed
echo ""
echo "Old variant patterns to check:"
patterns=(
    "csk-button--glass"
    "csk-card--glass"
    "csk-badge--glass"
    "csk-badge--gradient"
    "csk-button--gradient-"
    "csk-tabs--line"
    "csk-tabs--pills"
    "csk-card--gradient"
)

for pattern in "${patterns[@]}"; do
    css_count=$(grep -r "$pattern" src/ --include="*.css" 2>/dev/null | wc -l)
    tsx_count=$(grep -r "$pattern" src/ --include="*.tsx" 2>/dev/null | wc -l)
    if [ "$css_count" -gt 0 ] && [ "$tsx_count" -eq 0 ]; then
        echo "  POTENTIAL DEAD: $pattern (CSS: $css_count, TSX: $tsx_count)"
    fi
done

echo ""
echo "=== Size Analysis ==="
echo ""
echo "Component CSS files by size (largest first):"
find src/components -name "*.css" -exec wc -l {} \; | sort -rn | head -10

echo ""
echo "Prototype CSS files by size (largest first):"
find src/prototypes -name "*.css" -exec wc -l {} \; | sort -rn | head -10

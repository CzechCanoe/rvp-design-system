#!/bin/bash

# Find potentially duplicated CSS declarations across files

echo "=== Looking for potential CSS duplication ==="
echo ""

# Common utility patterns that might be duplicated
patterns=(
    "display: flex"
    "display: grid"
    "position: absolute"
    "position: relative"
    "border-radius: var(--radius"
    "transition:"
    "animation:"
)

for pattern in "${patterns[@]}"; do
    count=$(grep -r "$pattern" src/components/*.css src/tokens/*.css 2>/dev/null | wc -l)
    if [ "$count" -gt 50 ]; then
        echo "  '$pattern': $count occurrences (might be extractable to utility)"
    fi
done

echo ""
echo "=== Checking for @keyframes definitions ==="
echo "Component keyframes:"
grep -r "@keyframes" src/components --include="*.css" -l 2>/dev/null | while read file; do
    kf_count=$(grep -c "@keyframes" "$file")
    echo "  $file: $kf_count keyframes"
done

echo ""
echo "Prototype keyframes (should be minimal):"
grep -r "@keyframes" src/prototypes --include="*.css" -l 2>/dev/null | while read file; do
    kf_count=$(grep -c "@keyframes" "$file")
    echo "  $file: $kf_count keyframes"
done

echo ""
echo "=== Token files analysis ==="
for file in src/tokens/*.css; do
    lines=$(wc -l < "$file")
    vars=$(grep -c "^  --" "$file" 2>/dev/null || echo 0)
    echo "  $(basename $file): $lines lines, ~$vars CSS vars"
done

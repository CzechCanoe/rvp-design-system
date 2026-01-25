#!/bin/bash

# Dead CSS Audit Script
# Extracts CSS class selectors and checks for usage in TSX files

cd "$(dirname "$0")/.."

OUTPUT_DIR="scripts/audit-output"
mkdir -p "$OUTPUT_DIR"

echo "=== Dead CSS Audit ==="
echo ""

# 1. Extract all CSS class selectors from component CSS
echo "Extracting CSS classes from components..."
find src/components -name "*.css" -exec grep -oh '\.[a-zA-Z_-][a-zA-Z0-9_-]*' {} \; 2>/dev/null | \
    sed 's/^\.//' | \
    sort -u > "$OUTPUT_DIR/component-css-classes.txt"

# 2. Extract all CSS class selectors from prototype CSS
echo "Extracting CSS classes from prototypes..."
find src/prototypes -name "*.css" -exec grep -oh '\.[a-zA-Z_-][a-zA-Z0-9_-]*' {} \; 2>/dev/null | \
    sed 's/^\.//' | \
    sort -u > "$OUTPUT_DIR/prototype-css-classes.txt"

# 3. Extract all CSS class selectors from token CSS
echo "Extracting CSS classes from tokens..."
find src/tokens -name "*.css" -exec grep -oh '\.[a-zA-Z_-][a-zA-Z0-9_-]*' {} \; 2>/dev/null | \
    sed 's/^\.//' | \
    sort -u > "$OUTPUT_DIR/token-css-classes.txt"

# 4. Extract className usage from TSX files
echo "Extracting className usage from TSX..."
find src -name "*.tsx" -exec grep -ohE 'className[=:]"[^"]*"|className[=:]\{[^}]*\}' {} \; 2>/dev/null | \
    grep -oE '[a-zA-Z_-][a-zA-Z0-9_-]*' | \
    sort -u > "$OUTPUT_DIR/tsx-classnames.txt"

# 5. Also extract string literals that might be class names
find src -name "*.tsx" -exec grep -ohE "'[a-zA-Z_-][a-zA-Z0-9_-]*'" {} \; 2>/dev/null | \
    sed "s/'//g" | \
    sort -u >> "$OUTPUT_DIR/tsx-classnames.txt"

# Remove duplicates
sort -u "$OUTPUT_DIR/tsx-classnames.txt" -o "$OUTPUT_DIR/tsx-classnames.txt"

echo ""
echo "=== Component CSS Analysis ==="
echo "Total component CSS classes: $(wc -l < "$OUTPUT_DIR/component-css-classes.txt")"

# Filter csk-prefixed classes only
grep -E '^csk-' "$OUTPUT_DIR/component-css-classes.txt" > "$OUTPUT_DIR/csk-component-classes.txt"
echo "CSK-prefixed classes: $(wc -l < "$OUTPUT_DIR/csk-component-classes.txt")"

# Find unused csk- classes
UNUSED_COUNT=0
> "$OUTPUT_DIR/unused-component-classes.txt"
while read -r class; do
    # Check if class is used in any TSX file (broader search)
    if ! grep -rq "$class" src/; then
        echo "$class" >> "$OUTPUT_DIR/unused-component-classes.txt"
        ((UNUSED_COUNT++))
    fi
done < "$OUTPUT_DIR/csk-component-classes.txt"

echo "Potentially unused: $UNUSED_COUNT"

echo ""
echo "=== Prototype CSS Analysis ==="
echo "Total prototype CSS classes: $(wc -l < "$OUTPUT_DIR/prototype-css-classes.txt")"

# Check prototype-specific classes
grep -E '^(athlete-|club-|calendar-|event-|live-|results-|ranking-|registration-|profile-|dashboard-)' "$OUTPUT_DIR/prototype-css-classes.txt" > "$OUTPUT_DIR/prototype-specific-classes.txt"
echo "Prototype-specific classes: $(wc -l < "$OUTPUT_DIR/prototype-specific-classes.txt")"

> "$OUTPUT_DIR/unused-prototype-classes.txt"
UNUSED_PROTO=0
while read -r class; do
    if ! grep -rq "$class" src/prototypes/; then
        echo "$class" >> "$OUTPUT_DIR/unused-prototype-classes.txt"
        ((UNUSED_PROTO++))
    fi
done < "$OUTPUT_DIR/prototype-specific-classes.txt"

echo "Potentially unused: $UNUSED_PROTO"

echo ""
echo "=== Token CSS Analysis ==="
echo "Total token CSS classes: $(wc -l < "$OUTPUT_DIR/token-css-classes.txt")"
grep -E '^csk-' "$OUTPUT_DIR/token-css-classes.txt" > "$OUTPUT_DIR/csk-token-classes.txt"
echo "CSK-prefixed token classes: $(wc -l < "$OUTPUT_DIR/csk-token-classes.txt")"

> "$OUTPUT_DIR/unused-token-classes.txt"
UNUSED_TOKEN=0
while read -r class; do
    if ! grep -rq "$class" src/; then
        echo "$class" >> "$OUTPUT_DIR/unused-token-classes.txt"
        ((UNUSED_TOKEN++))
    fi
done < "$OUTPUT_DIR/csk-token-classes.txt"

echo "Potentially unused token classes: $UNUSED_TOKEN"

echo ""
echo "=== Summary ==="
echo "Files saved to: $OUTPUT_DIR/"
echo ""
echo "Review these files:"
echo "  - unused-component-classes.txt"
echo "  - unused-prototype-classes.txt"
echo "  - unused-token-classes.txt"

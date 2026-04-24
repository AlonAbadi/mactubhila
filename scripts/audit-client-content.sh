#!/bin/bash
# Run from project root: bash scripts/audit-client-content.sh [OLD_CLIENT_NAME]
# Checks for TODO placeholders and optionally for leftover old-client content.

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PASS=0
FAIL=0

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  BeeGood Template — Content Audit"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# ── 1. TypeScript check ──────────────────────────────────────────
echo ""
echo "▶ TypeScript"
TS_ERRORS=$(cd "$ROOT" && npx tsc --noEmit 2>&1 | grep "error TS" | grep -v ".next" | wc -l | tr -d ' ')
if [ "$TS_ERRORS" -eq 0 ]; then
  echo "  ✅ Zero TypeScript errors"
  PASS=$((PASS+1))
else
  echo "  ❌ $TS_ERRORS TypeScript error(s):"
  cd "$ROOT" && npx tsc --noEmit 2>&1 | grep "error TS" | grep -v ".next" | head -20
  FAIL=$((FAIL+1))
fi

# ── 2. TODO placeholders in pages ───────────────────────────────
echo ""
echo "▶ TODO placeholders in pages"
TODO_FILES=$(grep -rl "TODO:" "$ROOT/app" "$ROOT/components/landing" "$ROOT/lib/quiz-narrative.ts" "$ROOT/lib/quiz-config.ts" --include="*.tsx" --include="*.ts" 2>/dev/null | wc -l | tr -d ' ')
if [ "$TODO_FILES" -eq 0 ]; then
  echo "  ✅ No TODO placeholders found"
  PASS=$((PASS+1))
else
  echo "  ⚠️  $TODO_FILES file(s) with TODO placeholders (expected before content is filled):"
  grep -rl "TODO:" "$ROOT/app" "$ROOT/components/landing" "$ROOT/lib/quiz-narrative.ts" "$ROOT/lib/quiz-config.ts" --include="*.tsx" --include="*.ts" 2>/dev/null | sed "s|$ROOT/||"
  # Not a FAIL — TODOs are expected until content is filled in
fi

# ── 3. Check for old-client content (optional) ──────────────────
OLD_CLIENT="${1:-}"
if [ -n "$OLD_CLIENT" ]; then
  echo ""
  echo "▶ Old-client references to '${OLD_CLIENT}'"
  OLD_HITS=$(grep -rn "$OLD_CLIENT" "$ROOT/app" "$ROOT/components" "$ROOT/lib" --include="*.tsx" --include="*.ts" 2>/dev/null | grep -v ".next" | wc -l | tr -d ' ')
  if [ "$OLD_HITS" -eq 0 ]; then
    echo "  ✅ No references to '${OLD_CLIENT}' found"
    PASS=$((PASS+1))
  else
    echo "  ❌ $OLD_HITS reference(s) to old client '${OLD_CLIENT}':"
    grep -rn "$OLD_CLIENT" "$ROOT/app" "$ROOT/components" "$ROOT/lib" --include="*.tsx" --include="*.ts" 2>/dev/null | grep -v ".next" | head -20
    FAIL=$((FAIL+1))
  fi
fi

# ── 4. Check for missing required images ────────────────────────
echo ""
echo "▶ Required images in public/"
REQUIRED_IMAGES=("og-image.jpg" "favicon.ico")
for img in "${REQUIRED_IMAGES[@]}"; do
  if [ -f "$ROOT/public/$img" ]; then
    echo "  ✅ $img"
    PASS=$((PASS+1))
  else
    echo "  ❌ Missing: $img"
    FAIL=$((FAIL+1))
  fi
done

# ── Summary ──────────────────────────────────────────────────────
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Results: ✅ $PASS passed  |  ❌ $FAIL failed"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ "$FAIL" -gt 0 ]; then
  exit 1
fi

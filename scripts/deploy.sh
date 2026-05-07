#!/usr/bin/env bash
# Build and force-push to gh-pages branch on origin.
# Usage: ./scripts/deploy.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

REPO_NAME="$(basename -s .git "$(git config --get remote.origin.url)")"
BASE_PATH="/${REPO_NAME}/"

echo "▶ Building with VITE_BASE=$BASE_PATH"
VITE_BASE="$BASE_PATH" npm run build

echo "▶ Adding SPA 404 fallback and Jekyll bypass"
cp dist/index.html dist/404.html
touch dist/.nojekyll

echo "▶ Force-pushing dist/ to gh-pages"
REMOTE_URL="$(git config --get remote.origin.url)"
GIT_USER_EMAIL="$(git config --get user.email || echo deploy@local)"
GIT_USER_NAME="$(git config --get user.name || echo deploy)"

WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT
cp -R dist/. "$WORK/"
cd "$WORK"
git init -b gh-pages -q
git add -A
git -c user.email="$GIT_USER_EMAIL" -c user.name="$GIT_USER_NAME" commit -q -m "Deploy $(date -u +%Y-%m-%dT%H:%M:%SZ)"
git remote add origin "$REMOTE_URL"
git push -f origin gh-pages

OWNER="$(echo "$REMOTE_URL" | sed -E 's#.*[:/]([^/]+)/[^/]+#\1#')"
echo
echo "✓ Deployed."
echo "  https://${OWNER}.github.io/${REPO_NAME}/"

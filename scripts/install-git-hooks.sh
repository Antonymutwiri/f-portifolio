#!/bin/sh
# Install repository Git hooks from .githooks directory into .git/hooks
set -e

REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
HOOKS_DIR="$REPO_ROOT/.githooks"
GIT_HOOKS_DIR="$REPO_ROOT/.git/hooks"

if [ ! -d "$HOOKS_DIR" ]; then
  echo "No .githooks directory found; nothing to install."
  exit 0
fi

echo "Installing git hooks from $HOOKS_DIR to $GIT_HOOKS_DIR"

for hook in "$HOOKS_DIR"/*; do
  hookname=$(basename "$hook")
  dest="$GIT_HOOKS_DIR/$hookname"
  echo " - Installing $hookname"
  cp "$hook" "$dest"
  chmod +x "$dest"
done

echo "Hooks installed."

#!/bin/sh
set -e

TARGET="${1:-out}"

if [ ! -d "$TARGET" ]; then
  echo "Directory not found: $TARGET" >&2
  exit 1
fi

find "$TARGET" -type d -exec chmod 755 {} +
find "$TARGET" -type f -exec chmod 644 {} +

echo "Permissions set: directories 755, files 644 in $TARGET"

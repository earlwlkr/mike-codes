#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECTS_FILE="$SCRIPT_DIR/../lib/projects.ts"

if [ ! -f "$PROJECTS_FILE" ]; then
  echo "Error: $PROJECTS_FILE not found"
  exit 1
fi

if ! command -v vercel &>/dev/null; then
  echo "Error: vercel CLI not found"
  exit 1
fi

echo "Fetching latest deployment timestamps from Vercel..."

projects=$(grep -o 'vercelProject: "[^"]*"' "$PROJECTS_FILE" | sed 's/vercelProject: "//;s/"//')

updated=0
failed=0
unchanged=0

while IFS= read -r project; do
  [ -z "$project" ] && continue

  echo -n "  $project... "

  utc_ts=$(vercel list "$project" -F json -y 2>/dev/null | node -e "
    let data = '';
    process.stdin.on('data', c => data += c);
    process.stdin.on('end', () => {
      const d = JSON.parse(data);
      if (d.deployments && d.deployments.length > 0) {
        console.log(new Date(d.deployments[0].createdAt).toISOString());
      }
    });
  " 2>/dev/null) || true

  if [ -z "$utc_ts" ]; then
    echo "FAILED"
    failed=$((failed + 1))
    continue
  fi

  local_ts=$(node -e "
    const d = new Date('$utc_ts');
    const offset = 7 * 60;
    const utc = d.getTime() + d.getTimezoneOffset() * 60000;
    const local = new Date(utc + offset * 60000);
    const pad = n => n.toString().padStart(2, '0');
    console.log(
      local.getFullYear() + '-' +
      pad(local.getMonth() + 1) + '-' +
      pad(local.getDate()) + 'T' +
      pad(local.getHours()) + ':' +
      pad(local.getMinutes()) + ':' +
      pad(local.getSeconds()) + '.' +
      pad(local.getMilliseconds()) + '+07:00'
    );
  ")

  result=$(node -e "
    const fs = require('fs');
    const file = '$PROJECTS_FILE';
    let content = fs.readFileSync(file, 'utf8');
    const newTs = '$local_ts';
    const project = '$project';
    const escaped = project.replace(/[-\/\\^\$*+?.()|[\]{}]/g, '\\\\\$&');
    const regex = new RegExp('(lastUpdatedAt: \")[^\"]*(\"[\\s\\S]*?vercelProject: \"' + escaped + '\")');
    const result = content.replace(regex, '\$1' + newTs + '\$2');
    if (result !== content) {
      fs.writeFileSync(file, result);
      console.log('UPDATED -> ' + newTs);
    } else {
      console.log('NO CHANGE');
    }
  ")

  if echo "$result" | grep -q "UPDATED"; then
    echo "$result"
    updated=$((updated + 1))
  else
    echo "$result"
    unchanged=$((unchanged + 1))
  fi
done <<< "$projects"

echo ""
echo "Done! Updated: $updated, Unchanged: $unchanged, Failed: $failed"

#!/usr/bin/env bash

rm -rf repos
mkdir -p repos

repos=(
    "https://github.com/tailwindlabs/heroicons.git|heroicons"
    "https://github.com/lucide-icons/lucide.git|lucide"
    "https://github.com/FortAwesome/Font-Awesome.git|fontawesome"
)

for repo in "${repos[@]}"; do
  IFS="|" read -r url folder <<< "$repo"

  echo "========================================"
  echo "📦 Downloading: $url"
  echo "📁 Folder: repos/$folder"
  echo "========================================"

  if git clone "$url" "repos/$folder"; then
    echo "✅ Successfully downloaded: $folder"
  else
    echo "❌ Failed to download: $folder"
  fi

  echo
done

echo "🎉 All repositories processed!"
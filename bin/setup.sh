#!/bin/bash
set -e

echo "==> Installing submodules (if necessary)..."
git submodule update --init --recursive
echo "==> Updating submodules..."
git submodule update --remote --merge
echo "==> Removing lib for fresh python deps fetch..."
rm -rf lib/
echo "==> Fetching python deps..."
pip install --upgrade -t lib -r requirements.txt

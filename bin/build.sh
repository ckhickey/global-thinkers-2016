#!/bin/bash
set -e

echo "==> Building 2016..."
cd 2016
npm i
node bin/build.js
rm -rf dist
ng build --prod --base-href /2016/
mkdir dist/app
cp -r src/app/data dist/app
rm -rf dist/app/data/categories_full dist/app/data/entries_full
cp -r static_templates dist
cp -r src/lib dist
sed -i.bak 's#<!-- __CURRENT_VERSION_HASH__ -->#<script>window.CURRENT_VERSION_HASH = {{ h|tojson|safe }};</script>{% include "static_templates/google_analytics.html" %}#' dist/index.html
rm dist/index.html.bak
echo "{}" >> dist/app/data/pages/statistics.json # HACK because stats is hardcoded, oh dear
cd ..

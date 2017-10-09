#!/bin/bash
set -e

ng build # Dev build
mkdir dist/app
cp -r src/app/data dist/app
cp -r src/lib dist
cp src/app/AUTH dist
cp dist/index.html dist/200.html # Surge.sh, https://surge.sh/help/adding-a-200-page-for-client-side-routing
cd dist
surge --domain https://gt16.surge.sh
cd ..

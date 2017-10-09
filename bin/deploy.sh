#!/bin/bash
set -e

# Make sure we're on master
branch=$(git symbolic-ref HEAD | sed -e 's,.*/\(.*\),\1,')
if [ "$branch" != "master" ]; then
  echo "Must be on master branch to deploy. Exiting"
  exit 1
fi

# Last second update...
git pull origin master

# Make sure the repo is "clean"
if [[ -n $(git status --porcelain) ]]; then
  echo "Please commit/track/ignore all changes on master before deploying. Exiting"
  exit 1
fi

# Make sure...
while true; do
  read -p "Deploy? Y/n " yn
  case $yn in
    [Yy]* ) break;;
    [Nn]* ) echo "Cancelled. Exiting"; exit;;
    * ) echo "Please answer Y/n.";;
  esac
done

bin/setup.sh
if [[ -n $(git status --porcelain) ]]; then
  echo "==> Committing and pushing submodule updates..."
  git add .
  git commit -m "~( automated/deploy )~ update submodules"
  git push origin master
fi
bin/build.sh
echo "==> Deploying..."
appcfg.py update .

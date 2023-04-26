#!/usr/bin/env bash

# if [[ $OSTYPE == "darwin"* ]]; then
#   # macOS Terminal
#   node ./src/components/pages/database.js & npm start
# else
  # PowerShell or Bash
  node ./src/components/pages/database.js &
  npm start
# fi

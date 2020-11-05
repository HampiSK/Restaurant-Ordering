#!/bin/bash

# LINTER SCRIPT
# run this script to run prettier script.

red=$(tput setaf 1)
reset=$(tput sgr0)

echo
chmod +x ./linter.sh
echo "=========== ${red} RUNNING LINTER FIX${reset} ==============="
npm run linterf
echo
echo "=========== ${red} RUNNING LINTER CHECK${reset} ============="
npm run linter
echo
echo "=========== ${red} RUNNING GIT ADD${reset} =================="
git add -A .
echo
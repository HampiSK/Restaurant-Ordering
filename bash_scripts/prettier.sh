#!/bin/bash

# PRETTIER SCRIPT
# run this script to run prettier script.

red=$(tput setaf 1)
reset=$(tput sgr0)

echo
chmod +x ./prettier.sh
echo "=========== ${red} RUNNING PRETTIER FORMAT${reset} =========="
npm run format
echo
echo "=========== ${red} RUNNING PRETTIER CHECK${reset} ==========="
npm run prettier
echo
echo "=========== ${red} RUNNING GIT ADD${reset} =================="
git add -A .
echo
#!/bin/sh
nbday=$(date +"%u")
mysql --user=root --password="" -e 'show databases' | while read dbname; do mysqldump --user=root --password="" "$dbname" > "$dbname".sql.$nbday; done

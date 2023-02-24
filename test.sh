#!/bin/bash
MYSQL_ROOT_PASSWORD='123456'
MYSQL_ROOT_USERNAME='root'
MYSQL_USERNAME='jenny2'
MYSQL_PASSWORD='12345678'
MYSQL_DATABASE='testdb'
mysql -u $MYSQL_ROOT_USERNAME -p$MYSQL_ROOT_PASSWORD -h 127.0.0.1 -e "CREATE USER '$MYSQL_USERNAME'@'%' IDENTIFIED BY '$MYSQL_PASSWORD';"
mysql -u $MYSQL_ROOT_USERNAME -p$MYSQL_ROOT_PASSWORD -h 127.0.0.1 -e "GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, FILE, ALTER ON *.* TO '$MYSQL_USERNAME'@'%';"
mysql -u $MYSQL_ROOT_USERNAME -p$MYSQL_ROOT_PASSWORD -h 127.0.0.1 -e "FLUSH PRIVILEGES;"

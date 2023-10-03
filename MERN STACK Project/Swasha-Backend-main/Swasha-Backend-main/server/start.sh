#!/bin/bash
echo "PasswordAuthentication yes" >> /etc/ssh/sshd_config
echo "PermitRootLogin yes" >> /etc/ssh/sshd_config
service ssh start
screen -dm ./exec/meilisearch --master-key 1bofWhPnTqIf-l9VNsJbGzjZEYnRW9zDpHxn3ITOeic --env production
npm run search-sync
npm run db-ping
npm start

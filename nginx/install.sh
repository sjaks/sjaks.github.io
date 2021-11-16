# homepage
# sjaks@github

sudo apt update
sudo apt install -y nginx
sudo apt install -y python3-certbot-nginx

echo "---> Installed Nginx!"

sudo ln -sf /home/sami/homepage/nginx/sjaks.dy.fi /etc/nginx/sites-available/sjaks.dy.fi
sudo ln -sf /etc/nginx/sites-available/sjaks.dy.fi /etc/nginx/sites-enabled/sjaks.dy.fi
sudo rm /etc/nginx/sites-enabled/default
sudo rm /etc/nginx/sites-available/default
sudo rm -rf /var/www/html/
sudo rm /var/log/nginx/access.log*

echo "---> Configured Nginx!"

echo "Enter dy.fi email:"
read dyemail
echo "Enter dy.fi password:"
read dypass

crontab -l | { cat; echo "0 0 * * WED curl -D - --user ${dyemail}:${dypass} https://www.dy.fi/nic/update?hostname=sjaks.dy.fi"; } | crontab -

echo "---> Enabled dyndns for ${dyemail}"

sudo certbot --nginx -d sjaks.dy.fi
sudo certbot renew --dry-run

echo "---> Setup certificates!"

echo "---> Installation done!"
echo "---> Remember to clone other projects into server root and enable them."

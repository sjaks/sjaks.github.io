# homepage
# sjaks@github

sudo apt update
sudo apt install -y nginx
sudo apt install -y python3-certbot-nginx

echo "---> Installed Nginx and Certbot!"

sudo ln -sf /home/sami/homepage/nginx/homepage /etc/nginx/sites-available/homepage
sudo ln -sf /etc/nginx/sites-available/homepage /etc/nginx/sites-enabled/homepage
sudo rm /etc/nginx/sites-enabled/default
sudo rm /etc/nginx/sites-available/default
sudo rm -rf /var/www/html/
sudo rm /var/log/nginx/access.log*

echo "---> Configured Nginx!"

sudo certbot --nginx --non-interactive --agree-tos --redirect -d sjaks.iki.fi -m sami.jakonen@iki.fi
sudo certbot renew --dry-run

echo "---> Setup certificates!"

echo "---> Installation done!"
echo "---> Remember to clone other projects into server root and enable them."

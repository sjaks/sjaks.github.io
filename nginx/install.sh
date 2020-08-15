#       _       _        
#  ___ (_) __ _| | _____  sjaks@github
# / __|| |/ _` | |/ / __| jaks.fi
# \__ \| | (_| |   <\__ \ ------------
# |___// |\__,_|_|\_\___/ jaks.fi
#    |__/                
#
# BRIEF:
# My homepage source code

sudo apt update
sudo apt install -y nginx
sudo apt install -y python3-certbot-nginx

sudo ln -sf /home/sami/jaks.fi/nginx/jaks.fi /etc/nginx/sites-available/jaks.fi
sudo ln -sf /etc/nginx/sites-available/jaks.fi /etc/nginx/sites-enabled/jaks.fi
sudo rm /etc/nginx/sites-enabled/default
sudo rm /etc/nginx/sites-available/default
sudo rm /var/log/nginx/access.log*

sudo mkdir -p /var/www/jaks.fi/
sudo ln -sf /home/sami/jaks.fi/ /var/www/jaks.fi/html

sudo certbot --nginx -d jaks.fi -d www.jaks.fi
sudo certbot renew --dry-run

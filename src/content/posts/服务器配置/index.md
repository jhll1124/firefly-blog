---
title: 服务器配置（Ubuntu）
published: 2025-11-16
updated: 2025-12-28
description: "本文记录 Ubuntu 服务器环境的初始化、常用软件安装、自动化服务配置等步骤。"
image: ""
tags: [server, linux, 服务器, 环境配置]
category: "server"
draft: false
---

# 📋 概述

本文档记录了 Ubuntu 服务器环境的完整配置流程，包括系统初始化、软件安装、服务配置等步骤。

---

# 🌐 中文语言环境配置

```bash
# 安装中文语言包
sudo apt install language-pack-zh-hans language-pack-zh-hans-base

# 设置系统语言环境
sudo update-locale LANG=zh_CN.UTF-8

# 永久生效配置
echo 'export LANG=zh_CN.UTF-8' >> ~/.bashrc
```

---

# ⚙️ 基础系统配置

## APT 软件包管理

```bash
# 安装常用工具
sudo apt install neofetch net-tools p7zip-full

# 移除不必要的预装软件
sudo apt remove cloud-guest-utils landscape-common pollinate \
    ubuntu-pro-client tmux cloud-initramfs-copymods \
    cloud-initramfs-dyn-netconf lxd-agent-loader lxd-installer fwupd

# 系统更新
sudo apt update && sudo apt upgrade -y
sudo apt autoremove -y
```

## 🔐 自动登录配置

:::note
修改系统服务文件启用自动登录功能。
:::

编辑 `/usr/lib/systemd/system/getty@.service`：

```conf
[Service]
ExecStart=-/sbin/agetty --autologin jhll1124 --noclear %I $TERM
```

---

# 🔑 SSH 密钥认证配置

:::tip
配置 SSH 公钥认证以提高安全性和便利性。
:::

```bash
# 将公钥添加到授权密钥文件
mkdir -p ~/.ssh
chmod 700 ~/.ssh
echo "你的公钥内容" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

# 可选：禁用密码登录（仅密钥登录）
sudo nano /etc/ssh/sshd_config
# 修改：PasswordAuthentication no
sudo systemctl restart ssh
```

---

# 💾 存储配置

## 硬盘自动挂载

```bash
# 创建挂载点目录
sudo mkdir /mnt/***
sudo chmod 777 /mnt/*
```

编辑 `/etc/fstab` 添加挂载配置：

```conf
# 数据硬盘挂载
/dev/sda4   /mnt/jhll        ntfs-3g    defaults    0   0
/dev/sda3   /mnt/data        ntfs-3g    defaults    0   0
/dev/sda5   /mnt/ll          ntfs-3g    defaults    0   0
/dev/sda6   /mnt/jhll/ext4   ext4       defaults    0   0

# 内存盘配置（27GB临时存储）
tmpfs       /mnt/tmpfs       tmpfs      defaults,size=27G   0   0
```

---

# 🐚 Shell 环境配置

## Fish Shell 安装配置

```bash
# 安装 Fish Shell
sudo apt install fish

# 设置 Fish 为默认 Shell
chsh -s /usr/bin/fish

# 安全配置
sudo passwd -d jhll1124
```

---

# 🚫 服务优化与禁用

## 禁用不必要的系统服务

```bash
sudo systemctl disable x11-common apache2 netplan-ovs-cleanup cryptdisks-early cryptdisks snapd.apparmor snapd.autoimport snapd.core-fixup snapd.failure snapd.recovery-chooser-trigger snapd.seeded snapd snapd.snap-repair snapd.system-shutdown
sudo systemctl disable snapd.socket
```

## 📊 日志系统优化

:::warning
减少磁盘写入，延长 SSD 寿命。
:::

```bash
# 禁用系统日志服务
sudo systemctl disable rsyslog systemd-journald

# 配置 Journald 不存储日志
sudo nano /etc/systemd/journald.conf
# 修改为：Storage=none

# 清理现有日志
sudo truncate -s 0 /var/log/*
sudo rm -rf /var/log/journal
```

---

# 📁 Server 目录准备

```bash
# 创建服务目录结构
sudo cp -r /path2/server /server
sudo chown -R $(whoami):$(whoami) /server
sudo chmod -R 775 /server
```

---

# 🖼️ Python 图片服务 (RandPic)

## Systemd 服务配置

创建 `/etc/systemd/system/randpic.service`：

```conf
[Unit]
Description=Random Image HTTP Service
After=network.target

[Service]
ExecStart=sudo /usr/bin/python3 /server/RandPic.py
Restart=always
RestartSec=2

[Install]
WantedBy=multi-user.target
```

启用服务：

```bash
sudo systemctl enable randpic
sudo systemctl start randpic
```

---

# 📝 博客服务 (Fuwari 框架)

## 项目初始化

```bash
cd /server
git clone https://github.com/CuteLeaf/Firefly.git
cd Firefly
pnpm install
```

## 使用指令

下列指令均需要在项目根目录执行：

| Command                    | Action                                   |
| -------------------------- | ---------------------------------------- |
| `pnpm install`             | 安装依赖                                 |
| `pnpm dev`                 | 在  `localhost:4321`  启动本地开发服务器 |
| `pnpm build`               | 构建网站至  `./dist/`                    |
| `pnpm preview`             | 本地预览已构建的网站                     |
| `pnpm new-post <filename>` | 创建新文章                               |

---

# 📁 文件列表服务 (Oplist)

## 安装配置

```bash
# 解压安装
tar -zxvf openlist-linux-amd64.tar.gz
sudo mv openlist /usr/local/bin/alist

# 初始化服务
alist server
```

## SSL 证书配置

编辑 `~/data/config.json`：

```json
{
  "cert_file": "/server/cert/server.pem",
  "key_file": "/server/cert/server-key.pem"
}
```

## Systemd 服务配置

创建 `/etc/systemd/system/alist.service`：

```conf
[Unit]
Description=Alist File List Service
After=network.target

[Service]
Type=simple
ExecStart=/usr/bin/sudo alist server
WorkingDirectory=~
Restart=on-failure
User=jhll1124

[Install]
WantedBy=multi-user.target
```

启用服务：

```bash
sudo systemctl enable alist
sudo systemctl start alist
```

---

# 🌐 Caddy Web 服务器配置

## 安装

```bash
sudo apt install caddy
sudo systemctl enable caddy
```

或者使用官方稳定最新版本：

```bash
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy
```

## 站点配置

[Caddy 中文文档](https://caddyserver.com.cn/docs/caddyfile-tutorial) | [原文](https://caddyserver.com/docs/caddyfile-tutorial)

配置文件位置：`/etc/caddy/Caddyfile`，并确保其权限：

```bash
sudo chmod 777 /etc/caddy/Caddyfile
```

临时启动 caddy：

```bash
sudo caddy run --environ --config /etc/caddy/Caddyfile
```

如果要配置 ACME，将 `tls` 块修改为以下配置，通过 DNS 验证网站所有权，此处以 Cloudflare API 为例，**请确保该 API 有更改 DNS 记录的权限：**

```Caddy
    tls {
        dns cloudflare {env.CLOUDFLARE_API_TOKEN}
    }
```

注意，DNS 验证需要：

- 安装带 DNS 插件的 Caddy：

```bash
sudo caddy add-package github.com/caddy-dns/cloudflare
```

- 如果不能安装插件，则需要开放 80 端口，直接删除 `tls` 行，通过 HTTP 验证

:::caution
以下为完整 Caddy 配置，仅供参考，请勿全部照搬，否则后果自负。  
:::

```Caddy
(errors) {
	handle_errors {
		root /server/error
		rewrite /{http.error.status_code}.html
		file_server
	}
}

cialo.site {
	tls /server/cert/cialo.site_bundle.crt /server/cert/cialo.site.key
	root /server/data
	import errors
    encode gzip
    handle /pic/* {
		reverse_proxy http://127.0.0.1:5737
	}
	handle /img/* {
		file_server browse
	}
	handle /html/* {
		file_server browse
	}
	handle /file/* {
		file_server browse
	}
	handle /* {
		error 403
	}
}

https://cialo.site:52011 {
	tls /server/cert/cialo.site_bundle.crt /server/cert/cialo.site.key
	import errors
	reverse_proxy https://127.0.0.1:5201 {
		transport http {
			tls_insecure_skip_verify
		}
	}
}

https://cialo.site:30721 {
	tls /server/cert/cialo.site_bundle.crt /server/cert/cialo.site.key
	import errors
	reverse_proxy http://172.17.0.1:80
}
```

---

# 🔄 动态 DNS 服务 (DDNS-GO)

## 安装部署

```bash
# 解压安装
tar -xvf ddns-go_6.8.0_linux_x86_64.tar.gz
sudo mv ddns-go /usr/local/bin/

# 安装为系统服务
sudo ddns-go -s install
```

---

# 🔒 网络安全配置

## V2Ray 代理服务

```bash
sudo apt install v2ray
sudo cp /path2/config.json /etc/v2ray/config.json
```

## mkcert SSL 证书信任

复制证书到 `/etc/ssl/certs` 或 `/usr/local/share/ca-certificates/` 并执行：

```bash
sudo update-ca-certificates --fresh
```

---

# 🛠️ 系统维护

## 重建 grub-efi

```bash
# 重新安装 GRUB EFI
sudo apt install grub-efi-amd64 grub-efi-amd64-signed grub-common grub2-common
sudo grub-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id=ubuntu
sudo update-grub
```

## 📦 系统备份与恢复

```bash
# 完整系统备份
sudo tar -cvpzf /path2/server-citlali.tar.gz -C /mount .

# 系统恢复
sudo tar -xvpzf /path2/server-citlali.tar.gz -C /mount
```

:::caution
双系统环境下请确保关闭 Windows 快速启动功能，避免文件系统冲突。
:::

---

# ⚠️ 暂不使用服务

## 🌐 Nginx Web 服务器配置

```bash
sudo apt install nginx
sudo systemctl enable nginx
```

配置文件位置：`/etc/nginx/sites-available/default`

:::caution
以下为完整 Nginx 配置，仅供参考，请勿全部照搬，否则后果自负。  
配置较长，可点击展开查看。
:::

<details><summary>点击展开 Nginx 完整配置</summary>

```nginx
server {
    charset utf-8;

    listen 443 ssl http2 default_server;
    listen [::]:443 ssl http2 default_server;

    ssl_certificate /server/cert/cialo.site_bundle.crt;
    ssl_certificate_key /server/cert/cialo.site.key;

    root /server/data;

    index index.html index.htm index.php;

    server_name _;

    error_page 403 /403.html;
    location = /403.html {
        root   /server/error;
    }
    error_page 404 /404.html;
    location = /404.html {
        root   /server/error;
    }

    location ~ \.php$ {
        fastcgi_pass   unix:/run/php/php8.3-fpm.sock;
        fastcgi_index  index.php;
        fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
        include        fastcgi_params;
    }

    location / {
        deny all;
    }

    location /img/ {
        autoindex on;
        autoindex_exact_size off;
        autoindex_localtime on;
    }

    location /html/ {
        autoindex on;
        autoindex_exact_size off;
        autoindex_localtime on;
    }

    location /file/ {
        autoindex on;
        autoindex_exact_size off;
        autoindex_localtime on;
    }
}

server {
    listen 52011 ssl http2;

    ssl_certificate /server/cert/cialo.site_bundle.crt;
    ssl_certificate_key /server/cert/cialo.site.key;

    proxy_buffering off;
    proxy_request_buffering off;

    client_max_body_size 0;

    proxy_connect_timeout 300s;
    proxy_send_timeout 365d;
    proxy_read_timeout 365d;
    send_timeout 365d;

    location / {
        proxy_pass https://127.0.0.1:5201;

        proxy_ssl_verify off;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

server {
    listen 30721 ssl http2;

    ssl_certificate /server/cert/cialo.site_bundle.crt;
    ssl_certificate_key /server/cert/cialo.site.key;

    proxy_buffering off;
    proxy_request_buffering off;

    location / {
        proxy_pass http://172.17.0.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

</details>

<details><summary>点击展开 Nginx 备用注释配置</summary>

综述层

```nginx
# You should look at the following URL's in order to grasp a solid understanding
# of Nginx configuration files in order to fully unleash the power of Nginx.
# https://www.nginx.com/resources/wiki/start/
# https://www.nginx.com/resources/wiki/start/topics/tutorials/config_pitfalls/
# https://wiki.debian.org/Nginx/DirectoryStructure
#
# In most cases, administrators will remove this file from sites-enabled/ and
# leave it as reference inside of sites-available where it will continue to be
# updated by the nginx packaging team.
#
# This file will automatically load configuration files provided by other
# applications, such as Drupal or Wordpress. These applications will be made
# available underneath a path with that package name, such as /drupal8.
#
# Please see /usr/share/doc/nginx-doc/examples/ for more detailed examples.

# Virtual Host configuration for example.com
#
# You can move that to a different file under sites-available/ and symlink that
# to sites-enabled/ to enable it.
#
#server {
#	listen 80;
#	listen [::]:80;
#
#	server_name example.com;
#
#	root /var/www/example.com;
#	index index.html;
#
#	location / {
#		try_files $uri $uri/ =404;
#	}
#}
```

`server` 层

```nginx
    # Note: You should disable gzip for SSL traffic.
    # See: https://bugs.debian.org/773332
    #
    # Read up on ssl_ciphers to ensure a secure configuration.
    # See: https://bugs.debian.org/765782
    #
    # Self signed certs generated by the ssl-cert package
    # Don't use them in a production server!
    #
    # include snippets/snakeoil.conf;

    location / {
        # First attempt to serve request as file, then
        # as directory, then fall back to displaying a 404.
        try_files $uri $uri/ =404;
    }

    # pass PHP scripts to FastCGI server
    #
    #location ~ \.php$ {
    #	include snippets/fastcgi-php.conf;
    #
    #	# With php-fpm (or other unix sockets):
    #	fastcgi_pass unix:/run/php/php7.4-fpm.sock;
    #	# With php-cgi (or other tcp sockets):
    #	fastcgi_pass 127.0.0.1:9000;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #	deny all;
    #}
```

</details>

## 📁 SMB 文件共享服务

> [!WARNING]
> 当前暂不使用 SMB 服务，使用 Windows 自带 SMB 功能

```bash
# 安装 Samba 服务
sudo apt install samba

# 创建专用用户
sudo useradd smbuser
sudo passwd smbuser
sudo systemctl enable smbd
```

SMB 配置文件 `/etc/samba/smb.conf` 内容：

```conf
[global]
   min protocol = SMB2
   max protocol = SMB3

[server]
   path = /mnt
   read only = no
   browsable = yes
   guest ok = yes
   force user = smbuser
```

## 🤖 QQ 机器人服务 (QBot/NapCat)

> [!WARNING]
> 当前暂不使用 QQ 机器人功能

```bash
# 切换到临时文件系统
cd /mnt/tmpfs

# 复制安装包并安装
sudo cp QQ.deb .
sudo bash NapCat-Installer.sh

# 设置权限
sudo chmod -R 775 /opt
```

:::note
WebUI 配置说明  
添加 WebSocket 客户端: [ws://localhost:2536/OneBotv11](ws://localhost:2536/OneBotv11)
:::

## 🐘 PHP 环境支持

> [!WARNING]
> 当前暂不使用 PHP 支持

```bash
# 添加 PHP PPA 仓库
sudo add-apt-repository ppa:ondrej/php
# 按回车确认

# 安装 PHP 和 FPM
sudo apt install php php-fpm

# 配置 PHP
sudo cp /path2/php.ini /etc/php/8.3/cli/php.ini
sudo cp /path2/php.ini /etc/php/8.3/fpm/php.ini

# PHP-FPM 会自动注册为系统服务
systemctl status php8.3-fpm
```

# 📊 服务状态检查

配置完成后，使用以下命令验证服务状态：

```bash
systemctl status randpic fuwari alist nginx ddns-go
```

所有服务应显示为 `active (running)` 状态。

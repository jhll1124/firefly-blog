---
title: WSL 配置
published: 2025-11-16
updated: 2025-11-16
description: "WSL 配置"
image: "./OIP.webp"
tags: [desktop, linux, 环境配置]
category: "linux"
draft: false
---

# Arch 初始化脚本

运行`/usr/lib/wsl/first-setup.sh`

# Pacman 配置

向 `/etc/pacman.d/mirrorlist` 写入镜像源：

```conf
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinux/$repo/os/$arch
```

更新系统与基础工具：

```bash
pacman -Syyu
pacman -S fish
chsh -s /usr/bin/fish
pacman -S neofetch gcc nano gdb git which nmap inetutils llvm sqlmap mkcert btop vim node npm pnpm
```

---

# 编辑 locale 配置（取消注释 zh_CN.UTF-8）

文件位置 `/etc/locale.gen`
取消注释以下行：
`zh_CN.UTF-8` `UTF-8`

生成：

```bash
locale-gen
```

---

# kawaii-gcc 语言包

::github{repo="Bill-Haku/kawaii-gcc"}

下载 [zh-kawaii.mo](https://github.com/Bill-Haku/kawaii-gcc/releases/latest/) 文件

> v0.6.0 缓存：[zh-kawaii.mo](https://r2.cialo.site/zh-kawaii.mo)

重命名为 `gcc.mo` 后放到 `/usr/share/locale/zh_CN/LC_MESSAGES/`

---

# VS Code 软链

```bash
ln -s "/mnt/c/Programs/Microsoft VS Code/bin/code" /usr/bin/code
```

---

# fish 历史与配置软链

```bash
rm /root/.local/share/fish/fish_history
ln -s /mnt/c/Users/jhll1124/Documents/Shell/history.yaml /root/.local/share/fish/fish_history
rm /root/.config/fish/config.fish
ln -s /mnt/c/Users/jhll1124/Documents/Shell/config.fish /root/.config/fish/config.fish
```

---

# Oh My Fish (OMF)

安装：

```bash
curl https://raw.githubusercontent.com/oh-my-fish/oh-my-fish/master/bin/install | fish
```

主题目录：

```bash
cd /root/.local/share/omf/themes
git clone
```

（你可以自行补充仓库地址）

---

# pnpm 中国镜像源

```bash
pnpm config set registry https://registry.npmmirror.com
```

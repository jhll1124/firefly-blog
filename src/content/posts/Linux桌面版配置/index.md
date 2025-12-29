---
title: Linux 桌面版配置
published: 2025-11-16
updated: 2025-12-27
description: "本页记录 Arch Linux 安装后的常用软件、桌面环境配置、fish shell、美化与系统优化设置。"
image: ""
tags: [desktop, linux, 系统配置]
category: "linux"
draft: false
---

# Arch Linux 配置记录

## 基础软件安装

```bash
sudo pacman -S btop gdb pypy pypy3 audacious wine steam gedit mongohud neofetch yay microsoft-edge clash-verge base-devel git
```

---

## 关闭自动更新

（按你的系统环境配置，此处保留说明，可自行补充）

---

## GRUB 设置

:::caution
双系统环境下请确保关闭 Windows 快速启动功能，避免文件系统冲突。
:::

（根据需要补充你的 grub.cfg 或 `/etc/default/grub` 配置）

---

## Fish Shell 与 Oh-My-Fish

### 安装 Oh My Fish

```bash
curl https://raw.githubusvercontent.com/oh-my-fish/oh-my-fish/master/bin/install | fish
```

### 自定义主题

```bash
~/.local/share/omf/themes/
git clone https://github.com/jhll1124/omf-theme ~/.local/share/omf/themes/omf-theme
omf theme omf-theme
```

---

## 证书（Certificates）

（你只写了“证书”，此处保持占位）

---

## GNOME 扩展（Gnome Extensions）

（根据你的实际扩展列表自行添加）

### × 可能无法使用的功能

:::warning
GNOME 功能性缩放（Functional Scaling）可能无法工作：
::github{repo="puxplaying/mutter-x11-scaling"}
:::

---

## 字体目录

系统字体路径：`/usr/share/fonts/`

---

## kawaii-gcc 语言包

::github{repo="Bill-Haku/kawaii-gcc"}

下载 [zh-kawaii.mo](https://github.com/Bill-Haku/kawaii-gcc/releases/latest/) 文件

> v0.6.0 缓存：[zh-kawaii.mo](/object-storage/zh-kawaii.mo)

重命名为 `gcc-14.mo` 后放到 `/usr/share/locale/zh_CN/LC_MESSAGES/`

---

## 默认文件管理器绑定

将 Nautilus 设置为默认目录打开方式：

```bash
xdg-mime default org.gnome.Nautilus.desktop inode/directory
```

---

## 杂项（Notes）

### fish + OMF（补充说明）

```bash
fish
omf greetings
# 用户信息位于 /etc/passwd
```

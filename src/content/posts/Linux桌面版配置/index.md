---
title: Linux 桌面版配置
published: 2026-01-16
updated: 2026-01-16
description: "本页记录 Arch Linux 安装后的系统设置，尤其是 grub。"
image: ""
tags: [desktop, grub, linux, 系统配置]
category: "linux"
draft: false
---

# grub 设置

:::caution
双系统环境下请确保关闭 Windows 快速启动功能，避免文件系统冲突。
:::

配置文件位置：`/etc/default/grub`

:::important
配置文件更改后需执行 `sudo update-grub` 来重建 grub 应用更改。
:::

## 默认启动项

```conf
GRUB_DEFAULT=2
```

表示默认启动菜单中的第 **3** 个条目（从 0 开始计数）。这种方式适合**固定启动目标**的场景，如果系统结构长期稳定，这是最简单直接的做法。具体指定的是哪个启动项需要进入 grub 查看。

## 启动菜单与倒计时

```conf
GRUB_TIMEOUT_STYLE=menu
GRUB_TIMEOUT=3
```

- `menu`：始终显示菜单
- `3` 秒：在可见前提下尽量缩短等待时间

相比 `hidden`，这种方式在多系统或调试内核时更安全，不会因为误判按键时机而错过菜单。

## 内核启动参数

```conf
GRUB_CMDLINE_LINUX_DEFAULT='udev.log_priority=3'
GRUB_CMDLINE_LINUX=""
```

刻意**不使用** `quiet` / `splash`，使启动过程可见，方便定位卡顿或硬件初始化问题

## 主题设置

```conf
GRUB_THEME="/usr/share/grub/themes/Cerydra_cn/theme.txt"
```

使用自定义主题 `Cerydra_cn`，主题本身不影响启动逻辑，只影响展示层。

## 发行版标识

```conf
GRUB_DISTRIBUTOR='Manjaro'
```

用于生成菜单项标题，对功能无影响，仅影响显示文本。

## 分区表支持

```conf
GRUB_PRELOAD_MODULES="part_gpt part_msdos"
```

同时预加载 GPT 与 MBR 模块，避免异常情况。这是一个**低成本但高稳定性**的设置。

## 图形模式

```conf
GRUB_GFXMODE=auto
```

由 GRUB 自动选择分辨率。

## OS 探测

```conf
GRUB_DISABLE_OS_PROBER=false
```

明确启用 `os-prober`，用于自动识别 Windows 和 Linux 发行版。在多系统环境中，这是**必须开启**的选项。

---

# 基础软件安装

```bash
sudo pacman -S btop gdb pypy pypy3 audacious wine steam gedit mongohud neofetch yay microsoft-edge clash-verge base-devel git
```

---

# GNOME 扩展（Gnome Extensions）

- **Dash to Dock** — _by michele_g_

  提供独立 Dock，用于应用启动与窗口切换。

- **Dash to Panel** — _by charlesg99_

  将 Dash 合并进顶栏，形成传统任务栏布局，与 Dock 类方案二选一使用。

- **Clipboard History** — _by SUPERCILEX_

  剪贴板历史管理，用于保存并快速访问复制内容。

- **Lockscreen Extension** — _by PRATAP PANABAKA_

  用于定制 GNOME 锁屏界面的显示与交互。

- **Vitals** — _by corecoding_

  在顶栏显示系统硬件与资源状态信息，如温度、负载和内存占用。

## 系统级扩展

:::tip
系统级扩展通常为预装扩展，位于 `/usr/share/gnome-shell/extensions/`  
用户级扩展几乎一定是自己装的，位于 `~/.local/share/gnome-shell/extensions/`  
预装扩展为系统或桌面环境自带，不同 GNOME 版本、不同发行版或不同安装方式下，预装扩展列表可能存在差异。
:::

- AppIndicator and KStatusNotifierItem Support — _by 3v1n0_
- Apps Menu — _by fmuellner_
- ArcMenu — _by andrew_z_
- Auto Move Windows — _by fmuellner_
- Forge — _by forge-ext_
- Gnome 4x UI Improvements — _by AXP_
- GSConnect — _by dlandau_
- Gtk4 Desktop Icons NG (DING) — _by smedius_
- Launch New Instance — _by fmuellner_
- Legacy (GTK3) Theme Scheme Auto Switcher — _by mukul29_
- Light Style — _by fmuellner_
- Native Window Placement — _by fmuellner_
- Pamac Updates Indicator — _by Pamac_
- Places Status Indicator — _by fmuellner_
- Removable Drive Menu — _by fmuellner_
- Screenshot Window Sizer — _by fmuellner_
- Space Bar — _by luchrioh_
- Status Icons — _by fmuellner_
- System Monitor — _by fmuellner_
- User Themes — _by fmuellner_
- Window List — _by fmuellner_
- Window Navigator — _by fmuellner_
- Workspace Indicator — _by fmuellner_
- X11 Gestures — _by JoseExposito_

## × 可能无法使用的功能

:::warning
GNOME 功能性缩放（Functional Scaling）可能无法工作：
::github{repo="puxplaying/mutter-x11-scaling"}
:::

---

# 关闭自动更新

在应用市场 - 首选项中关闭

---

# Fish Shell 与 Oh-My-Fish

## 安装 Oh My Fish

```bash
curl https://raw.githubusvercontent.com/oh-my-fish/oh-my-fish/master/bin/install | fish
```

## 自定义主题

```bash
~/.local/share/omf/themes/
git clone https://github.com/jhll1124/omf-theme ~/.local/share/omf/themes/omf-theme
omf theme omf-theme
```

---

# 证书（Certificates）

尽量不要更改系统证书，这里选择在浏览器设置里添加信任证书。

---

# 字体目录

系统字体路径：`/usr/share/fonts/`

---

# kawaii-gcc 语言包

::github{repo="Bill-Haku/kawaii-gcc"}

下载 [zh-kawaii.mo](https://github.com/Bill-Haku/kawaii-gcc/releases/latest/) 文件

> v0.6.0 缓存：[zh-kawaii.mo](https://r2.cialo.site/zh-kawaii.mo)

重命名为 `gcc-14.mo` 后放到 `/usr/share/locale/zh_CN/LC_MESSAGES/`

---

# 默认文件管理器绑定

将 Nautilus 设置为默认目录打开方式：

```bash
xdg-mime default org.gnome.Nautilus.desktop inode/directory
```

---

# 杂项（Notes）

## fish + OMF（补充说明）

```bash
fish
omf greetings
# 用户信息位于 /etc/passwd
```

---
title: Windows 安装 Rust 并配置国内镜像
published: 2025-11-22
description: 本文介绍在 Windows 上仅使用 GNU 工具链安装 Rust，并说明国内镜像的配置方法，以加速工具链与依赖下载。
image: "./136883322_p0.png"
tags: [rust, windows, dev, development, code, 编程, 环境配置, env, 开发]
category: code
draft: false
---

_封面：_[Rust - Ferris](https://www.pixiv.net/artworks/136883322)

在 Windows 上安装 Rust 时，rustup 默认会安装 msvc 工具链。但~~众嗦粥汁~~，msvc 版本的 Rust 很难用，必须在 Visual Studio 开发人员命令提示符打开。因此本文将按照实际的交互流程，说明如何在 Windows 上仅安装 Rust 的 GNU 工具链，并配置国内镜像以提升下载速度。

# 一、使用 rustup 安装 GNU 工具链（不安装 MSVC）

Rust 官方安装方式是使用 rustup。安装过程无需手动选择 MSVC，只需进入自定义安装并指定 GNU 工具链即可。

## 下载并运行 rustup-init

访问 Rust 官方网页下载 [rustup-init.exe](https://win.rustup.rs/x86_64)，双击运行。

吐槽：[https://static.rust-lang.org/rustup/dist/x86_64-pc-windows-gnu/rustup-init.exe](https://static.rust-lang.org/rustup/dist/x86_64-pc-windows-gnu/rustup-init.exe) 下载的怎么还是默认 msvc？？:spoiler[那你写 gnu 干什么]

## 自定义安装

当出现以下提示时：

```
1) Quick install via the Visual Studio Community installer
   (free for individuals, academic uses, and open source).

2) Manually install the prerequisites
   (for enterprise and advanced users).

3) Don't install the prerequisites
   (if you're targeting the GNU ABI).
```

输入 **3** 回车。

随后系统会继续显示：

```
1) Proceed with standard installation (default - just press enter)
2) Customize installation
3) Cancel installation
```

此时输入 **2** 回车，进入“自定义安装”界面。

然后在出现的工具链询问时，会显示默认的：

```
Default host triple? [x86_64-pc-windows-msvc]
```

此处输入：`x86_64-pc-windows-gnu`

之后**一直狂按回车**，后面选项保持所有默认设置即可。rustup 将开始下载并安装 GNU 工具链，而不会安装 MSVC 工具链。

# 二、配置国内镜像（cargo）

Rust 官方服务器在国内速度较慢，因此建议配置镜像。此文使用清华源，引用自 [Rust crates.io 索引](https://mirrors.tuna.tsinghua.edu.cn/help/crates.io-index.git/)

编辑  `$CARGO_HOME/config.toml`  文件，添加以下内容：

```toml
[source.crates-io]
replace-with = 'mirror'

[source.mirror]
registry = "https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git"
```

注：`$CARGO_HOME`：在 Windows 系统默认为：`%USERPROFILE%\.cargo`，在类 Unix 系统默认为：`$HOME/.cargo`。

注：cargo 仍会尝试读取不带  `.toml`  扩展名的配置文件（即  `$CARGO_HOME/config`），但从 1.39 版本起，cargo 引入了对  `.toml`  扩展名的支持，并将其设为首选格式。请根据使用的 cargo 版本选择适当的配置文件名。

在 Linux 环境可以使用下面的命令完成：

```
mkdir -vp ${CARGO_HOME:-$HOME/.cargo}

cat << EOF | tee -a ${CARGO_HOME:-$HOME/.cargo}/config.toml
[source.crates-io]
replace-with = 'mirror'

[source.mirror]
registry = "https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git"
EOF
```

在可能的情况下推荐使用  [Rust crates.io 稀疏索引镜像](https://mirrors.tuna.tsinghua.edu.cn/help/crates.io-index/)

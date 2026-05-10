---
title: WSL 配置
published: 2025-11-16
updated: 2026-05-10
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
pacman -S zsh
chsh -s /usr/bin/zsh
pacman -S neofetch gcc nano gdb git which nmap inetutils llvm sqlmap mkcert btop vim node npm pnpm binwalk tldr tree asar
```

---

# Docker Desktop

Docker Desktop 可以与 WSL 2 深度集成，提供原生的容器开发体验。

## 安装配置

1. 下载并安装 [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/)

2. 启动 Docker Desktop，进入 **Settings** → **Resources** → **WSL Integration**

3. 启用以下选项：
   - ✅ Enable integration with my default WSL distro
   - ✅ 选择你想要集成的 WSL 发行版（如 Arch）

4. 应用设置并重启 Docker Desktop

## Docker Hub 官方服务地址

| 用途              | 地址                               |
| ----------------- | ---------------------------------- |
| Registry API      | `registry-1.docker.io`             |
| Auth 服务         | `auth.docker.io`                   |
| Layer 下载（CDN） | `production.cloudflare.docker.com` |
| 备用 S3 源        | `*.s3.amazonaws.com`               |

> 官方的 CDN 节点是 `production.cloudflare.docker.com`，走的是 Cloudflare 的 CDN。

## 配置容器

### Uptime Kuma 监控服务

```bash
docker run -d --restart=always -p 3001:3001 -v uptime-kuma:/app/data --name uptime-kuma louislam/uptime-kuma:2
```

### Cloudflare Tunnel

```bash
docker run -d --restart=always cloudflare/cloudflared:latest tunnel --no-autoupdate run --token <your-token>
```

## Docker 网络管理

创建自定义网络：

```bash
docker network create my-net
```

将容器连接到网络（容器间可通过容器名互相访问）：

```bash
docker network connect my-net uptime-kuma
docker network connect my-net <container-name>
```

连接后，容器可以通过容器名作为主机名互相通信，例如在 `uptime-kuma` 中可以直接访问 `http://<container-name>:port`。

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

# Zsh 配置

## 安装 Oh My Zsh

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

## 安装 powerlevel10k

```zsh
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git "${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k"
```

打开 `~/.zshrc`，找到设置 `ZSH_THEME` 的行，并将其值更改为 `"powerlevel10k/powerlevel10k"`。

## 推荐插件

- [zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting)
- [zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions)
- [zsh-history-substring-search](https://github.com/zsh-users/zsh-history-substring-search)
- [fzf-tab](https://github.com/Aloxaf/fzf-tab)

```zsh
plugins=(
    git
    zsh-syntax-highlighting
    zsh-autosuggestions
    zsh-history-substring-search
    fzf-tab
)
```

## 应用配置

:::caution
以下为完整 `.zshrc` 配置，仅供参考，请勿全部照搬，否则后果自负。  
配置较长，可点击展开查看。
:::

<details><summary>点击展开完整配置</summary>

```zsh
export LANG=zh_CN.UTF-8
export LANGUAGE=zh_CN.UTF-8

zstyle ':fzf-tab:*' fzf-flags --border --height=~80%
zstyle ':completion:*' format '%d'

command_not_found_handler() {
  local cmd=$1
  local args=("${@:2}")
  if command -v "$cmd.exe" >/dev/null 2>&1; then
    echo "注意：自动尝试执行 '$cmd.exe'" >&2
    command "$cmd.exe" "${args[@]}"
    return $?
  else
    echo "zsh: 未找到命令 '$cmd' 或 '$cmd.exe'" >&2
    return 127
  fi
}
file() {
  command file "$@"
  local ret=$?
  if [[ $ret -eq 0 && $# -le 10 ]]; then
    echo ""
    echo "--- TrID 分析 ---"
    for arg in "$@"; do
      local winpath
      if [[ -e "$arg" ]]; then
        winpath=$(wslpath -w "$arg")
      else
        winpath="$arg"
      fi
      /mnt/c/Software/TrID/trid.exe "$winpath" 2>&1 | python3 -c "
import sys
text = sys.stdin.buffer.read().decode('utf-8', errors='replace')
text = text.replace('\r', '')
for line in text.splitlines():
    if not line.strip(): continue
    if line.startswith('TrID'): continue
    if line.startswith('Definitions'): continue
    if line.startswith('Analyzing'): continue
    if line.startswith('* Error'): continue
    if line.startswith('Collecting data from file'): continue
    print(line)
"
    done
  fi
  return $ret
}

alias str=llvm-strings
alias ntr=nexttrace_linux_amd64
alias bw=binwalk
alias pip='uv.exe pip'
alias sysdo='sudo.exe ElainaExecute.exe -s powershell -command'
alias dp='llvm-objdump -p'
alias py=py.exe
alias pwsh=powershell.exe
alias sudo=sudo.exe
alias adb=adb.exe
alias fastboot=fastboot.exe
alias ff=ffmpeg.exe
alias ffp=ffplay.exe
alias payload=payload.exe
alias stream=stream.exe
alias yt=yt-dlp.exe
alias uv=uv.exe
alias rs=rustc.exe
alias cg=cargo.exe



# Enable Powerlevel10k instant prompt. Should stay close to the top of ~/.zshrc.
# Initialization code that may require console input (password prompts, [y/n]
# confirmations, etc.) must go above this block; everything else may go below.
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

# If you come from bash you might have to change your $PATH.
# export PATH=$HOME/bin:$HOME/.local/bin:/usr/local/bin:$PATH

# Path to your Oh My Zsh installation.
export ZSH="$HOME/.oh-my-zsh"

# Set name of the theme to load --- if set to "random", it will
# load a random theme each time Oh My Zsh is loaded, in which case,
# to know which specific one was loaded, run: echo $RANDOM_THEME
# See https://github.com/ohmyzsh/ohmyzsh/wiki/Themes
ZSH_THEME="powerlevel10k/powerlevel10k"

# Set list of themes to pick from when loading at random
# Setting this variable when ZSH_THEME=random will cause zsh to load
# a theme from this variable instead of looking in $ZSH/themes/
# If set to an empty array, this variable will have no effect.
# ZSH_THEME_RANDOM_CANDIDATES=( "robbyrussell" "agnoster" )

# Uncomment the following line to use case-sensitive completion.
# CASE_SENSITIVE="true"

# Uncomment the following line to use hyphen-insensitive completion.
# Case-sensitive completion must be off. _ and - will be interchangeable.
# HYPHEN_INSENSITIVE="true"

# Uncomment one of the following lines to change the auto-update behavior
# zstyle ':omz:update' mode disabled  # disable automatic updates
# zstyle ':omz:update' mode auto      # update automatically without asking
# zstyle ':omz:update' mode reminder  # just remind me to update when it's time

# Uncomment the following line to change how often to auto-update (in days).
# zstyle ':omz:update' frequency 13

# Uncomment the following line if pasting URLs and other text is messed up.
# DISABLE_MAGIC_FUNCTIONS="true"

# Uncomment the following line to disable colors in ls.
# DISABLE_LS_COLORS="true"

# Uncomment the following line to disable auto-setting terminal title.
# DISABLE_AUTO_TITLE="true"

# Uncomment the following line to enable command auto-correction.
# ENABLE_CORRECTION="true"

# Uncomment the following line to display red dots whilst waiting for completion.
# You can also set it to another string to have that shown instead of the default red dots.
# e.g. COMPLETION_WAITING_DOTS="%F{yellow}waiting...%f"
# Caution: this setting can cause issues with multiline prompts in zsh < 5.7.1 (see #5765)
# COMPLETION_WAITING_DOTS="true"

# Uncomment the following line if you want to disable marking untracked files
# under VCS as dirty. This makes repository status check for large repositories
# much, much faster.
# DISABLE_UNTRACKED_FILES_DIRTY="true"

# Uncomment the following line if you want to change the command execution time
# stamp shown in the history command output.
# You can set one of the optional three formats:
# "mm/dd/yyyy"|"dd.mm.yyyy"|"yyyy-mm-dd"
# or set a custom format using the strftime function format specifications,
# see 'man strftime' for details.
# HIST_STAMPS="mm/dd/yyyy"

# Would you like to use another custom folder than $ZSH/custom?
# ZSH_CUSTOM=/path/to/new-custom-folder

# Which plugins would you like to load?
# Standard plugins can be found in $ZSH/plugins/
# Custom plugins may be added to $ZSH_CUSTOM/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.

plugins=(
    git
    zsh-syntax-highlighting
    zsh-autosuggestions
    zsh-history-substring-search
    fzf-tab
)

source $ZSH/oh-my-zsh.sh

# User configuration

# export MANPATH="/usr/local/man:$MANPATH"

# You may need to manually set your language environment
# export LANG=en_US.UTF-8

# Preferred editor for local and remote sessions
# if [[ -n $SSH_CONNECTION ]]; then
#   export EDITOR='vim'
# else
#   export EDITOR='nvim'
# fi

# Compilation flags
# export ARCHFLAGS="-arch $(uname -m)"

# Set personal aliases, overriding those provided by Oh My Zsh libs,
# plugins, and themes. Aliases can be placed here, though Oh My Zsh
# users are encouraged to define aliases within a top-level file in
# the $ZSH_CUSTOM folder, with .zsh extension. Examples:
# - $ZSH_CUSTOM/aliases.zsh
# - $ZSH_CUSTOM/macos.zsh
# For a full list of active aliases, run `alias`.
#
# Example aliases
# alias zshconfig="mate ~/.zshrc"
# alias ohmyzsh="mate ~/.oh-my-zsh"

# To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh

bindkey "$terminfo[kcuu1]" history-substring-search-up
bindkey "$terminfo[kcud1]" history-substring-search-down

```

</details>

---

# pnpm 中国镜像源

```bash
pnpm config set registry https://registry.npmmirror.com
```

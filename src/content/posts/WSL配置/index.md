---
title: WSL 配置
published: 2025-11-16
updated: 2026-04-18
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
pacman -S neofetch gcc nano gdb git which nmap inetutils llvm sqlmap mkcert btop vim node npm pnpm binwalk tldr tree
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

# Oh My Zsh

安装：

```sh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

## powerlevel10k

```zsh
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git "${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k"
```

打开 `~/.zshrc`，找到设置 `ZSH_THEME` 的行，并将其值更改为 `"powerlevel10k/powerlevel10k"`。

## 插件

```zsh
plugins=( 
    git
    zsh-syntax-highlighting
    zsh-autosuggestions
    zsh-history-substring-search
    fzf-tab
)
```

## `.zshrc`

```zsh
export LANG=zh_CN.UTF-8
export LANGUAGE=zh_CN.UTF-8

zstyle ':fzf-tab:*' fzf-flags --border
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

alias py=py.exe
alias docker=docker.exe
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
alias pip='uv.exe pip'
alias sysdo='sudo.exe ElainaExecute.exe -s powershell -command'
alias dp='llvm-objdump -p'
alias str='llvm-strings'
alias ntr=nexttrace_linux_amd64
alias bw=binwalk
alias rs=rustc.exe
alias cg=cargo.exe


bindkey "$terminfo[kcuu1]" history-substring-search-up
bindkey "$terminfo[kcud1]" history-substring-search-down
```

---

# pnpm 中国镜像源

```bash
pnpm config set registry https://registry.npmmirror.com
```

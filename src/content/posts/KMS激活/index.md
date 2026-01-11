---
title: KMS 激活
published: 2025-11-16
updated: 2025-11-16
description: "KMS Activate"
image: "./cover.jpg"
tags: [kms, 激活, activate]
category: "server"
sourceLink: "https://moe.best/kms.html"
draft: false
---

Head Pic: [「碎裂の音符」/「Twiska」[pixiv]](https://www.pixiv.net/artworks/55295716"「碎裂の音符」/「Twiska」[pixiv]")

# KMS

只能激活**批量版**的 Windows 和 Office，如果不是请看对应说明

每次激活成功的有效期是  `180天`，之后系统每  `7天`\* 会自动联网激活续期，只要你有网而且本站的 KMS 服务器没宕

\* 默认情况下自动续期间隔为 7 天，但该值可由 KMS 服务提供者自定义，本站 KMS 服务自动续期间隔为 90 天

KMS 服务器地址：

- kms.loli.best

## 术语释义

- 零售版，Retail，简写 RTL，或称 consumer edition
- 批量版，Volume，简写 VOL 或 VL，或称 business edition

## Windows

1. 如果你的系统是**零售版**，请先到下方 KMS Client Setup Keys 处得到你的系统版本对应的 Key，并应用它以将系统转换成**批量版**

2. **以管理员身份**运行「命令提示符」或者「PowerShell」，运行以下命令

   ```pwsh
   cd C:\Windows\System32
   cscript slmgr.vbs /skms kms.loli.best
   cscript slmgr.vbs /ato
   cscript slmgr.vbs /xpr
   ```

## Office

由于不同版本的 Office 激活脚本所在路径不尽相同，如果你比较懒可以继续看后面的说明下载使用 OTP；如果不想下载额外的应用，可自行百度对应版本 Office 的 KMS 激活方式

注意：新安装的 Office 可能需要至少打开一次后才可以激活，任意打开一个 Office 应用例如 Word 即可

1. 下载  [Office Tool Plus](https://otp.landian.vip/)（顺便安利 Yerong 大佬开发的这个十分强大的工具，你还可以用它来下载安装任意版本的 Office 套件）
2. 打开软件，点击「激活」
3. 如果你现有的 Office 是零售版，请先在「许可证管理」中安装对应你的 Office 套件的批量版许可证
4. 在「KMS 管理」的“KMS 主机”处输入  `kms.loli.best`，然后点击「保存设置」
5. 点击「激活」

## KMS Client Setup Keys

注：密钥来源于微软官方  
[密钥管理服务 (KMS) 客户端激活和产品密钥 | Microsoft Learn](https://learn.microsoft.com/zh-cn/windows-server/get-started/kms-client-activation-keys)  
[批量许可证中的 Windows IoT 企业版 LTSC | Microsoft Learn](https://learn.microsoft.com/zh-cn/windows/iot/iot-enterprise/deployment/volume-license)

你可以直接在**以管理员身份**运行的「命令提示符」或「PowerShell」中直接执行此命令应用密钥，也可以在 Win 10 设置的“更新和安全-激活-更新产品密钥”中应用密钥

`cd C:\Windows\System32 cscript slmgr.vbs /ipk W269N-WFGWX-YVC9B-4J6C9-T83GX`

## 鸣谢

本 KMS 服务依赖于 vlmcsd 以及 dakkidaze 的一键脚本
::github{repo="Wind4/vlmcsd"}
::github{repo="dakkidaze/one-key-kms"}
另外还要感谢 [Office Tool Plus](https://otp.landian.vip/ "Office Tool Plus") 为我们带来的各种便利~

## 原文

本文章引用于[神代綺凛の随波逐流](https://moe.best/kms.html)

---
title: 各平台 WebView User-Agent 参考记录
published: 2025-11-22
updated: 2025-11-30
description: "本文档整理了主流平台、应用与系统中的 WebView User-Agent 字符串，方便开发者进行环境判断、UA 适配和调试工作。"
image: ""
tags: [web, broswer, windows, android, linux, 浏览器]
category: "web"
draft: false
---

本文档整理了主流平台、应用与系统中的 WebView User-Agent 字符串，方便开发者进行环境判断、UA 适配和调试工作。

:::tip
UA 字符串会因系统版本、应用版本、设备型号等因素存在差异，以下内容仅供参考。
:::

---

# 📱 移动端 User-Agent

测试设备：小米 15 Pro | Android 16 | HyperOS 3.0.5.0

## Android 系统 WebView

```
Mozilla/5.0 (Linux; Android 16; 2410DPN6CC Build/BP2A.250605.031.A3) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/137.0.7151.115 Mobile Safari/537.36
```

## Chrome（Android 版）

```
Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36
```

## Edge（Android 版）

```
Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36 EdgA/142.0.0.0
```

## 米游社

```
Dalvik/2.1.0 (Linux; U; Android 16; 2410DPN6CC Build/BP2A.250605.031.A3)
```

## 微信（Android 版 8.0.63 2920）

```
Mozilla/5.0 (Linux; Android 16; 2410DPN6CC Build/BP2A.250605.031.A3; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/142.0.7444.158 Mobile Safari/537.36 XWEB/1420037 MMWEBSDK/20250804 MMWEBID/437 MicroMessenger/8.0.63.2920(0x28003F3C) WeChat/arm64 Weixin NetType/4G Language/zh_CN ABI/arm64
```

## QQNT（Android 版 9.2.30.31725）

```
Mozilla/5.0 (Linux; Android 16; 2410DPN6CC Build/BP2A.250605.031.A3; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/137.0.7151.115 Mobile Safari/537.36 V1_AND_SQ_9.2.30_12330_YYB_D QQ/9.2.30.31725 NetType/4G WebP/0.4.1 AppId/537324436 Pixel/1440 StatusBarHeight/169 SimpleUISwitch/0 QQTheme/1103 StudyMode/0 CurrentMode/0 CurrentFontScale/1.0 GlobalDensityScale/0.96 AllowLandscape/false InMagicWin/0
```

## 企业微信（Android 5.0.0 55974）

```
Mozilla/5.0 (Linux; Android 16; 2410DPN6CC Build/BP2A.250605.031.A3; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/138.0.7204.180 Mobile Safari/537.36 XWEB/1380275 MMWEBSDK/20250202 MMWEBID/880 wxwork/5.0.0 MicroMessenger/7.0.1 NetType/4G Language/zh Lang/zh ColorScheme/Dark wwmver/3.26.500.650
```

## 小米浏览器（MiuiBrowser）

```
Mozilla/5.0 (Linux; U; Android 16; zh-cn; 2410DPN6CC Build/BP2A.250605.031.A3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.119 Mobile Safari/537.36 XiaoMi/MiuiBrowser/20.2.60828
```

---

# 💻 桌面端 User-Agent

测试环境：Windows 11 25H2

## Edge（Windows 版）

```
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0
```

## QQNT（Windows 9.9.25-42744）

```
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) QQ/9.9.25-42744 Chrome/138.0.7204.35 Electron/37.1.0 Safari/537.36 OS/win32,x64,10.0.26200,Windows 11 Pro QQAppId/537328470
```

## 微信 PC（Windows 4.1.2.17）

```
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x63090a13) UnifiedPCWindowsWechat(0xf2541211) XWEB/16815 Flue
```

## Steam（Windows）

```
Mozilla/5.0 (Windows NT 10.0; Win64; x64; Valve Steam Client/default/1763795278) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.6478.183 Safari/537.36
```

## WeGame（Windows）

```
Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.5414.120 Safari/537.36 qblink wegame.exe WeGame/6.2.0.11030 ChannelId/0 QBCore/109.0.0-HEAD.2720+g8dd4c19+chromium-109.0.5414.120 QQBrowser/9.0.2524.400
```

## 抖音（Windows）

```
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) douyin/6.9.0 Chrome/136.0.7103.59 Electron/36.4.0-rs.22.release.pgo.1 TTElectron/36.4.0-rs.22.release.pgo.1 Safari/537.36 awemePcClient/6.9.0 buildId/256101398 osName/Windows
```

## 抖音（腾讯元宝）

```
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0 system_lang/zh-CN os_version/10.0.26100 os_name/windows app_short_version/2.45.0 app_full_version/2.45.0.612 app_lang/zh-CN app_instance_id/2 app_theme/system c_district/0 package_type/publish_release app/tencent_yuanbao app_version/2.45.0 product_id/TM_Product_App
```

---

# 💻 Linux User-Agent

测试环境：Manjaro

## Edge（Linux 版）

```
Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0
```

## FireFox（Linux 版）

```
Mozilla/5.0 (X11; Linux x86_64; rv:136.0) Gecko/20100101 Firefox/136.0
```

---

# 💡 使用提示

- **微信内置浏览器**：包含 `MicroMessenger` 标识和 `XWEB` 内核版本信息
- **企业微信**：除微信特征外，还包含 `wxwork` 标识
- **移动端 WebView**：通常包含 `wv` 标识（如 Android 系统 WebView 和微信 WebView）
- **版本差异**：不同应用版本的 Chrome 内核版本可能不同，建议进行兼容性测试

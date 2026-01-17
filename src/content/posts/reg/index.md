---
title: Windows 注册表的一些个性化配置
published: 2026-01-16
description: 这篇文章用于完整记录并解释我在自己电脑上进行的一些 Windows 注册表自定义个性化配置
image: "./2.png"
tags: [windows, reg]
category: misc
draft: false
---

:::note
本文不鼓励盲目照搬，只作为**思路展示与自用记录**。如若照抄后果自负。
:::

# 硬件 FriendlyName 自定义

:::warning
此修改位于 `Enum` 分支，系统可能在重装驱动或硬件重新枚举时覆盖。
:::

```reg
[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Enum\PCI\VEN_10DE&DEV_28E0&SUBSYS_35581043&REV_A1\4&9a8f73c&0&0008]
"FriendlyName"="NVIDIA GeForce RTX 5090 StarRail Ver."

[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Enum\PCI\VEN_8086&DEV_A78B&SUBSYS_35581043&REV_04\3&11583659&0&10]
"FriendlyName"="Intel(R) Arc(TM) B580 Graphics"
```

- **纯展示层修改**，影响：任务管理器，设备管理器
- 不影响驱动加载、PCI ID、功能
- 截图展示，个人命名偏好（如主题化显卡名称）

---

# 启用详细启动状态（VerboseStatus）

```reg
[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System]
"VerboseStatus"=dword:00000001
```

**效果**：开机 / 关机 / 更新等时显示具体步骤而非“正在准备”

---

# 放宽 Windows Update 暂停上限

```reg
[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\WindowsUpdate\UX\Settings]
"FlightSettingsMaxPauseDays"=dword:000006f1
```

将暂停更新的上限扩展至 **1777 天**，等于禁用更新

---

# 系统 UI 颜色体系

```reg
[HKEY_CURRENT_USER\Control Panel\Colors]
"HilightText"="0 0 0"
;选中文字颜色,默认值"255 255 255"
"HotTrackingColor"="255 102 102"
;拖拽框内颜色及链接颜色,默认值"0 102 204"
"Menu"="240 240 240"
"MenuBar"="240 240 240"
"MenuText"="0 0 0"
"MenuHilight"="0 120 212"
"Window"="255 255 255"
"WindowText"="0 0 0"
"Hilight"="255 172 211"
;选中文字背景颜色及拖拽边框颜色
"GrayText"="109 109 109"
```

- **仅自定义修改了 3 个值**，已在 reg 中用分号注释明确标出
- 其余键值 **完全是 Windows 默认值**，保留在这里只是为了作为一份完整备份

## 修改的项详解

1. `HilightText`

- 默认：`255 255 255`（白字）
- 修改为：`0 0 0`（黑字）
- 在浅色或高饱和高亮背景下，白字**可读性极差**

2. `HotTrackingColor`

影响范围：

- 经典 UI 中的链接颜色
- 框选 / 拖拽区域内部填充

3. `Hilight`

- 这是选中文字背景色 / 拖拽边框色
- 选择的是一个高亮但不刺眼同时能压住黑字的颜色

---

# MDM 域状态伪装

```reg
[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Enrollments\FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF]
"EnrollmentState"=dword:00000001
"EnrollmentType"=dword:00000000
"IsFederated"=dword:00000000
```

```reg
[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Provisioning\OMADM\Accounts\FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF]
"Flags"=dword:00d6fb7f
"AcctUId"="0x000000...000"
"RoamingCount"=dword:00000000
"SslClientCertReference"="MY;User;0000000000000000000000000000000000000000"
"ProtoVer"="1.2"
```

- 保持系统在“已注册但无实际企业控制”的稳定状态
- 避免部分企业策略检测异常
- 对某些依赖 MDM 状态的软件更友好

> 这是一个**高阶配置区**，不理解含义不建议模仿。

---

# Microsoft Edge Policy

```reg
[HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Edge]
"UserDataDir"="${documents}\\Edge"
"CustomHelpLink"="edge://newtab/"
"SpotlightExperiencesAndRecommendationsEnabled"=dword:00000000
"HideFirstRunExperience"=dword:00000001
"DefaultBrowserSettingEnabled"=dword:00000000
"ShowPDFDefaultRecommendationsEnabled"=dword:00000000
"ExemptFileTypeDownloadWarnings"="[{\"file_extension\":\"exe\",\"domains\":[\"*\"]},{\"file_extension\":\"ini\",\"domains\":[\"*\"]}]"
```

- 完全关闭新手引导、推荐、提示
- 将用户数据放到 **Documents\Edge**，便于备份与管理
- 放行特定文件类型下载警告

---

# OEM 信息重写

```reg
[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\OEMInformation]
"Logo"="C:\\windows\\ASUS\\ASUSlogo.bmp"
"Manufacturer"="上海悠星网络科技有限公司"
"SupportURL"="https://www.asus.com.cn/laptops/for-gaming/tuf-gaming/asus-tuf-gaming-f16-2024/helpdesk_bios?model2Name=FX607JV"
"TradeInURL"="https://www.microsoft.com/en-us/store/b/microsoft-trade-in?rtc=1&activetab=pivot:forpersonaltab/"
"RecycleURL"="https://www.microsoft.com/en-us/legal/compliance/recycling/"
"HelpCustomized"=dword:00000000
"SupportPhone"="0d000721"
```

## 效果

- 设置 → 系统 → 关于 中展示自定义 OEM
- 可用于主题化、展示或测试

---

# 使用 UTC 作为硬件时间

:::important
Linux / Windows 多系统必须设置，避免时间冲突，也可将 Linux 改为本地时间。
:::

```reg
[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\TimeZoneInformation]
"RealTimeIsUniversal"=dword:00000001
```

---

# WebClient 文件大小限制解除

```reg
[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\WebClient\Parameters]
"FileSizeLimitInBytes"=dword:ffffffff
```

- 解除 WebDAV 默认 50MB 限制
- 对网络挂载、远程文件操作更友好

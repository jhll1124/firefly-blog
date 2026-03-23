---
title: 《明日方舟：终末地》原生HDR支持的实现
published: 2026-03-06
updated: 2026-03-23
description: "使用RenoDX实现《明日方舟：终末地》原生HDR支持"
image: "./hyw.png"
tags: [hdr, mod, game, 游戏, 明日方舟：终末地, Endfield]
category: "game"
sourceLink: "https://chaomeng.space/posts/2026-02-06/arknights-endfield-native-hdr"
draft: false
---

《明日方舟：终末地》原生不支持 HDR，因此需要通过插件注入的方式实现原生 HDR。这里采用 RenoDX 实现。

# 安装

> 非原作者，仅作分享

这里提供整合包下载，解压后放入游戏安装目录 `Hypergryph Launcher\games\Endfield Game` 即可。有能力的可以跟原作者教程。

- [整合包下载链接](https://r2.cialo.site/Endfield%20Game.zip)
- [插件下载 Nightly Build](https://github.com/clshortfuse/renodx/releases/download/snapshot/renodx-endfield.addon64)
- 原作者 Discord 频道邀请链接：[RenoDX](https://discord.gg/gF4GRJWZ2A)
- 指南原文（英语）：[Discord | "Arknights + AK Endfield" | RenoDX](https://discord.com/channels/1408098019194310818/1440801914165002322/1463311181899894784)
- 指南（GitHub 存档）：[Arknights : Endfield - HDR Mod (DX11 Only)](https://github.com/clshortfuse/renodx/discussions/490)

## 辅助插件

这边也推荐一下 [Ex_M](https://space.bilibili.com/44434084) 大佬写的插件，支持反虚化、解帧、隐藏面具/UID/伤害数字等功能。

![](EFTool.png)

- 下载链接：[Release_1.0.7z](https://r2.cialo.site/Release_1.0.7z)

# 启动游戏

:::important
启动游戏时记得勾选上启动器里面的 DX11 启动，否则会黑屏甚至崩溃！  
（或者使用 `-force-d3d11` 参数启动 `Endfield.exe` 绕过启动器）  
DX11 下帧生成不可用，可以用 NVIDIA App 的 Smooth Motion（现在显示为AI插帧）补帧作为替代，但是效果只能说一言难尽
:::

# 参数配置

> 按 Home 键呼出 ReShade 菜单，在顶部标签页找到 RenoDX 即可看到此界面。

![](Endfield_Overlay.jpg)

---

## Tone Mapping (色调映射)

- **Tone Mapper (色调映射器)**  
   选择将 HDR 信号压缩进屏幕显示范围的算法。保持默认 `RenoDRT`。这是作者特调的动态范围算法，色彩还原与亮度过渡目前最自然。
- **Peak Brightness (峰值亮度)**  
   告诉插件你的显示器**最高**能达到多少尼特 (nits)。
  > 设为显示器实际参数，设太高会导致太阳/灯光等高光细节丢失，变成一片死白。
- **Game Brightness (游戏亮度 / Paper White)**  
   即“纸白亮度”，决定了**普通场景**（非发光物体）看起来的基础亮度。
  > 按眼球舒适度调整，如果你觉得此时画面整体太昏暗就调高，觉得刺眼就调低。
- **UI Brightness (UI 界面亮度)**  
   建议设置得比 Game Brightness (游戏亮度)**稍低**。
- **Scene / UI Gamma (伽马校正)**  
   控制画面的对比度曲线。
- **Hue Shift (色相偏移保护)**  
   防止颜色在极高亮度下发生变色（例如红色的强光变成橙色或白色）。建议保持**100 (开启)**，确保高光色彩准确自然。

## Color Grading (调色与风格)

根据自己主观审美调整。

- **Exposure (曝光)**: 整体亮度增益，默认 1.0
- **Highlights (高光)**: 仅调节最亮部分的强度
- **Shadows (阴影)**: 仅调节最暗部分的深度，想让暗部更深邃可适当降低 (<50)
- **Contrast (对比度)**: 拉开明暗差距，默认 50
- **Saturation (饱和度)**: 整体色彩鲜艳度
- **Highlight Saturation (高光饱和度)**: 控制极亮物体（火光、特效）的饱和度
- **Scene Grading**: 似乎代表LUT滤镜强度，保持默认100%，调低了会发灰

## Effects

- **FSR RCAS Sharpening**: AMD 锐化滤镜。如果你觉得 TAA 抗锯齿让画面太糊，可以开启此项 (On) 并适当调整 Amount (强度)。
- **Bloom Strength**: 泛光强度。控制发光体周围光晕的扩散范围。

## ReShade Bypass

- **ReShade Before UI (在 UI 之前渲染)**：  
   此选项试图将 ReShade 特效强行插队到 UI 绘制之前，避免滤镜影响UI。但是如果你开启了 DLSS / FSR ，请务必**关闭 (Off)**，只有在你使用原生分辨率 (DLAA / Native) ，才建议**开启 (On)**。此外开关选项会导致深度通道反转，需要单独设置。
- **Disable Game GTAO (禁用游戏自带环境光遮蔽)**：  
   此选项用于强制关闭游戏原版自带的阴影效果。如果你打算在 ReShade 里挂载更高级的**RTAO/LSAO**(光追AO) 或**MXAO**，推荐**开启** (On)此选项，关掉游戏自带的，否则两层阴影叠加。

## Rendering Improvements

- **HDR Sun**: 提高太阳亮度到HDR范围。
- **Godrays**: 体积光强度。
- **Improved Shadows**: 开启模组优化过的阴影质量。
- **Hue-Preserving Fog (色相保持雾气)**: 改善的雾气效果。
- **Glass Transparency (玻璃透明度修复)**：优化玻璃材质的透光效果。
- **SSR Quality (屏幕空间反射质量)**：大幅提升光滑表面（金属、玻璃）的反射清晰度和锐度，同时保留粗糙表面（木头、石头）该有的漫反射质感。

## Display Output

- **Encoding**: 保持**HDR10**。这是 Windows 开启 HDR 后的标准信号格式。

## 滤镜参数

LSAO 和 RTAO 滤镜记得把 HDR_WHITELEVEL 设置的和前面的游戏亮度一样  
注意需要取消勾选“性能模式”才能修改滤镜参数，修改完重新勾选即可

### 关于滤镜

`reshade-shaders` 文件夹中加入了几个效果比较关键的滤镜，他们来源于以下 Github 仓库，为了避免包过大没全加上，想尝试更多滤镜可以自行下载：

> [https://github.com/umar-afzaal/LumeniteFX/tree/mainline](https://github.com/umar-afzaal/LumeniteFX/tree/mainline)  
> ↑ 包含LSAO，RTAO等滤镜  
> [https://github.com/Mortalitas/GShade/tree/master/Shaders](https://github.com/Mortalitas/GShade/tree/master/Shaders)  
> ↑ 这个里面有一大堆滤镜，算个整合包

# 游戏截图

> 注意流量消耗！  
> 使用支持 HDR 的环境观看以获得最佳效果

![](/assets/images/Endfield/Starward_20260317_15345489.avif)
![](/assets/images/Endfield/Starward_20260317_15502111.avif)
![](/assets/images/Endfield/Starward_20260317_17124258.avif)
![](/assets/images/Endfield/Starward_20260320_15364434.avif)
![](/assets/images/Endfield/Starward_20260320_20404149.avif)
![](/assets/images/Endfield/Starward_20260318_18224095.avif)
![](/assets/images/Endfield/Starward_20260318_18481184.avif)
![](/assets/images/Endfield/Starward_20260319_21401737.avif)
![](/assets/images/Endfield/Starward_20260317_14315741.avif)
![](/assets/images/Endfield/Starward_20260317_14325315.avif)
![](/assets/images/Endfield/Starward_20260317_14352782.avif)
![](/assets/images/Endfield/Starward_20260317_15115092.avif)
![](/assets/images/Endfield/Starward_20260317_15181436.avif)

## 对比图

> 视频版本。无大会员的可看下方截图
>
> <iframe width="100%" height="468" src="//player.bilibili.com/player.html?bvid=BV1YoANz8E28&p=1&autoplay=0" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" &autoplay=0> </iframe>

![](/assets/images/Endfield/Starward_20260323_15030295.avif)
![](/assets/images/Endfield/Starward_20260323_15031846.avif)
![](/assets/images/Endfield/Starward_20260323_15033339.avif)
![](/assets/images/Endfield/Starward_20260323_15034910.avif)
![](/assets/images/Endfield/Starward_20260320_15364434.avif)
![](Endfield_Endfield_1774068462_2560x1600.png)

# 参阅

- [使用RenoDX实现《明日方舟：终末地》原生HDR支持](https://chaomeng.space/posts/2026-02-06/arknights-endfield-native-hdr)
- [Discord | "Arknights + AK Endfield" | RenoDX](https://discord.com/channels/1408098019194310818/1440801914165002322)

---
title: VMware Workstation 忘记 TPM 加密解决方法
published: 2026-02-11
description: "VMware Workstation 忘记 TPM 加密解决方法"
image: "./image.png"
tags: [vm, vmware, windows, 虚拟机]
category: "misc"
draft: false
---

VMware虚拟机移动或者删掉系统记住的密码，尤其是自动生成的 Windows11 虚拟机密码，那虚拟机就无法打开了。下文提供的方法可以去除虚拟机加密和 TPM 模块。

:::warning
此操作会删除所有快照，请做好数据备份。
:::

1. 在虚拟机目录下，找到 `.vmx` 后缀的虚拟机配置文件，然后以文本形式打开。
2. 对下面代码进行注释：

```vmx
# 虚拟TPM相关配置
#vtpm.ekCSR = ""  # 虚拟TPM的证书签名请求(CSR)
#vtpm.ekCRT = ""  # 虚拟TPM的证书(CRT)
#vtpm.present = "TRUE"  # 是否启用TPM
# 加密相关配置
#encryption.keySafe = "vmware:key/list/(pair/(phrase/R8Kv0XFmTMk%3d/pass2key%3dxxx))"  # 密钥存储路径
#encryption.data = ""  # 加密数据
```

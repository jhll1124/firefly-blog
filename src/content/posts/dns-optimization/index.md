---
title: DNS 配置优化
published: 2026-01-04
description: "DNS 解析机制与性能优化"
image: ""
tags: [network, dns, proxy, doh]
category: "network"
draft: false
---

最近在优化 DNS 配置，想通过实测数据找到最优的 DNS 服务器组合。本文记录了完整的测试过程和最终配置。希望这篇测试记录对你有帮助。

# DNS Benchmark 测试

::github{repo="xxnuo/dns-benchmark"}

使用 DNS Benchmark 工具测试了尽可能全的 DNS 服务器列表，得到以下结果:

## 测试数据

:::warning
本测试结果具有高度的地域和网络环境特定性。测试基于河北省中国电信公网IP段27.184.0.0/16(AS4134 中国网骨干网)进行，采用无NAT直连方式。不同地区、不同运营商、不同网络拓扑（家宽/移动数据/数据中心）、甚至不同时间下，DNS服务器的性能表现都可能存在显著差异。建议读者在实际使用前，使用DNS Benchmark等工具在自身网络环境下进行实测，本文仅提供测试方法论和配置思路参考。
:::

**成功率最高: 97.3% / 90.2%**

- https://dns64.dns.google/dns-query
- 8.8.8.8

**QPS 最高: 160.19**

- https://dns.alidns.com/dns-query

**平均延迟最低: 10ms**

- 156.154.71.2

**综合表现最好: 95.62**

- 114.114.115.115

## 指标分析

在这些指标中，**QPS (每秒查询数) 是最重要的**。为什么不选延迟最低的 156.154.71.2? 因为延迟指标波动极大，多次测试结果差异明显，参考价值有限。相比之下，QPS 是稳定的性能指标，直接反映 DNS 服务器的处理能力。

综合考虑:

1. **QPS** - 硬指标，决定实际性能
2. **综合表现** - 平衡多个维度
3. **成功率** - 保证可用性
4. **延迟** - 参考意义最小

# 最终配置

## default-nameserver

```yaml
default-nameserver:
  - "114.114.115.115"
  - "8.8.8.8"
  - "1.1.1.1"
  - "8.8.4.4"
```

用于解析 DoH/DoT 服务器的域名(如 `dns.alidns.com`)，必须使用纯 IP 格式的 DNS。

## nameserver (主 DNS 列表)

```yaml
nameserver:
  - "https://dns.alidns.com/dns-query"
  - "114.114.115.115"
  - "https://dns64.dns.google/dns-query"
  - "8.8.8.8"
```

**排序依据:**

1. **阿里 DoH** - QPS 最高 (160.19)，国内访问稳定
2. **114.114.115.115** - 综合表现最佳 (95.62)
3. **Google DoH** - 成功率高 (97.3%)，备用
4. **8.8.8.8** - 兜底

## proxy-server-nameserver

```yaml
proxy-server-nameserver:
  - "https://dns.google/dns-query"
  - "https://dns64.dns.google/dns-query"
  - "114.114.115.115"
  - "8.8.8.8"
  - "1.1.1.1"
  - "8.8.4.4"
  - "https://unfiltered.adguard-dns.com/dns-query"
  - "https://dns.cloudflare.com/dns-query"
  - "https://cloudflare-dns.com/dns-query"
  - "https://1.1.1.1/dns-query"
```

专门用于解析代理订阅中的服务器域名，列表较全以确保连接稳定。

:::note
在 `enhanced-mode: fake-ip` 下，本地返回假 IP (198.18.x.x 段)，应用程序用假 IP 发起连接，请求被拦截，域名直接发给代理服务器，代理服务器完成真正的 DNS 解析。因此，fake-ip 模式下，本地 DNS 服务器主要是触发拦截的工具。
:::

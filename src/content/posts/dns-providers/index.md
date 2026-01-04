---
title: DNS 提供商汇总
published: 2026-01-04
description: "在这篇文章中，我们推荐一份受信任的 DNS 供应商名单。 "
image: ""
tags: [dns, doh, server, provider, dot, doq, network]
category: "network"
draft: false
---

DNS(Domain Name System，域名系统)是互联网的基础服务之一，它将我们容易记忆的域名转换为计算机能够理解的IP地址。选择合适的DNS服务器可以提升上网速度、增强隐私保护，甚至帮助过滤恶意网站和广告。本文将为您详细介绍国内外主流的DNS服务器。

---

# 国内DNS服务器

## 腾讯 DNS (DNSPod)

由 DNSPod 提供的公共免费 DNS，后来被腾讯收购，现在属于腾讯公司所有。稳定性和连通性都不错，经测试海外也可以使用。DNSPod 除了 IPv4，现在同时支持 IPv6 DNS 和 DoT/DoH 服务。

**注意事项**:

- DNSPod 对免费用户做出限制，针对单个域名不能超过20QPS
- 相比阿里针对的单个IP限制20QPS，个人觉得还是有区别的
- 普通用户应该不会同时对单个域名进行20QPS的请求

**服务器地址**:

**IPv4**:

- 119.29.29.29
- 119.28.28.28

**IPv6**:

- 2402:4e00::
- 2402:4e00:1::

**DoH (DNS over HTTPS)**:

- https://doh.pub/dns-query

**DoH (国密 SM2)**: 基于腾讯云政企国密解决方案

- https://sm2.doh.pub/dns-query

**DoT (DNS over TLS)**:

- dot.pub

**注意**: 腾讯IP版DoH和DoT已不再提供服务

---

## 阿里 DNS (Ali DNS)

这组 DNS 是由阿里巴巴提供的，国内连通性还是不错的，致力于为广大互联网用户提供“快速”、“稳定”、“安全”的 DNS 递归解析服务。它包括 AliGuard 多种攻击防御策略，可以保护用户免受各种攻击和威胁。

**重要提示**:
2024年9月30日起，阿里对公共DNS免费版进行限速(单个IP请求不能超过20QPS)。虽然现在官方页面对于限速不写具体数据了，改成模糊语言，但限制依然存在。

**服务器地址**:

**IPv4**:

- 223.5.5.5
- 223.6.6.6

**IPv6**:

- 2400:3200::1
- 2400:3200:baba::1

**DoH**:

- https://dns.alidns.com/dns-query
- https://223.5.5.5/dns-query
- https://223.6.6.6/dns-query

**DoT**:

- dns.alidns.com
- 223.5.5.5
- 223.6.6.6

---

## 114DNS

南京信风提供的公共DNS，现阶段只有IPv4。

**纯净版**:

- 114.114.114.114
- 114.114.115.115

**安全版** (拦截钓鱼病毒木马网站):

- 114.114.114.119
- 114.114.115.119

**家庭版** (拦截色情网站，保护少年儿童):

- 114.114.114.110
- 114.114.115.110

---

## CNNIC DNS

中国互联网信息中心 CNNIC 提供的免费公共 DNS，同时支持 IPv4。

**IPv4**:

- 1.2.4.8
- 210.2.4.8

**北京市互联网域名系统工程技术研究中心**:

- 1.8.8.8

**注意**: IPv6地址 (2001:dc7:1000::1) 已无法使用

---

## 中国运营商 IPv6 DNS

以下是各省份运营商提供的IPv6 DNS服务器地址。

### 中国电信 IPv6 DNS

**河北电信**:

- 240e:4c:4008::1
- 240e:4c:4808::1

**广东电信**:

- 240e:1f:1::1
- 240e:1f:1::33

**山东电信**:

- 240e:4e:800::66
- 240e:4e::66

**四川电信**:

- 240e:56:4000:8000::69
- 240e:56:4000::218

**湖北电信**:

- 240e:d:0:100::6

**陕西电信**:

- 240e:f:a::6
- 240e:f:a00b::6

**安徽电信**:

- 240e:46:4088::4088
- 240e:46:4888::4888

**贵州电信**:

- 240e:4a:4400:3::67
- 240e:4a:4400:3::167

**天津电信**:

- 240e:45::6666
- 240e:45::8888

**新疆电信**:

- 240e:51:c800:4::4
- 240e:51:c800:8::8

**广西电信**:

- 240e:9:2000:100
- 240e:9::100

**湖南电信**:

- 240e:50:5000::80
- 240e:50:c800::210

**福建电信**:

- 240e:14:e000::1
- 240e:14:6000::1

**江苏电信**:

- 240e:5a::6666
- 240e:5b::6666

**上海电信**:

- 240e:58:c000:1000:116:228:111:118
- 240e:58:c000:1600:180:168:255:18

**云南电信**:

- 240e:52:4000::8888
- 240e:52:4800::8888

**吉林电信**:

- 240e:211::6666
- 240e:212::6666

**河南电信**:

- 240e:4b::88
- 240e:4b:1000::88

### 中国联通 IPv6 DNS

**全国联通**:

- 2408:8899::8
- 2408:8888::8
- 2408:8000::8

**安徽联通**:

- 2408:8000:c000::8888

**重庆联通**:

- 2408:8663::2
- 2408:8662::2

**上海联通**:

- 2408:8026:480:112::6666

**江西联通**:

- 2408:8000:eeee::e
- 2408:8000:eeee::f

### 中国移动 IPv6 DNS

**河南移动**:

- 2409:8088::a
- 2409:8088::b

**安徽移动**:

- 2409:8030:2000::1
- 2409:8030:2000::2

**海南移动**:

- 2409:805e:2000::6666
- 2409:805e:2000::8888

**河北移动**:

- 2409:8008:2000::1
- 2409:8008:2000:100::1

**广东移动**:

- 2409:8057:2000:2::8
- 2409:8057:2000:6::8
- 2409:8057:2000::8
- 2409:8057:2060::10

**北京移动**:

- 2409:8000:2000:0:70::1
- 2409:8000:2000:0:170::1

**江苏移动**:

- 2409:8020:2000::6
- 2409:8020:2000::8

**广西移动**:

- 2409:805c:2000:3000::1000
- 2409:805c:2000:3001::1000

**湖北移动**:

- 2409:804c:2000:1::1
- 2409:804c:2000:2::1

**湖南移动**:

- 2409:8050:2000:1000::1
- 2409:8050:2000::1

**甘肃移动**:

- 2409:8074:20ff:1000::a
- 2409:8074:20ff:1000::b

**辽宁移动**:

- 2409:8014:2000::1

**浙江移动**:

- 2409:8028:2000::1111
- 2409:8028:2000::2222

**四川移动**:

- 2409:8062:2000:1::1
- 2409:8062:2000:1::2

---

# 国际DNS服务器

## Google DNS

Google 提供的公共免费 DNS，应该是国外最流行的公共 DNS，**国内无法正常使用**，同时提供 IPv4/IPv6/DoT/DoH 服务。

**IPv4**:

- 8.8.8.8
- 8.8.4.4

**IPv6**:

- 2001:4860:4860::8888
- 2001:4860:4860::8844

**DoH**:

- https://dns.google/dns-query

**只针对 IPv6 的 DoH:**:

- https://dns64.dns.google/dns-query

**DoT**:

- tls://dns.google

---

## Cloudflare DNS

Cloudflare DNS 是一个免费且快速的 DNS 服务，作为递归名称服务器，为互联网上任何主机提供域名解析。

### 标准版

**IPv4**:

- 1.1.1.1
- 1.0.0.1

**IPv6**:

- 2606:4700:4700::1111
- 2606:4700:4700::1001

**DoH**:

- https://dns.cloudflare.com/dns-query
- https://cloudflare-dns.com/dns-query
- https://1.1.1.1/dns-query
- https://1.0.0.1/dns-query

**DoT**:

- one.one.one.one
- dns.cloudflare.com
- 1dot1dot1dot1.cloudflare-dns.com

### 仅阻止恶意软件

- **DNS, IPv4**: 1.1.1.2 / 1.0.0.2
- **DNS, IPv6**: 2606:4700:4700::1112 / 2606:4700:4700::1002
- **DNS-over-HTTPS**: https://security.cloudflare-dns.com/dns-query
- **DNS-over-TLS**: tls://security.cloudflare-dns.com

### 阻止恶意软件和成人内容

- **DNS, IPv4**: 1.1.1.3 / 1.0.0.3
- **DNS, IPv6**: 2606:4700:4700::1113 / 2606:4700:4700::1003
- **DNS-over-HTTPS**: https://family.cloudflare-dns.com/dns-query
- **DNS-over-TLS**: tls://family.cloudflare-dns.com

---

## AdGuard DNS

### 默认版 (阻止广告、跟踪和网络钓鱼)

- **DNS, IPv4**: 94.140.14.14 / 94.140.15.15
- **DNS, IPv6**: 2a10:50c0::ad1:ff / 2a10:50c0::ad2:ff
- **DNS-over-HTTPS**: https://dns.adguard-dns.com/dns-query
- **DNS-over-TLS**: tls://dns.adguard-dns.com
- **DNS-over-QUIC**: quic://dns.adguard-dns.com
- **DNSCrypt, IPv4**: Provider: `2.dnscrypt.default.ns1.adguard.com` IP: `94.140.14.14:5443`
- **DNSCrypt, IPv6**: Provider: `2.dnscrypt.default.ns1.adguard.com` IP: `[2a10:50c0::ad1:ff]:5443`

### 家庭保护版 (默认功能 + 阻止成人网站 + 安全搜索)

- **DNS, IPv4**: 94.140.14.15 / 94.140.15.16
- **DNS, IPv6**: 2a10:50c0::bad1:ff / 2a10:50c0::bad2:ff
- **DNS-over-HTTPS**: https://family.adguard-dns.com/dns-query
- **DNS-over-TLS**: tls://family.adguard-dns.com
- **DNS-over-QUIC**: quic://family.adguard-dns.com
- **DNSCrypt, IPv4**: Provider: `2.dnscrypt.family.ns1.adguard.com` IP: `94.140.14.15:5443`
- **DNSCrypt, IPv6**: Provider: `2.dnscrypt.family.ns1.adguard.com` IP: `[2a10:50c0::bad1:ff]:5443`

### 无过滤版

- **DNS, IPv4**: 94.140.14.140 / 94.140.14.141
- **DNS, IPv6**: 2a10:50c0::1:ff / 2a10:50c0::2:ff
- **DNS-over-HTTPS**: https://unfiltered.adguard-dns.com/dns-query
- **DNS-over-TLS**: tls://unfiltered.adguard-dns.com
- **DNS-over-QUIC**: quic://unfiltered.adguard-dns.com
- **DNSCrypt, IPv4**: Provider: `2.dnscrypt.unfiltered.ns1.adguard.com` IP: `94.140.14.140:5443`
- **DNSCrypt, IPv6**: Provider: `2.dnscrypt.unfiltered.ns1.adguard.com` IP: `[2a10:50c0::1:ff]:5443`

---

## Caliph DNS

- **DNS, IPv4**: 160.19.167.150
- **DNS, IPv6**: 2001:df7:5300:3::51e
- **DNS-over-HTTPS**: https://dns.caliph.dev/dns-query
- **DNS-over-TLS**: tls://dns.caliph.dev:853
- **DNS-over-QUIC**: quic://dns.caliph.dev:853

---

## BebasDNS by BebasID

### 默认版 (阻止广告、恶意软件和网络钓鱼)

- **DNS-over-HTTPS**: https://dns.bebasid.com/dns-query
- **DNS-over-TLS**: tls://dns.bebasid.com:853
- **DNSCrypt, IPv4**: Provider: `2.dnscrypt-cert.dns.bebasid.com` IP: `103.87.68.194:8443`

### 无过滤版

- **DNS-over-HTTPS**: https://dns.bebasid.com/unfiltered
- **DNS-over-TLS**: tls://unfiltered.dns.bebasid.com:853

### 安全版 (仅阻止恶意软件和网络钓鱼)

- **DNS-over-HTTPS**: https://antivirus.bebasid.com/dns-query
- **DNS-over-TLS**: tls://antivirus.bebasid.com:853

### 家庭版 (阻止色情、赌博、仇恨网站、恶意软件和网络钓鱼)

- **DNS-over-HTTPS**: https://internetsehat.bebasid.com/dns-query
- **DNS-over-TLS**: tls://internetsehat.bebasid.com:853
- **DNSCrypt, IPv4**: Provider: `2.dnscrypt-cert.internetsehat.bebasid.com` IP: `103.87.68.196:8443`

### 家庭版 + 广告拦截

- **DNS-over-HTTPS**: https://internetsehat.bebasid.com/adblock
- **DNS-over-TLS**: tls://family-adblock.bebasid.com:853

### OISD 过滤器版

- **DNS-over-HTTPS**: https://dns.bebasid.com/dns-oisd
- **DNS-over-TLS**: tls://oisd.dns.bebasid.com:853

### Hagezi Multi Normal 过滤器版

- **DNS-over-HTTPS**: https://dns.bebasid.com/dns-hagezi
- **DNS-over-TLS**: tls://hagezi.dns.bebasid.com:853

---

## CFIEC Public DNS

- **DNS, IPv6**: 240C::6666 / 240C::6644
- **DNS-over-HTTPS**: https://dns.cfiec.net/dns-query
- **DNS-over-TLS**: tls://dns.cfiec.net

---

## Cisco OpenDNS

### 标准版 (阻止恶意软件)

- **DNS, IPv4**: 208.67.222.222 / 208.67.220.220
- **DNS, IPv6**: 2620:119:35::35 / 2620:119:53::53
- **DNSCrypt, IPv4**: Provider: `2.dnscrypt-cert.opendns.com` IP: `208.67.220.220`
- **DNSCrypt, IPv6**: Provider: `2.dnscrypt-cert.opendns.com` IP: `[2620:0:ccc::2]`
- **DNS-over-HTTPS**: https://doh.opendns.com/dns-query
- **DNS-over-TLS**: tls://dns.opendns.com

### FamilyShield (阻止成人内容)

- **DNS, IPv4**: 208.67.222.123 / 208.67.220.123
- **DNSCrypt, IPv4**: Provider: `2.dnscrypt-cert.opendns.com` IP: `208.67.220.123`
- **DNS-over-HTTPS**: https://doh.familyshield.opendns.com/dns-query
- **DNS-over-TLS**: tls://familyshield.opendns.com

### Sandbox (无过滤)

- **DNS, IPv4**: 208.67.222.2 / 208.67.220.2
- **DNS, IPv6**: 2620:0:ccc::2 / 2620:0:ccd::2
- **DNS-over-HTTPS**: https://doh.sandbox.opendns.com/dns-query
- **DNS-over-TLS**: tls://sandbox.opendns.com

---

## CleanBrowsing

### 家庭版过滤器 (阻止成人、色情和露骨内容)

- **DNS, IPv4**: 185.228.168.168 / 185.228.169.168
- **DNS, IPv6**: 2a0d:2a00:1:: / 2a0d:2a00:2::
- **DNSCrypt, IPv4**: Provider: `cleanbrowsing.org` IP: `185.228.168.168:8443`
- **DNSCrypt, IPv6**: Provider: `cleanbrowsing.org` IP: `[2a0d:2a00:1::]:8443`
- **DNS-over-HTTPS**: https://doh.cleanbrowsing.org/doh/family-filter/
- **DNS-over-TLS**: tls://family-filter-dns.cleanbrowsing.org

### 成人过滤器 (仅阻止成人内容和恶意/网络钓鱼域)

- **DNS, IPv4**: 185.228.168.10 / 185.228.169.11
- **DNS, IPv6**: 2a0d:2a00:1::1 / 2a0d:2a00:2::1
- **DNSCrypt, IPv4**: Provider: `cleanbrowsing.org` IP: `185.228.168.10:8443`
- **DNSCrypt, IPv6**: Provider: `cleanbrowsing.org` IP: `[2a0d:2a00:1::1]:8443`
- **DNS-over-HTTPS**: https://doh.cleanbrowsing.org/doh/adult-filter/
- **DNS-over-TLS**: tls://adult-filter-dns.cleanbrowsing.org

### 安全过滤器 (阻止网络钓鱼、垃圾邮件和恶意域)

- **DNS, IPv4**: 185.228.168.9 / 185.228.169.9
- **DNS, IPv6**: 2a0d:2a00:1::2 / 2a0d:2a00:2::2
- **DNS-over-HTTPS**: https://doh.cleanbrowsing.org/doh/security-filter/
- **DNS-over-TLS**: tls://security-filter-dns.cleanbrowsing.org

---

## Comodo Secure DNS

- **DNS, IPv4**: 8.26.56.26 / 8.20.247.20
- **DNSCrypt, IPv4**: Provider: `2.dnscrypt-cert.shield-2.dnsbycomodo.com` IP: `8.20.247.2`

---

## ControlD

### 无过滤

- **DNS, IPv4**: 76.76.2.0 / 76.76.10.0
- **DNS, IPv6**: 2606:1a40:: / 2606:1a40:1::
- **DNS-over-HTTPS**: https://freedns.controld.com/p0
- **DNS-over-TLS**: tls://p0.freedns.controld.com

### 拦截恶意软件

- **DNS, IPv4**: 76.76.2.1
- **DNS-over-HTTPS**: https://freedns.controld.com/p1
- **DNS-over-TLS**: tls://p1.freedns.controld.com

### 阻止恶意软件和广告

- **DNS, IPv4**: 76.76.2.2
- **DNS-over-HTTPS**: https://freedns.controld.com/p2
- **DNS-over-TLS**: tls://p2.freedns.controld.com

### 拦截恶意软件 + 广告 + 社交媒体

- **DNS, IPv4**: 76.76.2.3
- **DNS-over-HTTPS**: https://freedns.controld.com/p3
- **DNS-over-TLS**: tls://p3.freedns.controld.com

---

## DeCloudUs DNS

- **DNSCrypt, IPv4**: Provider: `2.dnscrypt-cert.DeCloudUs-test` IP: `78.47.212.211:9443`
- **DNSCrypt, IPv6**: Provider: `2.dnscrypt-cert.DeCloudUs-test` IP: `[2a01:4f8:13a:250b::30]:9443`
- **DNS-over-HTTPS**: https://dns.decloudus.com/dns-query
- **DNS-over-TLS**: tls://dns.decloudus.com

---

## DNS Privacy

### 由 Stubby 开发者运行

- **DNS-over-TLS**: Hostname: `tls://getdnsapi.net` IP: `185.49.141.37` IPv6: `2a04:b900:0:100::37`
- **DNS-over-TLS**: Provider: `Surfnet` Hostname: `tls://dnsovertls.sinodun.com` IP: `145.100.185.15` IPv6: `2001:610:1:40ba:145:100:185:15`
- **DNS-over-TLS**: Provider: `Surfnet` Hostname: `tls://dnsovertls1.sinodun.com` IP: `145.100.185.16` IPv6: `2001:610:1:40ba:145:100:185:16`

### 零日志政策的DNS服务器

- **DNS-over-TLS**: Provider: `UncensoredDNS` Hostname: `tls://unicast.censurfridns.dk` IP: `89.233.43.71` IPv6: `2a01:3a0:53:53::0`
- **DNS-over-TLS**: Provider: `UncensoredDNS` Hostname: `tls://anycast.censurfridns.dk` IP: `91.239.100.100` IPv6: `2001:67c:28a4::`
- **DNS-over-TLS**: Provider: `dkg` Hostname: `tls://dns.cmrg.net` IP: `199.58.81.218` IPv6: `2001:470:1c:76d::53`
- **DNS-over-TLS**: Hostname: `tls://dns.larsdebruin.net` IP: `51.15.70.167`
- **DNS-over-TLS**: Hostname: `tls://dns-tls.bitwiseshift.net` IP: `81.187.221.24` IPv6: `2001:8b0:24:24::24`
- **DNS-over-TLS**: Hostname: `tls://ns1.dnsprivacy.at` IP: `94.130.110.185` IPv6: `2a01:4f8:c0c:3c03::2`
- **DNS-over-TLS**: Hostname: `tls://ns2.dnsprivacy.at` IP: `94.130.110.178` IPv6: `2a01:4f8:c0c:3bfc::2`
- **DNS-over-TLS**: Hostname: `tls://dns.bitgeek.in` IP: `139.59.51.46`
- **DNS-over-TLS**: Hostname: `tls://dns.neutopia.org` IP: `89.234.186.112` IPv6: `2a00:5884:8209::2`
- **DNS-over-TLS**: Provider: `Go6Lab` Hostname: `tls://privacydns.go6lab.si` IPv6: `2001:67c:27e4::35`
- **DNS-over-TLS**: Hostname: `tls://dot.securedns.eu` IP: `146.185.167.43` IPv6: `2a03:b0c0:0:1010::e9a:3001`

### 最低限度日志记录/限制的DNS服务器

- **DNS-over-TLS**: Provider: `NIC Chile` Hostname: `tls://dnsotls.lab.nic.cl` IP: `200.1.123.46` IPv6: `2001:1398:1:0:200:1:123:46`
- **DNS-over-TLS**: Provider: `OARC` Hostname: `tls://tls-dns-u.odvr.dns-oarc.net` IP: `184.105.193.78` IPv6: `2620:ff:c000:0:1::64:25`

---

## DNS.SB

- **DNS, IPv4**: 185.222.222.222 / 45.11.45.11
- **DNS, IPv6**: 2a09:: / 2a11::
- **DNS-over-HTTPS**: https://doh.dns.sb/dns-query
- **DNS-over-TLS**: tls://dot.sb

---

## DNSPod Public DNS+ (腾讯DNS)

- **DNS, IPv4**: 119.29.29.29
- **DNS, IPv6**: 2402:4e00::
- **DNS-over-HTTPS**: https://dns.pub/dns-query / https://sm2.doh.pub/dns-query (国密SM2)
- **DNS-over-TLS**: tls://dot.pub

---

## DNSWatchGO

- **DNS, IPv4**: 54.174.40.213 / 52.3.100.184

---

## Dyn DNS

- **DNS, IPv4**: 216.146.35.35 / 216.146.36.36

---

## Freenom World

- **DNS, IPv4**: 80.80.80.80 / 80.80.81.81

---

## Hurricane Electric Public Recursor

- **DNS, IPv4**: 74.82.42.42
- **DNS, IPv6**: 2001:470:20::2
- **DNS-over-HTTPS**: https://ordns.he.net/dns-query
- **DNS-over-TLS**: tls://ordns.he.net

---

## Mullvad

### 无过滤

- **DNS-over-HTTPS**: https://dns.mullvad.net/dns-query
- **DNS-over-TLS**: tls://dns.mullvad.net

### 广告拦截

- **DNS-over-HTTPS**: https://adblock.dns.mullvad.net/dns-query
- **DNS-over-TLS**: tls://adblock.dns.mullvad.net

### 广告 + 恶意软件拦截

- **DNS-over-HTTPS**: https://base.dns.mullvad.net/dns-query
- **DNS-over-TLS**: tls://base.dns.mullvad.net

### 广告 + 恶意软件 + 社交媒体拦截

- **DNS-over-HTTPS**: https://extended.dns.mullvad.net/dns-query
- **DNS-over-TLS**: tls://extended.dns.mullvad.net

### 广告 + 恶意软件 + 成人 + 赌博拦截

- **DNS-over-HTTPS**: https://family.dns.mullvad.net/dns-query
- **DNS-over-TLS**: tls://family.dns.mullvad.net

### 广告 + 恶意软件 + 成人 + 赌博 + 社交媒体拦截

- **DNS-over-HTTPS**: https://all.dns.mullvad.net/dns-query
- **DNS-over-TLS**: tls://all.dns.mullvad.net

---

## Nawala Childprotection DNS

- **DNS, IPv4**: 180.131.144.144 / 180.131.145.145
- **DNSCrypt, IPv4**: Provider: `2.dnscrypt-cert.nawala.id` IP: `180.131.144.144`

---

## Neustar Recursive DNS

### 可靠性和性能 1 (无阻止)

- **DNS, IPv4**: 156.154.70.1 / 156.154.71.1
- **DNS, IPv6**: 2610:a1:1018::1 / 2610:a1:1019::1

### 可靠性和性能 2 (无阻止 + 防止NXDomain重定向)

- **DNS, IPv4**: 156.154.70.5 / 156.154.71.5
- **DNS, IPv6**: 2610:a1:1018::5 / 2610:a1:1019::5

### 威胁防护 (阻止恶意域)

- **DNS, IPv4**: 156.154.70.2 / 156.154.71.2
- **DNS, IPv6**: 2610:a1:1018::2 / 2610:a1:1019::2

### 家庭版保护 (阻止成人内容)

- **DNS, IPv4**: 156.154.70.3 / 156.154.71.3
- **DNS, IPv6**: 2610:a1:1018::3 / 2610:a1:1019::3

### 商业安全 (阻止不需要的内容)

- **DNS, IPv4**: 156.154.70.4 / 156.154.71.4
- **DNS, IPv6**: 2610:a1:1018::4 / 2610:a1:1019::4

---

## NextDNS

### 超低延迟

- **DNS-over-HTTPS**: https://dns.nextdns.io/dns-query
- **DNS-over-TLS**: tls://dns.nextdns.io

### Anycast

- **DNS-over-HTTPS**: https://anycast.dns.nextdns.io/dns-query
- **DNS-over-TLS**: tls://anycast.dns.nextdns.io

---

## OpenBLD.net DNS

### Adaptive Filtering (ADA)

- **DNS-over-HTTPS**: https://ada.openbld.net/dns-query
- **DNS-over-TLS**: tls://ada.openbld.net

### Strict Filtering (RIC)

- **DNS-over-HTTPS**: https://ric.openbld.net/dns-query
- **DNS-over-TLS**: tls://ric.openbld.net

---

## Quad9 DNS

### 标准版 (阻止网络钓鱼和间谍软件)

- **DNS, IPv4**: 9.9.9.9 / 149.112.112.112
- **DNS, IPv6**: 2620:fe::fe / 2620:fe::9
- **DNSCrypt, IPv4**: Provider: `2.dnscrypt-cert.quad9.net` IP: `9.9.9.9:8443`
- **DNSCrypt, IPv6**: Provider: `2.dnscrypt-cert.quad9.net` IP: `[2620:fe::fe]:8443`
- **DNS-over-HTTPS**: https://dns.quad9.net/dns-query
- **DNS-over-TLS**: tls://dns.quad9.net

### 不安全版 (无安全阻止列表、无DNSSEC)

- **DNS, IPv4**: 9.9.9.10 / 149.112.112.10
- **DNS, IPv6**: 2620:fe::10 / 2620:fe::fe:10
- **DNSCrypt, IPv4**: Provider: `2.dnscrypt-cert.quad9.net` IP: `9.9.9.10:8443`
- **DNSCrypt, IPv6**: Provider: `2.dnscrypt-cert.quad9.net` IP: `[2620:fe::fe:10]:8443`
- **DNS-over-HTTPS**: https://dns10.quad9.net/dns-query
- **DNS-over-TLS**: tls://dns10.quad9.net

### ECS支持版 (包含EDNS Client Subnet)

- **DNS, IPv4**: 9.9.9.11 / 149.112.112.11
- **DNS, IPv6**: 2620:fe::11 / 2620:fe::fe:11
- **DNSCrypt, IPv4**: Provider: `2.dnscrypt-cert.quad9.net` IP: `9.9.9.11:8443`
- **DNSCrypt, IPv6**: Provider: `2.dnscrypt-cert.quad9.net` IP: `[2620:fe::11]:8443`
- **DNS-over-HTTPS**: https://dns11.quad9.net/dns-query
- **DNS-over-TLS**: tls://dns11.quad9.net

---

## Quadrant Security

- **DNS-over-HTTPS**: https://doh.qis.io/dns-query
- **DNS-over-TLS**: tls://dns-tls.qis.io

---

## Rabbit DNS

### 无过滤

- **DNS-over-HTTPS**: https://dns.rabbitdns.org/dns-query

### Security-filtering

- **DNS-over-HTTPS**: https://security.rabbitdns.org/dns-query

### Family-filtering

- **DNS-over-HTTPS**: https://family.rabbitdns.org/dns-query

---

## Wikimedia DNS

- **DNS-over-HTTPS**: https://wikimedia-dns.org/dns-query
- **DNS-over-TLS**: Hostname: `wikimedia-dns.org` IP: `185.71.138.138` and IPv6: `2001:67c:930::1`

---

# 校园DNS服务器

## 北京邮电大学 IPv6 DNS

- **DNS, IPv6**: 2001:da8:202:10::36 / 2001:da8:202:10::37
- **说明**: 非教育网无法解析,非本校教育网也无法使用

---

## 重庆邮电大学 DNS

- **DNS, IPv4**: 202.202.32.34 / 202.202.32.33
- Provider: cqupts2.cqupt.edu.cn

---

## 上海交通大学 DNS

- **DNS, IPv4**: 202.120.2.100 / 202.120.2.101
- **DNS, IPv6**: 2001:da8:8000:1:202:120:2:100 / 2001:da8:8000:1:202:120:2:101
- **说明**: 现在校外无法使用

---

## 清华大学 TUNA 协会 DNS

- **DNS, IPv4**: 101.6.6.6 / 101.6.6.191 (校外无法解析)
- **DNS, IPv6**: 2001:da8::666 (已停止解析或校外无法使用) / 2402:f000:1:416:101:6:6:6 (校外可用)
- **DoH**: https://101.6.6.6:8443/dns-query (如果IPv4校外无法解析,此DoH可能也无法使用)

---

## 北京科技大学 IPv6 DNS

- **DNS, IPv6**: 2001:da8:208:10::6
- **说明**: 非教育网无法解析

---

## 中国科技网 DNS

- **DNS, IPv4**: 159.226.8.6 / 159.226.8.7
- **DNS, IPv6**: 2001:cc0::1 (非本校教育网可用) / 2001:cc0:2fff:2::6 (仅本校教育网可用)
- **说明**: 非教育网无法解析

---

# 参考来源

- 已知的 DNS 提供商 - https://adguard-dns.io/kb/zh-CN/general/dns-providers/
- 免费公共 DNS 服务器大全 - https://dns.icoa.cn/

:::caution
**版权声明**  
本文档整理的信息仅供个人学习和参考使用。  
其部分引用内容版权归原作者所有。其他内容遵守 CC BY-NC-SA 4.0 许可协议。  
如需使用本文部分受保护内容，严禁在本网站转载、传播或用于商业用途，请访问原网站。  
如您下载本文档，请在24小时内删除。
:::

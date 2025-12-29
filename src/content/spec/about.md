<style>
  :root {
    --bg: #b89f92;
    --card: #583f40;
    --muted: rgba(255, 255, 255, 0.85);
    --accent: #fff;
    --gap: 18px;
    --radius: 6px;
  }

  .about-wrap {
    display: flex;
    align-items: flex-start;
    gap: 40px;
    padding: 48px 36px;
    background: var(--bg);
    color: var(--muted);
  }

  .avatar {
    width: 260px;
    height: 260px;
    border-radius: 50%;
    box-shadow: 0 6px 0 rgba(0, 0, 0, 0.08), 0 0 0 10px rgba(255, 255, 255, 0.16);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .profile {
    flex: 1;
    padding-top: 18px;
  }

  .hi {
    font-size: 42px;
    font-weight: 700;
    margin: 0 0 6px 0;
    color: var(--accent);
    text-shadow: 0 2px 0 rgba(0, 0, 0, 0.15);
  }

  .sub {
    font-size: 28px;
    margin: 0 0 22px 0;
    opacity: 0.95;
    line-height: 1.1;
  }

  .meta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 14px 18px;
    margin-bottom: 18px;
    align-items: center;
  }

  .badge {
    background: var(--card);
    color: var(--accent);
    padding: 12px 18px;
    border-radius: 4px;
    display: inline-flex;
    gap: 10px;
    align-items: center;
    box-shadow: 0 3px 0 rgba(0, 0, 0, 0.08);
    font-weight: 600;
    font-size: 16px;
  }

  .badge .icon {
    opacity: 0.95;
    font-size: 18px
  }

  .section-title {
    color: var(--accent);
    opacity: 0.9;
    margin: 18px 0 8px 0;
    font-weight: 700;
    text-transform: lowercase;
    font-size: 13px;
  }

  .platforms {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-top: 6px
  }

  .platforms .badge {
    padding: 10px 16px;
    font-size: 15px
  }

  .small {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.85);
    margin-top: 18px;
    line-height: 1.6;
    max-width: 760px;
  }

  @media(max-width:920px) {
    .about-wrap {
      flex-direction: column;
      align-items: center;
      padding: 28px;
    }

    .avatar {
      width: 180px;
      height: 180px;
      flex: 0 0 180px
    }

    .hi {
      font-size: 32px;
      text-align: center
    }

    .sub {
      text-align: center;
      font-size: 18px
    }

    .profile {
      padding-top: 8px
    }
  }
</style>
<div class="about-wrap">
  <div class="avatar">
    <img src="/assets/images/avatar.jpg" alt="avatar">
  </div>
  <div class="profile">
    <h1 class="hi">Hi there, it's Loli~</h1>
    <div class="sub">呜嘿~这里是洛璃 _( ᗜ ‸ ᗜ )_</div>
    <div>若每个「再见」都是未完成式…那我们的对白，就注定是首永远押着韵的十四行诗呀♪</div>
    <div class="section-title">home</div>
    <div class="meta-row">
      <div class="badge"><span class="icon">📍</span> Ciallo <strong
          style="margin-left:8px;opacity:0.95">blog.cialo.site</strong></div>
    </div>
    <div class="section-title">timezone &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; editor</div>
    <div class="meta-row">
      <div class="badge"><span class="icon">🌐</span> UTC +8</div>
      <div class="badge"><span class="icon">⚙️</span> VSCode</div>
    </div>
    <div class="section-title">indentation</div>
    <div class="meta-row">
      <div class="badge"><span class="icon">»</span> 4 spaces</div>
    </div>
    <div class="section-title">platforms</div>
    <div class="platforms">
      <div class="badge"><span class="icon">🪟</span> Windows 11 25H2</div>
      <div class="badge"><span class="icon">🤖</span> Android 16</div>
      <div class="badge"><span class="icon">🐧</span> Arch Linux</div>
    </div>
    <p class="small">
      pass
    </p>
  </div>
</div>

---

# 🛠️ 关于本站

本网站使用 **Astro** 框架构建，采用了 [Firefly](https://github.com/CuteLeaf/Firefly) 模板，Firefly 是基于 [Fuwari](https://github.com/saicaca/fuwari) 的二次开发，所有源代码采用 MIT 协议开源在 GitHub 上。

::github{repo="CuteLeaf/Firefly"}

::github{repo="saicaca/fuwari"}

*感谢你的来访！希望在这里能找到对你有用的内容！*

# 🔒 隐私政策

我们非常重视您的隐私：

* 本站完全静态，不主动收集或存储用户数据。
* 不使用 cookies，也不包含第三方跟踪或分析服务。
* 用户偏好（如主题选择）保存在本地浏览器中。
* 托管服务商可能保留标准访问日志（如 IP 地址、浏览器类型），但这并非本站主动收集。

# 🎮 No Game No Life

![Star Rail Info](https://sr-card.qiusyan.top/116153827?theme=auto&logo=28)

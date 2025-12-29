---
title: Firefly 简易指南
published: 2025-12-29
updated: 2025-12-29
description: "如何使用这个博客模板。"
image: "./cover.jpeg"
tags: [Fuwari, Blogging, blog, markdown, guide, firefly, md, 个性化, 指南, 博客]
category: misc
draft: false
---

> 封面图片来源: [Source](<https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/208fc754-890d-4adb-9753-2c963332675d/width=2048/01651-1456859105-(colour_1.5),girl,_Blue,yellow,green,cyan,purple,red,pink,_best,8k,UHD,masterpiece,male%20focus,%201boy,gloves,%20ponytail,%20long%20hair,.jpeg>)

此博客模板基于 [Astro](https://astro.build/) 构建。若本指南未提及某些内容，你可在 [Astro Docs](https://docs.astro.build/) 中找到答案。

# 文章的 Front-matter

```yaml
---
title: 我的第一篇博客文章
published: 2023-09-09
description: 这是我新 Astro 博客的第一篇文章。
image: ./cover.jpg
tags: [前端, 开发]
category: 前端开发
draft: false
---
```


| 属性          | 描述                                                                                                                                                                                                 |
|---------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `title`       | 文章标题。                                                                                                                                                                                          |
| `published`   | 文章发布日期。                                                                                                                                                                                      |
| `pinned`      | 是否将此文章置顶在文章列表顶部。                                                                                                                                                                    |
| `description` | 文章的简短描述。显示在首页上。                                                                                                                                                                      |
| `image`       | 文章封面图片路径。<br/>1. 以 `http://` 或 `https://` 开头：使用网络图片<br/>2. 以 `/` 开头：`public` 目录中的图片<br/>3. 不带任何前缀：相对于 markdown 文件的路径 |
| `tags`        | 文章标签。                                                                                                                                                                                          |
| `category`    | 文章分类。                                                                                                                                                                                          |
| `licenseName` | 文章内容的许可证名称。                                                                                                                                                                              |
| `author`      | 文章作者。                                                                                                                                                                                          |
| `sourceLink`  | 文章内容的来源链接或参考。                                                                                                                                                                          |
| `draft`       | 如果这篇文章仍是草稿，则不会显示。                                                                                                                                                                  |
| `slug`        | 自定义文章 URL 路径。如果不设置，将使用文件名作为 URL。                                                                                                                                              |

# 文章文件应放置的位置

文章文件应放在 `src/content/posts/` 目录中。你也可以创建子目录来更好地组织文章及其资源。

```
src/content/posts/
├── post-1.md
└── post-2/
    ├── cover.png
    └── index.md
```


# 自定义文章 URL (Slug)

## 什么是 Slug？

Slug 是文章 URL 路径的自定义部分。如果不设置 slug，系统将使用文件名作为 URL。

## Slug 使用示例

### 示例 1：使用文件名作为 URL
```yaml
---
title: 我的第一篇博客文章
published: 2023-09-09
---
```
文件：`src/content/posts/my-first-blog-post.md`
URL：`/posts/my-first-blog-post`

### 示例 2：自定义 Slug
```yaml
---
title: 我的第一篇博客文章
published: 2023-09-09
slug: hello-world
---
```
文件：`src/content/posts/my-first-blog-post.md`
URL：`/posts/hello-world`

### 示例 3：中文标题使用英文 Slug
```yaml
---
title: 如何使用 Firefly 博客主题
published: 2023-09-09
slug: how-to-use-firefly-blog-theme
---
```
文件：`src/content/posts/firefly-guide.md`
URL：`/posts/how-to-use-firefly-blog-theme`

## Slug 使用建议

1. **使用英文和连字符**：`my-awesome-post` 而不是 `my awesome post`
2. **保持简洁**：避免过长的 slug
3. **具有描述性**：让 URL 能够反映文章内容
4. **避免特殊字符**：只使用字母、数字和连字符
5. **保持一致性**：在整个博客中使用相似的命名模式

## 注意事项

- Slug 一旦设置并发布，建议不要随意更改，以免影响 SEO 和已存在的链接
- 如果多个文章使用相同的 slug，后面的文章会覆盖前面的
- Slug 会自动转换为小写

# GitHub Repository Cards

你可以添加动态卡片来链接 GitHub 仓库，在页面加载时，仓库信息会从 GitHub API 拉取。

::github{repo="Fabrizz/MMM-OnSpotify"}

使用代码 `::github{repo="<owner>/<repo>"}` 来创建一个 GitHub 仓库卡片。

```markdown
::github{repo="saicaca/fuwari"}
```

# Admonitions

支持以下类型的提示框：`note` `tip` `important` `warning` `caution`

## Basic Syntax

```markdown
:::note
强调用户即使在快速浏览时也应该注意的信息。
:::

:::tip
可选信息，用于帮助用户更好地完成操作。
:::
```

## Custom Titles

提示框的标题可以自定义。

```markdown
:::note[MY CUSTOM TITLE]
这是一个带有自定义标题的 note。
:::
```

## GitHub Syntax

> [!TIP] > [GitHub 风格语法](https://github.com/orgs/community/discussions/16925) 同样被支持。

```
> [!NOTE]
> The GitHub syntax is also supported.

> [!TIP]
> The GitHub syntax is also supported.
```

## Spoiler

你可以在文字中添加剧透隐藏区块。内容也支持 **Markdown** 语法。

The content :spoiler[is hidden **ayyy**]!

```markdown
The content :spoiler[is hidden **ayyy**]!
```

---

# 代码块示例

这里展示使用 [Expressive Code](https://expressive-code.com/) 时代码块的外观。以下示例基于官方文档，你可以参考文档获取更多信息。

## 表达性代码

### 语法高亮

[语法高亮](https://expressive-code.com/key-features/syntax-highlighting/)

#### 常规语法高亮

```js
console.log('此代码有语法高亮!')
```

#### 渲染 ANSI 转义序列


```ansi
ANSI 颜色:
- 普通: [31m红[0m [32m绿[0m [33m黄[0m [34m蓝[0m [35m品红[0m [36m青[0m
- 加粗: [1;31m红[0m [1;32m绿[0m [1;33m黄[0m [1;34m蓝[0m [1;35m品红[0m [1;36m青[0m
- 暗淡: [2;31m红[0m [2;32m绿[0m [2;33m黄[0m [2;34m蓝[0m [2;35m品红[0m [2;36m青[0m

256 色（示例颜色 160–177）:
[38;5;160m160 [38;5;161m161 [38;5;162m162 [38;5;163m163 [38;5;164m164 [38;5;165m165[0m
[38;5;166m166 [38;5;167m167 [38;5;168m168 [38;5;169m169 [38;5;170m170 [38;5;171m171[0m
[38;5;172m172 [38;5;173m173 [38;5;174m174 [38;5;175m175 [38;5;176m176 [38;5;177m177[0m

完整 RGB 色:
[38;2;34;139;34m森林绿 - RGB(34, 139, 34)[0m

文本格式: [1m加粗[0m [2m暗淡[0m [3m斜体[0m [4m下划线[0m
```

### 编辑器和终端框架

[编辑器和终端框架](https://expressive-code.com/key-features/frames/)

#### 代码编辑器框架

```js title="my-test-file.js"
console.log('标题属性示例')
```

---

```html
<!-- src/content/index.html -->
<div>文件名注释示例</div>
```

#### 终端框架

```bash
echo "这个终端窗口没有标题"
```

---

```powershell title="PowerShell 终端示例"
Write-Output "这个终端窗口有标题！"
```

#### 覆盖框架类型

```sh frame="none"
echo "看，我没有外框！"
```

---

```ps frame="code" title="PowerShell Profile.ps1"
# 如果不覆盖，这段会显示为终端框架
function Watch-Tail { Get-Content -Tail 20 -Wait $args }
New-Alias tail Watch-Tail
```

### 文本和行标记

[文本和行标记](https://expressive-code.com/key-features/text-markers/)

#### 标记整行和行范围

```js {1, 4, 7-8}
// 行 1 - 由行号标记
// 行 2
// 行 3
// 行 4 - 由行号标记
// 行 5
// 行 6
// 行 7 - 由范围 "7-8" 标记
// 行 8 - 由范围 "7-8" 标记
```

#### 选择行标记类型 (mark, ins, del)

```js title="line-markers.js" del={2} ins={3-4} {6}
function demo() {
  console.log("此行被标记为删除");
  // 这行和下一行被标记为插入
  console.log("这是第二行插入内容");

  return "此行使用默认标记类型";
}
```

#### 为行标记添加标签

```jsx {"1":5} del={"2":7-8} ins={"3":10-12}
// labeled-line-markers.jsx
<button
  role="button"
  {...props}
  value={value}
  className={buttonClassName}
  disabled={disabled}
  active={active}
>
  {children &&
    !active &&
    (typeof children === "string" ? <span>{children}</span> : children)}
</button>
```

#### 在单独行上添加长标签

```jsx {"1. 在这里提供 value 属性:":5-6} del={"2. 移除 disabled 和 active 状态:":8-10} ins={"3. 添加此内容以在按钮中渲染 children:":12-15}
// labeled-line-markers.jsx
<button
  role="button"
  {...props}
  value={value}
  className={buttonClassName}
  disabled={disabled}
  active={active}
>
  {children &&
    !active &&
    (typeof children === "string" ? <span>{children}</span> : children)}
</button>
```

#### 使用类似 diff 的语法

```diff
+这行将被标记为插入
-这行将被标记为删除
这是一行普通文本
```

---

```diff
--- a/README.md
+++ b/README.md
@@ -1,3 +1,4 @@
+这是一份真实的 diff 文件
-所有内容将保持不变
 不会移除任何空白字符
```

#### 结合语法高亮和类似 diff 的语法

```diff lang="js"
  function thisIsJavaScript() {
    // 这一整个代码块仍会按 JavaScript 高亮，
    // 同时仍可应用 diff 标记！
-   console.log('旧代码，将被移除')
+   console.log('新的、更好的代码！')
  }
```

#### 标记行内的单独文本

```js "given text"
function demo() {
  // 可标记行内任意指定文本
  return "支持标记指定文本的多个匹配项";
}
```

#### 正则表达式

```ts /ye[sp]/
console.log("单词 yes 和 yep 会被标记。");
```

#### 转义正斜杠

```sh //ho.*//
echo "Test" > /home/test.txt
```

#### 选择内联标记类型 (mark, ins, del)

```js "return true;" ins="inserted" del="deleted"
function demo() {
  console.log("这些是插入与删除标记类型");
  // return 语句使用默认标记类型
  return true;
}
```

### 自动换行

[自动换行](https://expressive-code.com/key-features/word-wrap/)

#### 为每个块配置自动换行

```js wrap
// wrap 示例
function getLongString() {
  return "这是一段非常长的字符串，如果容器不够宽，几乎不可能完全显示";
}
```

---

```js wrap=false
// wrap=false 示例
function getLongString() {
  return "这是一段非常长的字符串，如果容器不够宽，几乎不可能完全显示";
}
```

#### 配置换行的缩进

```js wrap preserveIndent
// preserveIndent 示例（默认启用）
function getLongString() {
  return "这是一段非常长的字符串，如果容器不够宽，几乎不可能完全显示";
}
```

---

```js wrap preserveIndent=false
// preserveIndent=false 示例
function getLongString() {
  return "这是一段非常长的字符串，如果容器不够宽，几乎不可能完全显示";
}
```

## 可折叠部分

[可折叠部分](https://expressive-code.com/plugins/collapsible-sections/)

```js collapse={1-5, 12-14, 21-24}
// 下方这些样板设置代码将被折叠
import { someBoilerplateEngine } from "@example/some-boilerplate";
import { evenMoreBoilerplate } from "@example/even-more-boilerplate";

const engine = someBoilerplateEngine(evenMoreBoilerplate());

// 这一部分将默认显示
engine.doSomething(1, 2, 3, calcFn);

function calcFn() {
  // 你可以拥有多个折叠区块
  const a = 1;
  const b = 2;
  const c = a + b;

  // 这一部分保持可见
  console.log(`计算结果: ${a} + ${b} = ${c}`);
  return c;
}

// 直到块末尾的所有代码将再次被折叠
engine.closeConnection();
engine.freeMemory();
engine.shutdown({ reason: "样板代码示例结束" });
```

## 行号

[行号](https://expressive-code.com/plugins/line-numbers/)

### 为每个块显示行号

```js showLineNumbers
// 此代码块将显示行号
console.log("来自第 2 行的问候！");
console.log("我在第 3 行");
```

```js showLineNumbers=false
// 此代码块禁用行号
console.log("有人吗？");
console.log("呃，我在第几行？");
```

### 更改起始行号

```js showLineNumbers startLineNumber=5
console.log("来自第 5 行的问候！");
console.log("我在第 6 行");
```

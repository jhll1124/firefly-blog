---
title: Fuwari 简易指南
published: 2024-04-01
updated: 2025-11-16
description: "如何使用这个博客模板。"
image: "./cover.jpeg"
tags: [Fuwari, Blogging, blog, markdown, md, 个性化, 指南, 博客]
category: misc
draft: false
---

> 封面图片来源: [Source](<https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/208fc754-890d-4adb-9753-2c963332675d/width=2048/01651-1456859105-(colour_1.5),girl,_Blue,yellow,green,cyan,purple,red,pink,_best,8k,UHD,masterpiece,male%20focus,%201boy,gloves,%20ponytail,%20long%20hair,.jpeg>)

此博客模板基于 [Astro](https://astro.build/) 构建。若本指南未提及某些内容，你可在 [Astro Docs](https://docs.astro.build/) 中找到答案。

## 文章的 Front-matter

```yaml
---
title: My First Blog Post
published: 2023-09-09
description: This is the first post of my new Astro blog.
image: ./cover.jpg
tags: [Foo, Bar]
category: Front-end
draft: false
---
```

| Attribute     | Description                                                                                                                                                            |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`       | 文章标题。                                                                                                                                                             |
| `published`   | 文章发布日期。                                                                                                                                                         |
| `description` | 文章的简短描述，会显示在首页。                                                                                                                                         |
| `image`       | 文章封面图片路径。<br/>1. 以 `http://` 或 `https://` 开头：使用网络图片<br/>2. 以 `/` 开头：使用 `public` 目录中的图片<br/>3. 若无前缀：相对于当前 markdown 文件的路径 |
| `tags`        | 文章标签。                                                                                                                                                             |
| `category`    | 文章分类。                                                                                                                                                             |
| `draft`       | 若标记为草稿，则不会显示该文章。                                                                                                                                       |

## 文章文件应放置的位置

文章文件应放在 `src/content/posts/` 目录中。你也可以创建子目录来更好地组织文章及其资源。

```
src/content/posts/
├── post-1.md
└── post-2/
    ├── cover.png
    └── index.md
```

## GitHub Repository Cards

你可以添加动态卡片来链接 GitHub 仓库，在页面加载时，仓库信息会从 GitHub API 拉取。

::github{repo="Fabrizz/MMM-OnSpotify"}

使用代码 `::github{repo="<owner>/<repo>"}` 来创建一个 GitHub 仓库卡片。

```markdown
::github{repo="saicaca/fuwari"}
```

## Admonitions

支持以下类型的提示框：`note` `tip` `important` `warning` `caution`

### Basic Syntax

```markdown
:::note
强调用户即使在快速浏览时也应该注意的信息。
:::

:::tip
可选信息，用于帮助用户更好地完成操作。
:::
```

### Custom Titles

提示框的标题可以自定义。

```markdown
:::note[MY CUSTOM TITLE]
这是一个带有自定义标题的 note。
:::
```

### GitHub Syntax

> [!TIP] > [GitHub 风格语法](https://github.com/orgs/community/discussions/16925) 同样被支持。

```
> [!NOTE]
> The GitHub syntax is also supported.

> [!TIP]
> The GitHub syntax is also supported.
```

### Spoiler

你可以在文字中添加剧透隐藏区块。内容也支持 **Markdown** 语法。

The content :spoiler[is hidden **ayyy**]!

```markdown
The content :spoiler[is hidden **ayyy**]!
```

## Expressive Code

这里展示使用 [Expressive Code](https://expressive-code.com/) 时代码块的外观。以下示例基于官方文档，你可以参考文档获取更多信息。

### Syntax Highlighting

[Syntax Highlighting](https://expressive-code.com/key-features/syntax-highlighting/)

#### Regular syntax highlighting

```js
console.log("这段代码具有语法高亮效果！");
```

#### Rendering ANSI escape sequences

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

### Editor & Terminal Frames

[Editor & Terminal Frames](https://expressive-code.com/key-features/frames/)

#### Code editor frames

```js title="my-test-file.js"
console.log("标题属性示例");
```

---

```html
<!-- src/content/index.html -->
<div>文件名注释示例</div>
```

#### Terminal frames

```bash
echo "这个终端窗口没有标题"
```

---

```powershell title="PowerShell 终端示例"
Write-Output "这个终端窗口有标题！"
```

#### Overriding frame types

```sh frame="none"
echo "看，我没有外框！"
```

---

```ps frame="code" title="PowerShell Profile.ps1"
# 如果不覆盖，这段会显示为终端框架
function Watch-Tail { Get-Content -Tail 20 -Wait $args }
New-Alias tail Watch-Tail
```

### Text & Line Markers

[Text & Line Markers](https://expressive-code.com/key-features/text-markers/)

#### Marking full lines & line ranges

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

#### Selecting line marker types (mark, ins, del)

```js title="line-markers.js" del={2} ins={3-4} {6}
function demo() {
  console.log("此行被标记为删除");
  // 这行和下一行被标记为插入
  console.log("这是第二行插入内容");

  return "此行使用默认标记类型";
}
```

#### Adding labels to line markers

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

#### Adding long labels on their own lines

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

#### Using diff-like syntax

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

#### Combining syntax highlighting with diff-like syntax

```diff lang="js"
  function thisIsJavaScript() {
    // 这一整个代码块仍会按 JavaScript 高亮，
    // 同时仍可应用 diff 标记！
-   console.log('旧代码，将被移除')
+   console.log('新的、更好的代码！')
  }
```

#### Marking individual text inside lines

```js "given text"
function demo() {
  // 可标记行内任意指定文本
  return "支持标记指定文本的多个匹配项";
}
```

#### Regular expressions

```ts /ye[sp]/
console.log("单词 yes 和 yep 会被标记。");
```

#### Escaping forward slashes

```sh //ho.*//
echo "Test" > /home/test.txt
```

#### Selecting inline marker types (mark, ins, del)

```js "return true;" ins="inserted" del="deleted"
function demo() {
  console.log("这些是插入与删除标记类型");
  // return 语句使用默认标记类型
  return true;
}
```

### Word Wrap

[Word Wrap](https://expressive-code.com/key-features/word-wrap/)

#### Configuring word wrap per block

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

#### Configuring indentation of wrapped lines

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

## Collapsible Sections

[Collapsible Sections](https://expressive-code.com/plugins/collapsible-sections/)

```js collapse={1-5, 12-14, 21-24}
// 下方这些样板代码将被折�
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

// 以下内容将再次折�
engine.closeConnection();
engine.freeMemory();
engine.shutdown({ reason: "样板代码示例结束" });
```

## Line Numbers

[Line Numbers](https://expressive-code.com/plugins/line-numbers/)

### Displaying line numbers per block

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

### Changing the starting line number

```js showLineNumbers startLineNumber=5
console.log("来自第 5 行的问候！");
console.log("我在第 6 行");
```

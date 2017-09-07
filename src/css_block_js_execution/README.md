# CSS 会阻塞同步脚本的执行

[JS没有被css阻塞的页面](https://zhengjunxin.github.io/web-samples/src/css_block_js_execution/without_css.html)
[JS被css阻塞的页面](https://zhengjunxin.github.io/web-samples/src/css_block_js_execution/with_css.html)

## 术语

同步脚本为
- 没有 async defer 属性的 <script>

异步脚本为
- 设置 async defer 属性值为 true 的 <script>
- 动态插入，且没有设置 async=false 的 <script>

## 场景

如果同步的脚本出现在样式之后，那么脚本可能会查询样式，所以浏览器会在样式文件下载完、且 CSSOM 构建完后，*再*执行脚本。此处根据 [script-injected-async-scripts-considered-harmful](https://www.igvita.com/2014/05/20/script-injected-async-scripts-considered-harmful/) 文章所说有 2 种解决办法

- 为脚本同时设置 async defer 属性（defer 属性是为了兼容旧版本的浏览器），使得脚本变成异步脚本，就不会被 css 的构建阻塞
- 把脚本在 HTML 中的位置，提到样式之前

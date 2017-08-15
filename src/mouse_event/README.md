# 鼠标事件

项目[示例](https://zhengjunxin.github.io/web-samples/src/mouse_event/) ([源文件](https://github.com/zhengjunxin/web-samples/blob/master/src/mouse_event/index.html))

* [mouseover](https://developer.mozilla.org/en-US/docs/Web/Events/mouseover) 是当鼠标移入他或者*他的子元素*时触发。子元素上调用 `e.stopPropagation()` 可以阻止在父元素上触发
* [mouseenter](https://developer.mozilla.org/en-US/docs/Web/Events/mouseenter)是当鼠标移入他时触发

* [mouseout](https://developer.mozilla.org/en-US/docs/Web/Events/mouseout)是当鼠标离开他或者*他的子元素*时触发。子元素上调用 `e.stopPropagation()` 可以阻止在父元素上触发
* [mouseleave](https://developer.mozilla.org/en-US/docs/Web/Events/mouseleave)是当鼠标离开他时触发

在[示例](https://zhengjunxin.github.io/web-samples/src/mouse_event/)中有上下两个嵌套的盒子，上面是使用 mouseenter 绑定，下面是使用 mouseover 绑定。

使用 mouseenter 时，穿越外层盒子会触发外层盒子的 mouseenter 事件，穿越内层盒子只会触发内层盒子的 mouseenter 事件。所以鼠标从外面，移入到内层盒子中，再移到外面。只触发了*3* mouseenter 事件。

使用 mouseover 时，穿越外层盒子会触发外层盒子的 mouseover 事件，穿越内层盒子会触发内层盒子和外层盒子的 mouseover 事件。所以鼠标从外面，移入到内层盒子中，再移到外面。触发了*3* mouseover 事件。

## 记忆

* mouseenter 只 enter 一次
* mouseover 会 over and over 多次

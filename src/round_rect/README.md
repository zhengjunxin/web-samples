# 使用 arcTo 绘制圆角矩形

原因：由于 Canvas 没有绘制圆角矩形的方法，所以需要自己绘制。在参考众多绘制方案后，觉得最简单的实现方法就是利用 arcTo 来绘制。

arcTo 的文档可参考 [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arcTo)。其实现原理是：画出当前点(x0, y0)与第一个控制点(x1, y1)的连线，第一个控制点(x1, y1)与第二个控制点(x2, y2)的连线间，半径为 radius 的圆弧。

![](arc.png)
# 渐变

## 放射性渐变

有 2 种实现放射性渐变的方式：

1. JS 的 [createRadialGradient](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createRadialGradient)
2. CSS 的 [radial-gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/radial-gradient)

原理：
虽然 API 不一样，但是原理是一致的，主要有 3 个因素
1. 渐变的起始点
2. 渐变区域的半径
3. 中间的 color stop 点

[createRadialGradient(x0, y0, r0, x1, y1, r1)](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createRadialGradient) 通过起始圆 (x0, y0, r0) 和终止圆 (x1, y1, r1) 来确定起始点(x0, y0) 和渐变半径 r1 - r0。通过 [addColorStop](https://developer.mozilla.org/en-US/docs/Web/API/CanvasGradient/addColorStop) 增加 color-stop 点

[radial-gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/radial-gradient) 有 2 种办法确定起始点
1. `background-image: radial-gradient(circle closest-side at 50px 50px, #000, #fff 25px, #000);` 起始点为 (50px, 50px) 半径为到最近边的长度
2. `background-image: radial-gradient(25px at 50px 50px, #000, #fff, #000 50px);` 起始点为 (50px, 50px) 并在 25px 半径处存在一个 color-stop，并且渐变区域半径为 50px

同时因为 [radial-gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/radial-gradient) 是属于 background-image 的，可以通过 background-size 指定背景的大小，background-position 指定背景的位置，background-repeat 指定是否重复

## 线性渐变

有 2 种实现线性渐变的方式：

1. JS 的 [createLinearGradient](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createLinearGradient)
2. CSS 的 [linear-gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient)

原理：
有 2 个因素
1. 渐变方向
2. 中间的 color stop 点

[createLinearGradient(x0, y0, x1, y1)](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createLinearGradient) 通过指定 (x0, y0) 点到 (x1, y1) 确定渐变方向

[linear-gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient) 通过 [<angle> - CSS | MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/angle) 确定方向，其中整数代表顺时针方向，负数代表逆时针方向，如 90deg = -270deg

* 同一个 `background-image` 可以有多个 linear-gradient 如 `linear-gradient(90deg, #000 0px, transparent 1px), linear-gradient(180deg, transparent 99px, #000 100px);`
* 线性渐变的默认方向是 180deg 也就是，垂直向下
* 第一个 color stop 默认位置是 0，所以 `linear-gradient(#000, #fff)` 与 `linear-gradient(#000 0px, #fff)` 是等价的
* 最后一个 color stop 默认位置是 100%，所以 `linear-gradient(#000, #fff)` 与 `linear-gradient(#000, #fff 100%)` 是等价的
* 其余的 color stop 默认是前一个和后一个的平均值，所以 `linear-gradient(#000, #fff, #000)` 与 `linear-gradient(#000, #fff 50%, #000)` 是等价的

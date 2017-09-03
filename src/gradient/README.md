# 渐变

## 放射性渐变

有 2 种实现放射性渐变的方式：

1. JS 的 [createRadialGradient](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createRadialGradient) API
2. CSS 的 [radial-gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/radial-gradient) API

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


# 图片倒影功能

简介：总结实现图片倒影时使用到的样式

[-webkit-box-reflect](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-box-reflect) 实现倒影的样式，其参数非常简单，没什么好说的。

[linear-gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient) 为图片覆盖渐变，其中有几点值得注意的。
- <angle> 指定渐变轴方向，默认是（0deg）即垂直向上。如：  
    - 0deg = to top = 从底部向顶部  
    - 90deg = to right = 从左向右
    
- <color-stop> 指定颜色的中间点  
    - 第一个颜色中间点，默认为0  
    - 最后一个颜色中间点，默认为100%  
    - 其余的默认为前一个和后一个的平局值，如：  
    ```css
    background: linear-gradient(0deg, red, green, blue)
    // 等价于
    background: linear-gradient(0deg, red 0%, green 50%, blue 100%)
    ```
# 优化 Recalculate Style 阶段的性能

项目[示例(优化后)](https://joezheng2015.github.io/web-samples/src/recalculate_style/before_optimize.html) ([源文件](https://github.com/JoeZheng2015/web-samples/blob/master/src/recalculate_style/index.html))  
项目[示例(优化前)](https://joezheng2015.github.io/web-samples/src/recalculate_style/) ([源文件](https://github.com/JoeZheng2015/web-samples/blob/master/src/recalculate_style/index.html))

Recalculate Style（样式计算）阶段，可分为两个步骤：匹配选择器、根据选择器计算样式。所以有两种途径优化性能：
- 减少选择器复杂度
- 减少受影响元素数目

本示例功能是点击按钮后，第偶数个元素变换背景色。优化手段为：
- 使用 BEM 选择器 `.main__box--gary` 替换复杂的选择器 `body.toggled main .box-container .box:nth-child(2n)`
- 使用 JS 找出第偶数个元素，减少受影响的元素

优化对比  
|       |scripting|rendering|总计|
|-------|---------|---------|--------|
|优化前(ms)|     2.2    |   44.3      |46.5|
|优化后(ms)|     3.9    |   36.2      |40.1|

其中 rendering 的 Recalculate Style 阶段耗时比较  
|Recalculate Style|影响元素个数|
|-------|---------|---------|
|优化前|21.84ms|3001|
|优化后|10.96ms|1501|


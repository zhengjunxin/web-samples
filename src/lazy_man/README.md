# LazyMan

根据[如何实现一个LazyMan （微信实习面试题）](http://web.jobbole.com/89626/)，总结 LazyMan 实现过程中有用的只是点

## 知识点
- 使用 `setTimeout(fn, 0)` 来省略一般 LazyMan 的 `value()` 方法，控制函数的开始执行

- 把闭包函数推入 `this.tasks` 省略对参数的储存（仔细想想，闭包就是用来存参的）

- 使用 `this.tasks` 来维护执行顺序：`sleepFirst` 直接 `unshift` 先执行，其他用 `push` 按顺序执行

- 解析器在全局或者函数内部解析到 `function` 时，默认认为是函数声明。使用 `=` 或 `()` 让解析器以函数表示解析函数
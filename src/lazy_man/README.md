# LazyMan

项目[示例](https://joezheng2015.github.io/web-samples/src/lazy_man/) ([源文件](https://github.com/JoeZheng2015/web-samples/blob/master/src/lazy_man/index.html))  

要求实现一个 LazyMan 函数，可以按照以下方式调用:

> LazyMan(“Hank”)输出  
> Hi! This is Hank!
> 
> LazyMan(“Hank”).sleep(10).eat(“dinner”)输出  
> Hi! This is Hank!  
> //等待10秒..  
> Wake up after 10  
> Eat dinner~  
> 
> LazyMan(“Hank”).eat(“dinner”).eat(“supper”)输出  
> Hi This is Hank!  
> Eat dinner~  
> Eat supper~  
> 
> LazyMan(“Hank”).sleepFirst(5).eat(“supper”)输出  
> //等待5秒  
> Wake up after 5  
> Hi This is Hank!  
> Eat supper
> 
> 以此类推。

参考原答案[如何实现一个LazyMan（微信实习面试题）](http://web.jobbole.com/89626/)后，总结学习到的知识点

## 知识点
- 使用 `setTimeout(fn, 0)` 来省略一般 LazyMan 的 `value()` 方法，控制函数的开始执行

- 把闭包函数推入 `this.tasks` 省略对参数的储存（仔细想想，闭包就是用来存参的）

- 使用 `this.tasks` 来维护执行顺序：`sleepFirst` 直接 `unshift` 先执行，其他用 `push` 按顺序执行

- 解析器在全局或者函数内部解析到 `function` 时，默认认为是函数声明。使用 `=` 或 `()` 让解析器以函数表示解析函数

- 可以使用 `this.constructor` 或 `new.target` 来判断是否用 `new` 关键字调用构造函数（**注意** ES6 的 `class` 是必须要用`new` 来调用否则会报错）
const express = require('express')
const app = express()
const app1 = express()
const PORT = 8080
const PORT1 = 8081

// message 服务
app.get('/message', (req, res) => {
    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
    })
    
    setInterval(() => {
        res.write('data: ' + +new Date() + '\n\n')
    }, 1000)

    res.write('event: ####\n')
    res.write('data: 这是一个自定义的####类型事件\n')
    res.write('data: 多个data字段将被解析成一个字段\n\n')
})
app.listen(PORT, () => {
    console.log(`message 服务已启动在：http://localhost:${PORT}/message`)
})


// 静态资源
app1.use(express.static(__dirname))
app1.listen(PORT1, () => {
    console.log(`页面 已部署在：http://localhost:${PORT1}`)  
})
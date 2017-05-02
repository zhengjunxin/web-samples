const express = require('express')
const app = express()
const PORT = 8080

app.use(express.static(__dirname))
app.get('/message', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    })
    
    setInterval(() => {
        res.write('data: ' + +new Date() + '\n\n')
    }, 1000)
    
    res.write('event: ####\n')
    res.write('data: 这是一个自定义的####类型事件\n')
    res.write('data: 多个data字段将被解析成一个字段\n\n')
})

app.listen(PORT, () => {
    console.log(`已启动在：http://localhost:${PORT}`)
})
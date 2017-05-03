class SvgPath2Canvas {
    constructor({width, height}) {
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')
        this.setCanvasSize({width, height})
    }
    setCanvasSize({width, height}) {
        const {canvas, ctx} = this
        const pixelRatio = window.devicePixelRatio || 1

        canvas.width = width * pixelRatio
        canvas.height = height * pixelRatio

        ctx.scale(pixelRatio, pixelRatio)
        canvas.style.width = `${width}px`
        canvas.style.height = `${height}px`
    }
    draw(paths = []) {
        paths.forEach(path => this.drawPath(path))
        return this.canvas
    }
    drawPath(path) {
        const {ctx} = this
        const {d, fill, stroke, transform} = path
        const transformPattern = /(\d+\.?\d+),?\s?(\d+\.?\d+)/g
        const result = transformPattern.exec(transform)
        const commands = svgPathToCommands(d)

        ctx.save()

        ctx.strokeStyle = stroke || fill
        if (result) {
            const [total, translateX, translateY] = result
            ctx.translate(+translateX, +translateY)
        }
        drawSvgPath(ctx, commands)
        ctx.fillStyle = fill
        ctx.fill()
        ctx.restore()
    }
}

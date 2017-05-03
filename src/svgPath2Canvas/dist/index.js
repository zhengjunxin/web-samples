var SvgPath2Canvas = (function () {
'use strict';

// svgPathToCommands('M10,10 l 5,7 C-5,7.2,.3-16,24,10  z');
//
// produces:
//
// [ { marker: "M", values: [ 10, 10 ] }, 
//   { marker: "l", values: [ 5, 7 ] },
//   { marker: "C", values: [ -5, 7.2, 0.3, -16, 24, 10 ] },
//   { marker: "z", values: [ ] } ]
//
// commandsToSvgPath(svgPathToCommands('M10,10 l 5,7 C-5,7.2,.3-16,24,10  z'))
//
// produces: 'M 10,10 l 5,7 C -5,7.2,0.3,-16,24,10 z'

var markerRegEx = /[MmLlSsQqLlHhVvCcSsQqTtAaZz]/g;
var digitRegEx = /-?[0-9]*\.?\d+/g;

function svgPathToCommands(str) {
    var results = []; 
    var match; while ((match = markerRegEx.exec(str)) !== null) { results.push(match); }
    return results
        .map(function(match) {
            return { marker: str[match.index], 
                     index: match.index };
        })
        .reduceRight(function(all, cur) {
            var chunk = str.substring(cur.index, all.length ? all[all.length - 1].index : str.length);
            return all.concat([
               { marker: cur.marker, 
                 index: cur.index, 
                 chunk: (chunk.length > 0) ? chunk.substr(1, chunk.length - 1) : chunk }
            ]);
        }, [])
        .reverse()
        .map(function(command) {
            var values = command.chunk.match(digitRegEx);
            return { marker: command.marker, values: values ? values.map(parseFloat) : []};
        })
}

function drawSvgPath(ctx, commandList) {
    ctx.beginPath();
    var lastPos = [ 0, 0 ]; var pointOne, pointTwo;

    commandList.forEach(function(command) {
        ctx.save();
        if ((command.marker === 'z') || (command.marker === 'Z')) {
            lastPos = [ 0, 0 ];
            ctx.closePath();
        } else if (command.marker === 'm') {
            lastPos = [ lastPos[0] + command.values[0], lastPos[1] + command.values[1] ];
            ctx.moveTo(lastPos[0], lastPos[1]);
        } else if (command.marker === 'l') {
            lastPos = [ lastPos[0] + command.values[0], lastPos[1] + command.values[1] ];
            ctx.lineTo(lastPos[0], lastPos[1]);
        } else if (command.marker === 'h') {
            lastPos = [ lastPos[0] + command.values[0], lastPos[1] ];
            ctx.lineTo(lastPos[0], lastPos[1]);
        } else if (command.marker === 'v') {
            lastPos = [ lastPos[0], lastPos[1] + command.values[0] ];
            ctx.lineTo(lastPos[0], lastPos[1]);
        } else if (command.marker === 'c') {
            pointOne = [ lastPos[0] + command.values[0],
                         lastPos[1] + command.values[1] ];
            pointTwo = [ lastPos[0] + command.values[2],
                         lastPos[1] + command.values[3] ];
            lastPos  = [ lastPos[0] + command.values[4],
                         lastPos[1] + command.values[5] ];
            ctx.bezierCurveTo(
                    pointOne[0], pointOne[1],
                    pointTwo[0], pointTwo[1],
                    lastPos[0], lastPos[1]);
        } else if (command.marker === 'M') {
            lastPos = [ command.values[0], command.values[1] ];
            ctx.moveTo(lastPos[0], lastPos[1]);
        } else if (command.marker === 'L') {
            lastPos = [ command.values[0], command.values[1] ];
            ctx.lineTo(lastPos[0], lastPos[1]);
        } else if (command.marker === 'H') {
            lastPos = [ command.values[0], lastPos[1] ];
            ctx.lineTo(lastPos[0], lastPos[1]);
        } else if (command.marker === 'V') {
            lastPos = [ lastPos[0], command.values[0] ];
            ctx.lineTo(lastPos[0], lastPos[1]);
        } else if (command.marker === 'C') {
            pointOne = [ command.values[0],
                         command.values[1] ];
            pointTwo = [ command.values[2],
                         command.values[3] ];
            lastPos  = [ command.values[4],
                         command.values[5] ];
            ctx.bezierCurveTo(
                    pointOne[0], pointOne[1],
                    pointTwo[0], pointTwo[1],
                    lastPos[0], lastPos[1]);
        }
        ctx.stroke();        
        ctx.restore();
    });
}

class SvgPath2Canvas {
    constructor({width, height}) {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.setCanvasSize({width, height});
    }
    setCanvasSize({width, height}) {
        const {canvas, ctx} = this;
        const pixelRatio = window.devicePixelRatio || 1;

        canvas.width = width * pixelRatio;
        canvas.height = height * pixelRatio;

        ctx.scale(pixelRatio, pixelRatio);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
    }
    draw(paths = []) {
        paths.forEach(path => this.drawPath(path));
        return this.canvas
    }
    drawPath(path) {
        const {ctx} = this;
        const {d, fill, stroke, transform} = path;
        const transformPattern = /(\d+\.?\d+),?\s?(\d+\.?\d+)/g;
        const result = transformPattern.exec(transform);
        const commands = svgPathToCommands(d);

        ctx.save();

        ctx.strokeStyle = stroke || fill;
        if (result) {
            const [total, translateX, translateY] = result;
            ctx.translate(+translateX, +translateY);
        }
        drawSvgPath(ctx, commands);
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.restore();
    }
}

return SvgPath2Canvas;

}());

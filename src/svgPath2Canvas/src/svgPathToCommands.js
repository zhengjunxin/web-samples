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

export default function svgPathToCommands(str) {
    var results = []; 
    var match; while ((match = markerRegEx.exec(str)) !== null) { results.push(match); };
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

function commandsToSvgPath(commands) {
    return commands.map(function(command) {
        return command.marker + ' ' + command.values.join(',');
    }).join(' ').trim();
}
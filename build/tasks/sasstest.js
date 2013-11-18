
module.exports = function(grunt) {
    "use strict";

    var path = require('path'),
        jsDiff = require('diff'),
        colors = {
            'diff added': 42,
            'diff removed': 41
        }
    ;

    var color = function(type, str) {
      return '\u001b[' + colors[type] + 'm' + str + '\u001b[0m';
    };

    function inlineDiff(err, escape) {
        var msg = errorDiff(err, 'WordsWithSpace', escape);

        // linenos
        var lines = msg.split('\n');
        if (lines.length > 4) {
            var width = String(lines.length).length;
            msg = lines.map(function(str, i){
                return pad(++i, width) + ' |' + ' ' + str;
            }).join('\n');
        }

        // legend
        msg = '\n'
            + color('diff removed', 'actual')
            + ' '
            + color('diff added', 'expected')
            + '\n\n'
            + msg
            + '\n';

        // indent
        msg = msg.replace(/^/gm, '      ');
        return msg;
    }

    function errorDiff(err, type, escape) {
        var actual   = escape ? escapeInvisibles(err.actual)   : err.actual;
        var expected = escape ? escapeInvisibles(err.expected) : err.expected;
        return diff['diff' + type](actual, expected).map(function(str){
            if (str.added) return colorLines('diff added', str.value);
            if (str.removed) return colorLines('diff removed', str.value);
            return str.value;
        }).join('');
    }

    function escapeInvisibles(line) {
        return line.replace(/\t/g, '<tab>')
                   .replace(/\r/g, '<CR>')
                   .replace(/\n/g, '<LF>\n');
    }

    function colorLines(name, str) {
        return str.split('\n').map(function(str){
            return color(name, str);
        }).join('\n');
    }

    grunt.registerMultiTask('sasstest', 'Tests sass output is correct', function() {
        var tmpDir = 'tmp/sasstest',
            files = grunt.file.expand({ cwd: 'tests/css'}, '**/*.css'),
            diffs = []
        ;

        files.forEach(function(file) {
            var diff = jsDiff.diffLines(
                grunt.file.read(path.join('tests/css', file)),
                grunt.file.read(path.join('tmp/sasstest', file))
            );

            diff.forEach(function(d) {
                if (d.added) {
                    grunt.log.writeln(colorLines('diff added', d.value));
                }

                if (d.removed) {
                    grunt.log.writeln(colorLines('diff removed', d.value));
                }
            });
        });
    });
};

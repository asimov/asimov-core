
module.exports = function (grunt) {
    'use strict';

    grunt.registerTask(
        'compile-scripts',
        'Compiles scripts',
        function () {
            grunt.task.run('requirejs');
            grunt.task.run('uglify');
        }
    );
};

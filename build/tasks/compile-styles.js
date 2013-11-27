
module.exports = function (grunt) {
    'use strict';

    grunt.registerTask(
        'compile-styles',
        'Compiles styles',
        function () {
            grunt.task.run('sass:dist');
            grunt.task.run('autoprefixer:dist');
            grunt.task.run('cssmin:dist');
        }
    );
};

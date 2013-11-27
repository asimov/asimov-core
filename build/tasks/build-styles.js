
module.exports = function (grunt) {
    'use strict';

    grunt.registerTask(
        'build-styles',
        'Style building entry point',
        function () {
            grunt.task.run('validate-styles');
            grunt.task.run('test-styles');
            grunt.task.run('compile-styles');
        }
    );
};

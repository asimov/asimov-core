
module.exports = function (grunt) {
    'use strict';

    grunt.registerTask(
        'test-styles',
        'Tests styles',
        function () {
            grunt.task.run('sass:test');
            grunt.task.run('bootcamp:test');
        }
    );
};

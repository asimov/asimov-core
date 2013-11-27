
module.exports = function (grunt) {
    'use strict';

    grunt.registerTask(
        'build-docs',
        'Doc building entry point',
        function () {
            grunt.task.run('sass:docs');
            grunt.task.run('symlink:core');

            if (grunt.config('pkg').name !== 'asimov-core') {
                grunt.task.run('symlink:docs');
            }

            grunt.task.run('sync:docs');
            grunt.task.run('template:docs');
            grunt.task.run('exec:docs');
        }
    );
};

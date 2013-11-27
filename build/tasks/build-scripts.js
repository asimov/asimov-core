
module.exports = function (grunt) {
    'use strict';

    grunt.registerTask(
        'build-scripts',
        'Script building entry point',
        function (env) {
            env = env || 'prod';

            grunt.task.run('validate-scripts:' + env);
            grunt.task.run('test-scripts');
            grunt.task.run('compile-scripts');
        }
    );
};

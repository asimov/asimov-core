
module.exports = function (grunt) {
    'use strict';

    grunt.registerTask(
        'build-styles',
        'Style building entry point',
        function (env) {
            env = env || 'prod';

            grunt.task.run('validate-styles:' + env);
            grunt.task.run('test-styles:test');
            grunt.task.run('compile-styles:' + env);
        }
    );
};

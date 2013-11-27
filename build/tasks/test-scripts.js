
module.exports = function (grunt) {
    'use strict';

    grunt.registerTask(
        'test-scripts',
        'Tests scripts',
        function (env) {
            env = env || 'prod';
        }
    );
};

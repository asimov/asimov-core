
module.exports = function (grunt) {
    'use strict';

    grunt.registerTask(
        'test-styles',
        'Tests styles',
        function (env) {
            env = env || 'prod';

            grunt.task.run('sass:' + env);
            grunt.task.run('sasstest:' + env);
        }
    );
};

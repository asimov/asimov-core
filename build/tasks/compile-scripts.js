
module.exports = function (grunt) {
    'use strict';

    grunt.registerTask(
        'compile-scripts',
        'Compiles scripts',
        function (env) {
            env = env || 'prod';

            grunt.task.run('requirejs');

            if (env === 'prod') {
                grunt.task.run('uglify:dist');
            }
        }
    );
};

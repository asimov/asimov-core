
module.exports = function (grunt) {
    'use strict';

    grunt.registerTask(
        'compile-styles',
        'Compiles styles',
        function (env) {
            env = env || 'prod';

            grunt.task.run('sass:dist');
            grunt.task.run('autoprefixer:dist');

            if (env === 'prod') {
                grunt.task.run('cssmin:dist');
            }
        }
    );
};


module.exports = function (grunt) {
    'use strict';

    grunt.registerTask(
        'validate-scripts',
        'Validates scripts',
        function (env) {
            env = env || 'prod';

            if (env === 'dev') {
                grunt.task.run('jsvalidate:dev');
                grunt.task.run('jshint:dev');
            } else {
                grunt.task.run('jsvalidate:dist');
                grunt.task.run('jsvalidate:docs');
                grunt.task.run('jshint:dist');
                grunt.task.run('jshint:docs');
            }
        }
    );
};

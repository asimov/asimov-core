
module.exports = function (grunt) {
    'use strict';

    grunt.registerTask(
        'validate-scripts',
        'Validates scripts',
        function (env) {
            env = env || 'prod';

            var oldConfig = grunt.config.get('jshint.options'),
                newConfig = grunt.util._.extend(oldConfig, {
                    debug: true,
                    devel: true
                })
            ;

            if (env === 'dev') {
                grunt.config.set('jshint.options', newConfig);
            }

            grunt.task.run('jsvalidate');
            grunt.task.run('jshint');

            if (env === 'dev') {
                grunt.config.set('jshint.options', oldConfig);
            }
        }
    );
};

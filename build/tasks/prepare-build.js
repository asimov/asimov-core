
module.exports = function (grunt) {
    'use strict';

    var shell = require('shelljs');

    grunt.registerTask(
        'prepare-build',
        'A hook for running local component\'s tasks',
        function () {
            if (!grunt.file.exists('./build/tasks')) {
                return;
            }

            var done = this.async();

            shell.exec('npm install', function(code, output) {
                if (code !== 0) {
                    grunt.log.error(output);
                    done();
                }

                grunt.loadTasks('build/tasks');
                grunt.task.run('prepare');
                done();
            });
        }
    );
};

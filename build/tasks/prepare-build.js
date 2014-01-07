
module.exports = function (grunt) {
    'use strict';

    var shell = require('shelljs'),
        path = require('path'),
        meta = grunt.file.readJSON('./bower.json'),
        isTheme = meta.name.indexOf('-theme-') !== -1;

    function prepareTheme() {
        var dep,
            taskDir = function(dep) {
                return path.join('bower_components', dep, 'build/tasks');
            };

        for (dep in meta.dependencies) {
            if (!grunt.file.exists(path.join(taskDir(dep), 'prepare.js'))) {
                continue;
            }

            grunt.task.loadTasks(taskDir(dep));
            grunt.task.renameTask('prepare', 'prepare-' + dep);
            grunt.task.run('prepare-' + dep);
        }
    }

    function prepareComponent(done) {
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

    grunt.registerTask(
        'prepare-build',
        'A hook for running local component\'s tasks',
        function () {
            if (!grunt.file.exists('./build/tasks')) {
                return;
            }

            if (isTheme) {
                prepareTheme();
            } else {
                prepareComponent(this.async());
            }
        }
    );
};


module.exports = function (grunt) {
    'use strict';

    var shell = require('shelljs'),
        path = require('path'),
        async = require('async'),
        meta = grunt.file.readJSON('./bower.json'),
        isTheme = meta.name.indexOf('-theme-') !== -1;

    function prepareTheme(done) {
        function taskDir(dep) {
            return path.join('bower_components', dep, 'build/tasks');
        }

        async.each(Object.keys(meta.dependencies), function(item, callback) {
            if (!grunt.file.exists(path.join(taskDir(item), 'prepare.js'))) {
                callback();
                return;
            }

            prepareComponentDeps(item, function(err) {
                if (!err) {
                    grunt.task.loadTasks(taskDir(item));
                    grunt.task.renameTask('prepare', 'prepare-' + item);
                    grunt.task.run('prepare-' + item);
                }

                callback(err);
            });
        }, function(err) {
            if(err) { grunt.log.error(err); }
            done();
        });
    }

    function prepareComponent(done) {
        prepareComponentDeps(null, function() {
            grunt.loadTasks('build/tasks');
            grunt.task.run('prepare');
            done();
        });
    }

    function prepareComponentDeps(dep, cb) {
        var pwd = shell.pwd();

        if (dep) {
            shell.cd(path.join('bower_components', dep));
        }

        shell.exec('npm install', function(code, output) {
            if (code !== 0) {
                cb(output);
            }

            shell.cd(pwd);
            cb();
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
                prepareTheme(this.async());
            } else if (!grunt.config.get('asimov.isCore')) {
                prepareComponent(this.async());
            }
        }
    );
};

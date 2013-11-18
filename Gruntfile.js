
module.exports = function(grunt) {
    "use strict";

    // require it at the top and pass in the grunt instance
    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('bower.json'),
        sass: {
            options: {
                style: 'expanded',
                lineNumbers: false,
                loadPath: [
                    'src/scss',
                    'bower_components'
                ]
            },
            test: {
                files: [{
                    expand: true,
                    cwd: 'tests/scss',
                    src: ['*.scss', '!_*.scss'],
                    dest: 'tmp/sasstest',
                    ext: '.css'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/scss',
                    src: ['*.scss', '!_*.scss'],
                    dest: 'dist',
                    ext: '.css'
                }]
            }
        },
        cssjoin: {
            dist :{
                files: {
                    'dist/asimov.css': ['dist/asimov.css']
                }
            }
        },
        sasstest: {
            test: {}
        }
    });

    // load task
    require('matchdep').filterAll('grunt-!(cli)').forEach(grunt.loadNpmTasks);
    grunt.loadTasks('build/tasks');

    grunt.registerTask('test', ['sass:test', 'sasstest:test']);
    grunt.registerTask('default', ['test', 'sass:dist', 'cssjoin:dist']);
};

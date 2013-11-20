
module.exports = function(grunt) {
    "use strict";

    // require it at the top and pass in the grunt instance
    require('time-grunt')(grunt);

    var matchdep = require('matchdep'),
        path = require('path'),
        bower = require('bower'),
        meta = grunt.file.readJSON('./bower.json')
    ;

    var asimoveCorePath = meta.name === 'asimov-core' ?
        '.' :
        'bower_components/asimov-core';

    // Create an array of asimov deps
    //
    // Since bower installs dep flat rather than nested (npm style) we can use
    // simple globbing. Alternative we could use bower.commands.list.
    var bowerDeps = grunt.file.glob.sync('bower_components/asimov-*');

    // Create a array of paths to be passed to sass' --load-path
    //
    // This allows us to use @import bowered in components' sass files as if
    // they were part of your local component/theme.
    var sassLoadPaths = ['src/scss'].concat(bowerDeps.map(function(depPath) {
        return path.join(depPath, 'src', 'scss');
    }));

    grunt.initConfig({
        pkg: grunt.file.readJSON('bower.json'),
        sass: {
            options: {
                style: 'expanded',
                lineNumbers: false,
                loadPath: sassLoadPaths,
                cacheLocation: '.build/.sass-cache'
            },
            test: {
                files: [{
                    expand: true,
                    cwd: 'tests/scss',
                    src: ['*.scss', '!_*.scss'],
                    dest: '.build/sasstest',
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
        sasstest: {
            test: {}
        },

        // Creating new releases

        release: {
            options: {
                bump: true,
                file: 'bower.json',
                add: false,
                commit: true,
                tag: true,
                push: true,
                pushTags: true,
                npm: false,
                npmtag: false,
                tagName: '<%= version %>',
                commitMessage: 'release <%= version %>',
                tagMessage: 'tagging version <%= version %>'
            }
        }
    });

    // load task
    matchdep.filterAll('grunt-!(cli)').forEach(grunt.loadNpmTasks);

    // grunt.loadTasks(path.join(asimoveCorePath, 'build', 'tasks'));

    grunt.registerTask('test', ['sass:test', 'sasstest:test']);
    grunt.registerTask('default', ['test', 'sass:dist']);
};

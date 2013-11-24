
module.exports = function(grunt) {
    "use strict";

    // require it at the top and pass in the grunt instance
    require('time-grunt')(grunt);

    var matchdep = require('matchdep'),
        path = require('path'),
        meta = grunt.file.readJSON('./bower.json')
    ;

    var asimoveCorePath = path.resolve(meta.name === 'asimov-core' ?
        '.' :
        './bower_components/asimov-core');

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


    var rjsOptions = {};
    if(meta.name === 'asimov-core') {
        rjsOptions = {
            core: {
                options: {
                    baseUrl: 'src/js',
                    name: 'asimov/core',
                    out: 'dist/js/asimov/core.js'
                }
            }
        };
    } else {
        rjsOptions = {
            modules: {
                options: {
                    appDir: 'src',
                    baseUrl: 'js',
                    dir: 'dist',
                    // wrap: {
                    //     startFile: path.join(asimoveCorePath, 'build/js/intro.js'),
                    //     endFile: path.join(asimoveCorePath, 'build/js/outro.js')
                    // },
                    modules: grunt.file.expand({ cwd: 'src/js' }, '**/*.js').map(function(file) {
                        return { name: file.replace(/\.js$/, '') };
                    })
                }
            }
        };
    }

    // return;

    grunt.initConfig({
        pkg: grunt.file.readJSON('bower.json'),

        // RequireJS

        requirejs: grunt.util._.extend({
            options: {
                logLevel: 3,
                optimize: 'none',
                paths: {
                    jquery: 'empty:',
                    asimov: path.join(asimoveCorePath, 'src', 'js', 'asimov')
                }
            }
        }, rjsOptions),

        // Sass compilation

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
            docs: {
                files: [{
                    expand: true,
                    cwd: path.join(asimoveCorePath, 'src/docs/assets/scss'),
                    src: ['*.scss', '!_*.scss'],
                    dest: 'docs/assets/css',
                    ext: '.css'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/scss',
                    src: ['*.scss', '!_*.scss'],
                    dest: 'dist/css',
                    ext: '.css'
                }]
            }
        },

        // Generate the docs

        sync: {
            docs: {
                files: [{
                    cwd: path.join(asimoveCorePath, 'src/docs/assets'),
                    src: ['**', '!scss/**'],
                    dest: 'docs/assets'
                }]
            }
        },

        exec: {
            docs: {
                cmd: [
                    path.join(asimoveCorePath, 'node_modules/.bin/distancss'),
                    'dist/css',
                    'docs',
                    '--template',
                    path.join(asimoveCorePath, 'src/docs'),
                    '--public',
                    '/assets'
                ].join(' ')
            }
        },

        // Docs server

        connect: {
            options: {
                base: 'docs',
                keepalive: true,
                port: 9001
            },
            dev: {}
        },

        // Run our sass tests

        sasstest: {
            test: {}
        },

        // Creating new releases

        bump: {
            options: {
                files: ['bower.json'],
                updateConfigs: ['pkg'],
                commit: true,
                commitMessage: 'chore(release): release v%VERSION%',
                commitFiles: ['bower.json', '<%= changelog.options.dest %>'],
                createTag: true,
                tagName: '%VERSION%',
                tagMessage: 'tagging version %VERSION%',
                push: true,
                pushTo: 'origin'
            }
        },

        // Automatic changelogs

        changelog: {
            options: {
                dest: 'CHANGELOG.md',
                prepend: true,
                github: grunt.file.readJSON('./bower.json').version,
                editor: 'subl -w'
            }
        },

        // Creating new releases

        release: {
            dryRun: false
        }
    });

    // Load tasks defined in asimov-core's package.json

    var base = process.cwd();
    matchdep.filterAll('grunt-!(cli)', path.join(asimoveCorePath, 'package.json'))
        .forEach(function(task) {
            // need to temporarily change base for grunt.loadNpmTasks to work
            grunt.file.setBase(asimoveCorePath);
            grunt.loadNpmTasks(task);
            grunt.file.setBase(base);
        });

    // Load our custom tasks

    grunt.loadTasks(path.join(asimoveCorePath, 'build', 'tasks'));

    // Public tasks

    grunt.registerTask('docs', [
        'compile',
        'sass:docs',
        'sync:docs',
        'exec:docs',
        'connect:dev'
    ]);

    grunt.registerTask('test', [
        'sass:test',
        'sasstest:test'
    ]);

    grunt.registerTask('compile', [
        'requirejs',
        'sass:dist'
    ]);

    grunt.registerTask('default', [
        'test',
        'compile'
    ]);
};

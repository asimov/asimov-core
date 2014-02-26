/* global require, process */
/* jshint onevar:false, maxlen:100, maxcomplexity:8 */
module.exports = function(grunt) {
    'use strict';

    // require it at the top and pass in the grunt instance
    require('time-grunt')(grunt);

    var matchdep = require('matchdep'),
        path = require('path'),
        _ = require('lodash'),
        meta = grunt.file.readJSON('./bower.json'),
        pkg = _.merge(grunt.file.readJSON('./package.json'),
            { asimov: { requirejs: {} } }),
        isTheme = meta.name.indexOf('-theme-') !== -1
    ;

    var readPackage = function readPackage(cwd) {
        return _.merge(
            grunt.file.readJSON(path.join(cwd, 'package.json')),
            { asimov: { requirejs: {} } }
        );
    };

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
    var sassLoadPaths = [
        'src/scss',
        './bower_components',
        // Allow @import "docs/assets/scss/docs" in theme/component docs themes
        './bower_components/asimov-core/src'
    ].concat(bowerDeps.map(function (depPath) {
        return path.join(depPath, 'src', 'scss');
    }));

    // RequireJS task settings
    //
    // If we're compiling asimov-core then we only need to compile the one file
    // If we're compiling themes or components we need to walk directories to
    // find what modules we need to build
    var rjsOptions = {
        options: {
            logLevel: 3,
            optimize: 'none',
            keepBuildDir: true,
            // skipModuleInsertion: true,
            removeCombined: true,
            shim: pkg.asimov.requirejs.shim || {},
            paths: _.merge({
                jquery: 'empty:',
                asimov: '<%= asimov.src %>/js/asimov'
            }, pkg.asimov.requirejs.paths)
        }
    };

    // if we're compiling a asimov-core
    if (meta.name === 'asimov-core') {
        rjsOptions = { all: _.merge({
            options: {
                baseUrl: 'src/js',
                name: 'core',
                out: 'dist/js/asimov/core.js'
            }
        }, rjsOptions) };
    // if we're compiling a theme
    } else if (isTheme) {
        var tmpRjsOptions = {};
        grunt.file.expand({ cwd: 'bower_components' }, 'asimov-*/src/js/*.js')
            .forEach(function(file) {
                var parts = file.split('/'),
                    cwd = 'bower_components/' + parts[0] + '/src/js';

                tmpRjsOptions[parts[0]] = _.merge({
                    options: {
                        // this line a work around for a bug in r.js
                        // https://github.com/jrburke/r.js/issues/587
                        // https://github.com/gruntjs/grunt-contrib-requirejs/issues/45
                        _buildPathToModuleIndex: [],

                        baseUrl: cwd,
                        dir: 'dist/js',
                        shim: readPackage(cwd + '/../../').asimov.requirejs.shim || {},
                        paths: _.mapValues(
                            readPackage(cwd + '/../../').asimov.requirejs.paths || {},
                            function(item) {
                                return '../../' + item;
                            }
                        ),
                        modules: grunt.file.expand({ cwd: cwd }, '*.js')
                            .map(function (file) {
                                return { name: file.replace(/\.js$/, '') };
                            })
                    }
                }, rjsOptions);
            });

        rjsOptions = tmpRjsOptions;
    }
    // we're compiling a component
    else {
        rjsOptions = { all: _.merge({
            options: {
                baseUrl: 'src/js',
                dir: 'dist/js',
                paths: pkg.asimov.requirejs.paths,
                modules: grunt.file.expand({ cwd: 'src/js' }, '*.js')
                    .map(function (file) {
                        return { name: file.replace(/\.js$/, '') };
                    })
            }
        }, rjsOptions) };
    }

    grunt.initConfig({
        bower: grunt.file.readJSON('bower.json'),
        jshintrc: grunt.file.exists('.jshintrc') ?
            grunt.file.readJSON('.jshintrc') :
            grunt.file.readJSON(asimoveCorePath + '/.jshintrc'),

        // Project settings

        asimov: {
            isCore: meta.name === 'asimov-core',
            core: asimoveCorePath,
            src: '<%= asimov.core %>/src'
        },

        // Remove generated files

        clean: {
            dist: ['dist/*'],
            docs: ['docs/*'],
            build: ['.build/*']
        },

        // RequireJS

        requirejs: rjsOptions,

        // Sass compilation

        sass: {
            options: {
                style: 'expanded',
                lineNumbers: false,
                trace: true,
                loadPath: sassLoadPaths,
                cacheLocation: '.build/.sass-cache',
                bundleExec: true
            },
            test: {
                files: [{
                    expand: true,
                    cwd: 'tests/scss',
                    src: ['*.scss'],
                    dest: '.build/sasstest',
                    ext: '.css'
                }]
            },
            docs: {
                files: (!grunt.file.exists('src/docs/assets/scss') ?
                [{
                    expand: true,
                    cwd: '<%= asimov.src %>/docs/assets/scss',
                    src: ['*.scss'],
                    dest: 'docs/assets/css',
                    ext: '.css'
                }] : [{
                    expand: true,
                    cwd: 'src/docs/assets/scss',
                    src: ['*.scss'],
                    dest: 'docs/assets/css',
                    ext: '.css'
                }])
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/scss',
                    src: ['*.scss'],
                    dest: 'dist/css',
                    ext: '.css'
                }]
            }
        },

        autoprefixer: {
            options: {
                // browsers: ['last 2 version', 'ie 8', 'ie 9']
                browsers: [
                    'last 2 version',
                    'Firefox ESR',
                    'BlackBerry 10',
                    'Android 4',
                    'Explorer 8',
                    'Explorer 9',
                    'Opera 12.1'
                ]
            },
            dist: {
                src: 'dist/css/*!(.min).css'
            }
        },

        // Create minified versions of the dist files

        cssmin: {
            dist: {
                expand: true,
                cwd: 'dist/css',
                src: ['**/*.css', '!*.min.css'],
                dest: 'dist/css',
                ext: '.min.css'
            }
        },

        uglify: {
            dist: {
                expand: true,
                cwd: 'dist/js',
                src: ['**/*.js', '!*.min.js'],
                dest: 'dist/js',
                ext: '.min.js'
            }
        },

        // Generate the docs

        symlink: _.merge({
            core: {
                src: path.join(asimoveCorePath, 'dist'),
                dest: 'docs/assets/asimov-core'
            }
        }, (meta.name === 'asimov-core' ? {} : {
            docs: {
                src: 'dist',
                dest: 'docs/assets/<%= bower.name %>'
            }
        })),

        template: {
            docs: {
                options: {
                    data: function () {
                        return {
                            styles: grunt.file.expand({ cwd: 'docs/assets' }, [
                                'asimov-!(core)/css/**/*.css',
                                '!**/*.min.css'
                            ]),
                            scripts: grunt.file.expand({ cwd: 'docs/assets' }, [
                                'asimov-!(core)/js/{*,/}*.js',
                                '!**/*.min.js'
                            ])
                        };
                    }
                },
                files: {
                    '.build/docs/index.html': ['<%= asimov.src %>/docs/index.html'],
                    '.build/docs/styleguide.md': ['<%= asimov.src %>/docs/styleguide.md']
                }
            }
        },

        sync: {
            docs: {
                files: [{
                    cwd: '<%= asimov.src %>/docs/assets',
                    src: ['**', '!scss/**'],
                    dest: 'docs/assets'
                }]
            },
            dist: {
                files: [{
                    cwd: 'src',
                    src: ['**', '!scss/**', '!js/**', '!docs/**'],
                    dest: 'dist'
                }, {
                    expand: true,
                    cwd: 'bower_components',
                    src: ['asimov-*/src/**', '!**/scss/**', '!**/js/**', '!**/docs/**'],
                    dest: 'dist',
                    filter: function(src) {
                        return grunt.file.isFile(src);
                    },
                    rename: function(dest, src) {
                        return dest + path.sep + src.replace(/asimov-[^/]+\/src\//, '');
                    }
                }]
            }
        },

        exec: {
            docs: {
                cmd: [
                    '<%= asimov.core %>/node_modules/.bin/distancss',
                    'dist/css',
                    'docs',
                    '--template',
                    '.build/docs',
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

        // Javscript QA
        //
        // 1: wash our hands of 3rd party assets
        // 2: allow for debug code when in dev

        jsvalidate: {
            dist: [
                'src/js/**/*.js',
                '!**/vendor/**'                 // 1
            ],
            docs: [
                'src/docs/assets/js/**/*.js',
                '!**/vendor/**'                 // 1
            ]
        },

        jshint: {
            options: '<%= jshintrc %>',
            dist: ['<%= jsvalidate.dist %>'],
            docs: ['<%= jsvalidate.docs %>']
        },

        gjslint: {
            options: {
                flags: [
                    '--disable 110,13'
                ],
                reporter: {
                    name: 'console'
                }
            },
            dist: ['<%= jsvalidate.dist %>'],
            docs: ['<%= jsvalidate.docs %>']
        },

        // Developement watch task

        watch: {
            options: {
                debounceDelay: 100,
                spawn: false
            },
            sass: {
                files: ['src/@(scss|docs)/**/*.scss'],
                tasks: ['build-styles:dev', 'build-docs:dev']
            },
            js: {
                files: ['src/@(scss|docs)/**/*.js'],
                tasks: ['build-scripts:dev', 'build-docs:dev']
            }
        },

        concurrent: {
            target: {
                tasks: ['connect:dev', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

        // Creating new releases

        bump: {
            options: {
                files: ['bower.json'],
                updateConfigs: ['bower'],
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
                version: '<%= bower.version %>',
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
    matchdep.filterAll('grunt-!(cli)', asimoveCorePath + '/package.json')
        .forEach(function (task) {
            // need to temporarily change base for grunt.loadNpmTasks to work
            grunt.file.setBase(asimoveCorePath);
            grunt.loadNpmTasks(task);
            grunt.file.setBase(base);
        });

    // Load our custom tasks

    grunt.loadTasks(asimoveCorePath + '/build/tasks');

    if (grunt.file.exists('./build/tasks')) {
        grunt.loadTasks('build/tasks');
    }

    // Public tasks

    grunt.registerTask('dev', [
        'clean',
        'prepare-build',
        'build-scripts:dev',
        'build-styles:dev',
        'build-docs:dev',
        'concurrent'
    ]);

    grunt.registerTask('default', [
        'clean',
        'prepare-build',
        'build-scripts:prod',
        'build-styles:prod',
        'build-docs:prod'
    ]);
};

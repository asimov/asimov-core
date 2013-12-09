/* global require, process */
/* jshint onevar:false, maxlen:100 */
module.exports = function(grunt) {
    'use strict';

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
    var sassLoadPaths = [
        'src/scss',
        './bower_components'
    ].concat(bowerDeps.map(function (depPath) {
        return path.join(depPath, 'src', 'scss');
    }));

    // RequireJS task settings
    //
    // If we're compiling asimov-core then we only need to compile the one file
    // If we're compiling themes or components we need to walk directories to
    // find what modules we need to build
    var rjsOptions = {};
    if (meta.name === 'asimov-core') {
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
                    baseUrl: 'src/js',
                    dir: 'dist/js',
                    // wrap: {
                    //     startFile: '<%= asimov.core %>/build/js/intro.js',
                    //     endFile: '<%= asimov.core %>/build/js/outro.js'
                    // },
                    modules: grunt.file.expand({ cwd: 'src/js' }, '*.js')
                        .map(function (file) {
                            return { name: file.replace(/\.js$/, '') };
                        })
                }
            }
        };
    }


    grunt.initConfig({
        bower: grunt.file.readJSON('bower.json'),
        jshintrc: grunt.file.exists('.jshintrc') ?
            grunt.file.readJSON('.jshintrc') :
            grunt.file.readJSON(asimoveCorePath + '/.jshintrc'),

        // Project settings

        asimov: {
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

        requirejs: grunt.util._.extend({
            options: {
                logLevel: 3,
                optimize: 'none',
                keepBuildDir: false,
                skipModuleInsertion: true,
                removeCombined: true,
                paths: {
                    jquery: 'empty:',
                    asimov: '<%= asimov.src %>/js/asimov'
                }
            }
        }, rjsOptions),

        // Sass compilation

        sass: {
            options: {
                style: 'expanded',
                lineNumbers: false,
                loadPath: sassLoadPaths,
                cacheLocation: '.build/.sass-cache',
                bundleExec: true
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
                    cwd: '<%= asimov.src %>/docs/assets/scss',
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

        autoprefixer: {
            options: {
                browsers: ['last 2 version', 'ie 8', 'ie 9']
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

        symlink: grunt.util._.extend({
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
            dist: ['src/js/**/*.js'],
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
                files: ['src/scss/**/*.scss', '!src/docs/assets/scss/**'],
                tasks: ['build-styles:dev', 'build-docs:dev']
            },
            js: {
                files: ['src/js/**/*.js', '!src/docs/assets/js/**'],
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

    // Public tasks

    grunt.registerTask('dev', [
        'clean',
        'build-scripts:dev',
        'build-styles:dev',
        'build-docs:dev',
        'concurrent'
    ]);

    grunt.registerTask('default', [
        'clean',
        'build-scripts:prod',
        'build-styles:prod',
        'build-docs:prod'
    ]);
};

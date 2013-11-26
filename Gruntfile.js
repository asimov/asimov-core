
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

    // RequireJS task settings
    //
    // If we're compiling asimov-core then we only need to compile the one file
    // If we're compiling themes or components we need to walk directories to
    // find what modules we need to build
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
                    baseUrl: 'src/js',
                    dir: 'dist/js',
                    // wrap: {
                    //     startFile: path.join(asimoveCorePath, 'build/js/intro.js'),
                    //     endFile: path.join(asimoveCorePath, 'build/js/outro.js')
                    // },
                    modules: grunt.file.expand({ cwd: 'src/js' }, '*/*.js').map(function(file) {
                        return { name: file.replace(/\.js$/, '') };
                    })
                }
            }
        };
    }


    grunt.initConfig({
        pkg: grunt.file.readJSON('bower.json'),

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
            asimov: {
                src: path.join(asimoveCorePath, 'dist'),
                dest: 'docs/assets/asimov-core'
            }
        }, (meta.name === 'asimov-core' ? {} : {
            components: {
                src: 'dist',
                dest: 'docs/assets/<%= pkg.name %>'
            }
        })),

        template: {
            docs: {
                options: {
                    data: function() {
                        return {
                            styles: grunt.file.expand({ cwd: 'docs/assets' }, 'asimov-!(core)/css/**/*.css'),
                            scripts: grunt.file.expand({ cwd: 'docs/assets' }, 'asimov-!(core)/js/{*,/}*.js')
                        };
                    }
                },
                files: {
                    '.build/docs/index.html': [path.join(asimoveCorePath, 'src/docs/index.html')],
                    '.build/docs/styleguide.md': [path.join(asimoveCorePath, 'src/docs/styleguide.md')]
                }
            }
        },

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
        'symlink',
        'sync:docs',
        'template:docs',
        'exec:docs',
        'connect:dev'
    ]);

    grunt.registerTask('test', [
        'sass:test',
        'sasstest:test'
    ]);

    grunt.registerTask('compile', [
        'requirejs',
        'uglify:dist',
        'sass:dist',
        'autoprefixer:dist',
        'cssmin:dist'
    ]);

    grunt.registerTask('default', [
        'test',
        'compile'
    ]);
};

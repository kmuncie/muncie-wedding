/*
 * Generated on 2015-02-06
 * generator-wintersmith-nunjucks v0.1.0
 * https://github.com/mmintel/generator-wintersmith-nunjucks
 *
 * Copyright (c) 2015 Marc Mintel
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        config: {
            src: '.',
            dist: 'build',
            lib: 'bower_components'
        },

        sass: {
            options: {
                includePaths: [
                    '<%= config.lib %>'
                ],
                require: 'susy'
            },
            dev: {
                options: {
                    style: 'expanded'
                },
                files: {
                    '<%= config.dist %>/assets/css/style.css': '<%= config.src %>/assets/scss/style.scss'
                }
            },
            build: {
                options: {
                    style: 'compressed'
                },
                files: {
                    '<%= config.dist %>/assets/css/style.css': '<%= config.src %>/assets/scss/style.scss'
                }
            }
        },

        watch: {
            wintersmith: {
                files: ['<%= config.src %>/{templates,contents}/**/*.{md,nunjucks,html,yml}'],
                tasks: ['wintersmith:build']
            },
            sass: {
                files: ['<%= config.src %>/assets/**/*.scss', '<%= config.lib %>/**/*.scss'],
                tasks: ['sass:dev', 'autoprefixer']
            },
            js: {
                files: ['<%= config.src %>/assets/**/*.js'],
                tasks: ['uglify']
            },
            livereload: {
                options: {
                    livereload: 35729
                },
                files: [
                    '<%= config.dist %>/**/*.html',
                    '<%= config.dist %>/**/*.css',
                    '<%= config.dist %>/**/*.js',
                    '<%= config.dist %>/**/*.{png,jpg,jpeg,gif,webp,svg}'
                ],
                tasks: ['notify:livereload']
            }
        },

        notify: {
            livereload: {
                options: {
                    title: 'Task Complete',  // optional
                    message: 'All compilations done.'
                }
            }
        },

        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '<%= config.dist %>'
                    ]
                }
            }
        },


        uglify: {
            scripts: {
                files: {
                    '<%= config.dist %>/assets/js/modernizr.min.js': [
                        '<%= config.lib %>/modernizr/modernizr.js'
                    ],
                    '<%= config.dist %>/assets/js/jquery.min.js': [
                        '<%= config.lib %>/jquery/dist/jquery.js'
                    ],
                    '<%= config.dist %>/assets/js/scripts.min.js': [
                        '<%= config.src %>/assets/js/main.js'
                    ]
                }
            }
        },

        imagemin: {
            dynamic: {
                options: {
                    optimizationLevel: 1
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.src %>/img',
                        src: ['**/*.{png,jpg,gif}'],
                        dest: '<%= config.dist %>/'
                    }
                ]
            }
        },

        wintersmith: {
            build: {
                options: {
                    action: "build",
                    config: './config-build.json'
                }
            },
            dev: {
                options: {
                    action: "preview",
                    config: './config-dev.json'
                }
            }
        },

        autoprefixer: {
            multiple_files: {
                expand: true,
                cwd: '<%= config.dist %>',
                src: '**/*.css',
                dest: '<%= config.dist %>'
            }
        },

        copy: {
            assets: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.src %>/assets/fonts',
                        src: ['*'],
                        dest: '<%= config.dist %>/assets/fonts'
                    },
                    {
                        expand: true,
                        cwd: '<%= config.src %>/assets/img',
                        src: ['favicon.ico'],
                        dest: '<%= config.dist %>/assets/img'
                    },
                    {
                        expand: true,
                        cwd: '<%= config.src %>/assets/img',
                        src: ['*.svg'],
                        dest: '<%= config.dist %>/assets/img'
                    }
                ]
            }
        },

        clean: ['<%= config.dist %>']
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-wintersmith');

    grunt.registerTask('common', [
        'imagemin',
        'uglify'
    ]);

    grunt.registerTask('build', [
        'clean',
        'common',
        'copy',
        'sass:build',
        'autoprefixer',
        'wintersmith:build'
    ]);

    grunt.registerTask('dev', [
        'common',
        'sass:dev',
        'wintersmith:build',
        'connect:livereload',
        'watch'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);

};

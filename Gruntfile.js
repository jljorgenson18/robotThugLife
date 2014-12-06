module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            options: {
                livereload: true,
            },
            scripts: {
                files: ['library/js/myScripts/*.js', 'Gruntfile.js'],
                tasks: ['concat', 'uglify', 'jshint'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['**/*.scss'],
                tasks: ['compass'],
                options: {
                    spawn: false,
                }
            },
            php: {
                files: '**/*.php',
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['library/js/myScripts/bonesDefault.js'],
                dest: 'library/js/scripts.js',
            },
        },

        uglify: {
            build: {
                src: 'library/js/scripts.js',
                dest: 'library/js/scripts.js',
            }
        },

        jshint: {
            // define the files to lint
            files: ['library/js/myScripts/bonesDefault.js'],
            // configure JSHint (documented at http://www.jshint.com/docs/)
            options: {
                // more options here if you want to override JSHint defaults
                reporter: 'checkstyle'
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'library/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'library/images/'
                }]
            }
        },

        compass: {
            dist: {
                options: {
                    config: 'library/scss/config.rb'
                }
            }
        },

        autoprefixer: {
            options: {
                cascade: false
            },
            your_target: {
                src: 'library/css/style.css'
            },
        }
    });

    //The watch
    grunt.loadNpmTasks('grunt-contrib-watch');

    //Javascript Tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    //Image Tasks
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    //grunt.loadNpmTasks('grunt-grunticon');

    //CSS Tasks
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    //grunt.loadNpmTasks('grunt-contrib-csslint');


    //Browser Sync
    //grunt.loadNpmTasks('grunt-browser-sync');

    grunt.registerTask('default', ['concat', 'uglify', 'jshint', 'imagemin', 'compass', 'autoprefixer']);

};
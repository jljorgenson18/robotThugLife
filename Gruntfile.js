module.exports = function (grunt) {

    // Project configuration. Test
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            options: {
                livereload: true,
            },
            scripts: {
                files: ['robot-ui/js/**/*.js', 'Gruntfile.js', '!robot-ui/js/all-min.js'],
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
            html: {
                files: 'robot-ui/index.html',
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['robot-ui/js/libraries/jquery-2.1.1.min.js', 'robot-ui/js/socket.js'],
                dest: 'robot-ui/js/all-min.js',
            },
        },

        uglify: {
            build: {
                src: 'robot-ui/js/all-min.js',
                dest: 'robot-ui/js/all-min.js',
            }
        },

        jshint: {
            files: ['robot-ui/js/*.js', '!robot-ui/js/all-min.js'],
            options: {
                reporter: 'checkstyle'
            }
        },
        compass: {
            dist: {
                options: {
                    config: 'robot-ui/sass/config.rb'
                }
            }
        },

        autoprefixer: {
            options: {
                cascade: false
            },
            your_target: {
                src: 'robot-ui/css/style.css'
            },
        }
    });

    //The watch
    grunt.loadNpmTasks('grunt-contrib-watch');

    //Javascript Tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    //CSS Tasks
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-autoprefixer');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['concat', 'uglify', 'jshint', 'compass', 'autoprefixer']);
};
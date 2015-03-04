module.exports = function(grunt) {

    // Project configuration. Test
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jsbeautifier: require('./gruntConfigs/jsBeautConfig.js'),
        watch: require('./gruntConfigs/watchConfig.js'),
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['robot-ui/js/libraries/jquery-2.1.1.min.js', 'robot-ui/js/uiSocket.js'],
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
            files: ['robot-ui/**/*.js',
                '!robot-ui/js/all-min.js',
                '!robot-ui/js/libraries/**/*.js',
                'robot-server/**/*.js',
                'Gruntfile.js',
                'gruntConfigs/*.js'
            ],
            options: {
                reporter: 'checkstyle',
                reporterOutput: 'jshint.xml'
            }
        },
        compass: {
            dist: {
                options: {
                    sassDir: 'robot-ui/sass',
                    cssDir: 'robot-ui/css',
                    imagesDir: 'robot-ui/images',
                    fontsDir: 'robot-ui/fonts',
                    sourcemap: true,
                    environment: 'development',
                    outputStyle: 'expanded',
                    trace: true
                }
            },
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
    grunt.loadNpmTasks('grunt-jsbeautifier');

    //CSS Tasks
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-autoprefixer');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['concat', 'uglify', 'jshint', 'compass', 'autoprefixer']);
};

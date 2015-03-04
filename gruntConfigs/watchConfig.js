module.exports = {
    options: {
        livereload: true,
    },
    uiJS: {
        files: ['robot-ui/js/**/*.js', '!robot-ui/js/all-min.js'],
        tasks: ['jshint', 'jsbeautifier:robotUI', 'concat', 'uglify'],
    },
    serverJS: {
        files: ['robot-server/**/*.js', 'server.js'],
        tasks: ['jshint', 'jsbeautifier:robotServer'],
    },
    css: {
        files: ['**/*.scss'],
        tasks: ['compass'],
    },
    html: {
        files: 'robot-ui/index.html',
    },
    grunt: {
        files: ['Gruntfile.js', 'gruntConfigs/**/*.js'],
        tasks: ['jshint', 'jsbeautifier:grunt']
    }
};

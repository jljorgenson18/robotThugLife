module.exports = {
    "robotServer": {
        src: ['server.js', 'robot-server/**/*.js'],
        options: require("./jsbeautOptions.js")
    },
    "robotUI": {
        src: ['robot-ui/**/*.js', '!robot-ui/all-min.js.js'],
        options: require("./jsbeautOptions.js")
    },
    "grunt": {
        src: ['Gruntfile.js', 'gruntConfigs/**/*.js'],
        options: require("./jsbeautOptions.js")
    }
};

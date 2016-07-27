module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      all: ['Gruntfile.js', 'index.js', 'lib/**/*.js', 'test/**/*.js']
    },
    watch: {
      files: [
        '<%= jshint.all %>'
      ],
      tasks: 'default'
    },
    simplemocha: {
      all: {
        src: 'test/**/*.test.js',
        options: {
          ui: 'tdd',
          reporter: 'list',
          growl: true
        }
      }
    }
  });

  // Load local tasks.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');

  // Default task.
  grunt.registerTask('default', ['jshint', 'simplemocha']);
  grunt.registerTask('test', ['jshint', 'simplemocha']);
  grunt.registerTask('dev', ['default', 'watch']);

};

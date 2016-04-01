module.exports = function(grunt) {

  //Configuração de cada plugin
  grunt.initConfig({
    jshint:{
      dist:{
        src:['public/js/**/*.js']
      }
    }


  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  //Onde fica os passos a serem execultados
  grunt.registerTask('default', []);

};

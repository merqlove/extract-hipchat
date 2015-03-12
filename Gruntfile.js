module.exports = function(grunt) {
  grunt.registerTask('extract', 'Extract src from map', function () {
    var sourceMap = require('source-map'),
        mapFile = grunt.file.read('./app.js.map', {
          encoding: 'UTF8'
        }),
        mapConsumer = new sourceMap.SourceMapConsumer(mapFile),
        cleanFilePattern = /(webpack\:\/\/\/|webpack\:\/|\~\/|[\(\)\^\\\*\$]|\?.*|\s.*)/gi;

    mapConsumer.sources.forEach(function(source){
      if (source.indexOf('.js') >= 0) {
        cleanFileName = source.replace(cleanFilePattern, '');
        grunt.file.write('content/'+cleanFileName.trim(), mapConsumer.sourceContentFor(source), {
          encoding: 'UTF8'
        });
      }
    });
  });

  grunt.registerTask('default', ['extract']);
};

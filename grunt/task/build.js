module.exports = function(grunt) {

	grunt.registerTask('build',
		['clean', 'handlebars', 'copy:rootFiles']);
};

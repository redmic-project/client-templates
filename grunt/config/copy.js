module.exports = function(grunt) {

	grunt.config('copy', {
		mainFile: {
			expand: true,
			cwd: 'src',
			src: 'main.js',
			dest: 'dist'
		},
		helpers: {
			expand: true,
			cwd: 'src/Helpers',
			src: '*.js',
			dest: 'dist/Helpers'
		}
	});
};

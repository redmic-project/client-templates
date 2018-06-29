module.exports = function(grunt) {

	grunt.config('copy', {
		rootFiles: {
			expand: true,
			cwd: 'src',
			src: '*.js',
			dest: 'dist'
		}
	});
};

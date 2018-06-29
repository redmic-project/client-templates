define([
	'handlebars/handlebars.min'
	, 'templates/helpers'
], function(
	handlebars
	, helpers
) {

	for (var helperName in helpers) {
		var helperCallback = helpers[helperName];

		handlebars.registerHelper(helperName, helperCallback);
	}

	return handlebars;
});

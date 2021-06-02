define([
	'handlebars/handlebars.min'
	, 'templates/Helpers/string'
	, 'templates/Helpers/legacy'
], function(
	handlebars
	, stringHelpers
	, legacyHelpers
) {

	for (var stringHelperName in stringHelpers) {
		handlebars.registerHelper(stringHelperName, stringHelpers[stringHelperName]);
	}

	for (var legacyHelperName in legacyHelpers) {
		handlebars.registerHelper(legacyHelperName, legacyHelpers[legacyHelperName]);
	}

	return handlebars;
});

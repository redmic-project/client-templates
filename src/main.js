define([
	'handlebars/handlebars.min'
	, 'templates/Helpers/customParser'
	, 'templates/Helpers/string'
	, 'templates/Helpers/legacy'
], function(
	handlebars
	, customParserHelpers
	, stringHelpers
	, legacyHelpers
) {

	for (var customParserHelperName in customParserHelpers) {
		handlebars.registerHelper(customParserHelperName, customParserHelpers[customParserHelperName]);
	}

	for (var stringHelperName in stringHelpers) {
		handlebars.registerHelper(stringHelperName, stringHelpers[stringHelperName]);
	}

	for (var legacyHelperName in legacyHelpers) {
		handlebars.registerHelper(legacyHelperName, legacyHelpers[legacyHelperName]);
	}

	return handlebars;
});

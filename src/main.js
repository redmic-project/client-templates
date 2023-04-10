define([
	'dojo/aspect'
	, 'handlebars/handlebars.runtime.min'
	, 'templates/Helpers/customParser'
	, 'templates/Helpers/string'
	, 'templates/Helpers/subExpression'
	, 'templates/Helpers/legacy'
], function(
	aspect
	, handlebars
	, customParserHelpers
	, stringHelpers
	, subExpressionHelpers
	, legacyHelpers
) {

	for (var customParserHelperName in customParserHelpers) {
		handlebars.registerHelper(customParserHelperName, customParserHelpers[customParserHelperName]);
	}

	for (var stringHelperName in stringHelpers) {
		handlebars.registerHelper(stringHelperName, stringHelpers[stringHelperName]);
	}

	for (var subExpressionHelperName in subExpressionHelpers) {
		handlebars.registerHelper(subExpressionHelperName, subExpressionHelpers[subExpressionHelperName]);
	}

	for (var legacyHelperName in legacyHelpers) {
		handlebars.registerHelper(legacyHelperName, legacyHelpers[legacyHelperName]);
	}

	aspect.before(handlebars, 'template', function(templateContext, templateOptions) {

		aspect.before(templateContext, 'main', function(config) {

			// anula seguridad innecesaria, la escritura de templates está bajo nuestro control
			config.protoAccessControl.properties.defaultValue = true;
			config.protoAccessControl.methods.defaultValue = true;
		});
	});

	return handlebars;
});

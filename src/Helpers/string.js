define([
	'handlebars/handlebars.min'
	, 'RWidgets/Utilities'
], function(
	handlebars
	, Utilities
) {

	'use strict';

	return {
		Capitalize: function(data) {

			return new handlebars.SafeString(Utilities.capitalize(data));
		}
	};
});

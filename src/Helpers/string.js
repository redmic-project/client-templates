define([
	'handlebars/handlebars.runtime.min'
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

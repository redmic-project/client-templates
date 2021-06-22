define([
	'handlebars/handlebars.min'
], function(
	handlebars
) {

	'use strict';

	return {
		ActivityOpenStatus: function(data, i18n) {

			var result;
			if (!data.endDate) {
				result = '<i title="' + i18n.opened + '" class="activityInProgressIcon"></i>';
			} else {
				result = '<i title="' + i18n.closed + '" class="activityConcludedIcon"></i>';
			}

			return new handlebars.SafeString(result);
		},

		ActivityEmbargoStatus: function(data, i18n) {

			var result = '';
			if (data && data.embargo) {
				result = '<i title="' + i18n.embargo + '" class="activityEmbargoedIcon"></i>';
			}
			return new handlebars.SafeString(result);
		}
	};
});

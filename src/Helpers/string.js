define([
	'handlebars/handlebars.runtime.min'
	, 'moment/moment.min'
	, 'RWidgets/Utilities'
], function(
	handlebars
	, moment
	, Utilities
) {

	'use strict';

	return {
		bold: function(text) {

			var boldClass = 'bold';

			return new handlebars.SafeString('<span class="' + boldClass + '">' + text + '</span>');
		},

		Boolean: function(value, i18n) {

			return new handlebars.SafeString(value ? i18n.yes : i18n.no);
		},

		breaklines: function(text) {

			var textResult = handlebars.Utils.escapeExpression(text).replace(/(\r\n|\n|\r)/gm, '<br>');

			return new handlebars.SafeString(textResult);
		},

		Capitalize: function(data) {

			return new handlebars.SafeString(Utilities.capitalize(data));
		},

		concat: function() {

			var result = '';

			for (var i = 0; i < arguments.length - 1; i++) {
				result += arguments[i];
			}

			return new handlebars.SafeString(result);
		},

		'Date': function(value) {

			if (!value) {
				return;
			}

			var format = dojoConfig.locale === 'en' ? 'MM/DD/YYYY' : 'DD/MM/YYYY',
				formatted = moment(value).format(format);

			return new handlebars.SafeString(formatted);
		},

		DateTime: function(value) {

			if (!value) {
				return;
			}

			var format = dojoConfig.locale === 'en' ? 'MM/DD/YYYY HH:mm:ss' : 'DD/MM/YYYY HH:mm:ss',
				formatted = moment(value).format(format);

			return new handlebars.SafeString(formatted);
		},

		TextURL: function(url, text, title) {

			var titleAttr = title || url,
				content = text || url;

			return new handlebars.SafeString('<a href="' + url + '" target="_blank" title="' + titleAttr + '">' +
				content + '</a>');
		}
	};
});

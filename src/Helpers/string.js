define([
	'handlebars'
	, 'moment'
	, 'RWidgets/Utilities'
], function(
	handlebars
	, moment
	, Utilities
) {

	'use strict';

	var _dateFormat = function(value, mainFormat, altFormat) {

		if (!value) {
			return;
		}

		var format = ['en'].includes(dojoConfig.locale) ? altFormat : mainFormat,
			formatted = moment(value).format(format);

		return new handlebars.SafeString(formatted);
	};

	return {
		bold: function(text) {

			var boldClass = 'bold';

			return new handlebars.SafeString('<span class="' + boldClass + '">' + text + '</span>');
		},

		Boolean: function(value, i18n) {

			return new handlebars.SafeString(value ? i18n.yes : i18n.no);
		},

		breaklines: function(text) {

			var textResult = handlebars.Utils.escapeExpression(text).replace(/(\r\n|\n|\r|\\r\\n|\\n|\\r)/gm, '<br>');

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

			return _dateFormat(value, 'DD/MM/YYYY', 'MM/DD/YYYY');
		},

		DateTime: function(value) {

			return _dateFormat(value, 'DD/MM/YYYY HH:mm:ss', 'MM/DD/YYYY HH:mm:ss');
		},

		TextURL: function(url, text, title) {

			var content = text,
				titleAttr = title;

			if (!content || typeof content !== 'string') {
				content = url;
			}

			if (!titleAttr || typeof titleAttr !== 'string') {
				titleAttr = url;
			}

			var urlString = '<a href="' + url + '" target="_blank" title="' + titleAttr + '">' + content + '</a>';

			return new handlebars.SafeString(urlString);
		}
	};
});

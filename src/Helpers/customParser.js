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

		ActivityAccessibilityStatus: function(data, i18n) {

			var result = '';
			if (data && data.accessibility) {
				var value = data.accessibility.id,
					title;

				if (value === 1) {
					title = 'activityPending';
				} else if (value === 2) {
					title = 'activityFree';
				} else if (value === 3) {
					title = 'activityEmbargoed';
				} else if (value === 4) {
					title = 'activityRestricted';
				} else if (value === 5) {
					title = 'activityConfidential';
				}
				var className = title + 'Icon';

				result = '<i title="' + i18n[title] + '" class="' + className + '"></i>';
			}
			return new handlebars.SafeString(result);
		},

		ActivityInspireTheme: function(data, i18n) {

			var result = '';
			if (data && data.themeInspire) {
				var value = 'inspire-' + data.themeInspire.code,
					classNames = 'activityInspireThemeIcon ' + value + ' fr-' + value;

				result = '<i title="' + i18n[value] + '" class="' + classNames + '"></i>';
			}
			return new handlebars.SafeString(result);
		},

		ActivityResources: function(data, i18n) {

			var result = '';
			if (data && data.resources && data.resources.length) {
				var title = 'activityWithResources',
					className = title + 'Icon';

				result = '<i title="' + i18n[title] + '" class="' + className + '"></i>';
			}
			return new handlebars.SafeString(result);
		},

		ActivityStarred: function(data, i18n) {

			var result = '';
			if (data && data.starred) {
				var title = 'activityStarred',
					className = title + 'Icon';

				result = '<i title="' + i18n[title] + '" class="' + className + '"></i>';
			}
			return new handlebars.SafeString(result);
		},

		ServiceOGCAttribution: function(attribution) {

			var result;

			if (typeof attribution === 'string') {
				result = attribution;
			} else if (attribution && typeof attribution === 'object') {
				var href = attribution.onlineResource,
					text = attribution.title;

				if (!text) {
					result = '';
				} else if (!href) {
					result = text;
				} else {
					result = '<a href="' + href + '" target="_blank" title="' + href + '">' + text + '</a>';
				}
			}

			return new handlebars.SafeString(result);
		}
	};
});

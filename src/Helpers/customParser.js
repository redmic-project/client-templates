define([
	'dojo/_base/lang'
	, 'handlebars/handlebars.min'
], function(
	lang
	, handlebars
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
		},

		ServiceOGCLegend: function(layer) {

			var imgClass = 'detailsPhoto',
				noImgUrl = '/resources/images/noIMG.png',
				legendOptsParam = 'legend_options=forceLabels:on;fontAntiAliasing:true',
				imgUrl;

			if (!layer || !(layer.legend || layer.stylesLayer)) {
				imgUrl = noImgUrl;
			} else if (layer.legend) {
				imgUrl = layer.legend + '&' + legendOptsParam;
			} else {
				var fixedStyles = layer.styles,
					firstStyle;

				if (fixedStyles) {
					var firstFixedStyleName = fixedStyles.split(',')[0],
						firstStyleNameSplit = firstFixedStyleName.split(':'),
						styleWithoutWorkspace = firstStyleNameSplit[firstStyleNameSplit.length - 1];

					var stylesFound = layer.stylesLayer.filter(lang.partial(function(style, item) {

						return item.name === style;
					}, styleWithoutWorkspace));

					if (stylesFound.length) {
						firstStyle = stylesFound[0];
					} else {
						imgUrl = noImgUrl;
					}
				} else {
					firstStyle = layer.stylesLayer[0];
				}

				if (firstStyle) {
					imgUrl = firstStyle.url + '&' + legendOptsParam;
				}
			}

			var imgElement = '<img src="' + imgUrl + '" class="' + imgClass + '" />';

			return new handlebars.SafeString(imgElement);
		},

		ServiceOGCImageList: function(images) {

			var containerClass = 'imageListContainer',
				imgClass = 'imageListElement',
				imagesSplit = images.split(','),
				imageElementList = '';

			for (var i = 0; i < imagesSplit.length; i++) {
				var imageSrc = imagesSplit[i];
				imageElementList += '<img src="' + imageSrc + '" class="' + imgClass + '" />';
			}

			var imagesContainer = '<div class="' + containerClass + '">' + imageElementList + '</div>';

			return new handlebars.SafeString(imagesContainer);
		}
	};
});

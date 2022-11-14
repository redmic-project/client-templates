define([
	'dojo/_base/lang'
	, 'handlebars/handlebars.runtime.min'
	, 'redmic/base/Credentials'
], function(
	lang
	, handlebars
	, Credentials
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
		},

		ItemEnabledStatus: function(data, i18n) {

			var result = '';
			if (!data.enabled) {
				result = '<i title="' + i18n.disabled + '" class="itemDisabledIcon"></i>';
			}

			return new handlebars.SafeString(result);
		},

		DocumentInternalUrlStatus: function(data, i18n) {

			var pdfUrl = data.internalUrl,
				privatePdf = data.privateInternalUrl,
				result = '';

			if (!(!pdfUrl || (privatePdf && Credentials.get('userRole') !== 'ROLE_ADMINISTRATOR'))) {
				if (privatePdf) {
					result = '<i title="' + i18n.privateInternalUrl + '" class="documentPrivateInternalUrlIcon"></i>';
				} else {
					result = '<i title="' + i18n.internalUrl + '" class="documentInternalUrlIcon"></i>';
				}
			}

			return new handlebars.SafeString(result);
		},

		DocumentUrl: function(data, i18n) {

			var externalUrl = data.url,
				result = '';


			if (externalUrl && externalUrl.length) {
				var domain;
				try {
					domain = new URL(externalUrl).hostname;
				} catch (e) {
					if (e instanceof TypeError) {
						console.error('Received invalid document external URL: %s', externalUrl);
					}
				}

				var text = domain || i18n.link,
					textPrefix = '<span>' + i18n.viewExternalUrl + '</span>',
					linkParams = 'href="' + externalUrl + '" target="_blank" title="' + externalUrl + '"',
					textLink = '<a ' + linkParams + '>' + text + '</a>',
					icon = '<i title="' + externalUrl + '" class="documentExternalUrlIcon"></i>',
					iconLink = '<a ' + linkParams + '>' + icon + '</a>';

				result = iconLink + textPrefix + ' ' + textLink;
			}

			return new handlebars.SafeString(result);
		},

		Image: function(imagePath, useCredentials) {

			var imgSrc;
			if (!imagePath) {
				imgSrc = '/resources/images/noIMG.png';
			} else if (imagePath.indexOf('/') !== 0) {
				imgSrc = imagePath;
			} else {
				// TODO se reemplaza la terminación de la ruta al servidor porque las imágenes ya
				// la contienen. Cuando se corrija esta circunstancia, eliminar el reemplazo
				var imgSrcPrefix = envApiUrl.replace('/api', '');
				imgSrc = imgSrcPrefix + imagePath;

				var mustUseCredentials = useCredentials && typeof useCredentials === 'boolean';
				if (mustUseCredentials && Credentials.get('userRole') !== 'ROLE_GUEST') {
					imgSrc += '?access_token=' + Credentials.get('accessToken');
				}
			}

			var imgItem = '<img src="' + imgSrc + '"/><br>';

			return new handlebars.SafeString(imgItem);
		}
	};
});

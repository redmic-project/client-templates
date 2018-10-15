define([
	'dojo/i18n!app/nls/translation'
	, 'handlebars/handlebars.min'
	, 'moment/moment.min'
	, 'redmic/base/Credentials'
	, 'redmic/validation/stringFormats'
	, 'RWidgets/Utilities'
], function(
	i18n
	, handlebars
	, moment
	, Credentials
	, stringFormats
	, Utilities
) {

	'use strict';

	// TODO!!!!!!!!!!!! dividir el fichero por categorias, al estilo de los helpers de Assemble (http://assemble.io/helpers/)

	var translate = function (i18n, data, separate, plural) {

			var result = "",
				dataSplit = false;

			if (separate && typeof separate === 'string' && typeof data === 'string' && data.indexOf('_') !== -1){
				dataSplit = data.split(separate);
			}

			if (dataSplit && dataSplit.length > 1) {
				for (var i = 0; i < dataSplit.length; i++) {
					if (i !== 0) {
						var dataString = i18n[dataSplit[i]] || dataSplit[i];
						result += dataString.toLowerCase();
					} else {
						result += Utilities.capitalize(i18n[dataSplit[i]] || dataSplit[i]);
					}

					if (i + 1 !== dataSplit.length) {
						result += " ";
					}
				}
			} else {
				if (plural === true) {
					var last = data.length - 1;
					if (data[last] === 'y') {
						data = data.slice(0, last);
						data += 'ies';
					} else {
						data += 's';
					}
				}

				if (i18n && i18n[data]) {
					result = i18n[data];
				} else {
					result = data;
				}
			}

			return new handlebars.SafeString(result);
		},
		breaklines = function (text) {

			text = handlebars.Utils.escapeExpression(text);
			text = text.replace(/(\r\n|\n|\r)/gm, '<br>');

			return new handlebars.SafeString(text);
		},
		textUrl = function (url, text, title) {

			return new handlebars.SafeString("<a href='" + url + "' target='_blank' title='" + title + "'>" + text + "</a>");
		},
		dateTime = function (dateTime) {

			if (dateTime) {
				var format = dojoConfig.locale === "en" ? "MM/DD/YYYY HH:mm:ss" : "DD/MM/YYYY HH:mm:ss",
					formatted = moment(dateTime).format(format);

				return new handlebars.SafeString(formatted);
			}
		},
		date = function (date) {

			if (date) {
				var format = dojoConfig.locale === "en" ? "MM/DD/YYYY" : "DD/MM/YYYY",
					formatted = moment(date).format(format);

				return new handlebars.SafeString(formatted);
			}
		},
		addWebcam = function (url, notHref) {

			var content = "",
				classContainer = 'containerImageOrWebcam fWidth fHeight',
				link = "<a href=" + url + " target='_blank' title=''>" +
					"<i class='paddingContainerWebcam fa fa-link'></i> " + Utilities.capitalize(i18n.link) + "</a>";

			if (url.includes("youtube")) {
				var urlFormat = url;

				urlFormat += '?rel=0&amp;controls=0&amp;showinfo=0&autoplay=1';

				urlFormat = urlFormat.replace('watch?v=', 'embed/');

				content = "<iframe class='" + classContainer + "' src=" + urlFormat + " allowfullscreen></iframe>";
			}

			if (isImage(url)) {
				content = "<a href=" + url + " target='_blank' title=''>";
				content += "<img class='" + classContainer + " loadingByImg' src=" + url + " title='" + url +
					"' onerror=\"this.src = '/resources/images/noIMG.png';this.style='max-width: 20rem;'\"" +
					" onload=\"this.classList.remove('loadingByImg');\"></img></a>";
			}

			if (!content && notHref) {
				return;
			}

			if (!notHref) {
				content += link;
			}

			return new handlebars.SafeString(content);
		},
		isImage = function(value) {

			var typeFormats = ["jpg", "cgi"],
				checkImage = false;

			for (var i = 0; i < typeFormats.length; i++) {
				if (value.includes(typeFormats[i])) {
					checkImage = true;
					break;
				}
			}

			return checkImage;
		},
		propToAtlas = function(key, value) {

			var content = '',
				classRow = 'paddingItemInRow';

			if (i18n[key] && value) {

				content += '<span class="' + classRow + '"><span class="bold fontExo2">' + i18n[key] + '</span>: ';

				if (!stringFormats.url(value)) {
					content += textUrl(value, i18n.link, i18n[key]);
				} else if (!stringFormats['date-time'](value)) {
					content += dateTime(value);
				} else if (!stringFormats.date(value)) {
					content += date(value);
				} else {
					content += breaklines(value);
				}

				content += '</span>';
			}

			return content;
		};

	return {
		'PropertiesAtlas': function(data) {

			var content = '',
				props = data.properties || data,
				value = props.url;

			if (value && !stringFormats.url(value)) {
				var imageOrWebcam = addWebcam(value, true);
				if (imageOrWebcam) {
					content = '<span class="paddingItemInRow">' + imageOrWebcam + '</span>';
				}
			}

			if (data.geometry && data.geometry.type && data.geometry.type === 'Point') {
				content += propToAtlas('x', data.geometry.coordinates[0]);
				content += propToAtlas('y', data.geometry.coordinates[1]);
			}

			for (var key in props) {
				content += propToAtlas(key, props[key]);
			}

			return new handlebars.SafeString(content);
		},

		'StartEnd': function(data, i18n) {

			var result = '';
			if (!data.endDate && data.startDate) {
				result += "<i title='" + i18n.opened + "' class='fa fa-folder-open-o'></i>";
			} else {
				result += "<i title='" + i18n.closed + "' class='fa fa-folder-o'></i>";
			}

			if (data.embargo) {
				result += "<i title='" + i18n.embargo + "' class='fa fa-lock redIcon'></i>";
			}

			return new handlebars.SafeString(result);
		},

		'TimeCumulative': function(time, unitTime, i18n) {

			if (time) {
				unitTime = unitTime ? unitTime : 'milliseconds';
				var duration = moment.duration(time, unitTime),
					objTime = duration._data,
					result = '';

				/*if (objTime.years) {
					result += objTime.years;
					if (objTime.years > 1)
						result += ' ' + i18n.year + ' ';
					else
						result += ' ' + i18n.years + ' ';
				}

				if (objTime.months) {
					result += objTime.months;
					if (objTime.months > 1)
						result += ' ' + i18n.months + ' ';
					else
						result += ' ' + i18n.month + ' ';
				}*/

				var days = duration.asDays();
				if (days >= 1) {
					result += Math.trunc(days);
					if (days > 1) {
						result += ' ' + i18n.days + ' ';
					} else {
						result += ' ' + i18n.day + ' ';
					}
				}

				if (objTime.hours || objTime.minutes || objTime.seconds || objTime.milliseconds) {

					if (objTime.hours) {
						if (objTime.hours < 10) {
							result += '0';
						}

						result += objTime.hours + ':';
					} else
						result += '00:';

					if (objTime.minutes) {
						if (objTime.minutes < 10) {
							result += '0';
						}

						result += objTime.minutes + ':';
					} else {
						result += '00:';
					}

					if (objTime.seconds) {
						if (objTime.seconds < 10) {
							result += '0';
						}

						result += objTime.seconds;
					} else {
						result += '00';
					}

					if (objTime.milliseconds) {
						var aux = '.';

						if (objTime.milliseconds < 10) {
							aux += '00';
						} else if (objTime.milliseconds < 100) {
							aux += '0';
						}

						result += aux + objTime.milliseconds;
					}
				}

				return new handlebars.SafeString(result);
			}
		},

		'Progress': function(data) {

			if (data.level == "inProgress") {
				return new handlebars.SafeString("<div data-redmic-id='progressBar' class='progressBar'></div>");
			}
		},

		'qualityControl': function(data, i18n) {

			// TODO no se esta usando actualmente porque no esta implementado

			var result = '';
			if (!data.qualityControl) {
				result += "<i title='" + i18n.qualityControl + "' class='fa fa-check greenIcon'></i>";
			}

			return new handlebars.SafeString(result);
		},

		'GroupIcon': function(icon) {

			if (icon) {
				var split = String(icon).split('-');
				if (split[0] == 'fr' || split[0] == 'fa') {
					icon = split[0] + ' ' + icon;
				} else {
					icon = "fa fa-camera";
				}
			} else {
				icon = "fa fa-camera";
			}

			return new handlebars.SafeString("<i class='" + icon + "'></i>");
		},

		'GroupIconInspire': function(themeInspire, i18n, autoColor) {

			var content = "<i class='";

			if (themeInspire) {
				content += 'fr fr-inspire-' + themeInspire;
			} else {
				content += "fa fa-camera";
			}

			if (autoColor && themeInspire) {
				content += " inspire-" + themeInspire;
			}

			if (themeInspire) {
				content += "' title='" + i18n["inspire-" + themeInspire];
			}

			return new handlebars.SafeString(content + "'></i>");
		},

		'Legend': function(url) {

			var content;

			if (url) {
				var params = {
					legend_options: "fontAntiAliasing:true;dpi:100"
				};

				var paramsStr = L.Util.getParamString(params);

				if (url.indexOf("?") >= 0) {
					paramsStr = "&" + paramsStr.substr(1, paramsStr.length);
				}

				url = url + paramsStr;

				content = "<img src='" + url + "' class='detailsPhoto' /><br>";
			} else {
				content = "<img src='/resources/images/noIMG.png' class='detailsPhoto' /><br>";
			}

			return new handlebars.SafeString(content);
		},

		'Image': function(image, urlDefault) {

			var content;
			if (image && (Credentials.get("userRole") && (Credentials.get("userRole") != "ROLE_GUEST"))) {
				content = "<img src='" + image + "?access_token=" + Credentials.get("accessToken") +
				"' width='100%' class='detailsPhoto' /><br>";
			} else if (!(urlDefault instanceof Object)) {
				content = "<img src='" + urlDefault + "' width='100%' class='detailsPhoto' /><br>";
			} else {
				content = "<img src='/resources/images/noIMG.png' width='100%' class='detailsPhoto' /><br>";
			}

			return new handlebars.SafeString(content);
		},

		'URL': function(url) {

			if (url) {
				return new handlebars.SafeString("<a href=" + url + " target='_blank' title='" + url + "'>" + url + "</a>");
			}
		},

		'UrlWebcam': addWebcam,

		'TextURL': textUrl,

		'Icon': function(url, type) {

			if (type === 'PDF') {
				return new handlebars.SafeString("<a href=" + url + "?access_token=" + Credentials.get("accessToken") +
					" target='_blank' title='" + type + "'><div class='detailsBottomBarButton pdfLogo'></div></a>");
			}
		},

		'Href': function(href, id) {

			var content = "href='" + href;

			if (id) {
				content += id;
			}

			return new handlebars.SafeString(content + "' d-state-url=true");
		},

		'Badge': function(url, classBadge, title, label, subLabel, aphia) {

			var content = '';

			if (url) {
				content += "<a href=" + url + " target='_blank' class='noDecoratedLink' title='" + title + "'>";
			}

			content += "<div class='badge " + classBadge + "'><span class='badgeLabel'>" + label +
				"</span><span class='badgeSubLabel'>(" + subLabel + ": " + aphia + ")</span></div>";

			if (url) {
				content += "</a>";
			}

			return new handlebars.SafeString(content);
		},

		'Email': function(email) {

			if (email) {
				return new handlebars.SafeString("<a href='mailto:" + email + "'>" + email + "</a>");
			}
		},

		'Array': function(item, separate, name, attr) {

			var content = '';

			for (var i in item) {
				if (typeof attr == "string") {
					content += item[i][name][attr];
				} else if (typeof name == "string") {
					content += item[i][name];
				} else {
					content += item[i];
				}

				if (i < item.length - 1) {
					content += separate;
				}
			}

			return new handlebars.SafeString(content);
		},

		'Hierarchy': function(data) {

			var ord = ["kingdom", "phylum", "subphylum", "class", "order", "family", "genus", "species", "subspecies", "variety"],
				content = '';

			for (var i = 0; i < ord.length; i++) {
				if (data[ord[i]]) {
					if (content.length > 0) {
						content += " > ";
					}

					content += data[ord[i]].scientificName;
				}
			}

			if (content.length > 0) {
				return new handlebars.SafeString("<span>" + content + "</span>");
			}
		},

		'listSeparate': function(data, separate, path) {

			var content = '';

			for (var i = 0; i < data.length; i++) {
				var item = data[i];

				if (typeof path === "string") {
					item = Utilities.getDeepProp(item, path);
				}

				if ((lang == 'en') && (item.name_en && item.name_en.length !== 0)) {
					content += item.name_en;
				} else {
					content += item.name;
				}

				if ((data.length - 1) != i) {
					content += separate;
				}
			}

			return new handlebars.SafeString(content);
		},

		'RowColBibliography': function(option) {

			if (option == 'left') {
				return new handlebars.SafeString('col-xs-5 col-sm-4 col-md-4 col-lg-3 col-xl-2');
			} else {
				return new handlebars.SafeString('col-xs-7 col-sm-8 col-md-8 col-lg-9 col-xl-10');
			}
		},

		'RowColActivityCatalog': function(option) {

			if (option == 'left') {
				return new handlebars.SafeString('col-xs-5 col-sm-4 col-md-5 col-lg-6 col-xl-3');
			} else {
				return new handlebars.SafeString('col-xs-7 col-sm-8 col-md-9 col-lg-10 col-xl-9');
			}
		},

		'RowColSpeciesCatalog': function(option) {

			if (option == 'left') {
				return new handlebars.SafeString('col-xs-5 col-sm-4 col-md-5 col-lg-6 col-xl-4');
			} else {
				return new handlebars.SafeString('col-xs-7 col-sm-8 col-md-7 col-lg-6 col-xl-8');
			}
		},

		'RowColServiceOGCCatalog': function(option) {

			if (option == 'left') {
				return new handlebars.SafeString('col-xs-5 col-sm-4 col-md-4 col-lg-3 col-xl-2');
			} else {
				return new handlebars.SafeString('col-xs-7 col-sm-8 col-md-8 col-lg-9 col-xl-10');
			}
		},

		'URLDetails': function(url) {

			var content;

			if (url) {
				content = url + "?access_token=" + Credentials.get("accessToken");
			} else {
				content = "";
			}

			return new handlebars.SafeString(content);
		},

		'ancestorsSpecies': function(data) {

			var rankList = ["Kingdom", "Phylum", "Subphylum", "Class", "Order", "Family", "Genus", "Species", "Subspecies", "Variety"],
				ancestors = {},
				content = "",
				count = 0,
				item;

			for (item in data){
				ancestors[data[item].rank.name] = data[item];
			}

			for (item in rankList) {
				item = rankList[item];
				if (ancestors[item]) {
					count ++;
					content += " " + ancestors[item].scientificName;
					if (count != (data.length)) {
						content += " >";
					}
				}
			}

			return new handlebars.SafeString(content);
		},

		'ancestorsActivity': function(data, i18n) {

			var content = "",
				contentHref = "' d-state-url=true>",
				onePart = "<div class='row'><div class='rowLeft col-xs-5 col-sm-4 col-md-5 col-lg-6 col-xl-3'><span>",
				twoPart = "</span></div><div class='col-xs-7 col-sm-8 col-md-9 col-lg-10 col-xl-9'><p><a href='/catalog/",
				threePart = "</a></p></div></div>";

			var processItem = function(item) {

				var pathLength = item.path.split('.').length;

				if (pathLength === 2) {
					return onePart + i18n.program + twoPart + "program-info/" + item.id + contentHref + item.name +
						threePart;
				} else if (pathLength === 3) {
					return onePart + i18n.project + twoPart + "project-info/" + item.id + contentHref + item.name +
						threePart;
				}
			};

			if (data instanceof Array) {
				for (var item in data) {
					content += processItem(data[item]);
				}
			} else {
				content = processItem(data);
			}

			return new handlebars.SafeString(content);
		},

		'insertButton': function() {

			var content = '';

			for (var item in this.listButton) {
				content += "<i class='fa " + this.listButton[item].icon + " iconList'></i>";
			}

			return new handlebars.SafeString(content);
		},

		'Date': date,

		'DateTime': dateTime,

		'lang': function(data) {

			if (data) {
				if ((lang == 'en') && (data.name_en && data.name_en.length !== 0)) {
					return new handlebars.SafeString(data.name_en);
				} else if ((lang == 'es') || (!data.name_en) || (data.name_en.length === 0)) {
					return new handlebars.SafeString(data.name);
				}
			}
		},

		'Translate': translate,

		'ChartsHierarchicalListParse': function(i18n, data) {

			var result = "",
				label = data.label;

			if (typeof label === 'string') {
				result = translate(i18n, label, "_");
			} else if (typeof label === 'number') {
				if (label < 0) {
					result = i18n.depth + ": " + label;
				} else {
					result = i18n.altitude + ": " + label;
				}
			}

			return new handlebars.SafeString(result);
		},

		'TranslateUncapitalize': function(i18n, item) {

			var result = Utilities.uncapitalize(item);

			result = this.i18n[result] ? this.i18n[result] : item;

			return new handlebars.SafeString(result);
		},

		'ImageDetails': function(image, accessToken, iconOrClass) {

			var content = "<img src='";

			if (image && (Credentials.get("userRole") && (Credentials.get("userRole") != "ROLE_GUEST"))) {
				if (accessToken && Credentials.get("accessToken")) {
					image += "?access_token=" + Credentials.get("accessToken");
				}

				content += image;
			} else {
				content += "/resources/images/noIMG.png";
			}

			if (iconOrClass && typeof iconOrClass === 'string') {
				content += "' class='" + iconOrClass;
			}

			content += "'/><br>";

			return new handlebars.SafeString(content);
		},

		'ImageDetailsPublic': function(image, iconOrClass) {

			var content = "<img src='";

			if (image) {
				content += image;
			} else {
				content += "/resources/images/noIMG.png";
			}

			if (iconOrClass && typeof iconOrClass === 'string') {
				content += "' class='" + iconOrClass;
			}

			content += "'/><br>";

			return new handlebars.SafeString(content);
		},

		'ChkIsNull': function(data) {

			if (data) {
				return new handlebars.SafeString(data);
			}
		},

		'Status': function(status) {

			if (status) {
				if ((status.name) && (status.name == 'accepted')) {
					return new handlebars.SafeString("<span class='status' style='color: green'>" + status.name + "</span>");
				}

				if ((status.name) && (status.name == 'unaccepted')) {
					return new handlebars.SafeString("<span class='status' style='color: red'>" + status.name + "</span>");
				} else if (status.name) {
					return new handlebars.SafeString("<span class='status'>" + status.name + "</span>");
				}
			}
		},

		'PDFHref': function(id, text, title) {

			return new handlebars.SafeString("<a href=/bibliography/document-info/" + id +
				" d-state-url='true' title='" + title + "'>" + text + "</a>");
		},

		'toFixed': function(number, digits) {

			if (digits === undefined) {
				digits = 0;
			}

			if (lang == 'es') {
				return number.toFixed(digits).replace(".", ",");
			} else {
				return number.toFixed(digits);
			}
		},

		'Keyword': function(keyword) {

			var content = '',
				keywordSplit = String(keyword).split(',');

			for (var i = 0; i < keywordSplit.length; i++){
				content += keywordSplit[i];

				if ((keywordSplit.length - 1) != i) {
					content += ' | ';
				}
			}

			return new handlebars.SafeString(content);
		},

		'ArrayString': function(array) {

			var content = '';

			for (var i = 0; i < array.length; i++){
				content += "\"" + array[i] + "\"";

				if ((array.length - 1) != i) {
					content += ' | ';
				}
			}

			return new handlebars.SafeString(content);
		},

		'Classifications': function(array) {

			if (!array) {
				return;
			}

			var content = '',
				item;

			for (var i = 0; i < array.length; i++) {

				item = array[i];

				content += '<div><span class="propValue paddingLeftRow"> - ' + item.type.name;

				if (item.startDate) {
					content += ' (' + date(item.startDate).string + ' - ' ;
					if (item.endDate) {
						content += date(item.endDate).string;
					} else {
						content += '   ';
					}

					content += ')';
				}
				content += '</span></div>';
			}

			return new handlebars.SafeString(content);
		},

		'bold': function(text) {

			var boldClass = "bold";

			return new handlebars.SafeString('<span class="' + boldClass + '">' + text + '</span>');
		},

		'IterateJSON': function(obj) {

			// TODO creo que mejor la versión descomentada (respetando json pero con saltos de linea)
			var str = JSON.stringify(obj)
				/*.replace(new RegExp(":{", 'g'), "</br>")
				.replace(new RegExp(',"', 'g'), '</br>"')
				.replace(new RegExp('":', 'g'), '": ');*/
				.replace(new RegExp("{", 'g'), "{</br>")
				.replace(new RegExp(',"', 'g'), ',</br>"')
				.replace(new RegExp('":', 'g'), '": ');

			return new handlebars.SafeString('<span>' + str + '</span>');
		},

		'ProtocolsServiceOGC': function(item, i18n) {

			var content = '';

			for (var i in item) {
				content += "<div class='row rowDest'><div class='rowLeft col-xs-5 col-sm-4 col-md-4 col-lg-3 col-xl-2'>";
				content += "<span>" + i18n.url + " " + item[i].type +
					"</span></div><div class='col-xs-7 col-sm-8 col-md-8 col-lg-9 col-xl-10'>";
				content += "<span>" + item[i].url + "</span></div></div>";
			}

			return new handlebars.SafeString(content);
		},

		'breaklines': breaklines,

		'textOrSpace': function(text) {

			if (text) {
				return new handlebars.SafeString(text);
			}

			return new handlebars.SafeString('<br>');
		},

		'PrintProperty': function(data, property, separate) {

			if (data[property]) {
				return new handlebars.SafeString(separate + data[property]);
			}
		},

		'SafeUrl': function(url, text, title) {

			var userRole = Credentials.get("userRole"),
				result;

			if (userRole === "ROLE_ADMINISTRATOR" || userRole === "ROLE_OAG" || userRole === "ROLE_COLLABORATOR") {
				result = "<a href=" + url + " target='_blank' title='" + title + "'>" + text + "</a>";
			} else {
				result = text;
			}

			return new handlebars.SafeString(result);
		},

		'concat': function() {

			var result = "";

			for (var i = 0; i < arguments.length - 1; i++) {
				result += arguments[i];
			}

			return new handlebars.SafeString(result);
		},

		'showBoolean': function(value) {

			return new handlebars.SafeString(value ? i18n.yes : i18n.no);
		},

		'reverse': function(/*Array*/ value) {

			return value && value.reverse ? value.reverse() : value;
		},

		'PathLength': function(/*String*/ path, /*Integer*/ increment) {

			var pathLength = path.split('.').length;

			if (typeof increment === 'number') {
				pathLength += increment;
			}

			return pathLength;
		},

		'Parents': function(data, attr, label) {

			var content = data[label],
				item = data[attr];

			while (item[attr]) {
				content = item[label] + " > " + content;
				item = item[attr];
			}

			return new handlebars.SafeString(content);
		},

		'Depth': function(item, i18n) {

			var content = '';

			if (item || item === 0) {
				content = ' - ' + i18n.zDepthAltitude + ': '+ item;
			}

			return new handlebars.SafeString(content);
		},

		'IsValidZ': function(valueZ) {

			var content;

			if (valueZ || valueZ === 0) {
				content = valueZ + ' m.';
			} else {
				content = i18n.notDefined;
			}

			return new handlebars.SafeString(content);
		},

		'ExpandOrCollapse': function() {

			var content = "id='expandOrCollapseNode' class='spanTemplate hidden'";

			return new handlebars.SafeString(content);
		},

		'ColorRamp': function(colors) {

			var content = "";

			if (colors) {
				for (var i = 0; i < colors.length; i++) {
					content += '<div class="unitColor" style="background: ' + colors[i] + ';"></div>';
				}
			}

			return new handlebars.SafeString(content);
		},

		'DetailsTitle': function(data) {

			return new handlebars.SafeString(data.title ? data.title : data.name);
		}
	};
});

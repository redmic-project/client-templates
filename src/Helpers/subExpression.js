define([], function() {

	'use strict';

	return {
		PropertyIsDefinedAndFalse: function(data, propertyName) {

			return data && data[propertyName] !== undefined && data[propertyName] !== null && !data[propertyName];
		}
	};
});

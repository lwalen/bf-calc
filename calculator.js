
// turns an input string like "2' 3/4''" into a float like 24.75
function parseInput(v) {

	// split input into feet and inches, if applicable
	var array = v.split(' ');

	// remove empty elements
	array = array.filter(function(e){return e});

	var results = new Array();

	$.each(array, function(index, value) {
		var unit = parseUnit(value);

		// remove unit symbols
		value = value.replace(/['"]/g, '')

		result = evaluateFractions(value);

		// convert feet to inches
		if (unit == 'feet') {
			result = result * 12;
		}

		results.push(result);
	});

	// sum the values
	var final_value = results.reduce(function(a, b) {
		return a + b;
	});

	return final_value;
}

// determines the unit of a thing like 3/4''
function parseUnit(value) {

	// extract the symbol
	unit_symbol = value.match(/^[0-9\/.]*(['"]{1,2})$/);

	if (unit_symbol) {
		if (unit_symbol[1] == "'") {
			return 'feet';
		} else if (unit_symbol[1] == "''" || unit_symbol[1] == '"') {
			return 'inches';
		}
	}
	return 'inches';
}

// evaluates fractions if they exist and turns them into a number
function evaluateFractions(value) {
	arr = value.split('/');
	arr = arr.filter(function(e){return e});
	if (arr.length > 1) {
		return arr[0] / arr[1];
	} else {
		return parseFloat(arr[0]);
	}
}

// update board feet field
function updateBoardFeet() {
	var l = $('.length').val();
	var w = $('.width').val();
	var t = $('.thickness').val();

	if (l != "") { l = parseInput(l) }
	if (w != "") { w = parseInput(w) }
	if (t != "") { t = parseInput(t) }

	if ($.isNumeric(l) && $.isNumeric(w) && $.isNumeric(t)) {
		if ($('.length_unit').val() == "ft") { l *= 12 }
		if ($('.width_unit').val() == "ft") { w *= 12 }
		if ($('.thickness_unit').val() == "ft") { t *= 12 }
		$('.board-feet').val(l * w * t / 144);
	} else {
		$('.board-feet').val('');
	}
}

function assert(f, a, e) {
	console.log((f(a) == e) + "\t: " + f.name + "(" + a + ")" + " == " + e);
}

function runTests() {
	parse_unit_tests = {'2"'   : 'inches',
	                      "3'"   : 'feet',
	                      "4''"  : 'inches',
	                      "5.0'" : 'feet',
	                      '6/7"' : 'inches'
	                     }
	$.each(parse_unit_tests, function(value, expected) {
		assert(parseUnit, value, expected);
	});

	fraction_eval_tests = {'1/2'   : 0.5,
	                       '2'     : 2,
	                       '4.5/3' : 1.5
	                      }

	$.each(fraction_eval_tests, function(value, expected) {
		assert(evaluateFractions, value, expected);
	});

	parse_input_tests = {'10'           : 10,
	                     "5' 1''"       : 61,
	                     "1/2'"         : 6,
	                     "1.5'"         : 18,
	                     "10.25' 3/4''" : 123.75
	                    }

	$.each(parse_input_tests, function(value, expected) {
		assert(parseInput, value, expected);
	});
}

$(function() {
	$('.length, .width, .thickness').bind('keyup', function() {
		setTimeout(function() {
			updateBoardFeet();
		}, 0);
	});

	$('.length_unit, .width_unit, .thickness_unit').change('keyup', function() {
		setTimeout(function() {
			updateBoardFeet();
		}, 0);
	});

});
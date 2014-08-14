
// turns an input string like "2' 3/4''" into a float like 24.75
function parseInput(v) {

	if (v == '') {
		return '';
	}

	// pad with a space right after ' and "
	v = v.replace('"', '" ');
	v = v.replace("'", "' ");

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
	unit_symbol = value.match(/^[0-9\/.]* ?(['"])$/);

	if (unit_symbol) {
		symbol = unit_symbol[1];
		if (symbol == "'") {
			return 'feet';
		} else if (symbol == '"') {
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
	var l = $('.length .field-text').text();
	var w = $('.width .field-text').text();
	var t = $('.thickness .field-text').text();

	l = parseInput(l);
	w = parseInput(w);
	t = parseInput(t);

	if ($.isNumeric(l) && $.isNumeric(w) && $.isNumeric(t)) {
		$('.board-feet').text(l * w * t / 144);
	} else {
		$('.board-feet').text('');
	}
}

$(function() {
   FastClick.attach(document.body);

	$('.keypad td').click(function() {
		td = $(this).text();

		$('.selected .field-text').text(function(i, v) {
			// console.log(td);

			if (td == "space") {
				return v + ' ';
			} else if (td == "del") {
				return v.slice(0, -1);
			} else if (td == "ft") {
				return v + "'";
			} else if (td == "in") {
				return v + '"';
			} else {
				return v + td;
			}
		});

		updateBoardFeet();
	});

	$('.field').click(function() {
		$('.field').removeClass('selected');
		$(this).addClass('selected');
	});
});
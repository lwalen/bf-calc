
// turns an input string like "2' 3/4''" into a float like 24.75
function parseInput(v) {

	if (v == '') {
		return '';
	}

	// turn ' into f' and turn " into i", for easier parsing
	v = v.replace('"', 'i"');
	v = v.replace("'", "f'");

	// split input on units
	var array = v.split(/['"]/);

	array = removeEmpty(array);

	results = [];

	$.each(array, function(index, value) {

		var unit = parseUnit(value);

		// remove unit symbols
		value = value.replace(/[fi]/g, '');

		result = evaluateFractions(value);

		// convert feet to inches
		if (unit == 'f') {
			result = result * 12;
		}

		results.push(result);
	});

	return sum(results);
}

// determines the unit of a thing like 3/4i
function parseUnit(value) {

	// extract the symbol
	unit_symbol = value.match(/^.*([fi])$/);

	if (unit_symbol) {
		return unit_symbol[1];
	}
	return 'i';
}

// evaluates fractions if they exist and turns them into a number
function evaluateFractions(value) {
	outer_arr = value.split(' ');

	outer_arr = removeEmpty(outer_arr);

	values = []

	$.each(outer_arr, function(i, v) {
		arr = v.split('/');
		arr = removeEmpty(arr);

		if (arr.length > 1) {
			values.push(arr[0] / arr[1]);
		} else {
			values.push(parseFloat(arr[0]))
		}
	});

	return sum(values);
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
		$('.board-feet .field-text').text((l * w * t / 144).toFixed(2));
	} else {
		$('.board-feet .field-text').text('');
	}
}

// update value based on key pressed
function convertButton(key, value) {
	if (key == "spc") {
		return value + ' ';
	} else if (key == "del") {
		return value.slice(0, -1);
	} else if (key == "ft") {
		return value + "'";
	} else if (key == "in") {
		return value + '"';
	} else {
		return value + key;
	}
}

function resetFields() {
	$('.length .field-text').text('');
	$('.width .field-text').text('');
	$('.thickness .field-text').text('');
	$('.board-feet .field-text').text('');
}

function sum(array) {
	return array.reduce(function(a, b) {
		return a + b;
	});
}

function removeEmpty(array) {
	return array.filter(function(e) {
		return e;
	});
}

$(function() {
	// respond to touch faster
   FastClick.attach(document.body);

   // handle keypad use
	$('.keypad td').click(function() {
		td = $(this).text();

		$('.selected .field-text').text(function(i, v) {
			return convertButton(td, v);
		});

		updateBoardFeet();
	});

	// handle field selection
	$('.field').click(function() {
		$('.field').removeClass('selected');
		$(this).addClass('selected');
	});

	// add current board feet to history
	$('.save').click(function() {
		var bf = $('.board-feet .field-text').text();
		if (bf !== '') {
			$('.history').prepend("<div class='history-item'>" + bf + "</div>");
			resetFields();
		}
	});
});
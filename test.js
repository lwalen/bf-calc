function assert(f, a, e) {
	result = f(a);
	console.log((result == e) + "\t: " + f.name + "(" + a + "): " + result + " == " + e);
}

// CTRL + SHIFT + J. runTests()
function runTests() {
	parse_unit_tests = {'2'      : 'i',
	                    "3f"     : 'f',
	                    "5.0f"   : 'f',
	                    '6/7i'   : 'i',
	                    "1 3/4f" : 'f'
	                   }
	$.each(parse_unit_tests, function(value, expected) {
		assert(parseUnit, value, expected);
	});

	fraction_eval_tests = {'1/2'    : 0.5,
	                       '2'      : 2,
	                       '4.5/3'  : 1.5,
	                       '10 1/2' : 10.5
	                      }

	$.each(fraction_eval_tests, function(value, expected) {
		assert(evaluateFractions, value, expected);
	});

	parse_input_tests = {'10'           : 10,
	                     "5' 1\""       : 61,
	                     "2'5\""        : 29,
	                     "1/2'"         : 6,
	                     "1.5'"         : 18,
	                     "3 1/2'"       : 42,
	                     "10.25' 3/4\"" : 123.75
	                    }

	$.each(parse_input_tests, function(value, expected) {
		assert(parseInput, value, expected);
	});
}
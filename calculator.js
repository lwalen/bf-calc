function updateBoardFeet() {
	var l = $('.length').val();
	var w = $('.width').val();
	var t = $('.thickness').val();
	console.log("l = [" + l + "], w = " + w + ", t = " + t);

	if ($.isNumeric(l)) {
		$('.length').css('color', '');
	} else {
		$('.length').css('color', 'red');
	}

	if ($.isNumeric(w)) {
		$('.width').css('color', '');
	} else {
		$('.width').css('color', 'red');
	}

	if ($.isNumeric(t)) {
		$('.thickness').css('color', '');
	} else {
		$('.thickness').css('color', 'red');
	}

	if ($.isNumeric(l) && $.isNumeric(w) && $.isNumeric(t)) {
		if ($('.length_unit').val() == "ft") { l *= 12 }
		if ($('.width_unit').val() == "ft") { w *= 12 }
		if ($('.thickness_unit').val() == "ft") { t *= 12 }
		$('.board-feet').val(l * w * t / 144);
	} else {
		$('.board-feet').val('');
	}
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
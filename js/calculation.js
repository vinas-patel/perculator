$(function () {
	function calculateTotalDays() {
		const startDay = $("#startDate").val();
		if (!startDay) return;

		const pastDate = new Date(startDay);
		const currentDate = new Date();
		const timeDifference = currentDate.getTime() - pastDate.getTime();
		const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

		$(".daysValue").text(daysDifference);
	}

	calculateTotalDays();

	$("#startDate").change(() => calculateTotalDays());

	$.desiredGM = 0;
	$.totalGM = 0;
	$.concentrateOnlyGm = 0;
	$.finalPerfumeConcentrationPR = 0;

	$.baseDrops = 0;
	$.basePR = 0;
	$.baseGM = 0;

	$.middleDrops = 0;
	$.middlePR = 0;
	$.middleGM = 0;

	$.topDrops = 0;
	$.topPR = 0;
	$.topGM = 0;

	$(".calc-base-drops").focusout((e) => {
        $(e.target).removeClass("calc-error");
		$.baseDrops = calculateColumns(".calc-base-drops");
		$(".base-notes-drops").text($.baseDrops);
	});

	$(".calc-base-pr").focusout((e) => {
        $(e.target).removeClass("calc-error");
		$.basePR = calculateColumns(".calc-base-pr");
		$(".base-notes-pr").text($.basePR);
	});

    $(".calc-base-gm").focusout((e) => {
        $(e.target).removeClass("calc-error");
		$.baseGM = calculateColumns(".calc-base-gm");
		$(".base-notes-gm").text($.baseGM);
	});

	function calculateColumns(column) {
		let total = 0;
		$(column).each((i, item) => {
			let val = Number($(item).val());
			if (isNaN(val)) {
				$(item).addClass("calc-error");
				return;
			}
			total += val;
		});
		calculateTotals();
		return total;
	}

	function calculateTotals() {

    }

});

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

	$("#startDate").change(calculateTotalDays);

	$.desiredGM = 0;
	$.totalGM = 0;
	$.concentrateOnlyGM = 100;
	$.finalPerfumeConcentrationPR = 0;

	$.baseDrops = 0;
	$.basePR = 0;
	$.baseGM = 0;
	$.baseRMIG = 0;

	$.middleDrops = 0;
	$.middlePR = 0;
	$.middleGM = 0;
	$.middleRMIG = 0;

	$.topDrops = 0;
	$.topPR = 0;
	$.topGM = 0;
	$.topRMIG = 0;

	$.alcoholGM = 0;

    $(".calc-base-gm").focusout((e) => {
        
		$(e.target).removeClass("calc-error");
		$.baseGM = calculateColumnTotal($(".calc-base-gm"));
		$(".base-notes-gm").text($.baseGM);

		calculateColumnRMIG(e);
		$.baseRMIG = calculateColumnTotal($(".base-editable-row")
											.find(".calced-raw-material-in-gms"));
		$(".base-notes-rmig").text($.baseRMIG);
		
		calculateTotals();

		calculatePRData();
	});

	$(".calc-middle-gm").focusout((e) => {
        
		$(e.target).removeClass("calc-error");
		$.middleGM = calculateColumnTotal($(".calc-middle-gm"));
		$(".middle-notes-gm").text($.middleGM);

		calculateColumnRMIG(e);
		$.middleRMIG = calculateColumnTotal($(".middle-editable-row")
												.find(".calced-raw-material-in-gms"));

		$(".middle-notes-rmig").text($.middleRMIG);
		calculateTotals();
	});

    $(".calc-top-gm").focusout((e) => {
        
		$(e.target).removeClass("calc-error");
		$.topGM = calculateColumnTotal($(".calc-top-gm"));
		$(".top-notes-gm").text($.topGM);

		calculateColumnRMIG(e);
		$.topRMIG = calculateColumnTotal($(".top-editable-row")
											.find(".calced-raw-material-in-gms"));
		
		$(".top-notes-rmig").text($.topRMIG);
		calculateTotals();
	});

	$(".calc-base-pr").focusout((e) => {
        $(e.target).removeClass("calc-error");
		$.basePR = calculateColumnTotal($(".calc-base-pr"));
		$(".base-notes-pr").text($.basePR);
		calculateTotals();
	});

	$(".calc-middle-pr").focusout((e) => {
        $(e.target).removeClass("calc-error");
		$.middlePR = calculateColumnTotal($(".calc-middle-pr"));
		$(".middle-notes-pr").text($.middlePR);
		calculateTotals();		calculateTotals();

	});

	$(".calc-top-pr").focusout((e) => {
        $(e.target).removeClass("calc-error");
		$.topPR = calculateColumnTotal($(".calc-top-pr"));
		$(".top-notes-pr").text($.topPR);
		calculateTotals();
	});

	$(".calc-alcohol").focusout((e) => {
		$(e.target).removeClass("calc-error");
		let val = Number($(e.target).val());
		if (isNaN(val)) {
            $(e.target).addClass("calc-error");
            return;
        }
		$.alcoholGM = val;
		calculateTotals();
	});

	$(".calc-base-drops").focusout((e) => {
        $(e.target).removeClass("calc-error");
		$.baseDrops = calculateColumnTotal($(".calc-base-drops"));
		$(".base-notes-drops").text($.baseDrops);
	});

	$(".calc-top-drops").focusout((e) => {
        $(e.target).removeClass("calc-error");
		$.topDrops = calculateColumnTotal($(".calc-top-drops"));
		$(".top-notes-drops").text($.topDrops);
	});

	$(".calc-middle-drops").focusout((e) => {
        $(e.target).removeClass("calc-error");
		$.middleDrops = calculateColumnTotal($(".calc-middle-drops"));
		$(".middle-notes-drops").text($.middleDrops);
	});

	$(".base-editable-row").find(".calc-dilution").focusout((e) => {
		const $target = $(e.target);
		$target.removeClass("calc-error");
		if(isNaN($target.val()))
			$target.addClass("calc-error");

        calculateColumnRMIG(e);
		$.baseRMIG = calculateColumnTotal($(".base-editable-row")
											.find(".calced-raw-material-in-gms"));
		
		$(".base-notes-rmig").text($.baseRMIG);
		calculateTotals();
	});

	$(".middle-editable-row").find(".calc-dilution").focusout((e) => {
		const $target = $(e.target);
		$target.removeClass("calc-error");
		if(isNaN($target.val()))
			$target.addClass("calc-error");

        calculateColumnRMIG(e);
		$.middleRMIG = calculateColumnTotal($(".middle-editable-row")
												.find(".calced-raw-material-in-gms"));

		$(".middle-notes-rmig").text($.middleRMIG);
		calculateTotals();
	});

	$(".top-editable-row").find(".calc-dilution").focusout((e) => {
		const $target = $(e.target);
		$target.removeClass("calc-error");
		if(isNaN($target.val()))
			$target.addClass("calc-error");

        calculateColumnRMIG(e);
		$.topRMIG = calculateColumnTotal($(".top-editable-row")
											.find(".calced-raw-material-in-gms"));
		
		$(".top-notes-rmig").text($.topRMIG);
		calculateTotals();
	});

	function calculateColumnTotal($columns) {
		let total = 0;
		$columns.each((i, item) => {
			let val = Number($(item).val());
			$(item).removeClass("calc-error");
			if (isNaN(val)) {
				$(item).addClass("calc-error");
				return;
			}
			total += val;
		});
		return total;
	}

	function calculatePRData() {

		$(".editable-row").each((i, item) => {
			let $raw = $(item);
			let addedPR = $raw.find(".calc-pr").val();
			let addedGrams = $raw.find(".calc-gm").val();
			let RMIGM = $raw.find('.calced-raw-material-in-gms').val();
			
			let RIIFPPR = parseFloat((RMIGM / $.totalGM) * 100).toFixed(3);
			let RIICPR = parseFloat((RMIGM / $.concentrateOnlyGM) * 100).toFixed(3);
			let ITPPR = parseFloat((addedGrams/$.totalGM) * 100).toFixed(3);

			$raw.find('.calced-riifp-pr').val(RIIFPPR);
			$raw.find('.calced-riic-pr').val(RIICPR);
			$raw.find('.calced-itp-pr').val(ITPPR);
		});
		
		let baseRIIFPPR = calculateColumnTotal($(".base-editable-row").find(".calced-riifp-pr"));
		$(".base-riifp-pr").text(baseRIIFPPR);
		let middleRIIFPPR = calculateColumnTotal($(".middle-editable-row").find(".calced-riifp-pr"));
		$(".middle-riifp-pr").text(middleRIIFPPR);
		let topRIIFPPR = calculateColumnTotal($(".top-editable-row").find(".calced-riifp-pr"));
		$(".top-riifp-pr").text(topRIIFPPR);
	}	// TODO fix NaN

	function calculateColumnRMIG(e) {
		let $raw = $(e.target).closest(".editable-row");
		let addedGrams = Number($raw.find(".calc-gm").val());
		let dilution = Number($raw.find(".calc-dilution").val()) || 100;
		
		let RMIGM = 0;

		if(isNaN(dilution) || isNaN(addedGrams)) {
			RMIGM = "Error";
		} else {
			RMIGM = parseFloat((addedGrams * dilution) / 100).toFixed(3);
		}
		
		$raw.find('.calced-raw-material-in-gms').val(RMIGM);
	}

	function calculateTotals() {
		$.totalGM = Number($.baseGM + $.middleGM + $.topGM + $.alcoholGM) || 0;
		$.concentrateOnlyGM = Number($.baseRMIG + $.middleRMIG + $.topRMIG) || 0;
		$("#total-gm").text($.totalGM.toFixed(3));
		$("#final-concentrate-weight-gm").text($.concentrateOnlyGM.toFixed(3));
    }

	$(".calc-alcohol, .calc-top-gm, .calc-middle-gm, .calc-base-gm, .calc-top-pr, .calc-middle-pr, .calc-base-pr, .calc-middle-drops, .calc-top-drops, .calc-base-drops").trigger("focusout");

});

/*	
	RAW Material in Grams = Added Grams * Dilitions / 100
	% of raw ingredient in final perfume = RAW Material in Grams / Final Perfume Grams	// IN PR
	% of raw ingredient in concentrate = RAW Material in Grams / Total Concentrate		// IN PR
	% in total perfume = Added Grams / Final Perfume Grams								// IN PR
*/
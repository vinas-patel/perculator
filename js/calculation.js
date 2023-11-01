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

    $(".calc-base-gm").on("focusout", (e) => {
        
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

	$(".calc-middle-gm").on("focusout", (e) => {
        
		$(e.target).removeClass("calc-error");
		$.middleGM = calculateColumnTotal($(".calc-middle-gm"));
		$(".middle-notes-gm").text($.middleGM);

		calculateColumnRMIG(e);
		$.middleRMIG = calculateColumnTotal($(".middle-editable-row")
												.find(".calced-raw-material-in-gms"));

		$(".middle-notes-rmig").text($.middleRMIG);

		calculateTotals();

		calculatePRData();
	});

    $(".calc-top-gm").on("focusout", (e) => {
        
		$(e.target).removeClass("calc-error");
		$.topGM = calculateColumnTotal($(".calc-top-gm"));
		$(".top-notes-gm").text($.topGM);

		calculateColumnRMIG(e);
		$.topRMIG = calculateColumnTotal($(".top-editable-row")
											.find(".calced-raw-material-in-gms"));
		
		$(".top-notes-rmig").text($.topRMIG);
		
		calculateTotals();

		calculatePRData();
	});

	$(".calc-base-pr").on("focusout", (e) => {
        $(e.target).removeClass("calc-error");
		$.basePR = calculateColumnTotal($(".calc-base-pr"));
		$(".base-notes-pr").text($.basePR);
		
		calculateTotals();

		calculatePRData();
	});

	$(".calc-middle-pr").on("focusout", (e) => {
        $(e.target).removeClass("calc-error");
		$.middlePR = calculateColumnTotal($(".calc-middle-pr"));
		$(".middle-notes-pr").text($.middlePR);
		
		calculateTotals();

		calculatePRData();
	});

	$(".calc-top-pr").on("focusout", (e) => {
        $(e.target).removeClass("calc-error");
		$.topPR = calculateColumnTotal($(".calc-top-pr"));
		$(".top-notes-pr").text($.topPR);
		
		calculateTotals();

		calculatePRData();
	});

	$(".calc-alcohol").on("focusout", (e) => {
		$(e.target).removeClass("calc-error");
		let val = Number($(e.target).val());
		if (isNaN(val)) {
            $(e.target).addClass("calc-error");
            return;
        }
		$.alcoholGM = val;
		
		calculateTotals();

		calculatePRData();
	});

	$(".calc-base-drops").on("focusout", (e) => {
        $(e.target).removeClass("calc-error");
		$.baseDrops = calculateColumnTotal($(".calc-base-drops"));
		$(".base-notes-drops").text($.baseDrops);
	});

	$(".calc-top-drops").on("focusout", (e) => {
        $(e.target).removeClass("calc-error");
		$.topDrops = calculateColumnTotal($(".calc-top-drops"));
		$(".top-notes-drops").text($.topDrops);
	});

	$(".calc-middle-drops").on("focusout", (e) => {
        $(e.target).removeClass("calc-error");
		$.middleDrops = calculateColumnTotal($(".calc-middle-drops"));
		$(".middle-notes-drops").text($.middleDrops);
	});

	$(".calc-base-dilution").on("focusout", (e) => {
		const $target = $(e.target);
		$target.removeClass("calc-error");
		if(isNaN($target.val()))
			$target.addClass("calc-error");

        calculateColumnRMIG(e);
		$.baseRMIG = calculateColumnTotal($(".base-editable-row")
											.find(".calced-raw-material-in-gms"));
		
		$(".base-notes-rmig").text($.baseRMIG);
		
		calculateTotals();

		calculatePRData();
	});

	$(".calc-middle-dilution").on("focusout", (e) => {
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

	$(".calc-top-dilution").on("focusout", (e) => {
		const $target = $(e.target);
		$target.removeClass("calc-error");
		if(isNaN($target.val()))
			$target.addClass("calc-error");

        calculateColumnRMIG(e);
		$.topRMIG = calculateColumnTotal($(".top-editable-row")
											.find(".calced-raw-material-in-gms"));
		
		$(".top-notes-rmig").text($.topRMIG);
		
		calculateTotals();

		calculatePRData();
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
			const $raw = $(item);
			let addedPR = $raw.find(".calc-pr").val();
			let addedGrams = $raw.find(".calc-gm").val();
			let RMIGM = $raw.find('.calced-raw-material-in-gms').val();
			
			let RIIFPPR, RIICPR, ITPPR;
			if(isNaN(RMIGM)) {
				RIIFPPR = RIICPR = ITPPR = "Error";
			} else {
				RIIFPPR = parseFloat((RMIGM / $.totalGM) * 100).toFixed(3);
				RIICPR = parseFloat((RMIGM / $.concentrateOnlyGM) * 100).toFixed(3);
				ITPPR = parseFloat((addedGrams/$.totalGM) * 100).toFixed(3);
			}

			$raw.find('.calced-riifp-pr').val(RIIFPPR);
			$raw.find('.calced-riic-pr').val(RIICPR);
			$raw.find('.calced-itp-pr').val(ITPPR);
		});
		
		const baseRIIFPPR = calculateColumnTotal($(".base-editable-row").find(".calced-riifp-pr"));
		$(".base-riifp-pr").text(baseRIIFPPR);
		const middleRIIFPPR = calculateColumnTotal($(".middle-editable-row").find(".calced-riifp-pr"));
		$(".middle-riifp-pr").text(middleRIIFPPR);
		const topRIIFPPR = calculateColumnTotal($(".top-editable-row").find(".calced-riifp-pr"));
		$(".top-riifp-pr").text(topRIIFPPR);

		const baseRIICPR = calculateColumnTotal($(".base-editable-row").find(".calced-riic-pr"));
		$(".base-riic-pr").text(baseRIICPR);
		const middleRIICPR = calculateColumnTotal($(".middle-editable-row").find(".calced-riic-pr"));
		$(".middle-riic-pr").text(middleRIICPR);
		const topRIICPR = calculateColumnTotal($(".top-editable-row").find(".calced-riic-pr"));
		$(".top-riic-pr").text(topRIICPR);

		const baseITPPR = calculateColumnTotal($(".base-editable-row").find(".calced-itp-pr"));
		$(".base-itp-pr").text(baseITPPR);
		const middleITPPR = calculateColumnTotal($(".middle-editable-row").find(".calced-itp-pr"));
		$(".middle-itp-pr").text(middleITPPR);
		const topITPPR = calculateColumnTotal($(".top-editable-row").find(".calced-itp-pr"));
		$(".top-itp-pr").text(topITPPR);
	}

	function calculateColumnRMIG(e) {
		const $raw = $(e.target).closest(".editable-row");
		const addedGrams = Number($raw.find(".calc-gm").val());
		const dilution = Number($raw.find(".calc-dilution").val()) || 100;
		
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
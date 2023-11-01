$(function () {
	$(".calc").on("dblclick", (e) => {
		//TODO implement select function when user dbl click select all texts
	});

	$(".calc").on("keydown input", (e) => {
		if (
			$.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
			// Allow: Ctrl+A
			(e.keyCode === 65 && e.ctrlKey === true) ||
			// Allow: home, end, left, right
			(e.keyCode >= 35 && e.keyCode <= 39)
		) {
			// Let it happen, don't do anything
			return;
		}
		// Ensure that it's a number and stop the keypress
		if (
			(e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
			(e.keyCode < 96 || e.keyCode > 105)
		) {
			e.preventDefault();
		}
	});

	$("#add-weight").click(() => {
		let val = prompt("Please enter your desired perfume weight:", "10");
		if (isNaN(Number(val))) {
			alert("Please enter a number");
			return;
		}
		$.desiredGM = Number(val);
	});

	$(".calc-percentage").on("focusin", (e) => {
		//TODO remove % after text add on focus out
	});

	$(".calc-percentage").on("focusout", (e) => {
		//TODO add % after text remove on focus
	});
});

// Custom DropDown
u(".dropdownTrigger, .dropdown-trigger").on("click", (e) => {
	if (
		u(e.target)
			.parent()
			.parent()
			.find(".dropdown-options")
			.hasClass("display-block")
	) {
		u(".display-block").removeClass("display-block");
		return;
	}

	u(".display-block").removeClass("display-block");

	u(e.target)
		.parent()
		.parent()
		.find(".dropdown-options")
		.toggleClass("display-block");
});

u(".dropdown-option").on("click", (e) => {
	u(".display-block").removeClass("display-block");
});

u(document).on("click", (event) => {
	if (
		!event.target.classList.contains("dropdownTrigger") &&
		!event.target.classList.contains("dropdown-trigger")
	) {
		u(".display-block").removeClass("display-block");
		return;
	}
});

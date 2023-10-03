
$(function() {
   
   
   
});

// Custom DropDown

u('.dropdownTrigger, .dropdown-trigger').on('click', (e) => {

    if (u(e.target)
        .parent()
        .parent()
        .find('.dropdown-options')
        .hasClass('display-block')) {

        u('.display-block').removeClass('display-block');
        return;
    }

    u('.display-block').removeClass('display-block');

    u(e.target)
        .parent()
        .parent()
        .find('.dropdown-options')
        .toggleClass('display-block');
});

u('.dropdown-option').on('click', (e) => {

    u('.display-block').removeClass('display-block');
});

u(document).on('click', (event) => {

    if (!event.target.classList.contains('dropdownTrigger')
        && !event.target.classList.contains('dropdown-trigger')) {

        u('.display-block').removeClass('display-block');
        return;
    }
});
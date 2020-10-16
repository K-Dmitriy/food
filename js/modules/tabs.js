function tabs() {
    const tabContents = document.querySelectorAll('.tabcontent'),
          tabHeaderItems = document.querySelector('.tabheader__items');

    function hideElements(elements) {
        elements.forEach(element => {
            element.classList.add('hide');
            element.classList.remove('show', 'fade');
        });
    }

    function showElement(elements, i = 0) {
        elements[i].classList.add('show', 'fade');
        elements[i].classList.remove('hide');
    }

    tabHeaderItems.addEventListener('click', evt => {
        const target = evt.target,
              tabs = document.querySelectorAll('.tabheader__item');

        if (target && target.matches('div.tabheader__item')) {
            tabs.forEach((tab, i) => {
                tab.classList.remove('tabheader__item_active');

                if (target === tab) {
                    tab.classList.add('tabheader__item_active');
                    hideElements(tabContents);
                    showElement(tabContents, i);
                }
            });
        }
    });

    hideElements(tabContents);
    showElement(tabContents);
}

module.exports = tabs;
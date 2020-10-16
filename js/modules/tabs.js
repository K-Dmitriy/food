function tabs(tabsSelector, tabsContentSelector, tabsParetSelector, activeClass) {
    const tabContents = document.querySelectorAll(tabsContentSelector),
          tabHeaderItems = document.querySelector(tabsParetSelector);

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
              tabs = document.querySelectorAll(tabsSelector);

        if (target && target.matches('div' + tabsSelector)) {
            tabs.forEach((tab, i) => {
                tab.classList.remove(activeClass);

                if (target === tab) {
                    tab.classList.add(activeClass);
                    hideElements(tabContents);
                    showElement(tabContents, i);
                }
            });
        }
    });

    hideElements(tabContents);
    showElement(tabContents);
}

export default tabs;
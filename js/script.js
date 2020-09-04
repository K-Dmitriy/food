document.addEventListener('DOMContentLoaded', () => {
    
    const tabContents = document.querySelectorAll('.tabcontent'),
          tabHeaderItems = document.querySelector('.tabheader__items');

    function hideTabs() {
        tabContents.forEach(tab => {
            tab.classList.add('hide');
            tab.classList.remove('show', 'fade');
        });
    }

    function showTabs(i = 0) {
        tabContents[i].classList.add('show', 'fade');
        tabContents[i].classList.remove('hide');
    }

    tabHeaderItems.addEventListener('click', evt => {
        const target = evt.target,
              tabs = document.querySelectorAll('.tabheader__item');

        if (target && target.matches('div.tabheader__item')) {
            tabs.forEach((tab, i) => {
                tab.classList.remove('tabheader__item_active');

                if (target === tab) {
                    tab.classList.add('tabheader__item_active');
                    hideTabs();
                    showTabs(i);
                }
            });
        }
    });

    hideTabs();
    showTabs();
});
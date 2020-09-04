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

    //timer
    const finishDay = '2020-09-11';
    
    function getRemainingTime(endtime) {

        const total = Date.parse(endtime) - Date.now();
        let days = Math.floor(total / (1000 * 60 * 60 * 24)),
            hours = Math.floor((total / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((total / (1000 * 60)) % 60),
            seconds = Math.floor((total / 1000) % 60);
        
        return { total, days, hours, minutes, seconds };
    }

    function setRemainingTime(selector, endtime) {
        const timer = document.querySelector(selector),
              fieldDay = timer.querySelector('#days'),
              fieldHour = timer.querySelector('#hours'),
              fieldMinute = timer.querySelector('#minutes'),
              fieldSecond = timer.querySelector('#seconds'),
              intervalUpdateTimeID = setInterval(updateTime, 1000);

        updateTime();

        function updateTime() {
            const { total, days, hours, minutes, seconds } = getRemainingTime(endtime);

            fieldDay.textContent = days;
            fieldHour.textContent = addZero(hours);
            fieldMinute.textContent = addZero(minutes);
            fieldSecond.textContent = addZero(seconds);

            if (total <= 0) {
                clearInterval(intervalUpdateTimeID);
            }
        }
    }

    function addZero(number) {
        return number < 10 ? '0' + number : number;
    }

    setRemainingTime('.timer', finishDay);

    //modal
    const modalOpenBtns = document.querySelectorAll('button[data-modal-open]'),
          modal = document.querySelector('.modal'),
          modalCloseBtn = modal.querySelector('div[data-modal-close]');

    function closeModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = '';
    }

    function openModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
    }
    
    modalOpenBtns.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', evt => {
        if (evt.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', evt => {
        if (evt.keyCode === 27 && modal.classList.contains('show')) {
            closeModal();
        }
    });
});
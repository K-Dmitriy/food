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

        let total = Date.parse(endtime) - Date.now();

        if (total <= 0) {
            total = 0;
        }

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
          modalCloseBtn = modal.querySelector('div[data-modal-close]'),
          modalTimerID = setTimeout(openModal, 5000);

    function closeModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = '';
    }

    function openModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        clearTimeout(modalTimerID);
    }

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
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

    window.addEventListener('scroll', showModalByScroll);

    //menu
    class MenuCard {
        constructor (src, alt, title, description, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price *= this.transfer; 
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = ['menu__item'];
            }

            this.classes.forEach(className => element.classList.add(className));
            element.innerHTML =  `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    const getResource = async url => {
        const res = await fetch(url);

        if (!res.ok) {
           throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    //отправка формы
    const forms = document.querySelectorAll('form');
    const responseStatus = {
        load: 'img/form/spinner.svg',
        success: 'Загружено.',
        error: 'Ошибка!'
    };

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json'
            }
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', evt => {
            evt.preventDefault();

            const responseMessage = document.createElement('img');
            responseMessage.src = responseStatus.load;
            responseMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', responseMessage);

            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(responseStatus.success);
                    responseMessage.remove();
                })
                .catch(() => {
                    responseMessage.style.color = 'red';
                    showThanksModal(responseStatus.error);
                })
                .finally(() => form.reset());
        });
    }

    forms.forEach(form => bindPostData(form));

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');

        modal.classList.add('show');

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-modal-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }
});
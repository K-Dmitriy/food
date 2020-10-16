function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.toggle('show');
    document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimerID) {
    const modal = document.querySelector(modalSelector);

    modal.classList.toggle('show');
    document.body.style.overflow = 'hidden';

    console.log('modalTimerID', modalTimerID);
    if (modalTimerID) {
        clearTimeout(modalTimerID);
    }
}

function modal(trigerSelector, modalSelector, modalTimerID) {
    const modalOpenBtns = document.querySelectorAll(trigerSelector),
          modal = document.querySelector(modalSelector),
          modalCloseBtn = modal.querySelector('div[data-modal-close]');

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerID);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    
    modalOpenBtns.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerID));
    });

    modalCloseBtn.addEventListener('click', () => closeModal(modalSelector));

    modal.addEventListener('click', evt => {
        if (evt.target === modal) {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', evt => {
        if (evt.keyCode === 27 && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export { closeModal, openModal };
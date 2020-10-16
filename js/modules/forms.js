import { closeModal } from "./modal";
import { postData } from "../services/services";

function forms(formSelector) {
    const forms = document.querySelectorAll(formSelector);
    const responseStatus = {
        load: './img/form/spinner.svg',
        success: 'Загружено.',
        error: 'Ошибка!'
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
        const prevModalDialog = document.querySelector('.modal__dialog'),
              modal = document.querySelector('.modal');

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

        modal.append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 40000);
    }
}

export default forms;
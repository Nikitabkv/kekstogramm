import {showError, showSubmit, showSubmitError, resetForm} from './util.js';

let imgData = ''

const getData = (onSuccess, alertText) => {
  fetch('https://23.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data)
      // Включаем меню фильтров
      const imgFiltersMenu = document.querySelector('.img-filters')
      imgFiltersMenu.classList.remove('img-filters--inactive')
      imgData = data
    })
    .catch(() => showError(alertText))
}

const sendData = (formSend, formReset) => {
  fetch('https://23.javascript.pages.academy/kekstagram', {
    method: 'POST',
    body: (formSend),
  })
    .then((response) => {
      if (response.ok === true) {
        showSubmit()
        resetForm(formReset)
      } else {
        let hashtags = document.querySelector('.text__hashtags')
        hashtags.reportValidity()
        let description = document.querySelector('.text__description')
        description.reportValidity()
      }
    })
    .catch(() => {
      showSubmitError()
      resetForm(formReset)
    })
}

export {getData, sendData, imgData}

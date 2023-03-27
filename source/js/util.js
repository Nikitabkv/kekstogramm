const SHOW_ALERT_TIME = 5000

const body = document.querySelector('body')
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success')
const successErrorMessageTemplate = document.querySelector('#error').content.querySelector('.error')
const imgUploadOverlay = document.querySelector('.img-upload__overlay')
const scaleControl = document.querySelector('.scale__control--value')
const imgUploadPreview = document.querySelector('.img-upload__preview').querySelector('img')

//Рандомайзер, я его убрал откуда-то, может произойти ошибка
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (min < 0) {
    return -1
  }

  if (min > max) {
    [min, max] = [max, min]
  }

  return Math.floor(Math.random() * (max - min + 1)) + min
}

const clickHideListener = (object, target) => {
  object.addEventListener('click', () => {
    target.classList.add('hidden')
    body.classList.remove('modal-open')
  }, { once: true } )

  scaleControl.value = '100%'
  imgUploadPreview.removeAttribute('class')
  imgUploadPreview.removeAttribute('style')
}

const escHideListener = (target) => {
  document.addEventListener('keyup', (evt) => {
    if ( evt.key === ('Escape' || 'Esc') ) {
      target.classList.add('hidden')
      body.classList.remove('modal-open')
    } else {
      escHideListener(target)
    }
  }, { once: true } )
}

const showError = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.backgroundColor = '#fc4c4b'
  alertContainer.style.zIndex = 100
  alertContainer.style.left = 0
  alertContainer.style.right = 0
  alertContainer.style.top = 0
  alertContainer.style.textAlign = 'center'
  alertContainer.style.position = 'absolute'
  alertContainer.textContent = `${message}`

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove()
  }, SHOW_ALERT_TIME)
}

const escHideTarget = (closeTarget) => {
  document.addEventListener('keyup', (evt) => {
    if ( evt.key === ('Escape' || 'Esc') ) {
      closeTarget.remove()
    }
  }, { once: true } )
}

const blurClickRemoveTarget = (closeTarget) => {
  closeTarget.addEventListener('click', (evt) => {
    if (evt.target === closeTarget) {
      closeTarget.remove()
    } else {
      blurClickRemoveTarget(closeTarget)
    }
  }, { once: true })
}

const showSubmit = () => {

  const successMessage = successMessageTemplate.cloneNode(true)
  imgUploadOverlay.classList.add('hidden')
  body.classList.remove('modal-open')
  body.appendChild(successMessage)

  const closeSuccessButton = document.querySelector('.success__button')
  closeSuccessButton.addEventListener('click', () => {
    successMessage.remove()
  }, { once: true })

  escHideTarget(successMessage)

  blurClickRemoveTarget(successMessage)
}

const showSubmitError = () => {

  const successErrorMessage = successErrorMessageTemplate.cloneNode(true)
  imgUploadOverlay.classList.add('hidden')
  body.classList.remove('modal-open')
  body.appendChild(successErrorMessage)

  const closeErrorButton = document.querySelector('.error__button')
  closeErrorButton.addEventListener('click', () => {
    successErrorMessage.remove()
  }, { once: true })

  escHideTarget(successErrorMessage)

  blurClickRemoveTarget(successErrorMessage)
}

const resetForm = (form) => {
  form.reset()
  scaleControl.value = '100%'
  imgUploadPreview.removeAttribute('class')
  imgUploadPreview.removeAttribute('style')
}

export {clickHideListener, escHideListener, showError, showSubmit, showSubmitError, resetForm, getRandomInt}

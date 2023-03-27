import noUiSlider from 'nouislider'
import 'nouislider/dist/nouislider.css'
import {clickHideListener, escHideListener} from './util.js'
import {sendData} from './api.js';

const imgInput = document.querySelector('#upload-file')
const imgInputCancel = document.querySelector('#upload-cancel')
const body = document.querySelector('body')
const imgUploadOverlay = document.querySelector('.img-upload__overlay')

// Ссылки на регуляторы + - размера
const scaleControlValue = document.querySelector('.scale__control--value')
const scaleControlSmaller = document.querySelector('.scale__control--smaller')
const scaleControlBigger = document.querySelector('.scale__control--bigger')

// Ссылка на большое изображение
const imageUploadPreview = document.querySelector('.img-upload__preview').querySelector('img')

// Элементы выбора эффектов и слайдера
const effectRadioButtons = document.querySelectorAll('.effects__radio')
const sliderElement = document.querySelector('.effect-level__slider')

// Переменная для хранения уровня эффекта
const effectLevel = document.querySelector('.effect-level__value')

// Поле с хештегами и описанием
const hashtagsText = document.querySelector('.text__hashtags')
const descriptionText = document.querySelector('.text__description')

// Вся форма
const imgForm = document.querySelector('.img-upload__form')

//SLIDER
// eslint-disable-next-line no-undef
noUiSlider.create(sliderElement, {
  start: 1,
  step: 1,
  connect: 'lower',
  range: {
    'min': 0,
    'max': 1,
  },
});

sliderElement.setAttribute('disabled', true);

const sliderUpdate = (filter, type) => { sliderElement.noUiSlider.on('update', (values, handle) => {
  effectLevel.value = values[handle]
  imageUploadPreview.style.filter = `${filter}(${effectLevel.value}${type})`
})};

// Слушатель события нажатия на кнопку эффекта
const filterTypeListener = (target) => {
  target.addEventListener('click', () => {
    imageUploadPreview.className = ''
    imageUploadPreview.classList.add(`effects__preview--${target.value}`)


    if (target.value === 'none') {

      sliderElement.noUiSlider.updateOptions(
        {
          start: 1,
          range: {
            'min': 0,
            'max': 1,
          },
          step: 0.1,
        })

      sliderElement.setAttribute('disabled', true);
      imageUploadPreview.removeAttribute('style')

    } else if (target.value === 'chrome') {

      sliderElement.removeAttribute('disabled');
      sliderElement.noUiSlider.updateOptions(
        {
          start: 1,
          range: {
            'min': 0,
            'max': 1,
          },
          step: 0.1,
        })
      sliderUpdate('grayscale', '')

    } else if (target.value === 'sepia') {

      sliderElement.removeAttribute('disabled');
      sliderElement.noUiSlider.updateOptions(
        {
          start: 1,
          range: {
            'min': 0,
            'max': 1,
          },
          step: 0.1,
        })
      sliderUpdate('sepia', '')

    } else if (target.value === 'marvin') {

      sliderElement.removeAttribute('disabled');
      sliderElement.noUiSlider.updateOptions(
        {
          start: 100,
          range: {
            'min': 0,
            'max': 100,
          },
          step: 1,
        })
      sliderUpdate('invert', '%')

    } else if (target.value === 'phobos') {

      sliderElement.removeAttribute('disabled');
      sliderElement.noUiSlider.updateOptions(
        {
          start: 3,
          range: {
            'min': 0,
            'max': 3,
          },
          step: 0.1,
        })
      sliderUpdate('blur', 'px')


    } else if (target.value === 'heat') {

      sliderElement.removeAttribute('disabled');
      sliderElement.noUiSlider.updateOptions(
        {
          start: 3,
          range: {
            'min': 1,
            'max': 3,
          },
          step: 0.1,
        })
      sliderUpdate('brightness', '')

    }
  })
}

// Цикл для добавления слушателя всем кнопкам
for (let i = 0; i < effectRadioButtons.length; i++) {
  filterTypeListener(effectRadioButtons[i])
}

// Создаем переменную для хранения значения scaleControlValue
let scaleValue = 100

// Ставим базовое значение scaleControlValue 100
scaleControlValue.value = `${scaleValue}%`

// Загружаем фотку и открываем/закрываем окно
imgInput.addEventListener('change', () => {
  // Открываем окно публикации изображения
  imgUploadOverlay.classList.remove('hidden')
  // Делаем непрокручеваемым
  body.classList.add('modal-open')
  // Добавляем слушатели события закрытия
  clickHideListener(imgInputCancel ,imgUploadOverlay)
  escHideListener(imgUploadOverlay)
})

// Изменияем масштаб изображения в меньшую сторону
scaleControlSmaller.addEventListener('click', () => {
  if (scaleValue > 25) {
    scaleControlValue.value = `${scaleValue - 25}%`
    scaleValue -= 25
    imageUploadPreview.style.cssText = `transform: scale(${scaleValue/100})`
  }
})

// Изменияем масштаб изображения в большую сторону
scaleControlBigger.addEventListener('click', () => {
  if (scaleValue < 100) {
    scaleControlValue.value = `${scaleValue + 25}%`
    scaleValue += 25
    imageUploadPreview.style.cssText = `transform: scale(${scaleValue/100})`
  }
})

// Валидация хештегов
hashtagsText.addEventListener('input', () => {
  let hashtags = []

  if (hashtagsText.value === '') {
    hashtagsText.setCustomValidity('')

  } else {
    hashtagsText.value.split(' ').forEach((word) => {
      if (!/^#[а-яА-Яa-zA-Z0-9][^@#$%^&*(),.?":{}|<>_-]*$/.test(word)) {
        hashtags.push({
          text: word.toLowerCase(),
          validity: 'no',
          validityText: 'Хэштег должен состоять из букв а-Я, a-Z или цифр',
        })
      } else if (word.length > 21) {
        hashtags.push({
          text: word.toLowerCase(),
          validity: 'no',
          validityText: 'Хэштег должен быть меньше 20 символов',
        })
      } else {
        hashtags.push({
          text: word.toLowerCase(),
          validity: 'yes',
        })
      }
    })
  }

  // Проверка все ли хештеги правильные
  hashtags.forEach((elem) => {
    if (elem.validity === 'no') {
      hashtagsText.setCustomValidity(elem.validityText)
    } else {
      hashtagsText.setCustomValidity('')
    }
  })

  // Проверка на одинаковые хештеги
  let hashtagText = []
  hashtagText = []

  hashtags.forEach(elem => {
    for (let i = 0; i < hashtagText.length; i++) {
      if (hashtagText[i] === elem.text) {
        hashtagsText.setCustomValidity('Хештеги не могут быть одинаковыми')
      }
    }
    hashtagText.push(elem.text)
  })

  // Проверка меньше ли 6 хештегов всего
  if (hashtagsText.value.split(' ').length > 5) {
    hashtagsText.setCustomValidity('Слишком много хештегов, максимум 5')
  }

  hashtagsText.reportValidity();
})

// Отключаем esc
descriptionText.addEventListener('keyup', (evt) => {
  if ( evt.key === ('Escape' || 'Esc') ) {
    evt.stopPropagation()
  }
})
hashtagsText.addEventListener('keyup', (evt) => {
  if ( evt.key === ('Escape' || 'Esc') ) {
    evt.stopPropagation()
  }
})

// Отправляем форму
imgForm.addEventListener('submit', (evt) => {
  evt.preventDefault()

  const formData = new FormData(evt.target)
  sendData(formData, evt.target)

  sliderElement.noUiSlider.updateOptions(
    {
      start: 1,
      range: {
        'min': 0,
        'max': 1,
      },
      step: 0.1,
    })

  sliderElement.setAttribute('disabled', true);
})

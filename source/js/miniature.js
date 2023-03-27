import {bigPictureTemplate, createComments} from './big-picture.js'
import {clickHideListener, escHideListener} from './util.js'
import {getImgPreview} from './big-picture-preview.js'

const miniPictureTemplate = document.querySelector('#picture').content.querySelector('.picture')
const pictures = document.querySelector('.pictures')
const body = document.querySelector('body')

const miniatureTemplate = ({url, comments, likes}) => {
  // Клонируем шаблон
  let miniPicture = miniPictureTemplate.cloneNode(true)

  // Подстраиваем данные
  miniPicture.querySelector('.picture__img').src = url
  miniPicture.querySelector('.picture__likes').textContent = likes
  miniPicture.querySelector('.picture__comments').textContent = comments.length

  return miniPicture
}

const createMiniature = (objects) => {
  const miniContainerFragment = document.createDocumentFragment()

  objects.forEach((object) => {
    let fragment = miniatureTemplate(object)
    // Добавляем слушатель события открытия большой картинки
    fragment.addEventListener('click', () => {

      // Переключаемся на большую картинку
      bigPictureTemplate(object)
      // Создаем комментарии для большой картинки
      createComments(object)
      // Делаем непрокручиваемым body
      body.classList.add('modal-open')

      // Добавляем слушатель события закрытия
      const crossButton = document.querySelector('.big-picture__cancel')
      const bigPicture = document.querySelector('.big-picture')
      clickHideListener(crossButton, bigPicture)
      escHideListener(bigPicture)
    })
    // Добавляем фрагмент в контейнер фрагментов
    miniContainerFragment.appendChild(fragment)
  })

  // Добавляем все картинки
  pictures.appendChild(miniContainerFragment)
}

getImgPreview()

export {createMiniature}

import debounce from 'lodash.debounce'
import {imgData} from './api.js';
import {createMiniature} from './miniature.js'
import {getRandomInt} from './util.js';

const DELAY = 500;

const filterDefault = document.querySelector('#filter-default')
const filterRandom = document.querySelector('#filter-random')
const filterDiscussed = document.querySelector('#filter-discussed')

const removePics = () => {
  const allMiniPictures = document.querySelectorAll('.picture')
  allMiniPictures.forEach((element) => {
    element.remove()
  })
}

const sortMiniatures = (data) => {
  removePics()
  createMiniature(data)
}

const filterByDeafault = (cb) => {
  filterDefault.classList.add('img-filters__button--active')
  filterRandom.classList.remove('img-filters__button--active')
  filterDiscussed.classList.remove('img-filters__button--active')

  cb(imgData)
}

const filterByRandom = (cb) => {

  filterRandom.classList.add('img-filters__button--active')
  filterDefault.classList.remove('img-filters__button--active')
  filterDiscussed.classList.remove('img-filters__button--active')

  // Создаем массив рандомных картинок
  let randomImg = []
  let randomImgId = []

  while (randomImg.length < 10) {
    let randomInt = getRandomInt(0, 24)
    if (!randomImgId.includes(randomInt)) {
      randomImg.push(imgData[randomInt])
      randomImgId.push(randomInt)
    } else {
      continue
    }
  }

  cb(randomImg)
}

const filterByDiscussed = (cb) => {

  filterDiscussed.classList.add('img-filters__button--active')
  filterDefault.classList.remove('img-filters__button--active')
  filterRandom.classList.remove('img-filters__button--active')

  // Создаем массив обсуждаемых картинок
  let discussedImg = imgData.slice()

  discussedImg.sort((a, b) => {
    return b.comments.length - a.comments.length
  })

  cb(discussedImg)
}

const debouncedSortMiniatures = debounce(sortMiniatures, DELAY);

filterDefault.addEventListener('click', () => {
  filterByDeafault(debouncedSortMiniatures)
})

filterRandom.addEventListener('click', () => {
  filterByRandom(debouncedSortMiniatures)
})

filterDiscussed.addEventListener('click', () => {
  filterByDiscussed(debouncedSortMiniatures)
})

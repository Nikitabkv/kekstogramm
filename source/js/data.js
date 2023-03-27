/*
import {getRandomInt} from './util.js';

//////////////////////////////////////////
// Временные данные
const commentsValue = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
]

const name = [
  'Константин',
  'Павел',
  'Виктория',
  'Тимофей',
  'Алексей',
  'Александра',
  'Алиса',
  'Леон',
  'Эмиль',
  'Карина',
]

const description = [
  'Лето',
  'Осень',
  'Зима',
  'Мороз',
  'Море',
  'Пальмы',
  'Я гуляю',
  'Моя тачила',
]

const OBJ_COUNT = 25

const Comments = {
  min: 1,
  max: 5,
}

const Likes = {
  min: 15,
  max: 200,
}
//////////////////////////////////////////

//////////////////////////////////////////
// Создаем уникальные id для комментариев и описание, изображений от 1 до бесконечности
const descriptionIds = []
const commentIds = []
const imageUrls = []

const getdescriptionId = (min, max) => {
  let i = min
  if (i > max) {
    return -1
  }
  descriptionIds.push(i)
  return(i)
}

const getCommentId = (min, max) => {
  let i = min
  if (i > max) {
    return -1
  }
  commentIds.push(i)
  return(i)
}

const getImageUrl = (min, max) => {
  let i = min
  if (i > max) {
    return -1
  }
  imageUrls.push(i)
  return(i)
}
//////////////////////////////////////////

// Создаем текст комментария
const getMessage = () => {
  let random = getRandomInt(1, 2)
  if (random === 1) return `${commentsValue[getRandomInt(0, commentsValue.length -1)]}`
  return `${commentsValue[getRandomInt(0, commentsValue.length -1)]} ${commentsValue[getRandomInt(0, commentsValue.length -1)]}`
}

// Создаем несколько комментариев
const getComments = () => {
  let comment = []
  for (let i = Comments.min; i <= getRandomInt(Comments.max, Comments.min); i++) {
    comment.push({
      id: getCommentId(commentIds.length + 1, 80),
      avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
      message: getMessage(),
      name: `${name[getRandomInt(0, name.length -1)]}`,
    })
  }
  return comment
}

//
// Создаем объект(пост)
//
const getNewObj = () => {
  return {
    id: getdescriptionId(descriptionIds.length + 1, OBJ_COUNT),
    url: `photos/${getImageUrl(imageUrls.length + 1, OBJ_COUNT)}.jpg`,
    description: description[getRandomInt(0, description.length - 1)],
    likes: getRandomInt(Likes.min, Likes.max),
    comments: getComments(),
  }
}

//
// Создаем группу массив постов
//
let objects = new Array(OBJ_COUNT).fill({}).map(() => getNewObj())

export {objects}
export {imageUrls, OBJ_COUNT}
*/
// Всё, лавочка закрыта

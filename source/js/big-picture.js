const bigPicture = document.querySelector('.big-picture')
const loadMoreComments = document.querySelector('.comments-loader')
const crossButton = document.querySelector('.big-picture__cancel')
const socialCommentsCount = document.querySelector('.social__comment-count')
const bigPictureComments = bigPicture.querySelector('.comments-count')


const bigPictureTemplate = (object) => {
  // Удаляем класс hidden у большой картинки
  bigPicture.classList.remove('hidden')

  // Ищем src подставляем url
  const bigPictureUrl = bigPicture.querySelector('.big-picture__img').querySelector('img')
  bigPictureUrl.src = `build/${object.url}`

  // Ищем кол-во лайков и подставляем
  const bigPictureLikes = bigPicture.querySelector('.likes-count')
  bigPictureLikes.textContent = object.likes

  // Ищем кол-во комментариев и подставляем
  bigPictureComments.textContent = object.comments.length

  // Ищем и подставляем описание
  const pictureDescription = bigPicture.querySelector('.social__caption')
  pictureDescription.textContent = object.description
}

const commentTemplate = (object) => {
  // Ищем комментарии
  const commentsContainer = bigPicture.querySelector('.social__comments')

  // Создаем комментарий
  const commentContainer = document.createElement('li')
  commentContainer.classList.add('social__comment')
  commentsContainer.appendChild(commentContainer)

  // Создаем картинку в комментарии
  const commentAvatarContainer = document.createElement('img')
  commentAvatarContainer.classList.add('social__picture')
  commentAvatarContainer.src = `build/${object.avatar}`
  commentAvatarContainer.alt = object.name
  commentAvatarContainer.width = 35
  commentAvatarContainer.height = 35
  commentContainer.appendChild(commentAvatarContainer)

  // Создаем текст в комментариии
  const commentContent = document.createElement('p')
  commentContent.textContent = object.message
  commentContainer.appendChild(commentContent)

  return commentContainer
}

const createComments = (object) => {

  // Ищем комментарии
  const commentsContainer = bigPicture.querySelector('.social__comments')

  // И удаляем те, что по умолчанию
  commentsContainer.textContent = ''

  // Включаем элемент для подгрузки комментариев
  loadMoreComments.removeAttribute('style')
  // Создаем первые 5 комментариев
  let childObject = object.comments

  let i = 5
  let j = 10

  const createFiveComments = (i, j) => {

    for (i; i < object.comments.length && i < j; i++) {
      let commentFragment = commentTemplate(childObject[i])
      commentsContainer.appendChild(commentFragment)
      socialCommentsCount.textContent = `${i+1} из ${bigPictureComments.textContent} комментариев`
      if (`${i+1}` === bigPictureComments.textContent) {
        loadMoreComments.style = 'display: none'
      }
    }

  }

  createFiveComments(0, 5)

  const loadComments = () => {

    createFiveComments(i, j)
    i += 5
    j += 5

    if (i > object.comments.length) {
      loadMoreComments.style = 'display: none'
      loadMoreComments.removeEventListener('click', loadComments)
      i = 5
      j = 10
    }
  }

  loadMoreComments.addEventListener('click', loadComments)

  crossButton.addEventListener('click', () => {
    loadMoreComments.removeEventListener('click', loadComments)
  }, { once: true })
  document.addEventListener('keyup', (evt) => {
    if ( evt.key === ('Escape' || 'Esc') ) {
      loadMoreComments.removeEventListener('click', loadComments)
    }
  }, { once: true } )
}

export {bigPictureTemplate, createComments}

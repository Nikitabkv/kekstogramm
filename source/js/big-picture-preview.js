const FILE_TYPE = ['jpg', 'png']

const fileInput = document.querySelector('.img-upload__input')
const filePreview = document.querySelector('.img-upload__preview img')
const effectPreview = document.querySelectorAll('.effects__preview')

const getImgPreview = () => {

  fileInput.addEventListener('change', () => {
    let file = fileInput.files[0]
    let fileName = file.name.toLowerCase()

    const typeOk = FILE_TYPE.some((imgType) => {
      return fileName.endsWith(imgType)
    })

    if (typeOk) {
      let reader = new FileReader()

      reader.addEventListener('load', () => {
        filePreview.src = reader.result
        filePreview.width = '600'
        filePreview.height = '600'
        effectPreview.forEach((filter) => {
          filter.style.backgroundImage = `url(${reader.result})`
          filter.style.backgroundSize = 'cover'
        })
      })

      reader.readAsDataURL(file)
    } else {
      filePreview.src = './build/img/upload_image_error.jpg'
    }

  })
}

export {getImgPreview}

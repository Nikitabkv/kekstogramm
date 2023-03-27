import './upload-img.js'
import './search-filter.js'
import {createMiniature} from './miniature.js'
import {getData} from './api.js';

// Получаем данные, создаем сетку изображений
getData(createMiniature, 'Данные с сервера где-то потерялись, попробуйте перезагрузить страницу')

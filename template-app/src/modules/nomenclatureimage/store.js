import { createCrudStore } from '../../store.js'
import { nomenclatureimageApi } from './api.js'

export const nomenclatureimageStore = createCrudStore(nomenclatureimageApi);


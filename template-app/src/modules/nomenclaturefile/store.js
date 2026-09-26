import { createCrudStore } from '../../store.js'
import { nomenclaturefileApi } from './api.js'

export const nomenclaturefileStore = createCrudStore(nomenclaturefileApi);


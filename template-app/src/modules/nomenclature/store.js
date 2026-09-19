import { createCrudStore } from '../../store.js'
import { nomenclatureApi } from './api.js'

export const nomenclatureStore = createCrudStore(nomenclatureApi);


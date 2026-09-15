import { createCrudStore } from '../../store.js'
import { entityApi } from './api.js'

export const entityStore = createCrudStore(entityApi);


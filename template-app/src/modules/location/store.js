import { createCrudStore } from '../../store.js'
import { locationApi } from './api.js'

export const locationStore = createCrudStore(locationApi);


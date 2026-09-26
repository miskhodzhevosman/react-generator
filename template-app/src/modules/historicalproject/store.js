import { createCrudStore } from '../../store.js'
import { historicalprojectApi } from './api.js'

export const historicalprojectStore = createCrudStore(historicalprojectApi);


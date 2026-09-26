import { createCrudStore } from '../../store.js'
import { historicalprojectitemApi } from './api.js'

export const historicalprojectitemStore = createCrudStore(historicalprojectitemApi);


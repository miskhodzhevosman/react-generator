import { createCrudStore } from '../../store.js'
import { historicalprojectstatusApi } from './api.js'

export const historicalprojectstatusStore = createCrudStore(historicalprojectstatusApi);


import { createCrudStore } from '../../store.js'
import { historicalcounterpartyApi } from './api.js'

export const historicalcounterpartyStore = createCrudStore(historicalcounterpartyApi);


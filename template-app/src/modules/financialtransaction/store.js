import { createCrudStore } from '../../store.js'
import { financialtransactionApi } from './api.js'

export const financialtransactionStore = createCrudStore(financialtransactionApi);


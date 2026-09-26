import { createCrudStore } from '../../store.js'
import { financeoperationtypeApi } from './api.js'

export const financeoperationtypeStore = createCrudStore(financeoperationtypeApi);


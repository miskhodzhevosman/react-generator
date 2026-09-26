import { createCrudStore } from '../../store.js'
import { counterpartyApi } from './api.js'

export const counterpartyStore = createCrudStore(counterpartyApi);


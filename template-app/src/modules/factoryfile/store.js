import { createCrudStore } from '../../store.js'
import { factoryfileApi } from './api.js'

export const factoryfileStore = createCrudStore(factoryfileApi);


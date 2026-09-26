import { createCrudStore } from '../../store.js'
import { projectfileApi } from './api.js'

export const projectfileStore = createCrudStore(projectfileApi);


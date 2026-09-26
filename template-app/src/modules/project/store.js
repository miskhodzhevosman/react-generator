import { createCrudStore } from '../../store.js'
import { projectApi } from './api.js'

export const projectStore = createCrudStore(projectApi);


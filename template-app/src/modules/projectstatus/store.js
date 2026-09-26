import { createCrudStore } from '../../store.js'
import { projectstatusApi } from './api.js'

export const projectstatusStore = createCrudStore(projectstatusApi);


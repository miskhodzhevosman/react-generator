import { createCrudStore } from '../../store.js'
import { projectitemApi } from './api.js'

export const projectitemStore = createCrudStore(projectitemApi);


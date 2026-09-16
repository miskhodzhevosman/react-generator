import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

export const crud = (url) => ({
  getAll: (params) => api.get(url, { params }),
  getOne: (id) => api.get(`${url}/${id}`),
  create: (data) => api.post(url, data),
  update: (id, data) => api.patch(`${url}${id}`, data),
  remove: (id) => api.delete(`${url}${id}`),
});

// export const nomenclatures = crud('supplies/nomenclatures/');

export default api;

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8001/api/',
});



const hasFile = (data) =>
  data && typeof data === 'object' &&
  Object.values(data).some((v) => v instanceof File || v instanceof Blob)

export const crud = (url) => {
  const toBody = (data) => {
    if (!hasFile(data)) return data
    const fd = new FormData()
    Object.entries(data).forEach(([k, v]) => {
      if (v === undefined || v === null) return
      fd.append(k, v)
    })
    return fd
  }

  return {
    getAll: (params) => api.get(url, { params }),
    getOne: (id) => api.get(`${url}/${id}`),
    create: (data) => api.post(url, toBody(data)),
    update: (id, data) => api.patch(`${url}${id}/`, toBody(data)),
    remove: (id) => api.delete(`${url}${id}/`),
  }
}// export const nomenclatures = crud('supplies/nomenclatures/');

export default api

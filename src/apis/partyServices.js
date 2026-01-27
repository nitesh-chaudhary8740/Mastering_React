import { api } from './apiClient';

export const partyService = {
  getAll: () => api.get('/parties'),
  create: (data) => api.post('/parties', data),
  update: (id, data) => api.patch(`/parties/${id}`, data),
  delete: (id) => api.delete(`/parties/${id}`),
};
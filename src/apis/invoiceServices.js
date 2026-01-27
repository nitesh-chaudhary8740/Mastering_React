import { api } from './apiClient';

export const invoiceService = {
  getAll: () => api.get('/invoices'),
  create: (data) => api.post('/invoices', data),
  update: (id, data) => api.patch(`/invoices/${id}`, data),
  delete: (id) => api.delete(`/invoices/${id}`),
};
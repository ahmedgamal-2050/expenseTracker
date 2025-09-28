import { environment } from '../../../environments/environment';

export const Endpoints = {
  auth: {
    login: environment.apiUrl + '/login',
  },
  dashboard: {
    expenses: {
      get: environment.apiUrl + '/expenses',
      add: environment.apiUrl + '/expenses',
    },
    currency: {
      get: environment.apiUrl + '/currency',
    },
    categories: {
      get: environment.apiUrl + '/categories',
      add: environment.apiUrl + '/categories',
    },
  },
};

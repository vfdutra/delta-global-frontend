import api from './api';

export async function login(user) {
  return await api.post(`/auth/login`, user,
    {
      headers: {
        'Content-Type': 'application/json',
      }
    }
  ).then((response) => {
    if(response.data.token) {
      localStorage.setItem('token', response.data.token);   
    }
    return response.data;
  });
}
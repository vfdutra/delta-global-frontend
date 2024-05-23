import api from './api';

export async function register(user) {
  return await api.post(`/users`, user,
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
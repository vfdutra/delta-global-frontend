import api from './api';

export async function getAllStudents() {
  return await api.get(`/students`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }
  ).then((response) => {
    return response.data;
  });
}

export async function getStudentById(id) {
  return await api.get(`/students/${id}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }
  ).then((response) => {
    return response.data;
  });
}

export async function createStudent(student) {
  return await api.post(`/students`, student,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }
  ).then((response) => {
    return response.data;
  });
}

export async function updateStudent(id, student) {
  return await api.post(`/students/${id}`, student,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }
  ).then((response) => {
    return response.data;
  });
}

export async function deleteStudent(id) {
  return await api.delete(`/students/${id}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }
  ).then((response) => {
    return response.data;
  });
}

export async function getStudentPhotoById(id) {
  return await api.get(`/students/photo/${id}`, 
    { 
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
     }
  ).then((response) => {
    return response.data;
  });
}
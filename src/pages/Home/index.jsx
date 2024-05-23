import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';

import { getAllStudents, getStudentPhotoById, deleteStudent } from '../../services/student';

import { FormStudent } from '../../components/FormStudent';

export function Home() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [addingStudent, setAddingStudent] = useState(false);
  const navigate = useNavigate();

  const fetchStudentsWithPhotos = async () => {
    const studentsData = await getAllStudents();
    const studentsWithPhotos = await Promise.all(studentsData.map(async (student) => {
      const photo = await getStudentPhotoById(student.id);
      student.avatar = URL.createObjectURL(photo);
      return student;
    }));
    setStudents(studentsWithPhotos);
  };

  useEffect(() => {
    fetchStudentsWithPhotos();
  }, []);

  const handleEditStudent = (studentId) => {
    setEditingStudent(studentId);
    setAddingStudent(false); 
  };

  const handleAddStudent = () => {
    setAddingStudent(true);
    setEditingStudent(null);
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      await deleteStudent(studentId);
      setStudents(students.filter((student) => student.id !== studentId));
    } catch (error) {
      console.error('Failed to delete student:', error);
    }
  };

  const handleCancel = () => {
    setEditingStudent(null);
    setAddingStudent(false);
  };

  const handleUpdate = () => {        
    fetchStudentsWithPhotos();
    setEditingStudent(null);
    setAddingStudent(false);
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <div>      
    { !editingStudent && !addingStudent && 
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <Button variant="contained" color="primary" onClick={handleAddStudent}>
              Add Student
            </Button>
          </Grid>
          <Grid item xs>
            <Grid container justifyContent="flex-end">
              <Button variant="contained" color="secondary" onClick={logout}>
                Logout
              </Button>
            </Grid>
          </Grid>
        </Grid>
      }
      {editingStudent || addingStudent ? (
        <FormStudent
          studentId={editingStudent}
          onCancel={handleCancel}
          onUpdate={handleUpdate}
        />
      ) : 
      students.length == 0 ? (
        <p>No students found</p>
      ) :
      (        
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <img 
                      src={student.avatar} 
                      alt={student.name} 
                      style={{ width: 50, height: 50, borderRadius: '50%' }} 
                    />
                  </TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.phone}</TableCell>
                  <TableCell>{student.address}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEditStudent(student.id)}>Edit</Button>
                    <Button onClick={() => handleDeleteStudent(student.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
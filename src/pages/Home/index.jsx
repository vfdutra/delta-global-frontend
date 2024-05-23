import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { getAllStudents, getStudentPhotoById, deleteStudent } from '../../services/student';
import { FormStudent } from '../../components/FormStudent';

import { StyledContainer, StyledTableCell, StyledTableRow, StyledButton, Header, Title, LogoutButton, NoStudentsMessage } from './style';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export function Home() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [addingStudent, setAddingStudent] = useState(false);
  const navigate = useNavigate();

  const fetchStudentsWithPhotos = async () => {
    try {
      const studentsData = await getAllStudents();
      const studentsWithPhotos = await Promise.all(studentsData.map(async (student) => {
        const photo = await getStudentPhotoById(student.id);
        student.avatar = URL.createObjectURL(photo);
        return student;
      }));
      setStudents(studentsWithPhotos);
    } catch (error) {
      console.error('Failed to fetch students:', error);
    }
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

  const handleUpdate = async () => {
    await fetchStudentsWithPhotos();
    setEditingStudent(null);
    setAddingStudent(false);
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <StyledContainer>
      <Header>
        <Title>Student Management</Title>
        <LogoutButton variant="contained" onClick={logout}>
          Logout
        </LogoutButton>
      </Header>

      {!editingStudent && !addingStudent &&
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <StyledButton variant="contained" color="primary" onClick={handleAddStudent}>
              Add Student
            </StyledButton>
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
        students.length === 0 ? (
          <NoStudentsMessage variant="h5">No students found</NoStudentsMessage>
        ) :
          (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Avatar</StyledTableCell>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Email</StyledTableCell>
                    <StyledTableCell>Phone</StyledTableCell>
                    <StyledTableCell>Address</StyledTableCell>
                    <StyledTableCell>Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.map((student) => (
                    <StyledTableRow key={student.id}>
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
                        <IconButton aria-label='edit' size='large'
                          onClick={() => handleEditStudent(student.id)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete" size="large"
                          onClick={() => handleDeleteStudent(student.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
    </StyledContainer>
  );
}
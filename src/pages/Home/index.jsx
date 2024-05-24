import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { useFetchStudentsWithPhotos } from '../../hooks/useFetchStudentsWithPhotos';
import { deleteStudent } from '../../services/student';
import { FormStudent } from '../../components/FormStudent';
import { DeleteDialog } from '../../components/DeleteDialog';
import { StyledContainer, StyledTableCell, StyledTableRow, StyledButton, Header, Title, LogoutButton, NoStudentsMessage } from './style';

export function Home() {
  const { students, loading, error, fetchStudentsWithPhotos } = useFetchStudentsWithPhotos();
  const [editingStudent, setEditingStudent] = useState(null);
  const [addingStudent, setAddingStudent] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handlePageLoad = () => {
      setIsPageLoaded(true);
    };

    if (document.readyState === 'complete') {
      setIsPageLoaded(true);
    } else {
      window.addEventListener('load', handlePageLoad);
      return () => {
        window.removeEventListener('load', handlePageLoad);
      };
    }
  }, []);

  useEffect(() => {
    if (isPageLoaded) {
      fetchStudentsWithPhotos();
    }
  }, [isPageLoaded, fetchStudentsWithPhotos]);

  const handleEditStudent = useCallback((studentId) => {
    setEditingStudent(studentId);
    setAddingStudent(false);
  }, []);

  const handleAddStudent = useCallback(() => {
    setAddingStudent(true);
    setEditingStudent(null);
  }, []);

  const handleDeleteStudent = useCallback(async (studentId) => {
    try {
      await deleteStudent(studentId);
      await fetchStudentsWithPhotos();
    } catch (error) {
      console.error('Failed to delete student:', error);
    }
  }, [fetchStudentsWithPhotos]);

  const handleCancel = useCallback(() => {
    setEditingStudent(null);
    setAddingStudent(false);
  }, []);

  const handleUpdate = useCallback(async () => {
    await fetchStudentsWithPhotos();
    setEditingStudent(null);
    setAddingStudent(false);
  }, [fetchStudentsWithPhotos]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    navigate('/');
  }, [navigate]);

  const openDeleteConfirm = (studentId) => {
    setStudentToDelete(studentId);
    setDeleteConfirmOpen(true);
  };

  const closeDeleteConfirm = () => {
    setStudentToDelete(null);
    setDeleteConfirmOpen(false);
  };

  const confirmDeleteStudent = () => {
    if (studentToDelete) {
      handleDeleteStudent(studentToDelete);
      closeDeleteConfirm();
    }
  };

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
      ) : loading ? (
        <NoStudentsMessage variant="h5">Loading...</NoStudentsMessage>
      ) : error ? (
        <NoStudentsMessage variant="h5">Failed to load students</NoStudentsMessage>
      ) : students.length === 0 ? (
        <NoStudentsMessage variant="h5">No students found</NoStudentsMessage>
      ) : (
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
                      onClick={() => openDeleteConfirm(student.id)}
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

      <DeleteDialog
        open={deleteConfirmOpen}
        onClose={closeDeleteConfirm}
        onConfirm={confirmDeleteStudent}
      />
    </StyledContainer>
  );
}

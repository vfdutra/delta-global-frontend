import React, { useState, useEffect } from 'react';

import { getStudentById, updateStudent, createStudent } from '../../services/student';

import { TextField, Button, Paper, Grid, Container, Typography, Input, Alert, Box } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export function FormStudent({ studentId, onCancel, onUpdate }) {
  const [student, setStudent] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [imageName, setImageName] = useState('');

  useEffect(() => {
    if (studentId) {
      const fetchStudent = async () => {
        try {
          const studentData = await getStudentById(studentId);
          setStudent(studentData);
        } catch (error) {
          console.error('Failed to fetch student:', error);
        }
      };

      fetchStudent();
    }
  }, [studentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({
      ...student,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImageName(file.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', student.name);
    formData.append('email', student.email);
    formData.append('phone', student.phone);
    formData.append('address', student.address);
    if (image) {
      formData.append('photo', image, image.name);
    }

    try {
      if (studentId) {
        await updateStudent(studentId, formData);
        alert('Student updated successfully!');
      } else {
        await createStudent(formData);
        alert('Student added successfully!');
      }
      onUpdate();
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: 'An unexpected error occurred' });
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: 16 }}>
        <Typography variant="h6" gutterBottom>
          {studentId ? 'Edit Student Info' : 'Add Student'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Name"
                fullWidth
                value={student.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="E-mail"
                fullWidth
                value={student.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="phone"
                label="Phone"
                fullWidth
                value={student.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="address"
                label="Address"
                fullWidth
                value={student.address}
                onChange={handleChange}
                error={!!errors.address}
                helperText={errors.address}
              />
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center">
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload file
                  <Input
                    type="file"
                    onChange={handleImageChange}
                    inputProps={{ accept: 'image/*' }}
                    style={{ display: 'none' }}
                  />
                </Button>
                {imageName && (
                  <Typography variant="body2" style={{ color: '#757575', marginLeft: '8px' }}>
                    {imageName}
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              {errors.photo && (
                <Alert severity="error">{errors.photo}</Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Save Changes
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="secondary" fullWidth onClick={onCancel}>
                Cancel
              </Button>
            </Grid>
          </Grid>
          {errors.general && (
            <Alert severity="error" style={{ marginTop: '1rem' }}>{errors.general}</Alert>
          )}
        </form>
      </Paper>
    </Container>
  );
}
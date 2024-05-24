import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, TextField } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { register } from '../../services/user';
import { StyledContainer, StyledPaper, StyledAvatar, StyledForm, StyledSubmitButton } from './style';

export function FormUser({ onCancel }) {
  const [registerData, setRegisterData] = useState({ email: '', password: '' });
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(registerData);
      navigate('/home');
    } catch (errors) {
      if (errors.response && errors.response.data) {
        setError(errors.response.data.message);
      } else {
        setError({ general: 'An unexpected error occurred' });
      }
    }
  };

  return (
    <StyledContainer component="main" maxWidth="xs">
      <StyledPaper>
        <StyledAvatar>
          <LockOutlinedIcon />
        </StyledAvatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <StyledForm onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={registerData.email}
            onChange={handleChange}
            error={!!error.email}
            helperText={error.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={registerData.password}
            onChange={handleChange}         
          />
          <StyledSubmitButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign Up
          </StyledSubmitButton>
          <StyledSubmitButton
            fullWidth
            variant="contained"
            color="secondary"
            onClick={onCancel}
          >
            Cancel
          </StyledSubmitButton>
        </StyledForm>
      </StyledPaper>
    </StyledContainer>
  );
}
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Typography, TextField, Button, Grid } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { StyledContainer, StyledPaper, StyledAvatar, StyledForm, StyledSubmitButton } from './style';

import { login } from '../../services/auth';
import { ErrorAlert } from '../../components/ErrorAlert';

export function Login() {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(loginData);
      navigate('/home');
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleCreateAccount = () => {
    navigate('/register');
  }

  return (
    <StyledContainer component="main" maxWidth="xs">
      <StyledPaper>
        <StyledAvatar>
          <LockOutlinedIcon />
        </StyledAvatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <ErrorAlert error={error} />
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
            value={loginData.email}
            onChange={handleChange}
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
            value={loginData.password}
            onChange={handleChange}
          />
          <StyledSubmitButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Login
          </StyledSubmitButton>
          <Grid container>           
            <Grid item xs>
              <Button onClick={handleCreateAccount} variant="body2">
                {"Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </StyledForm>
      </StyledPaper>
    </StyledContainer>
  );
}
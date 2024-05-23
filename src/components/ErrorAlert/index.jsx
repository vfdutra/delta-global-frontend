import React from 'react';
import { Alert } from '@mui/material';

export const ErrorAlert = ({ error }) => {
  if (!error) return null;

  const isObject = typeof error === 'object' && error !== null;

  return (
    <Alert severity="error" variant={isObject ? 'filled' : 'standard'}>
      {isObject ? error.message : error}
    </Alert>
  );
};
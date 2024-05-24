import React from 'react';
import { Alert } from '@mui/material';

export const ErrorAlert = ({ message }) => {
  if (!message) return null;

  const isObject = typeof message === 'object' && message !== null;

  return (
    <Alert severity="error" variant={isObject ? 'filled' : 'standard'}>
      {isObject ? message.message : message}
    </Alert>
  );
};

import { styled } from '@mui/material/styles';
import { Container, Paper, Avatar, Button } from '@mui/material';

export const StyledContainer = styled(Container)({
  marginTop: '64px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const StyledPaper = styled(Paper)({
  marginTop: '64px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '16px',
});

export const StyledAvatar = styled(Avatar)({
  margin: '8px',
  backgroundColor: '#f50057',
});

export const StyledForm = styled('form')({
  width: '100%',
  marginTop: '8px',
});

export const StyledSubmitButton = styled(Button)({
  margin: '24px 0 16px',
});

import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const StyledContainer = styled('div')({
  width: '100%',
  boxSizing: 'border-box',
});

export const StyledTableCell = styled(TableCell)({
  fontWeight: 'bold',
  backgroundColor: '#000',
  color: '#fff',
});

export const StyledTableRow = styled(TableRow)({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f5f5f5',
  },
});

export const StyledButton = styled(Button)({
  margin: '8px',
});

export const Header = styled('header')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#3f51b5',
  color: '#fff',
  padding: '16px',
  width: '100%',
  boxSizing: 'border-box',
});

export const Title = styled('h1')({
  margin: 0,
});

export const LogoutButton = styled(Button)({
  backgroundColor: '#f50057',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#c51162',
  },
});

export const StyledTableContainer = styled('div')({
  margin: '16px 0',
  width: '90%',
  marginLeft: 'auto',
  marginRight: 'auto',
});

export const ActionsTableCell = styled(TableCell)({
  textAlign: 'right',
});

export const NoStudentsMessage = styled(Typography)({
  textAlign: 'center',
  color: '#9e9e9e',
  marginTop: '32px',
});

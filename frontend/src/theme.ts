import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7A00E6',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#23004C',
      contrastText: '#FFFFFF'
    },
    background: {
      default: '#F4F2F6',
      paper: '#F5F5F5'
    },
    text: {
      primary: '#23004C'
    }
  }
});

export default theme;

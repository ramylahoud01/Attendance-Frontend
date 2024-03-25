import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: '#2F4F4F',
    },
    secondary: {
      main: '#A9A9A9'
    },
    tertiary: {
      main: '#FFAC1C'
    }
  },
});
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>

);
reportWebVitals();

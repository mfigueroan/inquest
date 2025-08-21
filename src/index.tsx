import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Toaster } from 'react-hot-toast';
import App from './App';

const theme = createTheme({
  palette: {
    primary: {
      main: '#87CEEB', // Sky Blue
      light: '#B0E0E6', // Powder Blue
      dark: '#4682B4', // Steel Blue
    },
    secondary: {
      main: '#98D8C8', // Pastel Teal
      light: '#B8E6B8', // Pastel Green
      dark: '#7FB3D3', // Pastel Blue
    },
    success: {
      main: '#90EE90', // Light Green
      light: '#C1F0C1', // Pastel Green
      dark: '#32CD32', // Lime Green
    },
    warning: {
      main: '#FFB6C1', // Light Pink
      light: '#FFC0CB', // Pink
      dark: '#FF69B4', // Hot Pink
    },
    error: {
      main: '#F0A0A0', // Pastel Red
      light: '#FFB6C1', // Light Pink
      dark: '#DC143C', // Crimson
    },
    background: {
      default: '#F0F8FF', // Alice Blue
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
        <Toaster position="top-right" />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

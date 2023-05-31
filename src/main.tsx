import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ThemeProvider } from '@mui/material';
/* import { theme } from './style/theme'; */
import theme from './style/theme';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ProfileSettings from './pages/ProfileSettings';
import ChangePassword from './pages/ChangePassword';
import AddLocation from './pages/AddLocation';
import EditLocation from './pages/EditLocation';
import GuessLocation from './pages/GuessLocation';
import ChangeImage from './pages/ChangeImage';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route index element={<App />} />
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/profile-settings" element={<ProfileSettings />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/change-image" element={<ChangeImage />} />
          {/*
          <Route path="/profile" element={<Profile />} />
        
        <Route path="/add-location" element={<AddLocation />} />
          <Route path="/edit-location" element={<EditLocation />} />
          <Route path="/guess-location" element={<GuessLocation />} />  */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

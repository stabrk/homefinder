import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MyProperties from './pages/MyProperties';
import MyFavorites from './pages/MyFavorites';
import CreateProperty from './pages/CreateProperty';
import EditProperty from './pages/EditProperty';
import PropertyDetails from './pages/PropertyDetails';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/my-properties" element={<MyProperties />} />
          <Route path="/my-favorites" element={<MyFavorites />} />
          <Route path="/create-property" element={<CreateProperty />} />
          <Route path="/edit-property/:id" element={<EditProperty />} />
         </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;


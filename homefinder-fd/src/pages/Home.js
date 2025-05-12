// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  InputBase,
  Button,
  useTheme,
  Snackbar,
  Alert,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PropertyCard from '../components/PropertyCard';
import PropertyFilters from '../components/PropertyFilters';
import Footer from '../components/Footer';
import api from '../services/api';

function Home() {
  const theme = useTheme();
  
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
   const [filters, setFilters] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    loadProperties();
    loadFavorites();
  }, [filters],[currentUser]);

  const loadProperties = async () => {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== '' && value != null) {
          params.append(key, value);
        }
      });

      const response = await api.getProperties(params);
      setProperties(response.data);
    } catch (error) {
      console.error('Error loading properties:', error);
      showSnackbar('Error loading properties', 'error');
    }
  };
  const loadFavorites = async () => {
    if (currentUser?.user_id) {
      try {
        const response = await api.getFavorites(currentUser.user_id);
        setFavorites(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading favorites:', error);
        showSnackbar('Error loading favorites', 'error');
      }
    }
  };
  const handleFavorite = async (property) => {
    if (!currentUser) {
      showSnackbar('Please login to add favorites', 'warning');
      return;
    }
  
    try {
      console.log('Adding favorite:', {
        userId: currentUser.user_id,
        propertyId: property.property_id
      });
      
      await api.addFavorite(currentUser.user_id, property.property_id);
      await loadFavorites(); // Reload favorites after adding
      showSnackbar('Property added to favorites', 'success');
    } catch (error) {
      console.error('Error adding favorite:', error);
      const errorMessage = error.response?.data?.message || 'Error adding to favorites';
      showSnackbar(errorMessage, 'error');
    }
  };
  
   

    
   
  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };
   

 
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6,
          position: 'relative',
          backgroundImage: 'url(https://source.unsplash.com/random/?luxury,house)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 'bold',
              mb: 3,
              textAlign: 'center',
            }}
          >
            Find Your Dream Home
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              textAlign: 'center',
              maxWidth: '800px',
              mx: 'auto',
            }}
          >
            Discover the perfect property from our extensive collection of homes
          </Typography>

          {/* Search Bar */}
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search by location, property type, or keywords..."
            />
            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              sx={{ px: 3, py: 1 }}
            >
              Search
            </Button>
          </Paper>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mb: 6, flex: 1 }}>
        <PropertyFilters onFilterChange={setFilters} />
        
        {/* Featured Properties Section */}
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Featured Properties
        </Typography>

        <Grid container spacing={3}>
          {properties.map((property) => (
            <Grid item xs={12} sm={6} md={4} key={property.property_id}>
                <PropertyCard
                  property={property}
                  onFavorite={handleFavorite}
                  isFavorite={favorites.some(fav => fav.property_id === property.property_id)}
                />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Footer */}
      <Footer />
    </Box>
  );
}

export default Home;




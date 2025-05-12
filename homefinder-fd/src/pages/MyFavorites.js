// MyFavorites.js
import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Box, 
  CircularProgress,
  Alert 
} from '@mui/material';
import PropertyCard from '../components/PropertyCard';
import api from '../services/api';

function MyFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const loadFavorites = async () => {
    if (!currentUser?.user_id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // First get the user's favorites
      const favoritesResponse = await api.getFavorites(currentUser.user_id);
      console.log('Raw favorites response:', favoritesResponse);
      
      if (favoritesResponse.data) {
        // Get all properties
        const propertiesResponse = await api.getProperties();
        console.log('Properties response:', propertiesResponse);

        // Filter properties that are in favorites
        const favoritePropertyIds = favoritesResponse.data.map(fav => fav.property_id);
        const favoriteProperties = propertiesResponse.data.filter(property => 
          favoritePropertyIds.includes(property.property_id)
        );

        console.log('Filtered favorite properties:', favoriteProperties);
        setFavorites(favoriteProperties);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
      setError('Failed to load favorites. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []); // Empty dependency array since we check currentUser inside loadFavorites

  if (!currentUser) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="info">
          Please log in to view your favorites
        </Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Favorites ({favorites.length})
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {favorites.length === 0 ? (
        <Alert severity="info">
          You haven't added any properties to your favorites yet.
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {favorites.map((property) => (
            <Grid item xs={12} sm={6} md={4} key={property.property_id}>
              <PropertyCard
                property={property}
                isFavorite={true}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default MyFavorites;






import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import api from '../services/api';

function MyProperties() {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    const response = await api.getProperties();
    const userProperties = response.data.filter(
      (prop) => prop.user_id === currentUser?.user_id
    );
    setProperties(userProperties);
  };

  const handleEdit = (property) => {
    navigate(`/edit-property/${property.property_id}`);
  };

  const handleDelete = async (property) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await api.deleteProperty(property.property_id);
        loadProperties();
      } catch (error) {
        alert('Error deleting property');
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Properties
      </Typography>
      <Grid container spacing={3}>
        {properties.map((property) => (
          <Grid item xs={12} sm={6} md={4} key={property.property_id}>
            <PropertyCard
              property={property}
              isOwner={true}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default MyProperties;

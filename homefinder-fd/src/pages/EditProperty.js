import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
} from '@mui/material';
import api from '../services/api';

function EditProperty() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    num_bedrooms: '',
    num_bathrooms: '',
    num_garage: '',
    image_url: '',
  });

  useEffect(() => {
    loadProperty();
  }, [id]);

  const loadProperty = async () => {
    try {
      const response = await api.getProperties();
      const property = response.data.find(p => p.property_id === parseInt(id));
      if (property) {
        setFormData(property);
      }
    } catch (error) {
      alert('Error loading property');
      navigate('/my-properties');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.updateProperty(id, {
        ...formData,
        price: parseFloat(formData.price),
        num_bedrooms: parseInt(formData.num_bedrooms),
        num_bathrooms: parseInt(formData.num_bathrooms),
        num_garage: parseInt(formData.num_garage),
      });
      navigate('/my-properties');
    } catch (error) {
      alert('Error updating property');
    }
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Edit Property
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </Grid>
            {/* Add the same fields as in CreateProperty */}
            {/* ... */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
              >
                Update Property
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default EditProperty;


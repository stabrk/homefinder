import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from '@mui/material';
import api from '../services/api';

function CreateProperty() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const [propertyTypes, setPropertyTypes] = useState([]);
  const [loadingTypes, setLoadingTypes] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    num_bedrooms: '',
    num_bathrooms: '',
    num_garage: '',
    image_url: '',
    user_id: currentUser?.user_id,
    type_id: '',
  });

  useEffect(() => {
    const fetchPropertyTypes = async () => {
      try {
        const response = await api.getPropertyTypes();
        setPropertyTypes(response.data);
      } catch (error) {
        console.error('Error fetching property types:', error);
      } finally {
        setLoadingTypes(false);
      }
    };

    fetchPropertyTypes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.createProperty({
        ...formData,
        price: parseFloat(formData.price),
        num_bedrooms: parseInt(formData.num_bedrooms),
        num_bathrooms: parseInt(formData.num_bathrooms),
        num_garage: parseInt(formData.num_garage),
        type_id: parseInt(formData.type_id),
      });
      navigate('/my-properties');
    } catch (error) {
      alert('Error creating property');
    }
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 6, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create New Property Listing
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Title */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                margin="normal"
              />
            </Grid>

            {/* Property Type */}
            <Grid item xs={12}>
              <FormControl fullWidth required margin="normal">
                <InputLabel id="property-type-label">Property Type</InputLabel>
                {loadingTypes ? (
                  <CircularProgress size={24} />
                ) : propertyTypes.length > 0 ? (
                  <Select
                    labelId="property-type-label"
                    value={formData.type_id}
                    label="Property Type"
                    onChange={(e) => setFormData({ ...formData, type_id: e.target.value })}
                  >
                    {propertyTypes.map((type) => (
                      <MenuItem key={type.type_id} value={type.type_id}>
                        {type.type_name}
                      </MenuItem>
                    ))}
                  </Select>
                ) : (
                  <Typography color="error">No property types available.</Typography>
                )}
              </FormControl>
            </Grid>

            {/* Price and Location */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
                margin="normal"
                InputProps={{
                  startAdornment: <span>$</span>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
                margin="normal"
              />
            </Grid>

            {/* Bedrooms, Bathrooms, Garage */}
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Bedrooms"
                type="number"
                value={formData.num_bedrooms}
                onChange={(e) => setFormData({ ...formData, num_bedrooms: e.target.value })}
                required
                margin="normal"
                inputProps={{ min: "0" }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Bathrooms"
                type="number"
                value={formData.num_bathrooms}
                onChange={(e) => setFormData({ ...formData, num_bathrooms: e.target.value })}
                required
                margin="normal"
                inputProps={{ min: "0" }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Garage Spaces"
                type="number"
                value={formData.num_garage}
                onChange={(e) => setFormData({ ...formData, num_garage: e.target.value })}
                required
                margin="normal"
                inputProps={{ min: "0" }}
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                margin="normal"
              />
            </Grid>

            {/* Image URL */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image URL"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                helperText="Enter the URL of the property image"
                margin="normal"
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ mt: 3 }}
              >
                Create Property
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default CreateProperty;







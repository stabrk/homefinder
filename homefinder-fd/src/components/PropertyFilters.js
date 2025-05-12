import React, { useState, useEffect } from 'react';
import {
  Paper,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Typography,
} from '@mui/material';
import api from '../services/api';

function PropertyFilters({ onFilterChange }) {
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [filters, setFilters] = useState({
    type_id: '',
    min_beds: '',
    max_beds: '',
    min_baths: '',
    max_baths: '',
    min_garage: '',
    max_garage: '',
    min_price: '',
    max_price: '',
  });

  useEffect(() => {
    loadPropertyTypes();
  }, []);

  const loadPropertyTypes = async () => {
    try {
      const response = await api.getPropertyTypes();
      setPropertyTypes(response.data);
    } catch (error) {
      console.error('Error loading property types:', error);
    }
  };

  const handleFilterChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      type_id: '',
      min_beds: '',
      max_beds: '',
      min_baths: '',
      max_baths: '',
      min_garage: '',
      max_garage: '',
      min_price: '',
      max_price: '',
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Property Type</InputLabel>
            <Select
              value={filters.type_id}
              label="Property Type"
              onChange={(e) => handleFilterChange('type_id', e.target.value)}
            >
              <MenuItem value="">All Types</MenuItem>
              {propertyTypes.map((type) => (
                <MenuItem key={type.type_id} value={type.type_id}>
                  {type.type_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Min Beds"
                type="number"
                value={filters.min_beds}
                onChange={(e) => handleFilterChange('min_beds', e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Max Beds"
                type="number"
                value={filters.max_beds}
                onChange={(e) => handleFilterChange('max_beds', e.target.value)}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Min Baths"
                type="number"
                value={filters.min_baths}
                onChange={(e) => handleFilterChange('min_baths', e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Max Baths"
                type="number"
                value={filters.max_baths}
                onChange={(e) => handleFilterChange('max_baths', e.target.value)}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Min Garage"
                type="number"
                value={filters.min_garage}
                onChange={(e) => handleFilterChange('min_garage', e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Max Garage"
                type="number"
                value={filters.max_garage}
                onChange={(e) => handleFilterChange('max_garage', e.target.value)}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Min Price"
                type="number"
                value={filters.min_price}
                onChange={(e) => handleFilterChange('min_price', e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Max Price"
                type="number"
                value={filters.max_price}
                onChange={(e) => handleFilterChange('max_price', e.target.value)}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Button variant="outlined" onClick={handleClearFilters}>
            Clear Filters
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default PropertyFilters;

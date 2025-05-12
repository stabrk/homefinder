// src/pages/PropertyDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Bed,
  Bathtub,
  DirectionsCar,
  LocationOn,
  Email,
  Phone,
} from '@mui/icons-material';
import Footer from '../components/Footer';
import api from '../services/api';

function PropertyDetails() {
  const { id } = useParams();
  const [showContactForm, setShowContactForm] = useState(false);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await api.getProperty(id);
        console.log('Property data:', response.data); // Log property data
        setProperty(response.data);
      } catch (error) {
        console.error('Error fetching property:', error);
        setSnackbar({
          open: true,
          message: 'Error loading property details',
          severity: 'error'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleContactFormChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!contactForm.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!contactForm.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(contactForm.email)) {
      errors.email = 'Email is invalid';
    }
    if (!contactForm.message.trim()) {
      errors.message = 'Message is required';
    }
    if (!property?.property_id) {
      errors.property_id = 'Property ID is missing';
    }
    return errors;
  };

  const handleSubmitContactRequest = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      console.log('Submitting contact request with property ID:', property.property_id);
      
      const contactData = {
        name: contactForm.name,
        email: contactForm.email,
        phone: contactForm.phone,
        message: contactForm.message,
        property_id: property.property_id
      };

      console.log('Sending contact data:', contactData);

      const response = await api.createContactRequest(contactData);
      console.log('Contact request response:', response);
      
      setContactForm({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
      
      setShowContactForm(false);
      
      setSnackbar({
        open: true,
        message: 'Contact request sent successfully!',
        severity: 'success'
      });

    } catch (error) {
      console.error('Contact request error:', error);
      console.error('Error details:', error.response?.data);
      
      setSnackbar({
        open: true,
        message: error.response?.data?.error || 'Error sending contact request. Please try again.',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (!property) return <div>Property not found</div>;

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
        {/* Property Title and Price */}
        <Grid container spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
          <Grid item xs={12} md={8}>
            <Typography variant="h3" component="h1" gutterBottom>
              {property.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOn sx={{ mr: 1 }} />
              {property.location}
            </Typography>
          </Grid>
          <Grid item xs={12} md="auto">
            <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold', textAlign: { xs: 'left', md: 'right' } }}>
              ${property.price.toLocaleString()}
            </Typography>
          </Grid>
        </Grid>

        {/* Property Image */}
        <Paper sx={{ mb: 4, overflow: 'hidden', borderRadius: 3, boxShadow: 3 }}>
          <Box
            component="img"
            src={property.image_url || 'https://source.unsplash.com/random/?house'}
            alt={property.title}
            sx={{ width: '100%', height: { xs: 300, md: 500 }, objectFit: 'cover' }}
          />
        </Paper>

        {/* Property Details */}
        <Grid container spacing={4}>
          {/* Left Column */}
          <Grid item xs={12} md={8}>
            {/* Features */}
            <Paper sx={{ p: 3, mb: 4 }}>
              <Typography variant="h5" gutterBottom>Key Features</Typography>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {[
                  { icon: <Bed />, label: `${property.num_bedrooms} Bedrooms` },
                  { icon: <Bathtub />, label: `${property.num_bathrooms} Bathrooms` },
                  { icon: <DirectionsCar />, label: `${property.num_garage} Garage Spaces` }
                ].map((feature, idx) => (
                  <Grid item xs={12} sm={4} key={idx}>
                    <Paper sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                      {feature.icon}
                      <Typography sx={{ ml: 1 }}>{feature.label}</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Paper>

            {/* Description */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>Description</Typography>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                {property.description}
              </Typography>
            </Paper>
          </Grid>

          {/* Right Column - Contact Form */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, position: { md: 'sticky' }, top: 100 }}>
              <Typography variant="h5" gutterBottom>Contact Agent</Typography>
              
              {property.agent_email && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Email sx={{ mr: 1 }} />
                  <Typography 
                    component="a" 
                    href={`mailto:${property.agent_email}`}
                    sx={{ 
                      textDecoration: 'none', 
                      color: 'primary.main',
                      '&:hover': { textDecoration: 'underline' } 
                    }}
                  >
                    {property.agent_email}
                  </Typography>
                </Box>
              )}
              
              {property.agent_phone && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Phone sx={{ mr: 1 }} />
                  <Typography 
                    component="a" 
                    href={`tel:${property.agent_phone}`}
                    sx={{ 
                      textDecoration: 'none', 
                      color: 'primary.main',
                      '&:hover': { textDecoration: 'underline' } 
                    }}
                  >
                    {property.agent_phone}
                  </Typography>
                </Box>
              )}

              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={() => setShowContactForm(!showContactForm)}
              >
                Request Information
              </Button>

              {showContactForm && (
                <Box component="form" onSubmit={handleSubmitContactRequest} sx={{ mt: 3 }}>
                  <TextField
                    fullWidth
                    required
                    label="Name"
                    name="name"
                    value={contactForm.name}
                    onChange={handleContactFormChange}
                    error={!!formErrors.name}
                    helperText={formErrors.name}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    required
                    label="Email"
                    name="email"
                    type="email"
                    value={contactForm.email}
                    onChange={handleContactFormChange}
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={contactForm.phone}
                    onChange={handleContactFormChange}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    required
                    label="Message"
                    name="message"
                    multiline
                    rows={4}
                    value={contactForm.message}
                    onChange={handleContactFormChange}
                    error={!!formErrors.message}
                    helperText={formErrors.message}
                    margin="normal"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{ mt: 2 }}
                  >
                    Send Message
                  </Button>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Footer />
    </Box>
  );
}

export default PropertyDetails;

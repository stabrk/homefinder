// src/components/Footer.js
import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Phone,
  Email,
  LocationOn,
} from '@mui/icons-material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              About HomeFinder
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              HomeFinder is your trusted partner in finding the perfect property. 
              We connect buyers, sellers, and renters with the best properties across the country.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="inherit" aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Quick Links
            </Typography>
            <Link href="/" color="inherit" display="block" sx={{ mb: 1 }}>
              Home
            </Link>
            <Link href="/properties" color="inherit" display="block" sx={{ mb: 1 }}>
              Properties
            </Link>
            <Link href="/about" color="inherit" display="block" sx={{ mb: 1 }}>
              About Us
            </Link>
            <Link href="/contact" color="inherit" display="block" sx={{ mb: 1 }}>
              Contact
            </Link>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', mb: 2 }}>
              <LocationOn sx={{ mr: 2 }} />
              <Typography variant="body2">
                123 Real Estate Ave, City, State 12345
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', mb: 2 }}>
              <Phone sx={{ mr: 2 }} />
              <Typography variant="body2">
                (555) 123-4567
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', mb: 2 }}>
              <Email sx={{ mr: 2 }} />
              <Typography variant="body2">
                info@homefinder.com
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, bgcolor: 'rgba(255, 255, 255, 0.1)' }} />

        <Typography variant="body2" align="center" sx={{ pt: 2 }}>
          © {new Date().getFullYear()} HomeFinder. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;

// src/components/PropertyCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  CardActionArea,
  Divider,  // Add this import
} from '@mui/material';
import {
  Bed,
  Bathtub,
  DirectionsCar,
  Favorite,
  FavoriteBorder,
  LocationOn,
} from '@mui/icons-material';

function PropertyCard({ property, onFavorite, isFavorite }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/property/${property.property_id}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent card click when clicking favorite
    if (onFavorite) {
      onFavorite(property);
    }
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
      <CardActionArea onClick={handleClick}>
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="240"
            image={property.image_url || 'https://source.unsplash.com/random/?house'}
            alt={property.title}
            sx={{
              objectFit: 'cover',
            }}
          />
          {onFavorite && (
            <IconButton
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                bgcolor: 'white',
                '&:hover': { 
                  bgcolor: 'white',
                  transform: 'scale(1.1)',
                },
                transition: 'transform 0.2s ease',
              }}
              onClick={handleFavoriteClick}
            >
              {isFavorite ? 
                <Favorite sx={{ color: 'red' }}  /> : 
                <FavoriteBorder sx={{ color: 'grey.500' }} />
              }
            </IconButton>
          )}
          
          {/* Price Tag */}
          <Chip
            label={`$${property.price.toLocaleString()}`}
            sx={{
              position: 'absolute',
              bottom: 16,
              right: 16,
              bgcolor: 'primary.main',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              padding: '8px 4px',
              '& .MuiChip-label': {
                px: 2,
              },
            }}
          />

          {/* Property Type Tag */}
          <Chip
            label={property.type_name}
            sx={{
              position: 'absolute',
              top: 16,
              left: 16,
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              fontWeight: 500,
            }}
          />
        </Box>

        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Typography 
            gutterBottom 
            variant="h6" 
            component="h2"
            sx={{ 
              fontWeight: 'bold',
              fontSize: '1.25rem',
              mb: 1,
              height: '60px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {property.title}
          </Typography>

          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 2,
            color: 'text.secondary',
          }}>
            <LocationOn sx={{ fontSize: '1.2rem', mr: 1 }} />
            <Typography 
              variant="body2"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {property.location}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Property Features */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            mt: 2,
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              color: 'text.secondary',
            }}>
              <Bed sx={{ mr: 0.5 }} />
              <Typography variant="body2">
                {property.num_bedrooms} Beds
              </Typography>
            </Box>

            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              color: 'text.secondary',
            }}>
              <Bathtub sx={{ mr: 0.5 }} />
              <Typography variant="body2">
                {property.num_bathrooms} Baths
              </Typography>
            </Box>

            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              color: 'text.secondary',
            }}>
              <DirectionsCar sx={{ mr: 0.5 }} />
              <Typography variant="body2">
                {property.num_garage} Garage
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PropertyCard;



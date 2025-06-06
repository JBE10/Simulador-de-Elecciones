import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Polygon } from '@react-google-maps/api';
import { Box, Paper, Typography } from '@mui/material';
import { provincias } from '../data/provincias';

const containerStyle = {
  width: '100%',
  height: '600px'
};

const center = {
  lat: -36.0,
  lng: -64.0
};

const MapaArgentina = ({ onProvinciaSelect }) => {
  const [selectedProvincia, setSelectedProvincia] = useState(null);
  const [hoveredProvincia, setHoveredProvincia] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY" // Reemplazar con tu API key
  });

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    Object.values(provincias).forEach(provincia => {
      provincia.paths.forEach(path => bounds.extend(path));
    });
    map.fitBounds(bounds);
  }, []);

  const handleProvinciaClick = (nombre) => {
    setSelectedProvincia(nombre);
    onProvinciaSelect(nombre);
  };

  const handleProvinciaHover = (nombre) => {
    setHoveredProvincia(nombre);
  };

  return isLoaded ? (
    <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={5}
        onLoad={onLoad}
        options={{
          styles: [
            {
              featureType: 'administrative.country',
              elementType: 'geometry',
              stylers: [{ visibility: 'on' }]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ color: '#a2daf2' }]
            }
          ]
        }}
      >
        {Object.entries(provincias).map(([nombre, data]) => (
          <Polygon
            key={nombre}
            paths={data.paths}
            options={{
              fillColor: nombre === selectedProvincia ? '#FF0000' : 
                        nombre === hoveredProvincia ? '#FFA500' : data.color,
              fillOpacity: 0.7,
              strokeColor: '#000000',
              strokeWeight: 1,
            }}
            onClick={() => handleProvinciaClick(nombre)}
            onMouseOver={() => handleProvinciaHover(nombre)}
            onMouseOut={() => handleProvinciaHover(null)}
          />
        ))}
      </GoogleMap>
      {selectedProvincia && (
        <Paper 
          elevation={3} 
          sx={{ 
            position: 'absolute', 
            top: 20, 
            right: 20, 
            padding: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            zIndex: 1000
          }}
        >
          <Typography variant="h6">
            Provincia seleccionada: {selectedProvincia}
          </Typography>
        </Paper>
      )}
    </Box>
  ) : <Typography>Cargando mapa...</Typography>;
};

export default MapaArgentina; 
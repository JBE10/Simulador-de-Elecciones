import React, { useRef, useEffect, useState } from 'react';
import { Box, Paper, Typography, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material';
import argentinaSVG from '../data/argentina.svg?raw';

const PROVINCIAS = [
  "AR-B", // Buenos Aires
  "AR-C", // CABA
  "AR-K", // Catamarca
  "AR-H", // Chaco
  "AR-U", // Chubut
  "AR-X", // Córdoba
  "AR-W", // Corrientes
  "AR-E", // Entre Ríos
  "AR-P", // Formosa
  "AR-Y", // Jujuy
  "AR-L", // La Pampa
  "AR-F", // La Rioja
  "AR-M", // Mendoza
  "AR-N", // Misiones
  "AR-Q", // Neuquén
  "AR-R", // Río Negro
  "AR-A", // Salta
  "AR-J", // San Juan
  "AR-D", // San Luis
  "AR-Z", // Santa Cruz
  "AR-S", // Santa Fe
  "AR-G", // Santiago del Estero
  "AR-V", // Tierra del Fuego
  "AR-T", // Tucumán
];

const provinciaNombre = {
  "AR-B": "Buenos Aires",
  "AR-C": "CABA",
  "AR-K": "Catamarca",
  "AR-H": "Chaco",
  "AR-U": "Chubut",
  "AR-X": "Córdoba",
  "AR-W": "Corrientes",
  "AR-E": "Entre Ríos",
  "AR-P": "Formosa",
  "AR-Y": "Jujuy",
  "AR-L": "La Pampa",
  "AR-F": "La Rioja",
  "AR-M": "Mendoza",
  "AR-N": "Misiones",
  "AR-Q": "Neuquén",
  "AR-R": "Río Negro",
  "AR-A": "Salta",
  "AR-J": "San Juan",
  "AR-D": "San Luis",
  "AR-Z": "Santa Cruz",
  "AR-S": "Santa Fe",
  "AR-G": "Santiago del Estero",
  "AR-V": "Tierra del Fuego",
  "AR-T": "Tucumán",
};

const MapaArgentina = ({ onProvinciaSelect }) => {
  const svgContainer = useRef(null);
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    if (!svgContainer.current) return;
    
    // Limpia listeners previos
    PROVINCIAS.forEach(id => {
      const el = svgContainer.current.querySelector(`#${id}`);
      if (el) {
        el.onmouseenter = null;
        el.onmouseleave = null;
        el.onclick = null;
      }
    });

    // Asigna listeners y desactiva pointer-events en los textos
    PROVINCIAS.forEach(id => {
      const el = svgContainer.current.querySelector(`#${id}`);
      if (el) {
        console.log(`Setting up listeners for ${id}`); // Debug log
        el.style.cursor = 'pointer';
        el.onmouseenter = () => {
          console.log(`Hovering ${id}`); // Debug log
          setHovered(id);
        };
        el.onmouseleave = () => {
          console.log(`Leaving ${id}`); // Debug log
          setHovered(null);
        };
        el.onclick = (e) => {
          console.log(`Clicked ${id}`); // Debug log
          e.preventDefault(); // Prevent default behavior
          e.stopPropagation(); // Prevent event bubbling
          setSelected(id);
          if (onProvinciaSelect) onProvinciaSelect(provinciaNombre[id] || id);
        };
        
        // Desactiva pointer events en los textos hijos
        el.querySelectorAll('text').forEach(txt => {
          txt.setAttribute('pointer-events', 'none');
        });
        
        // Resalta color y fill
        const path = el.querySelector('path');
        if (path) {
          if (selected === id) {
            path.setAttribute('stroke', '#d32f2f');
            path.setAttribute('stroke-width', '4');
            path.setAttribute('fill-opacity', '1');
            path.setAttribute('filter', 'drop-shadow(0px 0px 8px #d32f2f88)');
          } else if (hovered === id) {
            path.setAttribute('stroke', '#ff9800');
            path.setAttribute('stroke-width', '4');
            path.setAttribute('fill-opacity', '0.7');
            path.setAttribute('filter', 'drop-shadow(0px 0px 8px #ff980088)');
          } else {
            path.setAttribute('stroke', '#222');
            path.setAttribute('stroke-width', '2');
            path.setAttribute('fill-opacity', '1');
            path.removeAttribute('filter');
          }
        }
      } else {
        console.log(`Element not found for ${id}`); // Debug log
      }
    });
  }, [selected, hovered, onProvinciaSelect]);

  const handleListSelect = (id) => {
    setSelected(id);
    if (onProvinciaSelect) onProvinciaSelect(provinciaNombre[id] || id);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', height: '600px', textAlign: 'center' }}>
      {/* Lista de provincias */}
      <Paper elevation={2} sx={{ width: 220, maxHeight: 600, overflow: 'auto', mr: 2, mt: 2 }}>
        <Typography variant="h6" sx={{ p: 2, pb: 1 }}>
          Provincias
        </Typography>
        <Divider />
        <List dense>
          {PROVINCIAS.map(id => (
            <ListItem key={id} disablePadding>
              <ListItemButton
                selected={selected === id}
                onClick={() => handleListSelect(id)}
              >
                <ListItemText primary={provinciaNombre[id]} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
      {/* Mapa SVG */}
      <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
        <div
          ref={svgContainer}
          dangerouslySetInnerHTML={{ __html: argentinaSVG }}
          style={{ width: '100%', height: '100%', maxWidth: 400, margin: 'auto' }}
        />
        {selected && (
          <Paper elevation={3} sx={{ position: 'absolute', top: 20, right: 20, p: 2, minWidth: 200 }}>
            <Typography variant="h6" gutterBottom>
              {provinciaNombre[selected]}
            </Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default MapaArgentina; 
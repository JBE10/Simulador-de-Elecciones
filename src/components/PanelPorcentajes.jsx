import React, { useEffect, useState } from 'react';
import { Box, Typography, Slider, Paper, Divider } from '@mui/material';

// Recibe: partidos (array de strings), onChange (callback con el objeto de porcentajes), valores (objeto { partido: porcentaje })
const PanelPorcentajes = ({ partidos, valores = {}, onChange }) => {
  // Estado local de porcentajes
  const [porcentajes, setPorcentajes] = useState(() => {
    if (partidos && partidos.length > 0) {
      const total = partidos.length;
      const base = Math.floor(100 / total);
      const resto = 100 - base * total;
      const inicial = {};
      partidos.forEach((p, i) => {
        inicial[p] = base + (i === 0 ? resto : 0);
      });
      return inicial;
    }
    return {};
  });

  // Si cambian los partidos, reiniciar
  useEffect(() => {
    if (partidos && partidos.length > 0) {
      const total = partidos.length;
      const base = Math.floor(100 / total);
      const resto = 100 - base * total;
      const inicial = {};
      partidos.forEach((p, i) => {
        inicial[p] = base + (i === 0 ? resto : 0);
      });
      setPorcentajes(inicial);
    }
  }, [partidos]);

  // Si cambian los valores externos
  useEffect(() => {
    if (valores && Object.keys(valores).length > 0) {
      setPorcentajes(valores);
    }
  }, [valores]);

  // Lógica de autoajuste
  const handleSlider = (partido, value) => {
    const otros = partidos.filter(p => p !== partido);
    let nuevo = { ...porcentajes, [partido]: value };
    let sumaOtros = otros.reduce((acc, p) => acc + nuevo[p], 0);
    let restante = 100 - value;
    if (sumaOtros === 0) {
      // Si todos los otros están en 0, repartir el resto equitativamente
      const eq = Math.floor(restante / otros.length);
      otros.forEach((p, i) => {
        nuevo[p] = eq + (i === 0 ? restante - eq * otros.length : 0);
      });
    } else {
      // Ajustar proporcionalmente
      otros.forEach(p => {
        nuevo[p] = Math.round((porcentajes[p] / sumaOtros) * restante);
      });
      // Ajuste de redondeo para que sume 100
      let suma = partidos.reduce((acc, p) => acc + nuevo[p], 0);
      let diff = 100 - suma;
      if (diff !== 0) {
        // Corrige el primero distinto al modificado
        for (let p of otros) {
          nuevo[p] += diff;
          break;
        }
      }
    }
    setPorcentajes(nuevo);
    if (onChange) onChange(nuevo);
  };

  return (
    <Paper elevation={3} sx={{ p: 2, minWidth: 260, maxWidth: 400, width: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Porcentajes por partido
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box>
        {partidos.map(partido => (
          <Box key={partido} sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              {partido}: <b>{porcentajes[partido] || 0}%</b>
            </Typography>
            <Slider
              value={porcentajes[partido] || 0}
              min={0}
              max={100}
              step={1}
              onChange={(_, value) => handleSlider(partido, value)}
              valueLabelDisplay="auto"
              disabled={partidos.length < 2}
            />
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default PanelPorcentajes; 
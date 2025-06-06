import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Grid,
  Box,
  Alert,
} from '@mui/material';
import axios from 'axios';

function Simulador() {
  const [provincias, setProvincias] = useState([]);
  const [partidos, setPartidos] = useState([]);
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState('');
  const [porcentajes, setPorcentajes] = useState({});
  const [total, setTotal] = useState(0);
  const [error, setError] = useState('');
  const [resultados, setResultados] = useState(null);

  useEffect(() => {
    // Cargar provincias
    const cargarProvincias = async () => {
      try {
        const response = await axios.get('/api/provincias');
        setProvincias(response.data);
      } catch (error) {
        setError('Error al cargar las provincias');
      }
    };
    cargarProvincias();
  }, []);

  useEffect(() => {
    // Cargar partidos cuando se selecciona una provincia
    if (provinciaSeleccionada) {
      const cargarPartidos = async () => {
        try {
          const response = await axios.get(`/api/partidos/${provinciaSeleccionada}`);
          setPartidos(response.data);
          // Inicializar porcentajes
          const nuevosPorcentajes = {};
          response.data.forEach(partido => {
            nuevosPorcentajes[partido] = 0;
          });
          setPorcentajes(nuevosPorcentajes);
        } catch (error) {
          setError('Error al cargar los partidos');
        }
      };
      cargarPartidos();
    }
  }, [provinciaSeleccionada]);

  const handleProvinciaChange = (event) => {
    setProvinciaSeleccionada(event.target.value);
    setPorcentajes({});
    setTotal(0);
    setResultados(null);
  };

  const handlePorcentajeChange = (partido, valor) => {
    const nuevoValor = parseFloat(valor) || 0;
    const nuevoTotal = total - (porcentajes[partido] || 0) + nuevoValor;

    if (nuevoTotal > 100) {
      setError('El total no puede superar el 100%');
      return;
    }

    setPorcentajes(prev => ({
      ...prev,
      [partido]: nuevoValor
    }));
    setTotal(nuevoTotal);
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (total !== 100) {
      setError('El total debe ser 100%');
      return;
    }

    try {
      const response = await axios.post('/api/simular', {
        provincia: provinciaSeleccionada,
        votos: porcentajes
      });
      setResultados(response.data);
    } catch (error) {
      setError('Error al simular las elecciones');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Simulador de Elecciones
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Provincia</InputLabel>
                <Select
                  value={provinciaSeleccionada}
                  onChange={handleProvinciaChange}
                  label="Provincia"
                >
                  {provincias.map((provincia) => (
                    <MenuItem key={provincia} value={provincia}>
                      {provincia}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {partidos.map((partido) => (
              <Grid item xs={12} sm={6} key={partido}>
                <TextField
                  fullWidth
                  label={`${partido} (%)`}
                  type="number"
                  value={porcentajes[partido] || ''}
                  onChange={(e) => handlePorcentajeChange(partido, e.target.value)}
                  InputProps={{
                    inputProps: { min: 0, max: 100, step: 0.1 }
                  }}
                />
              </Grid>
            ))}

            <Grid item xs={12}>
              <Typography variant="h6">
                Total: {total.toFixed(1)}%
              </Typography>
            </Grid>

            {error && (
              <Grid item xs={12}>
                <Alert severity="error">{error}</Alert>
              </Grid>
            )}

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={total !== 100}
              >
                Simular
              </Button>
            </Grid>
          </Grid>
        </form>

        {resultados && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Resultados
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">Diputados:</Typography>
                {Object.entries(resultados.diputados).map(([partido, escaños]) => (
                  <Typography key={partido}>
                    {partido}: {escaños} escaños
                  </Typography>
                ))}
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Senadores:</Typography>
                {Object.entries(resultados.senadores).map(([partido, _]) => (
                  <Typography key={partido}>
                    {partido}: 1 senador
                  </Typography>
                ))}
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default Simulador; 
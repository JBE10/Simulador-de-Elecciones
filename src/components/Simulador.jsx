import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Alert,
  CircularProgress
} from '@mui/material';
import axios from 'axios';
import MapaArgentina from './MapaArgentina';

const Simulador = () => {
  const [provincias, setProvincias] = useState([]);
  const [partidos, setPartidos] = useState([]);
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState(null);
  const [porcentajes, setPorcentajes] = useState({});
  const [totalVotos, setTotalVotos] = useState(0);
  const [error, setError] = useState('');
  const [resultados, setResultados] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
    const cargarPartidos = async () => {
      if (provinciaSeleccionada) {
        try {
          const response = await axios.get(`/api/partidos/${provinciaSeleccionada}`);
          setPartidos(response.data);
          // Inicializar porcentajes para cada partido
          const nuevosPorcentajes = {};
          response.data.forEach(partido => {
            nuevosPorcentajes[partido] = 0;
          });
          setPorcentajes(nuevosPorcentajes);
        } catch (error) {
          setError('Error al cargar los partidos');
        }
      }
    };
    cargarPartidos();
  }, [provinciaSeleccionada]);

  const handleProvinciaSelect = (provincia) => {
    setProvinciaSeleccionada(provincia);
    setPorcentajes({});
    setTotalVotos(0);
    setResultados(null);
    setError('');
  };

  const handlePorcentajeChange = (partido, valor) => {
    const nuevoValor = parseFloat(valor) || 0;
    const nuevosPorcentajes = { ...porcentajes, [partido]: nuevoValor };
    setPorcentajes(nuevosPorcentajes);
    
    const total = Object.values(nuevosPorcentajes).reduce((sum, val) => sum + val, 0);
    setTotalVotos(total);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (totalVotos > 100) {
      setError('El total de votos no puede superar el 100%');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/simular', {
        provincia: provinciaSeleccionada,
        votos: porcentajes
      });
      setResultados(response.data);
      setError('');
    } catch (error) {
      setError('Error al simular la elección');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 600 }}>
            <MapaArgentina onProvinciaSelect={handleProvinciaSelect} />
          </Paper>
        </Grid>
        
        {provinciaSeleccionada && (
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" gutterBottom>
                Simulación para {provinciaSeleccionada}
              </Typography>
              
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  {partidos.map((partido) => (
                    <Grid item xs={12} sm={6} md={4} key={partido}>
                      <TextField
                        fullWidth
                        label={`${partido} (%)`}
                        type="number"
                        value={porcentajes[partido] || ''}
                        onChange={(e) => handlePorcentajeChange(partido, e.target.value)}
                        inputProps={{ min: 0, max: 100, step: 0.1 }}
                      />
                    </Grid>
                  ))}
                </Grid>

                <Box sx={{ mt: 2, mb: 2 }}>
                  <Typography variant="subtitle1">
                    Total: {totalVotos.toFixed(1)}%
                  </Typography>
                </Box>

                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading || totalVotos > 100}
                  sx={{ mt: 2 }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Simular'}
                </Button>
              </Box>

              {resultados && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Resultados
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1">
                        Diputados:
                      </Typography>
                      {Object.entries(resultados.diputados).map(([partido, cantidad]) => (
                        <Typography key={partido}>
                          {partido}: {cantidad} bancas
                        </Typography>
                      ))}
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1">
                        Senadores:
                      </Typography>
                      {Object.entries(resultados.senadores).map(([partido, cantidad]) => (
                        <Typography key={partido}>
                          {partido}: {cantidad} bancas
                        </Typography>
                      ))}
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Simulador; 
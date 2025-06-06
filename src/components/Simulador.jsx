import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  CircularProgress,
  Alert,
  useMediaQuery,
} from '@mui/material';
import MapaArgentina from './MapaArgentina';
import PanelPorcentajes from './PanelPorcentajes';
import Resultados from './Resultados';
import provinciasData from '../data/provincias.json';
import partidosData from '../../data/partidos.json';

const provinciaIdToNombre = {
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

const Simulador = () => {
  const [selectedProvincia, setSelectedProvincia] = useState(null);
  const [partidos, setPartidos] = useState([]);
  const [votos, setVotos] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resultados, setResultados] = useState(null);
  const [porcentajes, setPorcentajes] = useState({});
  const isMdUp = useMediaQuery('(min-width:900px)');

  useEffect(() => {
    if (selectedProvincia) {
      // Simulamos los partidos disponibles
      setPartidos(partidosData[selectedProvincia] || []);
      setVotos({});
      setResultados(null);
    }
  }, [selectedProvincia]);

  const handleVotoChange = (partido, valor) => {
    const nuevoValor = parseFloat(valor) || 0;
    setVotos(prev => ({
      ...prev,
      [partido]: nuevoValor
    }));
  };

  const calcularTotal = () => {
    return Object.values(votos).reduce((sum, val) => sum + val, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const total = calcularTotal();
    
    if (total > 100) {
      setError('El total de votos no puede superar el 100%');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulamos el cálculo de escaños
      const escanos = provinciasData[selectedProvincia];
      const votosArray = Object.entries(votos)
        .filter(([_, valor]) => valor > 0)
        .map(([partido, valor]) => ({
          partido,
          votos: valor
        }));

      // Implementación simple del método D'Hondt
      const resultados = {};
      const cocientes = {};
      
      votosArray.forEach(({ partido, votos }) => {
        resultados[partido] = 0;
        cocientes[partido] = votos;
      });

      for (let i = 0; i < escanos; i++) {
        let maxPartido = null;
        let maxCociente = -1;

        Object.entries(cocientes).forEach(([partido, cociente]) => {
          if (cociente > maxCociente) {
            maxCociente = cociente;
            maxPartido = partido;
          }
        });

        resultados[maxPartido]++;
        cocientes[maxPartido] = votosArray.find(v => v.partido === maxPartido).votos / (resultados[maxPartido] + 1);
      }

      setResultados(resultados);
    } catch (err) {
      setError('Error al calcular los resultados');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Box sx={{
            display: 'flex',
            flexDirection: isMdUp ? 'row' : 'column',
            alignItems: 'flex-start',
            gap: 3,
            width: '100%',
            mt: 2,
          }}>
            <Box sx={{ flex: 1, minWidth: 350 }}>
              <MapaArgentina onProvinciaSelect={setSelectedProvincia} />
            </Box>
            {selectedProvincia && partidos.length > 0 && (
              <Box sx={{ flex: 1, minWidth: 300, width: '100%' }}>
                <PanelPorcentajes
                  partidos={partidos}
                  valores={porcentajes}
                  onChange={setPorcentajes}
                />
              </Box>
            )}
          </Box>
        </Grid>
        
        <Grid item xs={12} md={4}>
          {selectedProvincia ? (
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                {selectedProvincia}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Escaños: {provinciasData[selectedProvincia]}
              </Typography>

              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                {partidos.map((partido) => (
                  <TextField
                    key={partido}
                    label={partido}
                    type="number"
                    value={votos[partido] || ''}
                    onChange={(e) => handleVotoChange(partido, e.target.value)}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      inputProps: { min: 0, max: 100, step: 0.1 }
                    }}
                  />
                ))}

                <Typography variant="body2" sx={{ mt: 2, mb: 2 }}>
                  Total: {calcularTotal().toFixed(1)}%
                </Typography>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Simular'}
                </Button>
              </Box>

              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}

              {resultados && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Resultados
                  </Typography>
                  {Object.entries(resultados).map(([partido, escaños]) => (
                    <Typography key={partido}>
                      {partido}: {escaños} escaño(s)
                    </Typography>
                  ))}
                </Box>
              )}
            </Paper>
          ) : (
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6">
                Selecciona una provincia para comenzar
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Simulador; 
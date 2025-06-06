import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Grid,
  Box,
  CircularProgress,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import axios from 'axios';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

function Resultados() {
  const [resultados, setResultados] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const cargarResultados = async () => {
      try {
        const response = await axios.get('/api/resultados');
        setResultados(response.data);
      } catch (error) {
        setError('Error al cargar los resultados');
      } finally {
        setLoading(false);
      }
    };
    cargarResultados();
  }, []);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  if (!resultados) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography>No hay resultados disponibles</Typography>
      </Container>
    );
  }

  const datosDiputados = Object.entries(resultados.diputados).map(([partido, escaños]) => ({
    partido,
    escaños,
  }));

  const datosSenadores = Object.entries(resultados.senadores).map(([partido, _]) => ({
    partido,
    escaños: 1,
  }));

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Resultados de la Simulación
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Distribución de Diputados
            </Typography>
            <Box sx={{ width: '100%', height: 400 }}>
              <BarChart
                data={datosDiputados}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="partido" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="escaños" fill="#8884d8" />
              </BarChart>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Distribución de Senadores
            </Typography>
            <Box sx={{ width: '100%', height: 400 }}>
              <PieChart>
                <Pie
                  data={datosSenadores}
                  dataKey="escaños"
                  nameKey="partido"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  label
                >
                  {datosSenadores.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Resumen
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6">Diputados:</Typography>
                {datosDiputados.map(({ partido, escaños }) => (
                  <Typography key={partido}>
                    {partido}: {escaños} escaños
                  </Typography>
                ))}
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6">Senadores:</Typography>
                {datosSenadores.map(({ partido }) => (
                  <Typography key={partido}>
                    {partido}: 1 senador
                  </Typography>
                ))}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Resultados; 
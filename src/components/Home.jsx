import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Box,
} from '@mui/material';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import BarChartIcon from '@mui/icons-material/BarChart';
import InfoIcon from '@mui/icons-material/Info';

function Home() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <HowToVoteIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom>
          Simulador de Elecciones 2025
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Simula el reparto de escaños en las elecciones legislativas
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <HowToVoteIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" component="h2" gutterBottom>
              Simulador
            </Typography>
            <Typography paragraph>
              Ingresa los porcentajes de votos por partido y simula el reparto de escaños
              usando el método D'Hondt para diputados y mayoría simple para senadores.
            </Typography>
            <Button
              component={RouterLink}
              to="/simulador"
              variant="contained"
              color="primary"
              sx={{ mt: 'auto' }}
            >
              Ir al Simulador
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <BarChartIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" component="h2" gutterBottom>
              Resultados
            </Typography>
            <Typography paragraph>
              Visualiza los resultados de las simulaciones realizadas y analiza
              la distribución de escaños entre los diferentes partidos.
            </Typography>
            <Button
              component={RouterLink}
              to="/resultados"
              variant="contained"
              color="primary"
              sx={{ mt: 'auto' }}
            >
              Ver Resultados
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <InfoIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" component="h2" gutterBottom>
              Información
            </Typography>
            <Typography paragraph>
              Conoce más sobre el sistema electoral argentino, el método D'Hondt
              y cómo se calculan los escaños en las elecciones legislativas.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 'auto' }}
              href="https://es.wikipedia.org/wiki/Sistema_D%27Hondt"
              target="_blank"
            >
              Más Información
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home; 
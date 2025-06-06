import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
} from '@mui/material';
import HowToVoteIcon from '@mui/icons-material/HowToVote';

function Navbar() {
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <HowToVoteIcon sx={{ mr: 2 }} />
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            Simulador de Elecciones 2025
          </Typography>
          <Button
            color="inherit"
            component={RouterLink}
            to="/simulador"
          >
            Simulador
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/resultados"
          >
            Resultados
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar; 
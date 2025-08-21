import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
  Chip
} from '@mui/material';
import {
  Home as HomeIcon,
  Logout as LogoutIcon,
  Assessment as AssessmentIcon,
  People as PeopleIcon,
  Description as DescriptionIcon,
  BarChart as BarChartIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.success('Sesión cerrada exitosamente');
  };

  const adminCards = [
    {
      id: 'resultados',
      titulo: 'Ver Resultados',
      descripcion: 'Consulta y descarga de formularios completados por los bancos',
      icono: <AssessmentIcon sx={{ fontSize: 60 }} />,
      color: 'primary',
      ruta: '/admin/resultados'
    },
    {
      id: 'usuarios',
      titulo: 'Gestión de Usuarios',
      descripcion: 'Administra usuarios bancarios, activación/desactivación y edición',
      icono: <PeopleIcon sx={{ fontSize: 60 }} />,
      color: 'secondary',
      ruta: '/admin/usuarios'
    },
    {
      id: 'formularios',
      titulo: 'Gestión de Formularios',
      descripcion: 'Activa/desactiva formularios y carga nuevos formularios',
      icono: <DescriptionIcon sx={{ fontSize: 60 }} />,
      color: 'success',
      ruta: '/admin/formularios'
    }
  ];

  const getColorByType = (color: string) => {
    switch (color) {
      case 'primary': return '#1976d2';
      case 'secondary': return '#dc004e';
      case 'success': return '#4caf50';
      default: return '#1976d2';
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <div className="logo-container">
            <img src="/inquest logo.png" alt="Inquest Logo" />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Panel de Administración
            </Typography>
          </div>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Inicio">
            <IconButton color="inherit" onClick={() => navigate('/admin')}>
              <HomeIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Cerrar Sesión">
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box className="dashboard-header">
          <Typography variant="h4" component="h1" gutterBottom>
            Panel de Administración
          </Typography>
          <Typography variant="h6">
            Bienvenido, {user?.bankName}. Gestiona todos los aspectos del sistema
          </Typography>
          <Chip 
            label="Administrador" 
            color="primary" 
            sx={{ mt: 2 }} 
          />
        </Box>

        <Grid container spacing={3}>
          {adminCards.map((card) => (
            <Grid item xs={12} sm={6} md={4} key={card.id}>
              <Card 
                className="formulario-card"
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)'
                  }
                }}
              >
                <CardContent sx={{ 
                  flexGrow: 1, 
                  textAlign: 'center',
                  pt: 4,
                  pb: 2
                }}>
                  <Box sx={{ 
                    color: getColorByType(card.color),
                    mb: 2
                  }}>
                    {card.icono}
                  </Box>
                  
                  <Typography variant="h5" component="h2" gutterBottom>
                    {card.titulo}
                  </Typography>
                  
                  <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
                    {card.descripcion}
                  </Typography>
                </CardContent>

                <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={() => navigate(card.ruta)}
                    sx={{ 
                      py: 1.5,
                      backgroundColor: getColorByType(card.color),
                      '&:hover': {
                        backgroundColor: getColorByType(card.color),
                        opacity: 0.9
                      }
                    }}
                  >
                    Acceder
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Estadísticas rápidas */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            Estadísticas del Sistema
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="estadistica-card">
                <div className="estadistica-valor">12</div>
                <div className="estadistica-label">Bancos Activos</div>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="estadistica-card">
                <div className="estadistica-valor">8</div>
                <div className="estadistica-label">Formularios Activos</div>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="estadistica-card">
                <div className="estadistica-valor">156</div>
                <div className="estadistica-label">Formularios Completados</div>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box className="estadistica-card">
                <div className="estadistica-valor">23</div>
                <div className="estadistica-label">Pendientes</div>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default AdminDashboard;

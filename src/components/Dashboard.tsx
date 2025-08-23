import React, { useState, useEffect } from 'react';
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
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Home as HomeIcon,
  Logout as LogoutIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Download as DownloadIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { format, addDays } from 'date-fns';
import { es } from 'date-fns/locale';
import toast from 'react-hot-toast';

interface Formulario {
  id: string;
  nombre: string;
  descripcion: string;
  fechaLimite: Date;
  completado: boolean;
  activo: boolean;
}

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [formularios, setFormularios] = useState<Formulario[]>([]);

  useEffect(() => {
    // Formularios basados en las hojas del Excel actualizado
    const mockFormularios: Formulario[] = [
      {
        id: '1',
        nombre: 'Apoyo - Corredores/Asset Management/Wealth Management',
        descripcion: 'Levantamiento de cargos de apoyo para corredores, asset management y wealth management',
        fechaLimite: addDays(new Date(), 15),
        completado: true,
        activo: true
      },
      {
        id: '2',
        nombre: 'Negociación Internacional y Comercio',
        descripcion: 'Formulario para cargos de negociación internacional y comercio',
        fechaLimite: addDays(new Date(), 8),
        completado: false,
        activo: true
      },
      {
        id: '3',
        nombre: 'BP Wealth Management',
        descripcion: 'Formulario específico para BP Wealth Management',
        fechaLimite: addDays(new Date(), 22),
        completado: true,
        activo: true
      },
      {
        id: '4',
        nombre: 'Corredora',
        descripcion: 'Formulario para cargos de corredora',
        fechaLimite: addDays(new Date(), 12),
        completado: true,
        activo: true
      },
      {
        id: '5',
        nombre: 'Asset Management',
        descripcion: 'Formulario para cargos de asset management',
        fechaLimite: addDays(new Date(), 18),
        completado: true,
        activo: true
      }
    ];
    setFormularios(mockFormularios);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.success('Sesión cerrada exitosamente');
  };

  const handleFormularioClick = (formulario: Formulario) => {
    if (formulario.completado) {
      toast('Este formulario ya está completado', { icon: 'ℹ️' });
      return;
    }
    navigate(`/formulario/${formulario.id}`);
  };

  const handleDownloadExcel = (formulario: Formulario, event: React.MouseEvent) => {
    event.stopPropagation();
    toast.success(`Descargando Excel del formulario: ${formulario.nombre}`);
    // Aquí iría la lógica real de descarga
  };

  const handleEditFormulario = (formulario: Formulario, event: React.MouseEvent) => {
    event.stopPropagation();
    if (formulario.completado) {
      toast.error('El administrador debe dar permiso para editar este formulario completado');
      return;
    }
    navigate(`/formulario/${formulario.id}`);
  };

  const getStatusColor = (formulario: Formulario) => {
    if (formulario.completado) return 'success';
    if (new Date() > formulario.fechaLimite) return 'error';
    return 'warning';
  };

  const getStatusText = (formulario: Formulario) => {
    if (formulario.completado) return 'Completado';
    if (new Date() > formulario.fechaLimite) return 'Vencido';
    return 'Pendiente';
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <div className="logo-container">
            <img src="/inquest logo.png" alt="Inquest Logo" />
          </div>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Inicio">
            <IconButton color="inherit" onClick={() => navigate('/dashboard')}>
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
            ¡Bienvenido, {user?.bankName}!
          </Typography>
          <Typography variant="h6">
            Aquí puedes gestionar todos los formularios asignados a tu institución
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {formularios.map((formulario) => (
            <Grid item xs={12} sm={6} md={4} key={formulario.id}>
              <Card 
                className={`formulario-card ${formulario.completado ? 'formulario-completado' : 'formulario-pendiente'}`}
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  cursor: formulario.completado ? 'default' : 'pointer'
                }}
                onClick={() => handleFormularioClick(formulario)}
              >
                <Chip
                  label={getStatusText(formulario)}
                  color={getStatusColor(formulario)}
                  className="status-badge"
                  size="small"
                />
                
                <CardContent sx={{ flexGrow: 1, pt: 4 }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {formulario.nombre}
                  </Typography>
                  
                  <Typography variant="body2" color="inherit" sx={{ mb: 2 }}>
                    {formulario.descripcion}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <ScheduleIcon fontSize="small" />
                    <Typography variant="body2" color="inherit">
                      Disponible hasta: {format(formulario.fechaLimite, 'dd/MM/yyyy', { locale: es })}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {formulario.completado ? (
                      <CheckCircleIcon color="inherit" />
                    ) : (
                      <AssignmentIcon color="inherit" />
                    )}
                    <Typography variant="body2" color="inherit">
                      {formulario.completado ? 'Formulario completado' : 'Pendiente de completar'}
                    </Typography>
                  </Box>
                </CardContent>

                <CardActions sx={{ flexDirection: 'column', gap: 1 }}>
                  <Button 
                    size="small" 
                    variant="outlined"
                    color="inherit"
                    fullWidth
                    disabled={formulario.completado}
                  >
                    {formulario.completado ? 'Ver Detalles' : 'Completar Formulario'}
                  </Button>
                  
                  <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
                    <Button
                      size="small"
                      variant="contained"
                      startIcon={<DownloadIcon />}
                      onClick={(e) => handleDownloadExcel(formulario, e)}
                      sx={{ flex: 1 }}
                      disabled={!formulario.completado}
                    >
                      Excel
                    </Button>
                    
                    <Button
                      size="small"
                      variant="contained"
                      color="secondary"
                      startIcon={<EditIcon />}
                      onClick={(e) => handleEditFormulario(formulario, e)}
                      sx={{ flex: 1 }}
                    >
                      Editar
                    </Button>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {formularios.length === 0 && (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h6" color="textSecondary">
              No hay formularios disponibles en este momento
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Dashboard;

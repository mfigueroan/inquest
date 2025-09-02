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
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import {
  Home as HomeIcon,
  Logout as LogoutIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Download as DownloadIcon,
  Edit as EditIcon,
  Email as EmailIcon
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
  editableByBanco: boolean;
}

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [formularios, setFormularios] = useState<Formulario[]>([]);
  const [modalSolicitudEdicion, setModalSolicitudEdicion] = useState(false);
  const [solicitudData, setSolicitudData] = useState({
    asunto: '',
    destinatario: 'admin@inquest.cl',
    motivo: ''
  });

  useEffect(() => {
    // Formularios basados en las hojas del Excel actualizado
    const mockFormularios: Formulario[] = [
      {
        id: '1',
        nombre: 'Apoyo - Corredores/Asset Management/Wealth Management',
        descripcion: 'Levantamiento de cargos de apoyo para corredores, asset management y wealth management',
        fechaLimite: addDays(new Date(), 15),
        completado: true,
        activo: true,
        editableByBanco: false
      },
      {
        id: '2',
        nombre: 'Negociación Internacional y Comercio',
        descripcion: 'Formulario para cargos de negociación internacional y comercio',
        fechaLimite: addDays(new Date(), 8),
        completado: true,
        activo: true,
        editableByBanco: false
      },
      {
        id: '3',
        nombre: 'BP Wealth Management',
        descripcion: 'Formulario específico para BP Wealth Management',
        fechaLimite: addDays(new Date(), 22),
        completado: true,
        activo: true,
        editableByBanco: false
      },
      {
        id: '4',
        nombre: 'Corredora',
        descripcion: 'Formulario para cargos de corredora',
        fechaLimite: addDays(new Date(), 12),
        completado: true,
        activo: true,
        editableByBanco: false
      },
      {
        id: '5',
        nombre: 'Asset Management',
        descripcion: 'Formulario para cargos de asset management',
        fechaLimite: addDays(new Date(), 18),
        completado: true,
        activo: true,
        editableByBanco: false
      }
    ];

    // Verificar formularios completados en localStorage
    const formulariosCompletados = JSON.parse(localStorage.getItem('formularios_completados') || '[]');
    
    // Verificar configuración de admin para permisos de edición
    const adminSettings = JSON.parse(localStorage.getItem('admin_form_settings') || '{}');
    
    const formulariosActualizados = mockFormularios.map(formulario => {
      const completado = formulariosCompletados.find((f: any) => f.id === formulario.id);
      const adminSetting = adminSettings[formulario.id];
      return {
        ...formulario,
        completado: completado ? true : formulario.completado,
        editableByBanco: adminSetting ? adminSetting.editableByBanco : formulario.editableByBanco
      };
    });

    setFormularios(formulariosActualizados);
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
    if (formulario.completado && !formulario.editableByBanco) {
      // Abrir modal de solicitud de edición
      setSolicitudData({
        asunto: `Solicitud de edición - ${formulario.nombre}`,
        destinatario: 'admin@inquest.cl',
        motivo: ''
      });
      setModalSolicitudEdicion(true);
      return;
    }
    navigate(`/formulario/${formulario.id}`);
  };

  const handleEnviarSolicitud = () => {
    if (!solicitudData.motivo.trim()) {
      toast.error('Por favor ingrese el motivo de la solicitud');
      return;
    }
    
    // Simular envío de solicitud
    console.log('Enviando solicitud:', solicitudData);
    toast.success('Solicitud de edición enviada al administrador');
    setModalSolicitudEdicion(false);
    setSolicitudData({ asunto: '', destinatario: 'admin@inquest.cl', motivo: '' });
  };

  const getEditButtonText = (formulario: Formulario) => {
    if (!formulario.completado) return 'Editar';
    if (formulario.editableByBanco) return 'Editar';
    return 'Solicitar Edición';
  };

  const getEditButtonColor = (formulario: Formulario) => {
    if (!formulario.completado) return 'secondary';
    if (formulario.editableByBanco) return 'warning';
    return 'primary';
  };

  const getStatusColor = (formulario: Formulario) => {
    if (formulario.completado && !formulario.editableByBanco) return 'success';
    if (formulario.completado && formulario.editableByBanco) return 'warning';
    if (new Date() > formulario.fechaLimite) return 'error';
    return 'warning';
  };

  const getStatusText = (formulario: Formulario) => {
    if (formulario.completado && !formulario.editableByBanco) return 'Completado';
    if (formulario.completado && formulario.editableByBanco) return 'Pendiente';
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
                className={`formulario-card ${(formulario.completado && !formulario.editableByBanco) ? 'formulario-completado' : 'formulario-pendiente'}`}
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  cursor: (formulario.completado && !formulario.editableByBanco) ? 'default' : 'pointer'
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
                      color={getEditButtonColor(formulario)}
                      startIcon={formulario.completado && !formulario.editableByBanco ? <EmailIcon /> : <EditIcon />}
                      onClick={(e) => handleEditFormulario(formulario, e)}
                      sx={{ flex: 1 }}
                    >
                      {getEditButtonText(formulario)}
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

        {/* Modal Solicitud de Edición */}
        <Dialog open={modalSolicitudEdicion} onClose={() => setModalSolicitudEdicion(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            Solicitar Permiso de Edición
          </DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Asunto"
                    value={solicitudData.asunto}
                    onChange={(e) => setSolicitudData({...solicitudData, asunto: e.target.value})}
                    variant="outlined"
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Destinatario"
                    value={solicitudData.destinatario}
                    onChange={(e) => setSolicitudData({...solicitudData, destinatario: e.target.value})}
                    variant="outlined"
                    type="email"
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Motivo de la solicitud"
                    value={solicitudData.motivo}
                    onChange={(e) => setSolicitudData({...solicitudData, motivo: e.target.value})}
                    variant="outlined"
                    multiline
                    rows={6}
                    placeholder="Por favor explique el motivo por el cual necesita editar este formulario completado..."
                    required
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setModalSolicitudEdicion(false)}>Cancelar</Button>
            <Button 
              onClick={handleEnviarSolicitud}
              variant="contained"
              color="primary"
              startIcon={<EmailIcon />}
            >
              Enviar Solicitud
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Dashboard;

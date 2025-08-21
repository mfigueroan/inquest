import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  Chip,
  AppBar,
  Toolbar,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  CardActions,
  Alert
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Save as SaveIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

interface Usuario {
  id: string;
  username: string;
  bankName: string;
  role: 'bank' | 'admin';
  isActive: boolean;
  email: string;
  fechaCreacion: string;
}

const GestionUsuarios: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    {
      id: '1',
      username: 'banco1',
      bankName: 'Banco de Chile',
      role: 'bank',
      isActive: true,
      email: 'admin@bancochile.cl',
      fechaCreacion: '2024-01-15'
    },
    {
      id: '2',
      username: 'banco2',
      bankName: 'Banco Santander',
      role: 'bank',
      isActive: true,
      email: 'admin@santander.cl',
      fechaCreacion: '2024-02-01'
    },
    {
      id: '3',
      username: 'banco3',
      bankName: 'Banco Estado',
      role: 'bank',
      isActive: false,
      email: 'admin@bancoestado.cl',
      fechaCreacion: '2024-01-20'
    }
  ]);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalCambiarPassword, setModalCambiarPassword] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);
  const [editando, setEditando] = useState<string | null>(null);
  
  // Estados para formularios
  const [nuevoUsuario, setNuevoUsuario] = useState({
    username: '',
    bankName: '',
    email: '',
    password: '',
    role: 'bank' as 'bank' | 'admin'
  });

  const [usuarioEditando, setUsuarioEditando] = useState({
    username: '',
    bankName: '',
    email: '',
    role: 'bank' as 'bank' | 'admin'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleToggleActivo = (usuarioId: string) => {
    setUsuarios(prev => prev.map(u => 
      u.id === usuarioId ? { ...u, isActive: !u.isActive } : u
    ));
    toast.success('Estado del usuario actualizado');
  };

  const handleAgregarUsuario = () => {
    if (!nuevoUsuario.username || !nuevoUsuario.bankName || !nuevoUsuario.password) {
      toast.error('Por favor complete todos los campos requeridos');
      return;
    }

    const nuevoUsuarioCompleto: Usuario = {
      id: Date.now().toString(),
      username: nuevoUsuario.username,
      bankName: nuevoUsuario.bankName,
      role: nuevoUsuario.role,
      isActive: true,
      email: nuevoUsuario.email,
      fechaCreacion: new Date().toISOString().split('T')[0]
    };

    setUsuarios(prev => [...prev, nuevoUsuarioCompleto]);
    setModalAbierto(false);
    setNuevoUsuario({
      username: '',
      bankName: '',
      email: '',
      password: '',
      role: 'bank'
    });
    toast.success('Usuario agregado exitosamente');
  };

  const handleEditarUsuario = () => {
    if (!usuarioSeleccionado) return;

    setUsuarios(prev => prev.map(u => 
      u.id === usuarioSeleccionado.id ? { ...u, ...usuarioEditando } : u
    ));
    setModalEditar(false);
    setUsuarioSeleccionado(null);
    toast.success('Usuario actualizado exitosamente');
  };

  const handleCambiarPassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setModalCambiarPassword(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    toast.success('Contraseña cambiada exitosamente');
  };

  const abrirModalEditar = (usuario: Usuario) => {
    setUsuarioSeleccionado(usuario);
    setUsuarioEditando({
      username: usuario.username,
      bankName: usuario.bankName,
      email: usuario.email,
      role: usuario.role
    });
    setModalEditar(true);
  };

  const abrirModalPassword = (usuario: Usuario) => {
    setUsuarioSeleccionado(usuario);
    setModalCambiarPassword(true);
  };

  const handleEliminarUsuario = (usuarioId: string) => {
    if (window.confirm('¿Está seguro de que desea eliminar este usuario?')) {
      setUsuarios(prev => prev.filter(u => u.id !== usuarioId));
      toast.success('Usuario eliminado exitosamente');
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" onClick={() => navigate('/admin')}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Gestión de Usuarios
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">
            Gestión de Usuarios Bancarios
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setModalAbierto(true)}
          >
            Agregar Usuario
          </Button>
        </Box>

        {/* Estadísticas */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h4" color="primary">
                  {usuarios.length}
                </Typography>
                <Typography color="textSecondary">
                  Total de Usuarios
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h4" color="success.main">
                  {usuarios.filter(u => u.isActive).length}
                </Typography>
                <Typography color="textSecondary">
                  Usuarios Activos
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h4" color="warning.main">
                  {usuarios.filter(u => !u.isActive).length}
                </Typography>
                <Typography color="textSecondary">
                  Usuarios Inactivos
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h4" color="secondary.main">
                  {usuarios.filter(u => u.role === 'bank').length}
                </Typography>
                <Typography color="textSecondary">
                  Usuarios Bancarios
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Tabla de usuarios */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Usuario</TableCell>
                <TableCell>Banco</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Rol</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Fecha Creación</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usuarios.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell>{usuario.username}</TableCell>
                  <TableCell>{usuario.bankName}</TableCell>
                  <TableCell>{usuario.email}</TableCell>
                  <TableCell>
                    <Chip 
                      label={usuario.role === 'admin' ? 'Administrador' : 'Banco'} 
                      color={usuario.role === 'admin' ? 'secondary' : 'primary'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={usuario.isActive}
                      onChange={() => handleToggleActivo(usuario.id)}
                      color="success"
                    />
                    <Chip 
                      label={usuario.isActive ? 'Activo' : 'Inactivo'} 
                      color={usuario.isActive ? 'success' : 'default'}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </TableCell>
                  <TableCell>{usuario.fechaCreacion}</TableCell>
                  <TableCell>
                    <div className="action-buttons">
                      <Tooltip title="Editar Usuario">
                        <IconButton
                          size="small"
                          onClick={() => abrirModalEditar(usuario)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Cambiar Contraseña">
                        <IconButton
                          size="small"
                          onClick={() => abrirModalPassword(usuario)}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar Usuario">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleEliminarUsuario(usuario.id)}
                          disabled={usuario.role === 'admin'}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Modal Agregar Usuario */}
        <Dialog open={modalAbierto} onClose={() => setModalAbierto(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Agregar Nuevo Usuario</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nombre de Usuario"
                  value={nuevoUsuario.username}
                  onChange={(e) => setNuevoUsuario({...nuevoUsuario, username: e.target.value})}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nombre del Banco"
                  value={nuevoUsuario.bankName}
                  onChange={(e) => setNuevoUsuario({...nuevoUsuario, bankName: e.target.value})}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={nuevoUsuario.email}
                  onChange={(e) => setNuevoUsuario({...nuevoUsuario, email: e.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Contraseña"
                  type="password"
                  value={nuevoUsuario.password}
                  onChange={(e) => setNuevoUsuario({...nuevoUsuario, password: e.target.value})}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Rol</InputLabel>
                  <Select
                    value={nuevoUsuario.role}
                    label="Rol"
                    onChange={(e) => setNuevoUsuario({...nuevoUsuario, role: e.target.value as 'bank' | 'admin'})}
                  >
                    <MenuItem value="bank">Banco</MenuItem>
                    <MenuItem value="admin">Administrador</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setModalAbierto(false)}>Cancelar</Button>
            <Button onClick={handleAgregarUsuario} variant="contained">
              Agregar Usuario
            </Button>
          </DialogActions>
        </Dialog>

        {/* Modal Editar Usuario */}
        <Dialog open={modalEditar} onClose={() => setModalEditar(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Editar Usuario</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nombre de Usuario"
                  value={usuarioEditando.username}
                  onChange={(e) => setUsuarioEditando({...usuarioEditando, username: e.target.value})}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nombre del Banco"
                  value={usuarioEditando.bankName}
                  onChange={(e) => setUsuarioEditando({...usuarioEditando, bankName: e.target.value})}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={usuarioEditando.email}
                  onChange={(e) => setUsuarioEditando({...usuarioEditando, email: e.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Rol</InputLabel>
                  <Select
                    value={usuarioEditando.role}
                    label="Rol"
                    onChange={(e) => setUsuarioEditando({...usuarioEditando, role: e.target.value as 'bank' | 'admin'})}
                  >
                    <MenuItem value="bank">Banco</MenuItem>
                    <MenuItem value="admin">Administrador</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setModalEditar(false)}>Cancelar</Button>
            <Button onClick={handleEditarUsuario} variant="contained">
              Guardar Cambios
            </Button>
          </DialogActions>
        </Dialog>

        {/* Modal Cambiar Contraseña */}
        <Dialog open={modalCambiarPassword} onClose={() => setModalCambiarPassword(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Cambiar Contraseña</DialogTitle>
          <DialogContent>
            <Alert severity="info" sx={{ mb: 2 }}>
              Cambiando contraseña para: {usuarioSeleccionado?.username}
            </Alert>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Contraseña Actual"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nueva Contraseña"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirmar Nueva Contraseña"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                  required
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setModalCambiarPassword(false)}>Cancelar</Button>
            <Button onClick={handleCambiarPassword} variant="contained">
              Cambiar Contraseña
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default GestionUsuarios;

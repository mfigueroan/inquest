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
  Alert,
  Checkbox,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Upload as UploadIcon,
  ExpandMore as ExpandMoreIcon,
  Description as DescriptionIcon,
  Settings as SettingsIcon,
  CloudUpload as CloudUploadIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

interface ColumnConfig {
  id: string;
  nombre: string;
  tipo: 'texto' | 'numero' | 'fecha' | 'genero';
  requerido: boolean;
  editable: boolean;
}

interface Formulario {
  id: string;
  nombre: string;
  descripcion: string;
  fechaCreacion: string;
  fechaLimite: string;
  activo: boolean;
  editableByBanco: boolean;
  columnas?: ColumnConfig[];
  asignaciones: {
    bancoId: string;
    bancoNombre: string;
    activo: boolean;
  }[];
}

const GestionFormularios: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [formularios, setFormularios] = useState<Formulario[]>([
    {
      id: '1',
      nombre: 'Apoyo - Corredores/Asset Management/Wealth Management',
      descripcion: 'Levantamiento de cargos de apoyo para corredores, asset management y wealth management',
      fechaCreacion: '2024-01-15',
      fechaLimite: '2024-12-31',
      activo: true,
      editableByBanco: false,
      asignaciones: [
        { bancoId: '1', bancoNombre: 'Banco de Chile', activo: true },
        { bancoId: '2', bancoNombre: 'Banco Santander', activo: true },
        { bancoId: '3', bancoNombre: 'Banco Estado', activo: false }
      ]
    },
    {
      id: '3',
      nombre: 'BP Wealth Management',
      descripcion: 'Formulario específico para BP Wealth Management',
      fechaCreacion: '2024-03-01',
      fechaLimite: '2024-10-31',
      activo: true,
      editableByBanco: false,
      asignaciones: [
        { bancoId: '1', bancoNombre: 'Banco de Chile', activo: true },
        { bancoId: '2', bancoNombre: 'Banco Santander', activo: true },
        { bancoId: '3', bancoNombre: 'Banco Estado', activo: false }
      ]
    },
    {
      id: '4',
      nombre: 'Corredora',
      descripcion: 'Formulario para cargos de corredora',
      fechaCreacion: '2024-04-01',
      fechaLimite: '2024-12-15',
      activo: true,
      editableByBanco: false,
      asignaciones: [
        { bancoId: '1', bancoNombre: 'Banco de Chile', activo: true },
        { bancoId: '2', bancoNombre: 'Banco Santander', activo: false },
        { bancoId: '3', bancoNombre: 'Banco Estado', activo: true }
      ]
    },
    {
      id: '5',
      nombre: 'Asset Management',
      descripcion: 'Formulario para cargos de asset management',
      fechaCreacion: '2024-05-01',
      fechaLimite: '2024-11-30',
      activo: true,
      editableByBanco: false,
      asignaciones: [
        { bancoId: '1', bancoNombre: 'Banco de Chile', activo: false },
        { bancoId: '2', bancoNombre: 'Banco Santander', activo: true },
        { bancoId: '3', bancoNombre: 'Banco Estado', activo: true }
      ]
    }
  ]);

  // Formulario oculto que se mostrará al cargar Excel
  const formularioNegociacion: Formulario = {
    id: '2',
    nombre: 'Negociación Internacional y Comercio',
    descripcion: 'Formulario para cargos de negociación internacional y comercio',
    fechaCreacion: '2024-02-01',
    fechaLimite: '2024-11-30',
    activo: true,
    editableByBanco: false,
    columnas: [
      { id: '1', nombre: 'COD. CARGO', tipo: 'texto', requerido: true, editable: false },
      { id: '2', nombre: 'NOMBRE GENÉRICO DEL CARGO', tipo: 'texto', requerido: true, editable: false },
      { id: '3', nombre: 'NIVEL DEL CARGO (HAY, MERCER O OGS)', tipo: 'texto', requerido: false, editable: true },
      { id: '4', nombre: '$ BONO ANUAL PAGADO EL 2025 POR EL DESEMPEÑO DEL 2024', tipo: 'numero', requerido: true, editable: true },
      { id: '5', nombre: 'INCENTIVOS TRIMESTRALES/ MENSUALES PAGADOS EL 2024', tipo: 'numero', requerido: true, editable: true },
      { id: '6', nombre: '$ TOTAL COMISIONES PAGADAS EL 2024', tipo: 'numero', requerido: false, editable: false },
      { id: '7', nombre: 'FECHA DE NACIMIENTO (dd/mm/aaaa)', tipo: 'fecha', requerido: false, editable: true },
      { id: '8', nombre: 'GÉNERO (Masculino o Femenino)', tipo: 'genero', requerido: false, editable: true }
    ],
    asignaciones: [
      { bancoId: '1', bancoNombre: 'Banco de Chile', activo: true },
      { bancoId: '2', bancoNombre: 'Banco Santander', activo: true },
      { bancoId: '3', bancoNombre: 'Banco Estado', activo: true }
    ]
  };

  const [modalNuevoFormulario, setModalNuevoFormulario] = useState(false);
  const [modalCargarExcel, setModalCargarExcel] = useState(false);
  const [modalAsignaciones, setModalAsignaciones] = useState(false);
  const [modalEstructuraFormulario, setModalEstructuraFormulario] = useState(false);
  const [formularioSeleccionado, setFormularioSeleccionado] = useState<Formulario | null>(null);
  
  // Estados para formularios
  const [nuevoFormulario, setNuevoFormulario] = useState({
    nombre: '',
    descripcion: '',
    fechaLimite: ''
  });

  const [archivoExcel, setArchivoExcel] = useState<File | null>(null);
  const [formularioRecienAgregado, setFormularioRecienAgregado] = useState<string | null>(null);

  const handleToggleFormulario = (formularioId: string) => {
    setFormularios(prev => prev.map(f => 
      f.id === formularioId ? { ...f, activo: !f.activo } : f
    ));
    toast.success('Estado del formulario actualizado');
  };

  const handleToggleAsignacion = (formularioId: string, bancoId: string) => {
    setFormularios(prev => prev.map(f => {
      if (f.id === formularioId) {
        return {
          ...f,
          asignaciones: f.asignaciones.map(a => 
            a.bancoId === bancoId ? { ...a, activo: !a.activo } : a
          )
        };
      }
      return f;
    }));
    toast.success('Asignación actualizada');
  };

  const handleAgregarFormulario = () => {
    if (!nuevoFormulario.nombre || !nuevoFormulario.descripcion || !nuevoFormulario.fechaLimite) {
      toast.error('Por favor complete todos los campos requeridos');
      return;
    }

    const nuevoFormularioCompleto: Formulario = {
      id: Date.now().toString(),
      nombre: nuevoFormulario.nombre,
      descripcion: nuevoFormulario.descripcion,
      fechaCreacion: new Date().toISOString().split('T')[0],
      fechaLimite: nuevoFormulario.fechaLimite,
      activo: true,
      editableByBanco: false,
      asignaciones: [
        { bancoId: '1', bancoNombre: 'Banco de Chile', activo: true },
        { bancoId: '2', bancoNombre: 'Banco Santander', activo: true },
        { bancoId: '3', bancoNombre: 'Banco Estado', activo: true }
      ]
    };

    setFormularios(prev => [...prev, nuevoFormularioCompleto]);
    setModalNuevoFormulario(false);
    setNuevoFormulario({
      nombre: '',
      descripcion: '',
      fechaLimite: ''
    });
    toast.success('Formulario agregado exitosamente');
  };

  const handleCargarExcel = () => {
    if (!archivoExcel) {
      toast.error('Por favor seleccione un archivo Excel');
      return;
    }

    // Simular la carga del formulario de Negociación Internacional
    const formularioExiste = formularios.some(f => f.id === '2');
    if (!formularioExiste) {
      setFormularios(prev => {
        // Insertar el formulario en la posición correcta (después del primero)
        const nuevaLista = [...prev];
        nuevaLista.splice(1, 0, formularioNegociacion);
        return nuevaLista;
      });
      setFormularioRecienAgregado('2');
      // Quitar el highlight después de 3 segundos
      setTimeout(() => setFormularioRecienAgregado(null), 3000);
      toast.success('Formulario "Negociación Internacional y Comercio" cargado exitosamente desde Excel');
    } else {
      toast('El formulario ya existe en el sistema', { icon: 'ℹ️' });
    }
    
    setModalCargarExcel(false);
    setArchivoExcel(null);
  };

  const handleEliminarFormulario = (formularioId: string) => {
    if (window.confirm('¿Está seguro de que desea eliminar este formulario?')) {
      setFormularios(prev => prev.filter(f => f.id !== formularioId));
      toast.success('Formulario eliminado exitosamente');
    }
  };

  const abrirModalAsignaciones = (formulario: Formulario) => {
    setFormularioSeleccionado(formulario);
    setModalAsignaciones(true);
  };

  const abrirModalEstructura = (formulario: Formulario) => {
    setFormularioSeleccionado(formulario);
    setModalEstructuraFormulario(true);
  };

  const handleToggleEditableByBanco = (formularioId: string) => {
    setFormularios(prev => {
      const updated = prev.map(f => 
        f.id === formularioId ? { ...f, editableByBanco: !f.editableByBanco } : f
      );
      
      // Guardar configuración en localStorage para que la lean los bancos
      const adminSettings = JSON.parse(localStorage.getItem('admin_form_settings') || '{}');
      const formulario = updated.find(f => f.id === formularioId);
      if (formulario) {
        adminSettings[formularioId] = {
          editableByBanco: formulario.editableByBanco,
          lastUpdated: new Date().toISOString()
        };
        localStorage.setItem('admin_form_settings', JSON.stringify(adminSettings));
      }
      
      return updated;
    });
    toast.success('Permisos de edición actualizados');
  };

  const handleUpdateColumnConfig = (columnId: string, field: keyof ColumnConfig, value: any) => {
    if (!formularioSeleccionado) return;
    
    const updatedFormulario = {
      ...formularioSeleccionado,
      columnas: formularioSeleccionado.columnas?.map(col => 
        col.id === columnId ? { ...col, [field]: value } : col
      ) || []
    };
    
    setFormularioSeleccionado(updatedFormulario);
    setFormularios(prev => prev.map(f => 
      f.id === formularioSeleccionado.id ? updatedFormulario : f
    ));
  };

  const handleArchivoSeleccionado = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      setArchivoExcel(file);
    } else {
      toast.error('Por favor seleccione un archivo Excel válido (.xlsx)');
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
            Gestión de Formularios
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">
            Gestión de Formularios
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              onClick={() => setModalCargarExcel(true)}
            >
              Cargar Excel
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setModalNuevoFormulario(true)}
            >
              Nuevo Formulario
            </Button>
          </Box>
        </Box>

        {/* Estadísticas */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h4" color="primary">
                  {formularios.length}
                </Typography>
                <Typography color="textSecondary">
                  Total de Formularios
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h4" color="success.main">
                  {formularios.filter(f => f.activo).length}
                </Typography>
                <Typography color="textSecondary">
                  Formularios Activos
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h4" color="warning.main">
                  {formularios.filter(f => !f.activo).length}
                </Typography>
                <Typography color="textSecondary">
                  Formularios Inactivos
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h4" color="info.main">
                  {formularios.reduce((total, f) => total + f.asignaciones.filter(a => a.activo).length, 0)}
                </Typography>
                <Typography color="textSecondary">
                  Asignaciones Activas
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Lista de formularios */}
        <Grid container spacing={3}>
          {formularios.map((formulario) => (
            <Grid item xs={12} md={6} key={formulario.id}>
              <Card
                sx={{
                  backgroundColor: formularioRecienAgregado === formulario.id ? '#e8f5e8' : 'inherit',
                  border: formularioRecienAgregado === formulario.id ? '2px solid #4caf50' : 'inherit',
                  transition: 'all 0.3s ease'
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" component="h2">
                      {formulario.nombre}
                    </Typography>
                    <Chip 
                      label={formulario.activo ? 'Activo' : 'Inactivo'} 
                      color={formulario.activo ? 'success' : 'default'}
                      size="small"
                    />
                  </Box>
                  
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    {formulario.descripcion}
                  </Typography>

                                     <Grid container spacing={2} sx={{ mb: 2 }}>
                     <Grid item xs={6}>
                       <Typography variant="body2" color="textSecondary">
                         <strong>Creado:</strong> {formulario.fechaCreacion}
                       </Typography>
                     </Grid>
                     <Grid item xs={6}>
                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                         <Typography variant="body2" color="textSecondary">
                           <strong>Límite:</strong>
                         </Typography>
                         <TextField
                           type="date"
                           size="small"
                           value={formulario.fechaLimite}
                           onChange={(e) => {
                             setFormularios(prev => prev.map(f => 
                               f.id === formulario.id ? { ...f, fechaLimite: e.target.value } : f
                             ));
                           }}
                           sx={{ width: '140px' }}
                         />
                       </Box>
                     </Grid>
                   </Grid>

                                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                     <Typography variant="body2" color="textSecondary">
                       Estado del Formulario
                     </Typography>
                     <Switch
                       checked={formulario.activo}
                       onChange={() => handleToggleFormulario(formulario.id)}
                       color="success"
                     />
                   </Box>
                </CardContent>

                <CardActions>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<SettingsIcon />}
                        onClick={() => abrirModalAsignaciones(formulario)}
                        fullWidth
                      >
                        Gestionar Asignaciones
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        size="small"
                        variant={formulario.editableByBanco ? "contained" : "outlined"}
                        color={formulario.editableByBanco ? "success" : "primary"}
                        startIcon={<EditIcon />}
                        onClick={() => handleToggleEditableByBanco(formulario.id)}
                        fullWidth
                      >
                        {formulario.editableByBanco ? 'Edición Permitida' : 'Permitir Editar'}
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<DescriptionIcon />}
                        onClick={() => abrirModalEstructura(formulario)}
                        fullWidth
                      >
                        Estructura
                      </Button>
                    </Grid>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Modal Nuevo Formulario */}
        <Dialog open={modalNuevoFormulario} onClose={() => setModalNuevoFormulario(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Crear Nuevo Formulario</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nombre del Formulario"
                  value={nuevoFormulario.nombre}
                  onChange={(e) => setNuevoFormulario({...nuevoFormulario, nombre: e.target.value})}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Descripción"
                  multiline
                  rows={3}
                  value={nuevoFormulario.descripcion}
                  onChange={(e) => setNuevoFormulario({...nuevoFormulario, descripcion: e.target.value})}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Fecha Límite"
                  type="date"
                  value={nuevoFormulario.fechaLimite}
                  onChange={(e) => setNuevoFormulario({...nuevoFormulario, fechaLimite: e.target.value})}
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setModalNuevoFormulario(false)}>Cancelar</Button>
            <Button onClick={handleAgregarFormulario} variant="contained">
              Crear Formulario
            </Button>
          </DialogActions>
        </Dialog>

        {/* Modal Cargar Excel */}
        <Dialog open={modalCargarExcel} onClose={() => setModalCargarExcel(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Cargar Formulario desde Excel</DialogTitle>
          <DialogContent>
            <Alert severity="info" sx={{ mb: 2 }}>
              Seleccione un archivo Excel (.xlsx) para crear un nuevo formulario
            </Alert>
            <Box sx={{ textAlign: 'center', py: 3 }}>
              <input
                accept=".xlsx,.xls"
                style={{ display: 'none' }}
                id="excel-file-input"
                type="file"
                onChange={handleArchivoSeleccionado}
              />
              <label htmlFor="excel-file-input">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<UploadIcon />}
                  size="large"
                >
                  Seleccionar Archivo Excel
                </Button>
              </label>
              {archivoExcel && (
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Archivo seleccionado: {archivoExcel.name}
                </Typography>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setModalCargarExcel(false)}>Cancelar</Button>
            <Button 
              onClick={handleCargarExcel} 
              variant="contained"
              disabled={!archivoExcel}
            >
              Cargar Formulario
            </Button>
          </DialogActions>
        </Dialog>

        {/* Modal Gestionar Asignaciones */}
        <Dialog open={modalAsignaciones} onClose={() => setModalAsignaciones(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            Gestionar Asignaciones - {formularioSeleccionado?.nombre}
          </DialogTitle>
          <DialogContent>
            {formularioSeleccionado && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Asignaciones por Banco
                </Typography>
                <Grid container spacing={2}>
                  {formularioSeleccionado.asignaciones.map((asignacion) => (
                    <Grid item xs={12} key={asignacion.bancoId}>
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        p: 2,
                        border: '1px solid #e0e0e0',
                        borderRadius: 1
                      }}>
                        <Typography variant="body1">
                          {asignacion.bancoNombre}
                        </Typography>
                        <Switch
                          checked={asignacion.activo}
                          onChange={() => handleToggleAsignacion(formularioSeleccionado.id, asignacion.bancoId)}
                          color="success"
                        />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setModalAsignaciones(false)}>Cerrar</Button>
          </DialogActions>
        </Dialog>

        {/* Modal Estructura del Formulario */}
        <Dialog open={modalEstructuraFormulario} onClose={() => setModalEstructuraFormulario(false)} maxWidth="lg" fullWidth>
          <DialogTitle>
            Estructura del Formulario - {formularioSeleccionado?.nombre}
          </DialogTitle>
          <DialogContent>
            {formularioSeleccionado && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Columnas y Tipos de Datos
                </Typography>
                {formularioSeleccionado.columnas && formularioSeleccionado.columnas.length > 0 ? (
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell><strong>Columna</strong></TableCell>
                          <TableCell><strong>Tipo de Dato</strong></TableCell>
                          <TableCell><strong>Requerido</strong></TableCell>
                          <TableCell><strong>Editable</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {formularioSeleccionado.columnas.map((columna) => (
                          <TableRow key={columna.id}>
                            <TableCell>
                              <Typography variant="body2">
                                {columna.nombre}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <FormControl size="small" sx={{ minWidth: 120 }}>
                                <Select
                                  value={columna.tipo}
                                  onChange={(e) => handleUpdateColumnConfig(columna.id, 'tipo', e.target.value)}
                                >
                                  <MenuItem value="texto">texto</MenuItem>
                                  <MenuItem value="numero">número</MenuItem>
                                  <MenuItem value="fecha">fecha</MenuItem>
                                  <MenuItem value="genero">género</MenuItem>
                                </Select>
                              </FormControl>
                            </TableCell>
                            <TableCell>
                              <Checkbox
                                checked={columna.requerido}
                                onChange={(e) => handleUpdateColumnConfig(columna.id, 'requerido', e.target.checked)}
                                color="error"
                              />
                            </TableCell>
                            <TableCell>
                              <Checkbox
                                checked={columna.editable}
                                onChange={(e) => handleUpdateColumnConfig(columna.id, 'editable', e.target.checked)}
                                color="success"
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Alert severity="info">
                    Este formulario no tiene columnas configuradas. Las columnas se cargan automáticamente cuando se importa un archivo Excel.
                  </Alert>
                )}
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setModalEstructuraFormulario(false)}>Cerrar</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default GestionFormularios;

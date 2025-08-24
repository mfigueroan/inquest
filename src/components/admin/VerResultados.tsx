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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Download as DownloadIcon,
  FilterList as FilterIcon,
  Assessment as AssessmentIcon,
  TableChart as TableChartIcon,
  Visibility as VisibilityIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

interface FormularioResultado {
  id: string;
  banco: string;
  formulario: string;
  fechaCompletado: string;
  estado: 'completado' | 'pendiente' | 'vencido';
  datos: any;
  comentarios?: { [key: string]: string };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const VerResultados: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [filtroBanco, setFiltroBanco] = useState('');
  const [filtroFormulario, setFiltroFormulario] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [formularioSeleccionado, setFormularioSeleccionado] = useState<any>(null);
  const [comentarios, setComentarios] = useState<{ [key: string]: string }>({});

  const [resultados] = useState<FormularioResultado[]>([
    {
      id: '1',
      banco: 'Banco de Chile',
      formulario: 'Apoyo - Corredores/Asset Management/Wealth Management',
      fechaCompletado: '2024-12-01',
      estado: 'completado',
      datos: { 
        'AP-010': 'GERENTE DE DIVISIÓN OPERACIONES Y TECNOLOGÍA',
        'AP-020': 'GERENTE OPERACIONES AM',
        'AP-021': 'SUBGERENTE /JEFE DE OPERACIONES AM',
        'Valor 1': '1836552',
        'Valor 2': '2.722493',
        'Valor 3': '5000000'
      }
    },
    {
      id: '2',
      banco: 'Banco Santander',
      formulario: 'Negociación Internacional y Comercio',
      fechaCompletado: '2024-11-28',
      estado: 'completado',
      datos: { 
        'W-01': 'GERENTE BANCA MAYORISTA',
        'F-00': 'GERENTE DIVISIÓN TESORERÍA / GERENTE DIVISIÓN MERCADO DE CAPITALES',
        'F-01': 'GERENTE ÁREA DISTRIBUCIÓN (SALES)',
        'Valor 1': '89458948',
        'Valor 2': '89458948',
        'Valor 3': '89458948'
      }
    },
    {
      id: '3',
      banco: 'Banco de Chile',
      formulario: 'BP Wealth Management',
      fechaCompletado: '',
      estado: 'pendiente',
      datos: {}
    }
  ]);

  const bancos = ['Todos', 'Banco de Chile', 'Banco Santander', 'Banco Estado'];
  const formularios = ['Todos', 'Apoyo - Corredores/Asset Management/Wealth Management', 'Negociación Internacional y Comercio', 'BP Wealth Management', 'Corredora', 'Asset Management'];
  const estados = ['Todos', 'completado', 'pendiente', 'vencido'];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const filtrarResultados = () => {
    return resultados.filter(resultado => {
      const cumpleBanco = filtroBanco === 'Todos' || resultado.banco === filtroBanco;
      const cumpleFormulario = filtroFormulario === 'Todos' || resultado.formulario === filtroFormulario;
      const cumpleEstado = filtroEstado === 'Todos' || resultado.estado === filtroEstado;
      
      return cumpleBanco && cumpleFormulario && cumpleEstado;
    });
  };

  const handleDescargarExcel = (tipo: 'individual' | 'consolidado', id?: string) => {
    if (tipo === 'individual' && id) {
      toast.success(`Descargando formulario ${id} en Excel...`);
    } else {
      toast.success('Descargando consolidado en Excel...');
    }
    // Aquí iría la lógica real de descarga
  };

  const handleEnviarNotificacion = (resultado: FormularioResultado) => {
    toast.success(`Enviando notificación de comentarios para ${resultado.formulario} - ${resultado.banco}`);
    // Aquí iría la lógica real de envío de notificación
  };

  const handleVisualizarFormulario = (resultado: FormularioResultado) => {
    setFormularioSeleccionado(resultado);
    setMostrarFormulario(true);
    // Inicializar comentarios si no existen
    if (!resultado.comentarios) {
      setComentarios({});
    } else {
      setComentarios(resultado.comentarios);
    }
  };

  const handleComentarioChange = (filaId: string, comentario: string) => {
    setComentarios(prev => ({
      ...prev,
      [filaId]: comentario
    }));
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'completado': return 'success';
      case 'pendiente': return 'warning';
      case 'vencido': return 'error';
      default: return 'default';
    }
  };

  const resultadosFiltrados = filtrarResultados();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" onClick={() => navigate('/admin')}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Ver Resultados
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Resultados de Formularios
        </Typography>

        {/* Filtros */}
        <Paper className="filtros-container">
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            <FilterIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Filtros
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Banco</InputLabel>
                <Select
                  value={filtroBanco}
                  label="Banco"
                  onChange={(e) => setFiltroBanco(e.target.value)}
                >
                  {bancos.map((banco) => (
                    <MenuItem key={banco} value={banco}>
                      {banco}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Formulario</InputLabel>
                <Select
                  value={filtroFormulario}
                  label="Formulario"
                  onChange={(e) => setFiltroFormulario(e.target.value)}
                >
                  {formularios.map((formulario) => (
                    <MenuItem key={formulario} value={formulario}>
                      {formulario}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Estado</InputLabel>
                <Select
                  value={filtroEstado}
                  label="Estado"
                  onChange={(e) => setFiltroEstado(e.target.value)}
                >
                  {estados.map((estado) => (
                    <MenuItem key={estado} value={estado}>
                      {estado === 'Todos' ? 'Todos' : estado.charAt(0).toUpperCase() + estado.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => {
                  setFiltroBanco('');
                  setFiltroFormulario('');
                  setFiltroEstado('');
                }}
                sx={{ height: '56px' }}
              >
                Limpiar Filtros
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Tabs para diferentes vistas */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="vistas de resultados">
            <Tab 
              label="Vista por Formulario" 
              icon={<TableChartIcon />} 
              iconPosition="start"
            />
            <Tab 
              label="Vista Consolidada" 
              icon={<AssessmentIcon />} 
              iconPosition="start"
            />
          </Tabs>
        </Box>

        {/* Tab Panel: Vista por Formulario */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              Resultados por Formulario ({resultadosFiltrados.length})
            </Typography>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={() => handleDescargarExcel('consolidado')}
            >
              Descargar Consolidado
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Banco</TableCell>
                  <TableCell>Formulario</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Fecha Completado</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {resultadosFiltrados.map((resultado) => (
                  <TableRow key={resultado.id}>
                    <TableCell>{resultado.banco}</TableCell>
                    <TableCell>{resultado.formulario}</TableCell>
                    <TableCell>
                      <Chip 
                        label={resultado.estado.charAt(0).toUpperCase() + resultado.estado.slice(1)}
                        color={getEstadoColor(resultado.estado) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {resultado.fechaCompletado || '-'}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<VisibilityIcon />}
                          onClick={() => handleVisualizarFormulario(resultado)}
                          color="info"
                        >
                          Visualizar
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<DownloadIcon />}
                          onClick={() => handleDescargarExcel('individual', resultado.id)}
                          disabled={resultado.estado !== 'completado'}
                        >
                          Descargar
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Tab Panel: Vista Consolidada */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              Vista Consolidada - Formulario NEG. IC
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => {
                  // Aquí se guardarían los comentarios en la base de datos
                  toast.success('Comentarios guardados exitosamente');
                }}
              >
                Guardar Comentarios
              </Button>
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={() => handleDescargarExcel('consolidado')}
              >
                Descargar Excel Consolidado
              </Button>
            </Box>
          </Box>

          {/* Tabla consolidada del formulario NEG. IC */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Banco</strong></TableCell>
                  <TableCell><strong>Código</strong></TableCell>
                  <TableCell><strong>Descripción</strong></TableCell>
                  <TableCell><strong>Valor 1</strong></TableCell>
                  <TableCell><strong>Valor 2</strong></TableCell>
                  <TableCell><strong>Valor 3</strong></TableCell>
                  <TableCell><strong>Valor 4</strong></TableCell>
                  <TableCell><strong>Valor 5</strong></TableCell>
                  <TableCell><strong>Valor 6</strong></TableCell>
                  <TableCell><strong>Valor 7</strong></TableCell>
                  <TableCell><strong>Valor 8</strong></TableCell>
                  <TableCell><strong>Estado</strong></TableCell>
                  <TableCell><strong>Comentario</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Ejemplo de datos del formulario NEG. IC */}
                <TableRow>
                  <TableCell>Banco de Chile</TableCell>
                  <TableCell>W-01</TableCell>
                  <TableCell>GERENTE BANCA MAYORISTA</TableCell>
                  <TableCell>1836552</TableCell>
                  <TableCell>2.722493</TableCell>
                  <TableCell>5000000</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>89458948</TableCell>
                  <TableCell>89458948</TableCell>
                  <TableCell>89458948</TableCell>
                  <TableCell>89458948</TableCell>
                  <TableCell>
                    <Chip label="Listo" color="success" size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      placeholder="Agregar comentario..."
                      value={comentarios['W-01'] || ''}
                      onChange={(e) => handleComentarioChange('W-01', e.target.value)}
                      fullWidth
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Banco Santander</TableCell>
                  <TableCell>F-00</TableCell>
                  <TableCell>GERENTE DIVISIÓN TESORERÍA / GERENTE DIVISIÓN MERCADO DE CAPITALES</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>0</TableCell>
                  <TableCell>0</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>
                    <Chip label="Listo" color="success" size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      placeholder="Agregar comentario..."
                      value={comentarios['F-00'] || ''}
                      onChange={(e) => handleComentarioChange('F-00', e.target.value)}
                      fullWidth
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Banco Estado</TableCell>
                  <TableCell>F-01</TableCell>
                  <TableCell>GERENTE ÁREA DISTRIBUCIÓN (SALES)</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>
                    <Chip label="EDITAR" color="warning" size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      placeholder="Agregar comentario..."
                      value={comentarios['F-01'] || ''}
                      onChange={(e) => handleComentarioChange('F-01', e.target.value)}
                      fullWidth
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {resultadosFiltrados.length === 0 && (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h6" color="textSecondary">
              No se encontraron resultados con los filtros aplicados
            </Typography>
          </Box>
        )}

        {/* Modal para visualizar formulario */}
        <Dialog 
          open={mostrarFormulario} 
          onClose={() => setMostrarFormulario(false)}
          maxWidth="xl"
          fullWidth
        >
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              Visualizar Formulario: {formularioSeleccionado?.formulario}
            </Typography>
          </DialogTitle>
          <DialogContent>
            {formularioSeleccionado && (
              <Box sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" gutterBottom>
                      <strong>Banco:</strong> {formularioSeleccionado.banco}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" gutterBottom>
                      <strong>Estado:</strong> 
                      <Chip 
                        label={formularioSeleccionado.estado.charAt(0).toUpperCase() + formularioSeleccionado.estado.slice(1)}
                        color={getEstadoColor(formularioSeleccionado.estado) as any}
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" gutterBottom>
                      <strong>Fecha de Completado:</strong> {formularioSeleccionado.fechaCompletado || 'Pendiente'}
                    </Typography>
                  </Grid>
                </Grid>
                
                <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                  Datos del Formulario
                </Typography>
                
                                 {/* Mostrar todas las columnas del formulario */}
                 <TableContainer component={Paper}>
                   <Table>
                     <TableHead>
                       <TableRow>
                         <TableCell><strong>Código</strong></TableCell>
                         <TableCell><strong>Descripción</strong></TableCell>
                         <TableCell><strong>Valor 1</strong></TableCell>
                         <TableCell><strong>Valor 2</strong></TableCell>
                         <TableCell><strong>Valor 3</strong></TableCell>
                         <TableCell><strong>Valor 4</strong></TableCell>
                         <TableCell><strong>Valor 5</strong></TableCell>
                         <TableCell><strong>Valor 6</strong></TableCell>
                         <TableCell><strong>Valor 7</strong></TableCell>
                         <TableCell><strong>Valor 8</strong></TableCell>
                         <TableCell><strong>Estado</strong></TableCell>
                         <TableCell><strong>Comentario</strong></TableCell>
                       </TableRow>
                     </TableHead>
                     <TableBody>
                       <TableRow>
                         <TableCell>W-01</TableCell>
                         <TableCell>GERENTE BANCA MAYORISTA</TableCell>
                         <TableCell>1836552</TableCell>
                         <TableCell>2.722493</TableCell>
                         <TableCell>5000000</TableCell>
                         <TableCell>-</TableCell>
                         <TableCell>89458948</TableCell>
                         <TableCell>89458948</TableCell>
                         <TableCell>89458948</TableCell>
                         <TableCell>89458948</TableCell>
                         <TableCell>
                           <Chip label="Listo" color="success" size="small" />
                         </TableCell>
                         <TableCell>
                           <TextField
                             size="small"
                             placeholder="Agregar comentario..."
                             value={comentarios['W-01'] || ''}
                             onChange={(e) => handleComentarioChange('W-01', e.target.value)}
                             fullWidth
                           />
                         </TableCell>
                       </TableRow>
                       <TableRow>
                         <TableCell>F-00</TableCell>
                         <TableCell>GERENTE DIVISIÓN TESORERÍA / GERENTE DIVISIÓN MERCADO DE CAPITALES</TableCell>
                         <TableCell>-</TableCell>
                         <TableCell>-</TableCell>
                         <TableCell>-</TableCell>
                         <TableCell>-</TableCell>
                         <TableCell>0</TableCell>
                         <TableCell>0</TableCell>
                         <TableCell>-</TableCell>
                         <TableCell>-</TableCell>
                         <TableCell>
                           <Chip label="Listo" color="success" size="small" />
                         </TableCell>
                         <TableCell>
                           <TextField
                             size="small"
                             placeholder="Agregar comentario..."
                             value={comentarios['F-00'] || ''}
                             onChange={(e) => handleComentarioChange('F-00', e.target.value)}
                             fullWidth
                           />
                         </TableCell>
                       </TableRow>
                       <TableRow>
                         <TableCell>F-01</TableCell>
                         <TableCell>GERENTE ÁREA DISTRIBUCIÓN (SALES)</TableCell>
                         <TableCell>-</TableCell>
                         <TableCell>-</TableCell>
                         <TableCell>-</TableCell>
                         <TableCell>-</TableCell>
                         <TableCell>-</TableCell>
                         <TableCell>-</TableCell>
                         <TableCell>-</TableCell>
                         <TableCell>-</TableCell>
                         <TableCell>
                           <Chip label="EDITAR" color="warning" size="small" />
                         </TableCell>
                         <TableCell>
                           <TextField
                             size="small"
                             placeholder="Agregar comentario..."
                             value={comentarios['F-01'] || ''}
                             onChange={(e) => handleComentarioChange('F-01', e.target.value)}
                             fullWidth
                           />
                         </TableCell>
                       </TableRow>
                     </TableBody>
                   </Table>
                 </TableContainer>
              </Box>
            )}
          </DialogContent>
                     <DialogActions>
             <Button onClick={() => setMostrarFormulario(false)}>Cerrar</Button>
             <Button 
               variant="outlined"
               onClick={() => {
                 // Aquí se guardarían los comentarios en la base de datos
                 toast.success('Comentarios guardados exitosamente');
               }}
             >
               Guardar Comentarios
             </Button>
             <Button 
               variant="contained"
               startIcon={<DownloadIcon />}
               onClick={() => {
                 handleDescargarExcel('individual', formularioSeleccionado?.id);
                 setMostrarFormulario(false);
               }}
               disabled={formularioSeleccionado?.estado !== 'completado'}
             >
               Descargar Excel
             </Button>
           </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default VerResultados;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  Alert,
  Chip,
  AppBar,
  Toolbar,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
  Send as SendIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Info as InfoIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

interface Columna {
  nombre: string;
  tipo: 'texto' | 'numero' | 'fecha' | 'decimal';
  requerido: boolean;
  editable: boolean;
}

interface Fila {
  id: string;
  datos: { [key: string]: string | number };
}

const Formulario: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [columnas, setColumnas] = useState<Columna[]>([]);
  const [filas, setFilas] = useState<Fila[]>([]);
  const [nombreFormulario, setNombreFormulario] = useState('');

  useEffect(() => {
    // Configurar el formulario según el ID (hoja del Excel)
    const configurarFormulario = () => {
      // Solo mantenemos NEG. IC como ejemplo
      setNombreFormulario('Negociación Internacional y Comercio');
      setColumnas([
        { nombre: 'Código', tipo: 'texto', requerido: true, editable: false },
        { nombre: 'Descripción', tipo: 'texto', requerido: true, editable: false },
        { nombre: 'Valor 1', tipo: 'numero', requerido: false, editable: true },
        { nombre: 'Valor 2', tipo: 'numero', requerido: false, editable: true },
        { nombre: 'Valor 3', tipo: 'numero', requerido: false, editable: true },
        { nombre: 'Valor 4', tipo: 'numero', requerido: false, editable: true },
        { nombre: 'Valor 5', tipo: 'numero', requerido: false, editable: true },
        { nombre: 'Valor 6', tipo: 'numero', requerido: false, editable: true },
        { nombre: 'Valor 7', tipo: 'numero', requerido: false, editable: true },
        { nombre: 'Valor 8', tipo: 'numero', requerido: false, editable: true },
        { nombre: 'Estado', tipo: 'texto', requerido: true, editable: true },
        { nombre: 'Acción', tipo: 'texto', requerido: false, editable: false }
      ]);
      setFilas([
        { id: '1', datos: { 'Código': 'W-01', 'Descripción': 'GERENTE BANCA MAYORISTA', 'Valor 1': '1836552', 'Valor 2': '2.722493', 'Valor 3': '5000000', 'Valor 4': '', 'Valor 5': '89458948', 'Valor 6': '89458948', 'Valor 7': '89458948', 'Valor 8': '89458948', 'Estado': 'Listo', 'Acción': 'Agregar registro a la categoría' } },
        { id: '2', datos: { 'Código': 'F-00', 'Descripción': 'GERENTE DIVISIÓN TESORERÍA / GERENTE DIVISIÓN MERCADO DE CAPITALES', 'Valor 1': '', 'Valor 2': '', 'Valor 3': '', 'Valor 4': '', 'Valor 5': '0', 'Valor 6': '0', 'Valor 7': '', 'Valor 8': '', 'Estado': 'Listo', 'Acción': 'Agregar registro a la categoría' } },
        { id: '3', datos: { 'Código': 'F-01', 'Descripción': 'GERENTE ÁREA DISTRIBUCIÓN (SALES)', 'Valor 1': '', 'Valor 2': '', 'Valor 3': '', 'Valor 4': '', 'Valor 5': '', 'Valor 6': '', 'Valor 7': '', 'Valor 8': '', 'Estado': 'EDITAR', 'Acción': 'Agregar registro a la categoría' } }
      ]);
    };

    configurarFormulario();
  }, [id]);

  const [editando, setEditando] = useState<string | null>(null);
  const [modalCategorias, setModalCategorias] = useState(false);
  const [modalEnviar, setModalEnviar] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | 'warning' }>({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleEdit = (filaId: string) => {
    setEditando(filaId);
  };

  const handleAdd = (filaId: string) => {
    const filaOriginal = filas.find(f => f.id === filaId);
    if (filaOriginal) {
      const nuevaFila: Fila = {
        id: Date.now().toString(),
        datos: { ...filaOriginal.datos }
      };
      setFilas(prev => {
        const index = prev.findIndex(f => f.id === filaId);
        const nuevasFilas = [...prev];
        nuevasFilas.splice(index + 1, 0, nuevaFila);
        return nuevasFilas;
      });
    }
  };

  const handleSave = () => {
    setEditando(null);
    toast.success('Progreso guardado exitosamente');
  };

  const handleInputChange = (filaId: string, columna: string, valor: string) => {
    setFilas(prev => prev.map(fila => {
      if (fila.id === filaId) {
        return {
          ...fila,
          datos: {
            ...fila.datos,
            [columna]: valor
          }
        };
      }
      return fila;
    }));
  };

  const handleEnviar = () => {
    const camposFaltantes = verificarCamposFaltantes();
    if (camposFaltantes.length > 0) {
      setSnackbar({
        open: true,
        message: `Campos faltantes: ${camposFaltantes.join(', ')}`,
        severity: 'error'
      });
      return;
    }
    setModalEnviar(true);
  };

  const confirmarEnvio = () => {
    setModalEnviar(false);
    toast.success('Formulario enviado exitosamente');
    navigate('/dashboard');
  };

  const verificarCamposFaltantes = (): string[] => {
    const faltantes: string[] = [];
    filas.forEach(fila => {
      columnas.forEach(columna => {
        if (columna.requerido && columna.editable) {
          const valor = fila.datos[columna.nombre];
          if (!valor || valor === '') {
            faltantes.push(`${columna.nombre} (fila ${fila.id})`);
          }
        }
      });
    });
    return faltantes;
  };

  const validarValor = (valor: string, tipo: string): boolean => {
    if (tipo === 'numero' || tipo === 'decimal') {
      if (valor === '') return false;
      if (valor === '-') return false;
      if (valor === '0') {
        setSnackbar({
          open: true,
          message: 'El ingreso de 0 puede afectar negativamente los resultados, si desconoce el valor seleccione NA',
          severity: 'warning'
        });
      }
    }
    return true;
  };

  const renderInput = (fila: Fila, columna: Columna) => {
    if (!columna.editable) {
      return (
        <TextField
          value={fila.datos[columna.nombre] || ''}
          disabled
          fullWidth
          size="small"
          variant="outlined"
        />
      );
    }

    if (editando === fila.id) {
      if (columna.tipo === 'numero' || columna.tipo === 'decimal') {
        return (
          <FormControl fullWidth size="small">
            <InputLabel>Valor</InputLabel>
            <Select
              value={fila.datos[columna.nombre] || ''}
              onChange={(e) => handleInputChange(fila.id, columna.nombre, e.target.value as string)}
              onBlur={() => validarValor(fila.datos[columna.nombre] as string, columna.tipo)}
            >
              <MenuItem value="">Seleccionar</MenuItem>
              <MenuItem value="NA">NA</MenuItem>
              <MenuItem value="0">0</MenuItem>
            </Select>
          </FormControl>
        );
      }

      return (
        <TextField
          value={fila.datos[columna.nombre] || ''}
          onChange={(e) => handleInputChange(fila.id, columna.nombre, e.target.value as string)}
          fullWidth
          size="small"
          variant="outlined"
          type={columna.tipo === 'fecha' ? 'date' : 'text'}
          className={
            columna.requerido && !fila.datos[columna.nombre] 
              ? 'campo-requerido' 
              : fila.datos[columna.nombre] 
                ? 'campo-success' 
                : ''
          }
        />
      );
    }

    return (
      <Typography 
        variant="body2" 
        className={
          columna.requerido && !fila.datos[columna.nombre] 
            ? 'campo-requerido' 
            : ''
        }
      >
        {fila.datos[columna.nombre] || '-'}
      </Typography>
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" onClick={() => navigate('/dashboard')}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Formulario: {nombreFormulario}
          </Typography>
          <Chip label="Disponible hasta: 15/12/2024" color="warning" />
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {/* Encabezado del formulario */}
        <Paper sx={{ p: 3, mb: 3, backgroundColor: '#f8f9fa' }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
            COMPLETAR LA MATRIZ DE CARGO TENIENDO EN CUENTA LO SIGUIENTE:
          </Typography>
          <Box sx={{ pl: 2 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              1. SI LOS OCUPANTES DE UN CARGO SON MAS DE UNO, FAVOR ANOTAR LA INFORMACIÓN SOLICITADA EN FILAS SEPARADAS, POR ENDE SE DEBE AGREGAR A ESTA MATRIZ EL NÚMERO DE FILAS QUE CORRESPONDA AL NÚMERO DE OCUPANTE DEL CARGO.
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              2. SE ENTIENDE POR RBM A TODA LA RENTA ANUAL GARANTIZADA MENSUALIZADA (A MAYO 2025, INCLUYE GRATIFICACIONES Y TODOS LOS BONOS Y AGUINALDOS GARANTIZADOS (DE FIESTAS PATRIAS, NAVIDAD, VACACIONES Y OTROS) NO INCLUIR ASIGNACIÓN DE COLACIÓN NI DE MOVILIZACIÓN.
            </Typography>
            <Typography variant="body1">
              3. ANOTAR EL NIVEL HAY, MERCER O GGS DEL CARGO SI UTILIZA ESTAS METODOLOGÍAS DE EVALUACIÓN DE CARGOS
            </Typography>
          </Box>
        </Paper>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" gutterBottom>
            {nombreFormulario}
          </Typography>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            Fecha límite: 15 de Diciembre, 2024
          </Typography>
          
          <Button
            variant="outlined"
            startIcon={<VisibilityIcon />}
            onClick={() => setModalCategorias(true)}
            sx={{ mt: 2 }}
          >
            Ver Categorías de Datos
          </Button>
        </Box>

        <Paper className="table-container">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {columnas.map((columna) => (
                    <TableCell key={columna.nombre} sx={{ fontWeight: 'bold' }}>
                      {columna.nombre}
                      {columna.requerido && <Chip label="Requerido" size="small" color="error" sx={{ ml: 1 }} />}
                    </TableCell>
                  ))}
                  <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filas.map((fila) => (
                  <TableRow key={fila.id}>
                    {columnas.map((columna) => (
                      <TableCell key={columna.nombre}>
                        {renderInput(fila, columna)}
                      </TableCell>
                    ))}
                    <TableCell>
                      <div className="action-buttons">
                        {editando === fila.id ? (
                          <Button
                            size="small"
                            variant="contained"
                            startIcon={<SaveIcon />}
                            onClick={handleSave}
                          >
                            Guardar
                          </Button>
                        ) : (
                          <>
                            <Tooltip title="Editar">
                              <IconButton
                                size="small"
                                onClick={() => handleEdit(fila.id)}
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Agregar registro similar">
                              <IconButton
                                size="small"
                                onClick={() => handleAdd(fila.id)}
                              >
                                <AddIcon />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            size="large"
          >
            Guardar Progreso
          </Button>
          
          <Button
            variant="contained"
            color="success"
            startIcon={<SendIcon />}
            onClick={handleEnviar}
            size="large"
            disabled={verificarCamposFaltantes().length > 0}
          >
            Enviar Formulario
          </Button>
        </Box>

        {/* Modal de Categorías */}
        <Dialog 
          open={modalCategorias} 
          onClose={() => setModalCategorias(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Estructura del Formulario</DialogTitle>
          <DialogContent className="modal-content">
            <Typography variant="h6" gutterBottom>
              Columnas y Tipos de Datos
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Columna</TableCell>
                    <TableCell>Tipo de Dato</TableCell>
                    <TableCell>Requerido</TableCell>
                    <TableCell>Editable</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {columnas.map((columna) => (
                    <TableRow key={columna.nombre}>
                      <TableCell>{columna.nombre}</TableCell>
                      <TableCell>{columna.tipo}</TableCell>
                      <TableCell>
                        <Chip 
                          label={columna.requerido ? 'Sí' : 'No'} 
                          color={columna.requerido ? 'error' : 'default'} 
                          size="small" 
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={columna.editable ? 'Sí' : 'No'} 
                          color={columna.editable ? 'success' : 'default'} 
                          size="small" 
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setModalCategorias(false)}>Cerrar</Button>
          </DialogActions>
        </Dialog>

        {/* Modal de Confirmación de Envío */}
        <Dialog open={modalEnviar} onClose={() => setModalEnviar(false)}>
          <DialogTitle>Confirmar Envío</DialogTitle>
          <DialogContent>
            <Alert severity="warning" sx={{ mb: 2 }}>
              ¿Está seguro de enviar la información? Una vez realizada la acción esta no se puede deshacer.
            </Alert>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setModalEnviar(false)}>Cancelar</Button>
            <Button onClick={confirmarEnvio} variant="contained" color="success">
              Confirmar Envío
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar para notificaciones */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert 
            onClose={() => setSnackbar({ ...snackbar, open: false })} 
            severity={snackbar.severity}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Formulario;

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  Box,
  Alert
} from '@mui/material';
import { Save as SaveIcon, Close as CloseIcon } from '@mui/icons-material';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'date';
  options?: string[];
  required?: boolean;
  editable?: boolean;
}

interface FormEditModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  rowData: any;
  fields: FormField[];
  title: string;
}

const FormEditModal: React.FC<FormEditModalProps> = ({
  open,
  onClose,
  onSave,
  rowData,
  fields,
  title
}) => {
  const [formData, setFormData] = useState<any>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (rowData) {
      setFormData({ ...rowData });
    }
  }, [rowData]);

  const handleInputChange = (fieldName: string, value: any) => {
    let processedValue = value;
    
    // Auto-calculate TOTAL COMISIONES if this is one of the calculation fields
    if (fieldName === '$ BONO ANUAL PAGADO EL 2025 POR EL DESEMPEÑO DEL 2024' || 
        fieldName === 'INCENTIVOS TRIMESTRALES/ MENSUALES PAGADOS EL 2024') {
      
      const updatedData = { ...formData, [fieldName]: value };
      const bonoAnual = parseFloat(updatedData['$ BONO ANUAL PAGADO EL 2025 POR EL DESEMPEÑO DEL 2024']) || 0;
      const incentivos = parseFloat(updatedData['INCENTIVOS TRIMESTRALES/ MENSUALES PAGADOS EL 2024']) || 0;
      
      if (bonoAnual > 0 && incentivos > 0) {
        updatedData['$ TOTAL COMISIONES PAGADAS EL 2024'] = (bonoAnual * incentivos).toString();
      } else {
        updatedData['$ TOTAL COMISIONES PAGADAS EL 2024'] = 'NA';
      }
      
      setFormData(updatedData);
    } else {
      setFormData((prev: any) => ({
        ...prev,
        [fieldName]: processedValue
      }));
    }

    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors((prev: { [key: string]: string }) => ({
        ...prev,
        [fieldName]: ''
      }));
    }

    // Show warning for 0 values in numeric fields
    if (value === '0' && (fieldName.includes('BONO') || fieldName.includes('INCENTIVOS'))) {
      setErrors((prev: { [key: string]: string }) => ({
        ...prev,
        [fieldName]: 'El ingreso de 0 puede afectar negativamente los resultados, si desconoce el valor seleccione NA'
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    fields.forEach(field => {
      if (field.required && field.editable && (!formData[field.name] || formData[field.name] === '')) {
        newErrors[field.name] = `${field.label} es requerido`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  const renderField = (field: FormField) => {
    if (!field.editable) {
      return (
        <TextField
          fullWidth
          label={field.label}
          value={formData[field.name] || ''}
          disabled
          variant="outlined"
        />
      );
    }

    if (field.type === 'select') {
      // Special handling for number input fields
      if (field.name === '$ BONO ANUAL PAGADO EL 2025 POR EL DESEMPEÑO DEL 2024' || 
          field.name === 'INCENTIVOS TRIMESTRALES/ MENSUALES PAGADOS EL 2024') {
        return (
          <TextField
            fullWidth
            label={field.label}
            value={formData[field.name] || ''}
            onChange={(e) => {
              const value = e.target.value;
              // Allow only numbers, NA, or empty
              if (value === '' || value === 'NA' || /^\d+$/.test(value)) {
                handleInputChange(field.name, value);
              }
            }}
            type="text"
            variant="outlined"
            error={!!errors[field.name]}
            helperText={errors[field.name] || 'Ingrese un número o "NA"'}
            placeholder="Ingrese un número o NA"
          />
        );
      }
      
      return (
        <FormControl fullWidth error={!!errors[field.name]}>
          <InputLabel>{field.label}</InputLabel>
          <Select
            value={formData[field.name] || ''}
            label={field.label}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
          >
            <MenuItem value="">Seleccionar</MenuItem>
            {field.options?.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }

    return (
      <TextField
        fullWidth
        label={field.label}
        value={formData[field.name] || ''}
        onChange={(e) => handleInputChange(field.name, e.target.value)}
        type={field.type === 'date' ? 'date' : field.type === 'number' ? 'text' : 'text'}
        variant="outlined"
        error={!!errors[field.name]}
        helperText={errors[field.name]}
        InputLabelProps={field.type === 'date' ? { shrink: true } : undefined}
      />
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6">{title}</Typography>
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            {fields.map((field) => (
              <Grid item xs={12} sm={6} key={field.name}>
                {renderField(field)}
              </Grid>
            ))}
          </Grid>
          
          {Object.keys(errors).length > 0 && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Por favor, complete todos los campos requeridos
            </Alert>
          )}
        </Box>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose} startIcon={<CloseIcon />}>
          Cancelar
        </Button>
        <Button 
          onClick={handleSave} 
          variant="contained" 
          startIcon={<SaveIcon />}
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormEditModal;

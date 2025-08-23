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
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));

    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: ''
      }));
    }

    // Show warning for 0 values in numeric fields
    if (value === '0' && fields.find(f => f.name === fieldName)?.type === 'number') {
      setErrors(prev => ({
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

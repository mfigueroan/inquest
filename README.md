# 🏦 Sistema Inquest - Gestión de Formularios Bancarios

Aplicación web para gestión de formularios de levantamiento de cargos bancarios desarrollada con React y TypeScript.

## 🌟 Características Principales

- **Autenticación multi-banco** con roles diferenciados
- **Dashboard personalizado** según tipo de usuario
- **Gestión dinámica de formularios** con carga desde Excel
- **Sistema de permisos granular** por banco y formulario
- **Interfaz administrativa completa** para gestión centralizada
- **Solicitudes de edición** con flujo de aprobación
- **Estados visuales** con códigos de color intuitivos

## 🛠️ Tecnologías

- **Frontend**: React 18 + TypeScript
- **UI**: Material-UI (MUI)
- **Routing**: React Router v6
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast
- **Excel**: SheetJS (xlsx)
- **Hosting**: Netlify

## 🚀 Instalación y Uso

### Desarrollo Local
```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start

# Construir para producción
npm run build
```

### Deployment
```bash
# Build con configuración de producción
set CI=false && npm run build

# Los archivos están listos en /build para Netlify
```

## 👥 Usuarios de Prueba

### 👨‍💼 Administrador
- **RUT**: 12345678-9
- **Contraseña**: admin123
- **Acceso**: Panel completo de administración

### 🏦 Usuarios Banco

| Banco | RUT | Contraseña |
|-------|-----|------------|
| Banco de Chile | 11111111-1 | banco123 |
| Banco Santander | 22222222-2 | banco123 |
| Banco Estado | 33333333-3 | banco123 |

## 📚 Documentación

- **[Guía Completa de Usuario](./GUIA_USUARIO.md)** - Manual detallado para todos los usuarios
- **[Guía Rápida](./GUIA_RAPIDA.md)** - Referencia visual y acciones rápidas

## 🎯 Funcionalidades por Rol

### **Usuarios Banco**
- ✅ Dashboard con formularios asignados
- ✅ Completar formularios pendientes
- ✅ Solicitar edición de formularios completados
- ✅ Editar formularios con permisos habilitados
- ✅ Estados visuales con códigos de color

### **Administradores**
- ✅ Gestión completa de formularios
- ✅ Crear formularios manuales o desde Excel
- ✅ Asignar formularios por banco
- ✅ Configurar permisos de edición granulares
- ✅ Gestionar estructura de columnas
- ✅ Estadísticas y monitoreo en tiempo real

## 🎨 Sistema de Estados Visuales

### Para Bancos
- 🟢 **Verde**: Formulario completado (solo lectura)
- 🟡 **Amarillo**: Formulario completado y editable
- ⚪ **Blanco**: Formulario pendiente de completar

### Para Administradores
- 🟢 **Activo**: Formulario habilitado para bancos
- 🔴 **Inactivo**: Formulario deshabilitado
- 📊 **Estadísticas**: Contadores en tiempo real

## 🔄 Flujos Principales

### **Flujo Banco Estándar**
```
Login → Dashboard → Formulario Pendiente → Editar → Completar → Guardar
```

### **Flujo Solicitud de Edición**
```
Formulario Verde → "Solicitar Edición" → Motivo → Enviar → Esperar Aprobación
```

### **Flujo Admin - Nuevo Formulario**
```
Gestión → "Nuevo Formulario" → Datos → Asignar Bancos → Configurar Permisos
```

### **Flujo Admin - Habilitar Edición**
```
Gestión → "Gestionar Asignaciones" → Verificar Completado → "Permitir Editar"
```

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── admin/
│   │   └── GestionFormularios.tsx    # Panel administrativo
│   ├── Dashboard.tsx                 # Dashboard principal bancos
│   ├── FormularioDetalle.tsx         # Editor de formularios
│   └── Login.tsx                     # Pantalla de login
├── contexts/
│   └── AuthContext.tsx               # Gestión de autenticación
└── App.tsx                           # Componente principal
```

## ⚙️ Configuración

### Variables de Entorno (Netlify)
```toml
[build.environment]
  NODE_VERSION = "18"
  CI = "false"
- **Asignación por banco** con switches independientes
- **Fechas límite** configurables

### Reportes y Resultados
- **Vista por formulario** con tabla detallada
- **Vista consolidada** con tarjetas
- **Filtros avanzados** por banco, formulario y estado
- **Descarga en Excel** individual y consolidada
- **Estados visuales** con chips de colores

## Personalización

### Colores y Temas
Los colores principales se pueden modificar en `src/index.tsx`:

```typescript
const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },    // Azul principal
    secondary: { main: '#dc004e' },  // Rosa/rojo
    success: { main: '#4caf50' },    // Verde
    warning: { main: '#ff9800' },    // Naranja
    error: { main: '#f44336' },      // Rojo
  }
});
```

### Estilos CSS
Los estilos personalizados se encuentran en `src/App.css` y se pueden modificar según las necesidades del cliente.

## Despliegue

### Build de Producción
```bash
npm run build
```

### Servidor de Producción
La aplicación está lista para ser desplegada en cualquier servidor web estático o CDN.

## Mejoras Futuras Sugeridas

1. **Base de datos real** con PostgreSQL/MySQL
2. **API REST** con Node.js/Express
3. **Autenticación JWT** con refresh tokens
4. **Subida de archivos** con validación de tipos
5. **Notificaciones por email** para recordatorios
6. **Auditoría** de cambios y accesos
7. **Backup automático** de formularios
8. **Métricas avanzadas** con gráficos
9. **Exportación a PDF** además de Excel
10. **Sistema de permisos** granular por banco

## Soporte

Para soporte técnico o consultas sobre la implementación, contactar al equipo de desarrollo.

## Licencia

Este proyecto es propiedad de Inquest y está destinado para uso interno de la empresa.

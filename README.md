# Inquest - Aplicación Web de Gestión de Formularios Bancarios

## Descripción

Inquest es una aplicación web moderna desarrollada en React con TypeScript que permite a los bancos gestionar y completar formularios financieros de manera eficiente. La aplicación incluye un sistema de autenticación, dashboard para usuarios bancarios, y un panel de administración completo.

## Características Principales

### Para Usuarios Bancarios
- **Dashboard intuitivo** con tarjetas de formularios
- **Formularios editables** con validación de campos
- **Sistema de colores** para identificar estado (verde=completado, amarillo=pendiente)
- **Validación de datos** con notificaciones para valores numéricos
- **Botones de acción** por fila (editar, agregar registro similar)
- **Guardado de progreso** y envío final con confirmación
- **Modal de categorías** para ver estructura del formulario

### Para Administradores
- **Panel de administración** con estadísticas del sistema
- **Gestión de usuarios** (crear, editar, activar/desactivar, cambiar contraseñas)
- **Gestión de formularios** (crear, activar/desactivar, asignar por banco)
- **Ver resultados** con filtros y descarga en Excel
- **Carga de formularios** desde archivos Excel

## Tecnologías Utilizadas

- **Frontend**: React 18 + TypeScript
- **UI Framework**: Material-UI (MUI) v5
- **Routing**: React Router v6
- **Estado**: React Context API
- **Notificaciones**: React Hot Toast
- **Fechas**: date-fns
- **Estilos**: CSS personalizado + Emotion

## Instalación

### Prerrequisitos
- Node.js 16+ 
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd inquest
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar la aplicación**
   ```bash
   npm start
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## Usuarios de Demostración

### Usuario Banco
- **Usuario**: `banco1`
- **Contraseña**: `123456`
- **Acceso**: Dashboard de formularios bancarios

### Usuario Administrador
- **Usuario**: `admin`
- **Contraseña**: `admin`
- **Acceso**: Panel completo de administración

## Estructura del Proyecto

```
src/
├── components/           # Componentes principales
│   ├── Login.tsx        # Página de inicio de sesión
│   ├── Dashboard.tsx    # Dashboard para usuarios bancarios
│   ├── Formulario.tsx   # Editor de formularios
│   ├── AdminDashboard.tsx # Dashboard de administrador
│   └── admin/           # Componentes de administración
│       ├── VerResultados.tsx
│       ├── GestionUsuarios.tsx
│       └── GestionFormularios.tsx
├── contexts/            # Contextos de React
│   └── AuthContext.tsx  # Contexto de autenticación
├── App.tsx              # Componente principal
├── index.tsx            # Punto de entrada
└── App.css              # Estilos globales
```

## Funcionalidades Detalladas

### Sistema de Formularios
- **Columnas predefinidas**: Primera columna no editable, resto editables
- **Tipos de datos**: Texto, número, fecha, decimal
- **Validaciones**: Campos requeridos, valores numéricos (no vacíos, no "-")
- **Opciones especiales**: NA para valores desconocidos, advertencia para valores 0
- **Duplicación de registros**: Agregar registros similares debajo del seleccionado

### Gestión de Usuarios
- **CRUD completo** de usuarios bancarios
- **Activación/desactivación** individual
- **Cambio de contraseñas** con validación
- **Asignación de roles** (banco/admin)
- **Estadísticas** de usuarios activos/inactivos

### Gestión de Formularios
- **Creación manual** de formularios
- **Carga desde Excel** (.xlsx)
- **Activación/desactivación** masiva e individual
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

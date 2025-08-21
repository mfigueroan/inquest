# Instalación Rápida - Inquest Web App

## Pasos para Ejecutar la Aplicación

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Iniciar la Aplicación
```bash
npm start
```

### 3. Abrir en el Navegador
```
http://localhost:3000
```

## Usuarios de Prueba

### Usuario Banco
- **Usuario**: `banco1`
- **Contraseña**: `123456`

### Usuario Administrador
- **Usuario**: `admin`
- **Contraseña**: `admin`

## Estructura de Archivos Creados

```
inquest/
├── package.json              # Dependencias del proyecto
├── tsconfig.json            # Configuración TypeScript
├── public/
│   └── index.html          # HTML principal
├── src/
│   ├── index.tsx           # Punto de entrada
│   ├── App.tsx             # Componente principal
│   ├── App.css             # Estilos globales
│   ├── contexts/
│   │   └── AuthContext.tsx # Contexto de autenticación
│   └── components/
│       ├── Login.tsx       # Página de login
│       ├── Dashboard.tsx   # Dashboard bancario
│       ├── Formulario.tsx  # Editor de formularios
│       ├── AdminDashboard.tsx # Dashboard admin
│       └── admin/          # Componentes de administración
│           ├── VerResultados.tsx
│           ├── GestionUsuarios.tsx
│           └── GestionFormularios.tsx
└── README.md               # Documentación completa
```

## Características Implementadas

✅ **Sistema de Login** con autenticación
✅ **Dashboard para Bancos** con tarjetas de formularios
✅ **Editor de Formularios** con validaciones
✅ **Panel de Administración** completo
✅ **Gestión de Usuarios** (CRUD completo)
✅ **Gestión de Formularios** con asignaciones por banco
✅ **Ver Resultados** con filtros y descarga
✅ **Interfaz Responsiva** con Material-UI
✅ **Notificaciones** en tiempo real
✅ **Validaciones** de campos requeridos
✅ **Sistema de Colores** para estados

## Comandos Útiles

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm start

# Construir para producción
npm run build

# Ejecutar tests
npm test

# Eyectar configuración (solo si es necesario)
npm run eject
```

## Notas Importantes

- La aplicación usa **datos mock** para demostración
- El logo debe estar en `public/inquest logo.png`
- Todas las funcionalidades están implementadas como prototipo
- Se puede conectar fácilmente a una API real
- La interfaz está completamente en español
- Diseño responsive para móviles y desktop

## Próximos Pasos

1. **Conectar a base de datos real**
2. **Implementar API REST**
3. **Agregar autenticación JWT**
4. **Configurar servidor de producción**
5. **Implementar backup automático**
6. **Agregar métricas avanzadas**

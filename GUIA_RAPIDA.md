# 🚀 Guía Rápida - Sistema Inquest

## 📱 **Acceso Rápido**

### **Login**
- **RUT**: Sin puntos, con guión (ej: 12345678-9)
- **Contraseña**: Proporcionada por administrador
- **Banco**: Seleccionar de la lista

---

## 🏦 **USUARIOS BANCO - Referencia Visual**

### **🎨 Códigos de Color de Tarjetas**

| Color | Estado | Acción Disponible |
|-------|--------|-------------------|
| ⚪ **Blanco** | Pendiente | **"Editar"** - Completar formulario |
| 🟢 **Verde** | Completado | **"Solicitar Edición"** - Pedir permisos |
| 🟡 **Amarillo** | Editable | **"Editar"** - Modificar libremente |

### **⚡ Acciones Rápidas**

#### **Completar Formulario Nuevo**
1. Tarjeta blanca → **"Editar"**
2. Llenar todos los campos
3. **"Guardar"** → Se vuelve verde

#### **Solicitar Cambios**
1. Tarjeta verde → **"Solicitar Edición"**
2. Escribir motivo del cambio
3. **"Enviar"** → Esperar aprobación

#### **Editar Formulario Habilitado**
1. Tarjeta amarilla → **"Editar"**
2. Modificar campos necesarios
3. **"Guardar"** → Cambios aplicados

---

## 👨‍💼 **ADMINISTRADORES - Referencia Visual**

### **📊 Panel Principal**

#### **Estadísticas Principales**
- **Total**: Formularios en el sistema
- **Activos**: Formularios habilitados
- **Inactivos**: Formularios deshabilitados
- **Asignaciones**: Total de asignaciones activas

### **🛠️ Gestión de Formularios**

#### **Crear Formulario**
```
"Nuevo Formulario" → Nombre + Descripción + Fecha → "Crear"
```

#### **Cargar desde Excel**
```
"Cargar Excel" → Seleccionar .xlsx → "Cargar" → Estructura automática
```

### **⚙️ Gestionar Asignaciones - Modal**

#### **Controles por Banco**

| Columna | Función | Estado |
|---------|---------|--------|
| **Banco** | Nombre + Estado completado | Info |
| **Asignado** | Switch verde | ON/OFF |
| **Permitir Editar** | Switch naranja | Condicional |

#### **Lógica de "Permitir Editar"**

| Condición | Switch | Resultado |
|-----------|--------|-----------|
| Formulario pendiente | ❌ Deshabilitado | "Requiere completar" |
| No asignado | ❌ Deshabilitado | No disponible |
| Completado + Asignado | ✅ Habilitado | Puede editar |

### **🏗️ Estructura de Formularios**

#### **Configuración de Columnas** (Solo Excel)
- **Tipo**: texto, número, fecha, género
- **Requerido**: Campo obligatorio
- **Editable**: Banco puede modificar

---

## 🔄 **FLUJOS COMPLETOS**

### **🏦 Flujo Banco Típico**

```
1. Login → Dashboard
2. Ver formularios asignados
3. Completar pendientes (blanco → verde)
4. Solicitar edición si necesario (verde → solicitud)
5. Editar si habilitado (amarillo → modificar)
```

### **👨‍💼 Flujo Admin Típico**

```
1. Login → Panel Admin
2. Crear/Cargar formularios
3. Gestionar asignaciones por banco
4. Revisar formularios completados
5. Habilitar edición según necesidad
6. Configurar estructura (Excel)
```

---

## ⚡ **Acciones Rápidas**

### **Para Bancos**
- **Completar rápido**: Dashboard → Tarjeta blanca → Editar
- **Solicitar cambio**: Dashboard → Tarjeta verde → Solicitar Edición
- **Editar habilitado**: Dashboard → Tarjeta amarilla → Editar

### **Para Admins**
- **Nuevo formulario**: Gestión → Nuevo Formulario
- **Asignar banco**: Gestión → Gestionar Asignaciones
- **Habilitar edición**: Asignaciones → Switch "Permitir Editar"
- **Ver estructura**: Gestión → Estructura

---

## 🎯 **Tips de Uso**

### **Para Bancos**
- ✅ Guarda frecuentemente tu progreso
- ✅ Revisa todos los campos antes de enviar
- ✅ Usa "Solicitar Edición" para cambios post-envío

### **Para Admins**
- ✅ Revisa estado de completado antes de habilitar edición
- ✅ Usa fechas límite para controlar tiempos
- ✅ Asigna formularios solo a bancos relevantes
- ✅ Configura estructura antes de asignar (Excel)

---

## 🚨 **Resolución de Problemas**

### **"No puedo editar"**
- **Banco**: Verifica color de tarjeta y permisos
- **Admin**: Verifica que banco completó formulario

### **"No veo formulario"**
- **Banco**: Contacta admin para verificar asignación
- **Admin**: Verifica que formulario esté activo

### **"Error al guardar"**
- Completa todos los campos requeridos
- Verifica formato de fechas y números
- Recarga página si persiste

---

## 📞 **Contacto Rápido**

**Soporte Técnico**: admin@inquest.cl
**Solicitudes**: Usar función del sistema

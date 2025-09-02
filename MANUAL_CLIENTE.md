# 📖 Manual del Cliente - Sistema Inquest

## 🎯 **Presentación del Sistema**

El Sistema Inquest es una plataforma web diseñada para gestionar formularios de levantamiento de cargos bancarios de manera eficiente y controlada.

---

## 🏦 **MANUAL PARA USUARIOS BANCO**

### **🔑 Acceso al Sistema**

**Credenciales de Acceso:**
- **RUT**: 11111111-1 (Banco de Chile) / 22222222-2 (Santander) / 33333333-3 (Estado)
- **Contraseña**: banco123
- **Banco**: Seleccionar de la lista desplegable

### **📊 Dashboard Principal**

Al ingresar verás tu **panel personalizado** con:

#### **Estadísticas Personales**
- **Total de formularios** asignados a tu banco
- **Formularios completados** por tu equipo
- **Formularios pendientes** de completar

#### **Tarjetas de Formularios**

| Color | Estado | Descripción | Acción |
|-------|--------|-------------|--------|
| ⚪ **Blanco** | Pendiente | Formulario sin completar | **"Editar"** |
| 🟢 **Verde** | Completado | Formulario enviado, solo lectura | **"Solicitar Edición"** |
| 🟡 **Amarillo** | Editable | Completado pero modificable | **"Editar"** |

### **📝 Trabajando con Formularios**

#### **1. Completar Formulario Nuevo (Tarjeta Blanca)**
```
1. Clic en "Editar"
2. Completar todos los campos requeridos
3. Guardar cambios
4. El formulario se vuelve verde (completado)
```

#### **2. Solicitar Modificación (Tarjeta Verde)**
```
1. Clic en "Solicitar Edición"
2. Escribir motivo detallado del cambio
3. Enviar solicitud al administrador
4. Esperar aprobación (recibirás notificación)
```

#### **3. Editar Formulario Habilitado (Tarjeta Amarilla)**
```
1. Clic en "Editar"
2. Modificar campos necesarios
3. Guardar cambios
4. Cambios aplicados inmediatamente
```

### **💡 Consejos para Bancos**
- ✅ **Guarda frecuentemente** tu progreso
- ✅ **Completa todos los campos requeridos** antes de enviar
- ✅ **Usa solicitudes de edición** para cambios post-envío
- ✅ **Revisa fechas límite** en cada formulario

---

## 👨‍💼 **MANUAL PARA ADMINISTRADORES**

### **🔑 Acceso Administrativo**

**Credenciales de Administrador:**
- **RUT**: 12345678-9
- **Contraseña**: admin123

### **🏠 Panel de Administración**

#### **Dashboard Ejecutivo**
- **Estadísticas globales** del sistema
- **Resumen de actividad** por banco
- **Acceso rápido** a todas las funciones

#### **Gestión de Formularios**
Accede desde el menú principal a **"Gestión de Formularios"**

### **📋 Gestión de Formularios - Funciones Principales**

#### **1. Crear Nuevo Formulario**
```
1. Clic "Nuevo Formulario"
2. Completar:
   - Nombre descriptivo
   - Descripción detallada
   - Fecha límite
3. "Crear Formulario"
4. Se asigna automáticamente a todos los bancos
```

#### **2. Cargar Formulario desde Excel**
```
1. Clic "Cargar Excel"
2. Seleccionar archivo .xlsx
3. "Cargar Formulario"
4. El sistema crea estructura automáticamente
5. Configurar asignaciones según necesidad
```

### **⚙️ Gestionar Asignaciones - Control Granular**

#### **Funciones del Modal de Asignaciones**

**Por cada banco puedes controlar:**

| Control | Función | Cuándo Usar |
|---------|---------|-------------|
| **Switch Asignado** | Habilita/deshabilita formulario | Controlar qué bancos ven el formulario |
| **Switch Permitir Editar** | Habilita edición post-completado | Solo después de que banco complete |

#### **Lógica de Permisos de Edición**

**El switch "Permitir Editar" se comporta así:**

| Estado del Banco | Switch | Resultado |
|------------------|--------|-----------|
| 📝 **No ha completado** | ❌ Deshabilitado | "Requiere completar" |
| ❌ **No asignado** | ❌ Deshabilitado | No disponible |
| ✅ **Completado + Asignado** | ✅ Habilitado | Puede activar edición |

#### **Indicadores Visuales en el Modal**
- **Fondo gris**: Bancos que completaron el formulario
- **"Formulario completado"**: Estado confirmado
- **"Formulario pendiente"**: Aún no completado
- **Tooltip explicativo**: Para switches deshabilitados

### **🏗️ Configurar Estructura (Formularios Excel)**

#### **Gestión de Columnas**
```
1. Clic "Estructura" en tarjeta de formulario
2. Configurar por columna:
   - Tipo de dato (texto, número, fecha, género)
   - Campo requerido (obligatorio)
   - Campo editable (banco puede modificar)
3. Cambios se guardan automáticamente
```

### **📈 Monitoreo y Control**

#### **Estados de Formularios**
- **Activo/Inactivo**: Controla visibilidad para bancos
- **Fecha límite**: Editable en tiempo real
- **Asignaciones**: Control individual por banco

#### **Estadísticas en Tiempo Real**
- **Total formularios** en el sistema
- **Formularios activos** disponibles para bancos
- **Formularios inactivos** temporalmente deshabilitados
- **Asignaciones activas** total en el sistema

---

## 🔄 **FLUJOS DE TRABAJO DETALLADOS**

### **Flujo Completo: Banco Completa Formulario**

```mermaid
Banco Login → Dashboard → Ve Formulario Blanco → Clic "Editar" → 
Completa Campos → Guarda → Formulario Verde → Solo Lectura
```

**Pasos detallados:**
1. **Login** con credenciales del banco
2. **Dashboard** muestra formularios asignados
3. **Formulario blanco** indica pendiente
4. **Clic "Editar"** abre editor
5. **Completar** todos los campos requeridos
6. **Guardar** envía formulario
7. **Tarjeta verde** confirma completado
8. **Solo lectura** hasta nueva autorización

### **Flujo Completo: Solicitud de Edición**

```mermaid
Formulario Verde → Clic "Solicitar Edición" → Modal Solicitud → 
Escribir Motivo → Enviar → Admin Revisa → Habilita Edición → Tarjeta Amarilla
```

**Pasos detallados:**
1. **Formulario completado** (verde) en dashboard
2. **Clic "Solicitar Edición"** abre modal
3. **Escribir motivo** detallado del cambio
4. **Enviar solicitud** al administrador
5. **Admin recibe** y revisa solicitud
6. **Admin habilita** edición en gestión de asignaciones
7. **Tarjeta amarilla** indica edición permitida
8. **Banco puede editar** nuevamente

### **Flujo Completo: Admin Habilita Edición**

```mermaid
Gestión Formularios → Gestionar Asignaciones → Verificar Completado → 
Switch "Permitir Editar" → Banco Ve Amarillo → Puede Editar
```

**Pasos detallados:**
1. **Acceso a gestión** de formularios
2. **Clic "Gestionar Asignaciones"** en formulario
3. **Verificar estado** "Formulario completado"
4. **Activar switch** "Permitir Editar"
5. **Cambio inmediato** en sistema
6. **Banco ve tarjeta amarilla** en su dashboard
7. **Banco puede editar** libremente

---

## 🎨 **Guía Visual de Estados**

### **Para Presentar al Cliente**

#### **Vista Banco - Estados de Tarjetas**
- **⚪ BLANCO**: "Necesito completar este formulario"
- **🟢 VERDE**: "Ya completé, solo puedo leer"
- **🟡 AMARILLO**: "Completé y puedo modificar"

#### **Vista Admin - Control de Permisos**
- **Switch Verde**: Asignar/desasignar formulario
- **Switch Naranja**: Permitir/bloquear edición
- **Fondo Gris**: Formulario completado por el banco

### **Mensajes del Sistema**
- **"Requiere completar"**: Banco debe terminar formulario primero
- **"Formulario completado"**: Banco terminó exitosamente
- **"Solicitud enviada"**: Petición de edición procesada

---

## 📋 **Checklist para Demostración**

### **Demo para Cliente - Flujo Banco**
1. ✅ Login como banco
2. ✅ Mostrar dashboard con diferentes estados
3. ✅ Completar formulario pendiente
4. ✅ Solicitar edición de completado
5. ✅ Editar formulario habilitado

### **Demo para Cliente - Flujo Admin**
1. ✅ Login como administrador
2. ✅ Mostrar estadísticas generales
3. ✅ Crear nuevo formulario
4. ✅ Gestionar asignaciones por banco
5. ✅ Habilitar permisos de edición
6. ✅ Configurar estructura desde Excel

---

## 🚀 **Ventajas del Sistema**

### **Para los Bancos**
- ✅ **Interfaz intuitiva** con códigos de color
- ✅ **Proceso claro** de completado y edición
- ✅ **Solicitudes formales** para cambios
- ✅ **Estados visuales** fáciles de entender

### **Para Inquest (Administradores)**
- ✅ **Control total** sobre formularios y permisos
- ✅ **Gestión granular** por banco y formulario
- ✅ **Carga automática** desde Excel
- ✅ **Estadísticas en tiempo real**
- ✅ **Flujo de aprobación** para cambios

### **Para el Negocio**
- ✅ **Eficiencia** en recolección de datos
- ✅ **Trazabilidad** completa de cambios
- ✅ **Flexibilidad** en gestión de permisos
- ✅ **Escalabilidad** para múltiples bancos

---

## 📞 **Información de Contacto**

**Para Soporte Técnico:**
- Email: admin@inquest.cl
- Sistema: Función integrada "Solicitar Edición"

**Para Consultas Comerciales:**
- Contactar equipo Inquest directamente

---

*Sistema desarrollado específicamente para las necesidades de Inquest en la gestión de formularios bancarios*

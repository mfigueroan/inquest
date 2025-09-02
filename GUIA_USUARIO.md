# 📋 Guía de Usuario - Sistema Inquest

## 🏦 Sistema de Gestión de Formularios Bancarios

Esta guía explica cómo usar el sistema Inquest para la gestión de formularios de levantamiento de cargos bancarios.

---

## 👤 **GUÍA PARA USUARIOS BANCO**

### 🔐 **Acceso al Sistema**

1. **Inicio de Sesión**
   - Ingresa tu **RUT** (sin puntos, con guión)
   - Ingresa tu **contraseña**
   - Selecciona tu **banco** del menú desplegable
   - Haz clic en "Iniciar Sesión"

### 📊 **Dashboard Principal**

Al ingresar verás:

- **Estadísticas generales**: Total de formularios, completados, pendientes
- **Tarjetas de formularios** con diferentes colores:
  - 🟢 **Verde**: Formulario completado y bloqueado
  - 🟡 **Amarillo**: Formulario completado pero editable
  - ⚪ **Blanco**: Formulario pendiente de completar

### 📝 **Trabajar con Formularios**

#### **Formularios Pendientes (Tarjetas Blancas)**
- Haz clic en **"Editar"** para completar el formulario
- Completa todos los campos requeridos
- Guarda los cambios

#### **Formularios Completados (Tarjetas Verdes)**
- **Solo lectura**: No se pueden modificar
- Para solicitar cambios, haz clic en **"Solicitar Edición"**
- Completa el formulario de solicitud con el motivo
- El administrador revisará tu solicitud

#### **Formularios Editables (Tarjetas Amarillas)**
- Haz clic en **"Editar"** para modificar
- Realiza los cambios necesarios
- Guarda los cambios

### 📧 **Solicitudes de Edición**

Cuando necesites modificar un formulario completado:

1. Haz clic en **"Solicitar Edición"**
2. El sistema pre-completa el asunto
3. Escribe el **motivo** de la solicitud
4. Haz clic en **"Enviar Solicitud"**
5. Recibirás confirmación del envío

### 🔄 **Estados de Formularios**

- **Pendiente**: Formulario asignado pero no completado
- **Completado**: Formulario enviado y bloqueado
- **Editable**: Formulario completado pero con permisos de edición

---

## 👨‍💼 **GUÍA PARA ADMINISTRADORES**

### 🔐 **Acceso Administrativo**

1. Inicia sesión con credenciales de administrador
2. Accede al **Panel de Administración**

### 📊 **Dashboard Administrativo**

El dashboard muestra:
- **Estadísticas globales** del sistema
- **Acceso rápido** a gestión de formularios
- **Resumen de actividad** por banco

### 📋 **Gestión de Formularios**

#### **Vista Principal**
- **Estadísticas**: Total, activos, inactivos, asignaciones
- **Tarjetas de formularios** con información completa
- **Botones de acción**: Gestionar Asignaciones y Estructura

#### **Crear Nuevo Formulario**
1. Haz clic en **"Nuevo Formulario"**
2. Completa:
   - **Nombre** del formulario
   - **Descripción** detallada
   - **Fecha límite**
3. Haz clic en **"Crear Formulario"**
4. El formulario se asigna automáticamente a todos los bancos

#### **Cargar Formulario desde Excel**
1. Haz clic en **"Cargar Excel"**
2. Selecciona archivo **.xlsx**
3. Haz clic en **"Cargar Formulario"**
4. El sistema crea automáticamente la estructura

### ⚙️ **Gestionar Asignaciones**

En el modal de asignaciones puedes:

#### **Asignar/Desasignar Bancos**
- **Switch "Asignado"**: Activa/desactiva el formulario para cada banco
- Solo bancos asignados pueden ver el formulario

#### **Permisos de Edición por Banco**
- **Switch "Permitir Editar"**: Habilita edición para bancos específicos
- **Lógica importante**:
  - ❌ **Deshabilitado**: Si el banco no ha completado el formulario
  - ❌ **Deshabilitado**: Si el banco no está asignado
  - ✅ **Habilitado**: Solo para bancos que completaron el formulario

#### **Indicadores Visuales**
- **"Formulario completado"**: Banco terminó el formulario
- **"Formulario pendiente"**: Banco aún no completa
- **Fondo gris**: Formularios completados
- **Tooltip explicativo**: Para switches deshabilitados

### 🏗️ **Estructura de Formularios**

En el modal de estructura puedes:

#### **Configurar Columnas** (Solo formularios con Excel)
- **Tipo de dato**: texto, número, fecha, género
- **Campo requerido**: Marcar como obligatorio
- **Campo editable**: Permitir modificación por bancos

#### **Vista de Columnas**
- **Tabla detallada** con todas las columnas
- **Configuración en tiempo real**
- **Guardado automático** de cambios

### 📈 **Estados y Flujos**

#### **Flujo Típico de Formulario**
1. **Creación**: Admin crea formulario
2. **Asignación**: Se asigna a bancos seleccionados
3. **Completado**: Bancos completan formularios
4. **Revisión**: Admin revisa completados
5. **Permisos**: Admin habilita edición si necesario

#### **Gestión de Permisos**
- **Formulario nuevo** → Bancos pueden completar
- **Formulario completado** → Solo lectura por defecto
- **Permiso habilitado** → Banco puede editar nuevamente

### 🔄 **Sincronización en Tiempo Real**

- **Cambios inmediatos**: Todas las modificaciones se reflejan al instante
- **Persistencia**: Configuraciones se guardan en localStorage
- **Notificaciones**: Toast messages confirman acciones

---

## 🎯 **FLUJOS PRINCIPALES**

### **Flujo Banco - Completar Formulario**
1. Login → Dashboard → Formulario Pendiente
2. Clic "Editar" → Completar campos → Guardar
3. Estado cambia a "Completado" (tarjeta verde)

### **Flujo Banco - Solicitar Edición**
1. Dashboard → Formulario Completado (verde)
2. Clic "Solicitar Edición" → Escribir motivo → Enviar
3. Esperar aprobación del administrador

### **Flujo Admin - Habilitar Edición**
1. Gestión Formularios → Gestionar Asignaciones
2. Verificar que banco completó formulario
3. Activar switch "Permitir Editar"
4. Banco ve tarjeta amarilla y puede editar

### **Flujo Admin - Crear Formulario**
1. Nuevo Formulario → Completar datos → Crear
2. O Cargar Excel → Seleccionar archivo → Cargar
3. Gestionar Asignaciones → Configurar bancos
4. Estructura → Configurar columnas (si aplica)

---

## 🎨 **Códigos de Color**

### **Para Bancos**
- 🟢 **Verde**: Completado, solo lectura
- 🟡 **Amarillo**: Completado, editable
- ⚪ **Blanco**: Pendiente de completar

### **Para Administradores**
- 🟢 **Activo**: Formulario habilitado
- 🔴 **Inactivo**: Formulario deshabilitado
- 🔵 **Información**: Estadísticas y contadores

---

## ⚠️ **Notas Importantes**

### **Para Bancos**
- Solo puedes editar formularios asignados a tu banco
- Los formularios completados requieren solicitud para editar
- Guarda frecuentemente tu progreso

### **Para Administradores**
- Los permisos de edición solo funcionan en formularios completados
- Cambios en asignaciones son inmediatos
- Revisa regularmente las solicitudes de edición

---

## 🆘 **Soporte y Problemas Comunes**

### **No puedo editar un formulario**
- **Banco**: Verifica que esté asignado y tengas permisos
- **Admin**: Verifica que el banco haya completado el formulario primero

### **No veo un formulario**
- **Banco**: Contacta al administrador para verificar asignación
- **Admin**: Verifica que el formulario esté activo

### **Error al guardar**
- Verifica conexión a internet
- Completa todos los campos requeridos
- Contacta soporte técnico si persiste

---

## 📞 **Contacto**

Para soporte técnico o consultas:
- **Email**: admin@inquest.cl
- **Sistema**: Usar función "Solicitar Edición" para cambios en formularios

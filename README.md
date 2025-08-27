# Frontend Login Funcional

Frontend React para sistema de autenticación con JWT, conectado al backend con PostgreSQL en Render.

## 🚀 Características

- **Interfaz de usuario moderna** y responsiva
- **Autenticación JWT** completa
- **Gestión de estado** con React Hooks
- **Manejo de cookies** para persistencia de sesión
- **Validaciones de formularios** en tiempo real
- **Manejo de errores** mejorado
- **CRUD completo** de usuarios
- **Diseño responsive** para móviles y desktop

## 🛠️ Tecnologías

- **React 19** con Hooks
- **Axios** para peticiones HTTP
- **js-cookie** para manejo de cookies
- **CSS personalizado** para estilos
- **Componentes funcionales** modernos

## 📋 Requisitos Previos

- Node.js 16.0.0 o superior
- npm o yarn
- Backend funcionando en puerto 4000

## 🔧 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <tu-repositorio>
   cd front_login
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno** (opcional)
   
   Crear archivo `.env` en la raíz:
   ```env
   REACT_APP_API_URL=http://localhost:4000/api
   ```

4. **Ejecutar la aplicación**
   ```bash
   npm start
   ```

   La aplicación se abrirá en `http://localhost:3000`

## 🌐 Funcionalidades

### Autenticación
- **Registro de usuarios** con validaciones
- **Login** con JWT
- **Logout** automático
- **Persistencia de sesión** con cookies

### Gestión de Usuarios
- **Ver perfil** del usuario autenticado
- **Actualizar datos** personales
- **Cambiar contraseña** (opcional)
- **Eliminar cuenta** con confirmación

### Seguridad
- **Tokens JWT** automáticos en todas las peticiones
- **Manejo de expiración** de tokens
- **Redirección automática** al login si no está autenticado
- **Validación de formularios** en frontend

## 🎨 Componentes

### Login
- Formulario de inicio de sesión
- Validaciones en tiempo real
- Manejo de errores de autenticación

### Register
- Formulario de registro completo
- Validaciones de campos requeridos
- Creación automática de sesión

### Home
- Panel principal del usuario
- Información de la cuenta
- Botones de gestión

### Modales
- **UpdateModal**: Actualización de datos
- **DeleteModal**: Confirmación de eliminación

## 🔐 Manejo de JWT

### Almacenamiento
- Los tokens se guardan en cookies seguras
- Expiración configurada a 1 día
- Limpieza automática al logout

### Interceptores
- **Request**: Agrega automáticamente el token JWT
- **Response**: Maneja errores 401 y redirige al login

### Servicios
- **authService**: Manejo de autenticación
- **userService**: Operaciones CRUD de usuarios

## 📱 Diseño Responsive

- **Mobile-first** approach
- **Breakpoints** para diferentes tamaños de pantalla
- **Componentes adaptativos** para móviles y desktop
- **Navegación intuitiva** en todos los dispositivos

## 🚀 Despliegue

### Build de Producción
```bash
npm run build
```

### Variables de Entorno para Producción
```env
REACT_APP_API_URL=https://tu-backend.com/api
```

### Servidor Web
- Servir archivos estáticos desde la carpeta `build`
- Configurar SPA routing (redirect a index.html)

## 🔧 Configuración

### API Base URL
Por defecto apunta a `http://localhost:4000/api`. Para cambiar:

1. Crear archivo `.env`:
   ```env
   REACT_APP_API_URL=https://tu-backend.com/api
   ```

2. Reiniciar la aplicación

### Cookies
- **jwt_token**: Token de autenticación
- **user_data**: Datos del usuario autenticado
- Expiración: 1 día
- Seguras: Solo HTTPS en producción

## 🐛 Solución de Problemas

### Error de Conexión al Backend
- Verificar que el backend esté ejecutándose
- Verificar la URL en `REACT_APP_API_URL`
- Verificar configuración CORS en el backend

### Problemas de Autenticación
- Verificar que las cookies estén habilitadas
- Verificar que el token JWT sea válido
- Verificar expiración del token

### Problemas de Build
- Verificar versión de Node.js (>=16.0.0)
- Limpiar cache: `npm run build -- --reset-cache`
- Verificar dependencias: `npm install`

## 📝 Estructura del Proyecto

```
src/
├── App.js              # Componente principal
├── App.css             # Estilos principales
├── Modal.css           # Estilos de modales
├── services/
│   └── api.js         # Servicios de API y autenticación
└── index.js            # Punto de entrada
```

## 🔒 Seguridad

- **Tokens JWT** con expiración
- **Cookies seguras** en producción
- **Validación de entrada** en frontend
- **Manejo de errores** sin exponer información sensible
- **Redirección automática** para usuarios no autenticados

## 📞 Soporte

Para reportar bugs o solicitar características, crear un issue en el repositorio.

## 📄 Licencia

MIT License - ver archivo LICENSE para más detalles.

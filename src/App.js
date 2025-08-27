import React, { useState, useEffect } from 'react';
import './App.css';
import './Modal.css';
import { authService, userService } from './services/api';

function Login({ goToRegister, onLogin }) {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usuario || !password) {
      alert('Por favor completa todos los campos');
      return;
    }
    setLoading(true);
    try {
      await onLogin({ usuario, contrasena: password });
    } catch (error) {
      alert(error.error || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="title">Iniciar Sesión</div>
        <form onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={e => setUsuario(e.target.value)}
            required
          />
          <input
            className="input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button 
            className="button" 
            type="submit"
            disabled={loading}
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
        <div className="link" onClick={goToRegister}>
          ¿Eres nuevo? Regístrate
        </div>
      </div>
    </div>
  );
}

function Register({ goToLogin, onRegister }) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !correo || !usuario || !password) {
      alert('Por favor completa todos los campos');
      return;
    }
    setLoading(true);
    try {
      await onRegister({ nombre, correo, usuario, contrasena: password });
    } catch (error) {
      alert(error.error || 'Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="title">Registro</div>
        <form onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            required
          />
          <input
            className="input"
            type="email"
            placeholder="Correo"
            value={correo}
            onChange={e => setCorreo(e.target.value)}
            required
          />
          <input
            className="input"
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={e => setUsuario(e.target.value)}
            required
          />
          <input
            className="input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button 
            className="button" 
            type="submit"
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
        <div className="link" onClick={goToLogin}>
          ¿Ya tienes cuenta? Inicia sesión
        </div>
      </div>
    </div>
  );
}

function UpdateModal({ open, onClose, onSubmit, initial }) {
  const [nombre, setNombre] = useState(initial.nombre || '');
  const [correo, setCorreo] = useState(initial.correo || '');
  const [contrasena, setContrasena] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({ nombre, correo, contrasena });
      onClose();
    } catch (error) {
      alert(error.error || 'Error al actualizar datos');
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;
  
  return (
    <div className="modal-bg">
      <div className="modal">
        <div className="modal-title">Actualizar datos</div>
        <form onSubmit={handleSubmit}>
          <input 
            className="input" 
            type="text" 
            placeholder="Usuario" 
            value={initial.usuario} 
            disabled 
          />
          <input 
            className="input" 
            type="text" 
            placeholder="Nombre" 
            value={nombre} 
            onChange={e => setNombre(e.target.value)} 
            required
          />
          <input 
            className="input" 
            type="email" 
            placeholder="Correo" 
            value={correo} 
            onChange={e => setCorreo(e.target.value)} 
            required
          />
          <input 
            className="input" 
            type="password" 
            placeholder="Nueva contraseña (opcional)" 
            value={contrasena} 
            onChange={e => setContrasena(e.target.value)} 
          />
          <div className="modal-btns">
            <button 
              type="button" 
              className="modal-btn cancel" 
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="modal-btn"
              disabled={loading}
            >
              {loading ? 'Actualizando...' : 'Actualizar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteModal({ open, onClose, onConfirm }) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } catch (error) {
      alert(error.error || 'Error al eliminar cuenta');
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;
  
  return (
    <div className="modal-bg">
      <div className="modal">
        <div className="modal-title">¿Seguro que deseas borrar la cuenta?</div>
        <div style={{marginBottom:'1rem'}}>Esta acción no se puede deshacer.</div>
        <div className="modal-btns">
          <button 
            className="modal-btn cancel" 
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </button>
          <button 
            className="modal-btn" 
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? 'Eliminando...' : 'Borrar'}
          </button>
        </div>
      </div>
    </div>
  );
}

function Home({ usuario, onLogout, onDelete, onUpdate, userData }) {
  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 600 }}>
        <div className="top-buttons">
          <button className="button" onClick={onUpdate}>Actualizar datos</button>
          <button className="button" onClick={onDelete}>Eliminar cuenta</button>
          <button className="button" onClick={onLogout}>Cerrar sesión</button>
        </div>
        <div className="welcome">
          ¡Bienvenido{usuario ? `, ${usuario}` : ''}!
        </div>
        <div style={{ textAlign: 'center', color: '#6366f1', marginBottom: '1rem' }}>
          Esta es tu pantalla principal.
        </div>
        {userData && (
          <div style={{ textAlign: 'left', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <h4>Información de tu cuenta:</h4>
            <p><strong>ID:</strong> {userData.id}</p>
            <p><strong>Nombre:</strong> {userData.nombre}</p>
            <p><strong>Usuario:</strong> {userData.usuario}</p>
            <p><strong>Correo:</strong> {userData.correo}</p>
            <p><strong>Fecha de creación:</strong> {new Date(userData.fecha_creacion).toLocaleDateString()}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [userData, setUserData] = useState({});
  const [pantalla, setPantalla] = useState('login');
  const [usuario, setUsuario] = useState('');

  // Verificar autenticación al cargar la aplicación
  useEffect(() => {
    if (authService.isAuthenticated()) {
      const user = authService.getUser();
      if (user) {
        setUsuario(user.usuario);
        setUserData(user);
        setPantalla('home');
      }
    }
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const data = await authService.login(credentials);
      if (data.success) {
        setUsuario(data.user.usuario);
        setUserData(data.user);
        setPantalla('home');
        alert('Inicio de sesión exitoso');
      } else {
        alert(data.error || 'Error al iniciar sesión');
      }
    } catch (err) {
      throw err;
    }
  };

  const handleRegister = async (datos) => {
    try {
      const data = await authService.register(datos);
      if (data.success) {
        setUsuario(data.user.usuario);
        setUserData(data.user);
        setPantalla('home');
        alert('Registro exitoso');
      } else {
        alert(data.error || 'Error al registrar usuario');
      }
    } catch (err) {
      throw err;
    }
  };

  const handleLogout = () => {
    authService.logout();
    setUsuario('');
    setUserData({});
    setPantalla('login');
  };

  const handleDelete = () => {
    setShowDelete(true);
  };

  const confirmDelete = async () => {
    if (!userData.id) return;
    try {
      const data = await userService.deleteUser(userData.id);
      if (data.success) {
        alert('Cuenta eliminada correctamente');
        setShowDelete(false);
        setUsuario('');
        setUserData({});
        setPantalla('login');
      } else {
        alert(data.error || 'Error al eliminar cuenta');
      }
    } catch (err) {
      throw err;
    }
  };

  const handleUpdate = () => {
    setShowUpdate(true);
  };

  const submitUpdate = async ({nombre, correo, contrasena}) => {
    if (!userData.id) return;
    try {
      const updateData = {};
      if (nombre) updateData.nombre = nombre;
      if (correo) updateData.correo = correo;
      if (contrasena) updateData.contrasena = contrasena;

      const data = await userService.updateUser(userData.id, updateData);
      if (data.success) {
        alert('Datos actualizados correctamente');
        setUserData({...userData, ...data.user});
        setShowUpdate(false);
      } else {
        alert(data.error || 'Error al actualizar datos');
      }
    } catch (err) {
      throw err;
    }
  };

  if (pantalla === 'login') {
    return <Login goToRegister={() => setPantalla('register')} onLogin={handleLogin} />;
  }
  if (pantalla === 'register') {
    return <Register goToLogin={() => setPantalla('login')} onRegister={handleRegister} />;
  }
  
  return (
    <>
      <Home 
        usuario={usuario} 
        userData={userData} 
        onLogout={handleLogout} 
        onDelete={handleDelete} 
        onUpdate={handleUpdate} 
      />
      <UpdateModal 
        open={showUpdate} 
        onClose={() => setShowUpdate(false)} 
        onSubmit={submitUpdate} 
        initial={{usuario, ...userData}} 
      />
      <DeleteModal 
        open={showDelete} 
        onClose={() => setShowDelete(false)} 
        onConfirm={confirmDelete} 
      />
    </>
  );
}

export default App;

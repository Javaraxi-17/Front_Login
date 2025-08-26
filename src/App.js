import React, { useState } from 'react';
import './App.css';
import './Modal.css';

function Login({ goToRegister, onLogin }) {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="container">
      <div className="card">
        <div className="title">Iniciar Sesión</div>
        <input
          className="input"
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={e => setUsuario(e.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="button" onClick={() => onLogin(usuario)}>
          Ingresar
        </button>
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

  return (
    <div className="container">
      <div className="card">
        <div className="title">Registro</div>
        <input
          className="input"
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />
        <input
          className="input"
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={e => setCorreo(e.target.value)}
        />
        <input
          className="input"
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={e => setUsuario(e.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="button" onClick={() => onRegister({ nombre, correo, usuario })}>
          Registrarse
        </button>
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
  if (!open) return null;
  return (
    <div className="modal-bg">
      <div className="modal">
        <div className="modal-title">Actualizar datos</div>
        <input className="input" type="text" placeholder="Usuario" value={initial.usuario} disabled />
        <input className="input" type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
        <input className="input" type="email" placeholder="Correo" value={correo} onChange={e => setCorreo(e.target.value)} />
        <input className="input" type="password" placeholder="Nueva contraseña" value={contrasena} onChange={e => setContrasena(e.target.value)} />
        <div className="modal-btns">
          <button className="modal-btn cancel" onClick={onClose}>Cancelar</button>
          <button className="modal-btn" onClick={() => onSubmit({nombre, correo, contrasena})}>Actualizar</button>
        </div>
      </div>
    </div>
  );
}

function DeleteModal({ open, onClose, onConfirm }) {
  if (!open) return null;
  return (
    <div className="modal-bg">
      <div className="modal">
        <div className="modal-title">¿Seguro que deseas borrar la cuenta?</div>
        <div style={{marginBottom:'1rem'}}>Esta acción no se puede deshacer.</div>
        <div className="modal-btns">
          <button className="modal-btn cancel" onClick={onClose}>Cancelar</button>
          <button className="modal-btn" onClick={onConfirm}>Borrar</button>
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
        <div style={{ textAlign: 'center', color: '#6366f1' }}>
          Esta es tu pantalla principal.
        </div>
      </div>
    </div>
  );
}

function App() {
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [userData, setUserData] = useState({});
  const [pantalla, setPantalla] = useState('login'); // login | register | home
  const [usuario, setUsuario] = useState('');

  const handleLogin = async (usuario) => {
    // Obtener datos completos del usuario tras login
    try {
      const res = await fetch('http://localhost:4000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, contrasena: document.querySelector('input[type="password"]').value })
      });
      const data = await res.json();
      if (res.ok) {
        setUsuario(data.user.usuario);
        setUserData(data.user); // data.user.id queda guardado
        setPantalla('home');
        alert('Inicio de sesión exitoso');
      } else {
        alert(data.error || 'Error al iniciar sesión');
      }
    } catch (err) {
      alert('Error de red: ' + err.message);
    }
  };

  const handleRegister = async (datos) => {
    try {
      const res = await fetch('http://localhost:4000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...datos, contrasena: document.querySelectorAll('input[type="password"]')[0].value })
      });
      const data = await res.json();
      if (res.ok) {
        setUsuario(data.usuario || datos.usuario);
        setUserData(data); // data.id queda guardado
        setPantalla('home');
        alert('Registro exitoso');
      } else {
        alert(data.error || 'Error al registrar usuario');
      }
    } catch (err) {
      alert('Error de red: ' + err.message);
    }
  };

  const handleLogout = () => {
    setUsuario('');
    setPantalla('login');
  };
  const handleDelete = async () => {
    setShowDelete(true);
  };
  const confirmDelete = async () => {
    if (!usuario) return;
    try {
      const res = await fetch(`http://localhost:4000/api/users/${userData.id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      setShowDelete(false);
      if (res.ok) {
        alert('Cuenta eliminada correctamente');
        setUsuario('');
        setPantalla('login');
      } else {
        alert(data.error || 'Error al eliminar cuenta');
      }
    } catch (err) {
      setShowDelete(false);
      alert('Error de red: ' + err.message);
    }
  };
  const handleUpdate = () => {
    setShowUpdate(true);
  };
  const submitUpdate = async ({nombre, correo, contrasena}) => {
    if (!usuario) return;
    try {
      const res = await fetch(`http://localhost:4000/api/users/${userData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: nombre || userData.nombre,
          correo: correo || userData.correo,
          contrasena,
          usuario
        })
      });
      const data = await res.json();
      setShowUpdate(false);
      if (res.ok) {
        alert('Datos actualizados correctamente');
        setUserData({...userData, nombre: nombre || userData.nombre, correo: correo || userData.correo});
      } else {
        alert(data.error || 'Error al actualizar datos');
      }
    } catch (err) {
      setShowUpdate(false);
      alert('Error de red: ' + err.message);
    }
  };

  if (pantalla === 'login') {
    return <Login goToRegister={() => setPantalla('register')} onLogin={handleLogin} />;
  }
  if (pantalla === 'register') {
    return <Register goToLogin={() => setPantalla('login')} onRegister={handleRegister} />;
  }
  return <>
    <Home usuario={usuario} userData={userData} onLogout={handleLogout} onDelete={handleDelete} onUpdate={handleUpdate} />
    <UpdateModal open={showUpdate} onClose={()=>setShowUpdate(false)} onSubmit={submitUpdate} initial={{usuario, ...userData}} />
    <DeleteModal open={showDelete} onClose={()=>setShowDelete(false)} onConfirm={confirmDelete} />
  </>;
}


export default App;

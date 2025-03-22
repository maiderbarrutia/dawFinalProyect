import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postRequest } from '../../services/api';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await postRequest('/empresas/login', { email_empresa: email, contrasena_empresa: password });
      if (data.token) {
        localStorage.setItem('token', data.token); // Guardar el token en localStorage
        navigate('/dashboard'); // Redirigir a la página de dashboard
      } else {
        setError('Error en login: ' + data.message);
      }
    } catch (error) {
      setError('Error en login: ' + (error instanceof Error ? error.message : ''));
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Iniciar sesión</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
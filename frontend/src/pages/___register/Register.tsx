import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postRequest } from '../../services/api';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre_empresa: '',
    email_empresa: '',
    contrasena_empresa: '',
    tipo_empresa: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await postRequest<{ message: string }>('/empresas', formData);

      if (data.message === 'Empresa creada') {
        navigate('/login'); // Redirigir a la página de login
      } else {
        setError('Error en registro: ' + data.message);
      }
    } catch (error) {
      setError('Error en registro: ' + (error instanceof Error ? error.message : ''));
    }
  };

  return (
    <div>
      <h2>Registro de Empresa</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre_empresa"
          placeholder="Nombre de la empresa"
          value={formData.nombre_empresa}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email_empresa"
          placeholder="Email"
          value={formData.email_empresa}
          onChange={handleChange}
        />
        <input
          type="password"
          name="contrasena_empresa"
          placeholder="Contraseña"
          value={formData.contrasena_empresa}
          onChange={handleChange}
        />
        <input
          type="text"
          name="tipo_empresa"
          placeholder="Tipo de empresa"
          value={formData.tipo_empresa}
          onChange={handleChange}
        />
        <button type="submit">Registrar</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Register;
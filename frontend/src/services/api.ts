const API_URL = 'http://localhost:3003/api'; // Cambia esta URL si es necesario

// Función para hacer solicitudes POST al backend
const postRequest = async (endpoint: string, data: object) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }), // Añadir el token si está disponible
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

// Función para hacer solicitudes GET al backend
const getRequest = async (endpoint: string) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }), // Añadir el token si está disponible
    },
  });
  return response.json();
};

export { postRequest, getRequest };

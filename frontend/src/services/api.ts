const API_URL = '/api'; // Cambia esta URL si es necesario

// Función para hacer solicitudes POST al backend
const postRequest = async <T>(endpoint: string, data: object, includeToken: boolean = true): Promise<T> => {
  const token = localStorage.getItem('token');
  
  // Solo se incluye el token si es necesario
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (includeToken && token) {
    headers['Authorization'] = `Bearer ${token}`; // Añadir el token si está disponible y es necesario
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    });

    // Verifica si la respuesta fue exitosa
    if (!response.ok) {
      throw new Error(`Error en la solicitud POST: ${response.statusText}`);
    }

    return await response.json(); // Devolvemos los datos de la API
  } catch (error) {
    console.error('Error en la solicitud POST', error);
    throw error; // Propaga el error
  }
};

// Función para hacer solicitudes GET al backend
const getRequest = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Verifica si la respuesta fue exitosa
    if (!response.ok) {
      throw new Error(`Error en la solicitud GET: ${response.statusText}`);
    }

    return await response.json(); // Devolvemos los datos de la API
  } catch (error) {
    console.error('Error en la solicitud GET', error);
    throw error; // Propaga el error
  }
};

export { postRequest, getRequest };

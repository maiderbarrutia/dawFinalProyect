const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;

const postRequest = async <T>(endpoint: string, data: object | FormData, includeToken: boolean = true): Promise<T> => {
  const token = localStorage.getItem('token');
  const headers: HeadersInit = {};

  if (includeToken && token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  let body: FormData | string;

  if (data instanceof FormData) {
    body = data;
  } else {
    body = JSON.stringify(data);
    headers['Content-Type'] = 'application/json';
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body,
    });

    const responseData = await response.json();

    if (!response.ok) {
      const errorMessage: string = responseData.message || response.statusText || 'Error en la solicitud';
      throw new Error(errorMessage);
    }

    return responseData as T;
  } catch (error) {
    console.error('Error en la solicitud POST:', error);
    throw error instanceof Error ? error : new Error('Error desconocido en la solicitud');
  }
};

const postRequestById = async <T>(endpoint: string, data: object | FormData, companyId: string, includeToken: boolean = true): Promise<T> => {
  const token = localStorage.getItem('token');

  // Si estamos enviando FormData, no se debe incluir el encabezado 'Content-Type'
  const headers: HeadersInit = {};

  if (includeToken && token) {
    headers['Authorization'] = `Bearer ${token}`; // Añadir el token si está disponible y es necesario
  }

  // Creamos el body dependiendo del tipo de datos
  const body = data instanceof FormData ? data : JSON.stringify(data);

  // Si no estamos enviando FormData, especificamos el Content-Type como 'application/json'
  if (!(data instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  try {
    // Usamos el companyId en la URL
    const response = await fetch(`${API_URL}${endpoint}/${companyId}`, {
      method: 'POST',
      headers: headers,
      body: body, // El body se establece según el tipo de datos
    });

    // Verifica si la respuesta fue exitosa
    if (!response.ok) {
      const errorMessage = await response.text(); // Puedes obtener el mensaje de error
      // En el caso de un error 409, que es un conflicto, lo podemos manejar específicamente
      if (response.status === 409) {
        throw new Error(`Conflicto: ${errorMessage || 'El correo electrónico o CIF ya están registrados.'}`);
      }
      // Para otros códigos de error, puedes lanzar un error genérico o específico
      throw new Error(`Error en la solicitud POST: ${errorMessage || response.statusText}`);
    }

    return await response.json(); // Devolvemos los datos de la API
  } catch (error) {
    console.error('Error en la solicitud POST por ID', error);
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
      const errorMessage = await response.text(); // Obtén el mensaje de error
      throw new Error(`Error en la solicitud GET: ${errorMessage || response.statusText}`);
    }

    return await response.json(); // Devolvemos los datos de la API
  } catch (error) {
    console.error('Error en la solicitud GET', error);
    throw error; // Propaga el error
  }
};

const getRequestById = async <T>(endpoint: string, companyId: string): Promise<T> => {
  try {
    const response = await fetch(`${API_URL}${endpoint}/${companyId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Verifica si la respuesta fue exitosa
    if (!response.ok) {
      const errorMessage = await response.text(); // Obtén el mensaje de error
      throw new Error(`Error en la solicitud GET: ${errorMessage || response.statusText}`);
    }

    return await response.json(); // Devolvemos los datos de la API
  } catch (error) {
    console.error('Error en la solicitud GET', error);
    throw error; // Propaga el error
  }
};

const deleteRequest = async (endpoint: string, includeToken: boolean = true): Promise<void> => {
  const token = localStorage.getItem('token');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (includeToken && token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error en la solicitud DELETE: ${errorMessage || response.statusText}`);
    }
  } catch (error) {
    console.error('Error en la solicitud DELETE:', error);
    throw error instanceof Error ? error : new Error('Error desconocido en la solicitud DELETE');
  }
};



export { postRequest, postRequestById, getRequest, getRequestById, deleteRequest };
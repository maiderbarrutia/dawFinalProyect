import jwt_decode from 'jwt-decode';

// Definir la interfaz para el token decodificado
interface DecodedToken {
  id: string;  // Usamos 'id' si ese es el campo que contiene el company_id
}

export const getCompanyIdFromToken = (): string | null => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    console.error('No token found in localStorage');
    return null;
  }

  try {
    // Decodificamos el token y especificamos el tipo de datos que esperamos
    const decodedToken: DecodedToken = jwt_decode(token);

    return decodedToken.id;  // Aquí usamos 'id', ya que es el campo correcto según tu ejemplo
  } catch (error) {
    console.error('Error al decodificar el token', error);
    return null;
  }
};
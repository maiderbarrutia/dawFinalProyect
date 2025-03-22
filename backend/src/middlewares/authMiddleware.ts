import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Cargar las variables de entorno
dotenv.config();

declare global {
    namespace Express {
        interface Request {
            id_empresa?: number; // Cambié de empresaId a id_empresa para que coincida con tu modelo
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => { // Cambiado a void
    // Obtener el token del encabezado Authorization
    const token = req.headers["authorization"];

    // Si no existe un token, devolver error 403 (Prohibido)
    if (!token) {
        res.status(403).json({ message: "Token requerido" }); // No retornamos, solo usamos res
        return; // Salir de la función
    }

    // Verificar el token utilizando JWT_SECRET desde las variables de entorno
    try {
        // Eliminar el prefijo "Bearer " si está presente
        const tokenWithoutBearer = token.startsWith("Bearer ") ? token.slice(7) : token;
        
        // Verificar y decodificar el token
        const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET!) as jwt.JwtPayload;

        // Si el token es válido, adjuntar la información decodificada al objeto req
        if (typeof decoded === "object" && decoded.id) {
            req.id_empresa = decoded.id; // Almacenar el id de la empresa
            next(); // Llamar a next para continuar con la siguiente función
        } else {
            res.status(401).json({ message: "Token inválido o expirado" }); // No retornamos, solo usamos res
        }
    } catch (err) {
        // Si hay un error al verificar el token (expirado, inválido, etc.), devolver error 401
        res.status(401).json({ message: "Token inválido o expirado" }); // No retornamos, solo usamos res
    }
};
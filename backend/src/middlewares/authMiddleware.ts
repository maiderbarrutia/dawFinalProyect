import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Cargar las variables de entorno
dotenv.config();

declare global {
    namespace Express {
        interface Request {
            id_empresa?: number;
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {

    // Obtener el token del encabezado Authorization
    const token = req.headers["authorization"];

    // Verificar si existe el token
    if (!token) {
        res.status(403).json({ message: "Token requerido" });
        return;
    }

    // Verificar el token utilizando JWT_SECRET desde las variables de entorno
    try {
        // Eliminar el prefijo "Bearer " si existe en el token
        const tokenWithoutBearer = token.startsWith("Bearer ") ? token.slice(7) : token;
        
        // Verificar y decodificar el token usando la clave secreta de JWT
        const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET!) as jwt.JwtPayload;

         // Verificar si el token es válido y contiene el id
        if (typeof decoded === "object" && decoded.id) {
            req.id_empresa = decoded.id;
            next(); 
        } else {
            res.status(401).json({ message: "Token inválido o expirado" });
        }

    } catch (err) {
        res.status(401).json({ message: "Token inválido o expirado" }); 
    }
};
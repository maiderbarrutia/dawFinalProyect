"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
// Cargar las variables de entorno
dotenv_1.default.config();
const authMiddleware = (req, res, next) => {
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
        const decoded = jsonwebtoken_1.default.verify(tokenWithoutBearer, process.env.JWT_SECRET);
        // Verificar si el token es válido y contiene el id
        if (typeof decoded === "object" && decoded.id) {
            req.id_empresa = decoded.id;
            next();
        }
        else {
            res.status(401).json({ message: "Token inválido o expirado" });
        }
    }
    catch (err) {
        res.status(401).json({ message: "Token inválido o expirado" });
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map
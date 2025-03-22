import dotenv from "dotenv";
import { Request, Response } from "express";
import { Empresa } from "../../entities/Empresa";
import dataSource from "../../config/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Cargar las variables de entorno
dotenv.config();

export const loginEmpresa = async (req: Request, res: Response): Promise<void> => { // Cambiado a Promise<void>
    const { email_empresa, contrasena_empresa } = req.body;

    try {
        // Buscar la empresa por el email
        const repo = dataSource.getRepository(Empresa);
        const empresa = await repo.findOne({ where: { email_empresa } });

        // Si no existe la empresa, devolver error
        if (!empresa) {
            res.status(404).json({ message: 'Empresa no encontrada' }); // No retornar, solo llamar a res
            return; // Salir de la función
        }

        // Verificar si la contraseña es correcta
        const validPass = await bcrypt.compare(contrasena_empresa, empresa.contrasena_empresa);
        if (!validPass) {
            res.status(401).json({ message: 'Contraseña incorrecta' });
            return; // Salir de la función
        }

        // Crear un token JWT
        const token = jwt.sign({ id: empresa.id_empresa }, process.env.JWT_SECRET!, { expiresIn: '2h' });

        // Devolver el token al cliente
        res.status(200).json({ token }); // Solo hacer res.status(...) para devolver la respuesta
    } catch (error) {
        // Manejo de errores
        res.status(500).json({ message: 'Error en login', error });
    }
};

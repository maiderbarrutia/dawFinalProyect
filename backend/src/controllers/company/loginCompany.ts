import dotenv from "dotenv";
import { Request, Response } from "express";
import { Company } from "../../entities/Company";
import dataSource from "../../config/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Cargar las variables de entorno
dotenv.config();

export const loginCompany = async (req: Request, res: Response): Promise<void> => { 
    const { company_email, company_password } = req.body;

    try {
        // Buscar la empresa por el email
        const repo = dataSource.getRepository(Company);
        const company = await repo.findOne({ where: { company_email } });

        // Si no existe la empresa, devolver error
        if (!company) {
            res.status(404).json({ message: 'Empresa no encontrada' }); // No retornar, solo llamar a res
            return; // Salir de la función
        }

        // Verificar si la contraseña es correcta
        const validPass = await bcrypt.compare(company_password, company.company_password);
        if (!validPass) {
            res.status(401).json({ message: 'Contraseña incorrecta' });
            return;
        }

        // Crear un token JWT
        const token = jwt.sign({ id: company.company_id }, process.env.JWT_SECRET!, { expiresIn: '2h' });

        // Devolver el token al cliente
        res.status(200).json({ token });
    } catch (error) {
        // Manejo de errores
        res.status(500).json({ message: 'Error en login', error });
    }
};

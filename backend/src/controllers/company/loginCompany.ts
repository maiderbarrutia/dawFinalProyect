import dotenv from "dotenv";
import { Request, Response } from "express";
import { Company } from "../../entities/Company";
import dataSource from "../../config/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

export const loginCompany = async (req: Request, res: Response): Promise<void> => { 
    const { company_email, company_password } = req.body;

    try {
        // Verificar que los datos se han introducido
        if (!company_email || !company_password) {
            res.status(400).json({ message: 'Por favor, ingresa tanto el correo electrónico como la contraseña.' });
            return;
        }

        // Buscar la empresa por el email
        const repo = dataSource.getRepository(Company);
        const company = await repo.findOne({ where: { company_email } });

        if (!company) {
            res.status(404).json({ message: 'Empresa no encontrada' });
            return;
        }

        // Verificar si la contraseña es correcta usando bcrypt.compare
        const validPass = await bcrypt.compare(company_password, company.company_password);

        // Si la contraseña es incorrecta
        if (!validPass) {
            res.status(401).json({ message: 'Contraseña incorrecta' });
            return;
        }

        // Crear un token JWT
        const token = jwt.sign({ id: company.company_id }, process.env.JWT_SECRET!, { expiresIn: '2h' });

        // Devolver el token al cliente
        res.status(200).json({ token });

    } catch (error) {
        if (error instanceof Error) {
            console.error("Error en login:", error.message);
            res.status(500).json({ message: 'Error en login. Inténtalo más tarde.', error: error.message });
        } else {
            console.error("Error inesperado:", error);
            res.status(500).json({ message: 'Error inesperado en el servidor.' });
        }
    }
};

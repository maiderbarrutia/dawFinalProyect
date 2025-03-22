import { Request, Response } from "express";
import { Empresa } from "../../entities/Empresa";
import dataSource from "../../config/database";
import bcrypt from "bcrypt";

export const createEmpresa = async (req: Request, res: Response): Promise<void> => {
  const {
    nombre_empresa,
    tipo_empresa,
    logo_empresa,
    cif_empresa,
    persona_contacto,
    telefono_empresa,
    direccion_empresa,
    web_empresa,
    email_empresa,
    contrasena_empresa,
  } = req.body;

  if (!nombre_empresa || !cif_empresa || !email_empresa || !contrasena_empresa) {
    res.status(400).json({
      message: "Los campos nombre_empresa, cif_empresa, email_empresa y contrasena_empresa son obligatorios.",
    });
    return;
  }

  try {
    const empresaRepo = dataSource.getRepository(Empresa);

    const existeEmail = await empresaRepo.findOne({ where: { email_empresa } });
    if (existeEmail) {
      res.status(409).json({ message: "El correo electrónico ya está en uso." });
      return;
    }

    const existeCIF = await empresaRepo.findOne({ where: { cif_empresa } });
    if (existeCIF) {
      res.status(409).json({ message: "El CIF ya está en uso." });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(contrasena_empresa, salt);

    const empresa = empresaRepo.create({
      nombre_empresa,
      tipo_empresa,
      logo_empresa,
      cif_empresa,
      persona_contacto,
      telefono_empresa,
      direccion_empresa,
      web_empresa,
      email_empresa,
      contrasena_empresa: hashPassword, // Aquí ya encriptada
    });

    const nuevaEmpresa = await empresaRepo.save(empresa);

    const { contrasena_empresa: _, ...empresaSinPass } = nuevaEmpresa;

    res.status(201).json({
      message: "Empresa creada exitosamente",
      empresa: empresaSinPass, // No devolvemos la contraseña
    });
  } catch (error: any) {
    console.error("Error al crear empresa:", error);
    res.status(500).json({
      message: "Error al crear la empresa.",
      error: error.message || error,
    });
  }
};

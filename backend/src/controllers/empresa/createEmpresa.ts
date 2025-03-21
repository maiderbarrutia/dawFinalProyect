import { Request, Response } from "express";
import { Empresa } from "../../entities/Empresa";
import dataSource from "../../config/database";

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

  // Validar que los campos requeridos no estén vacíos
  if (!nombre_empresa || !cif_empresa || !email_empresa || !contrasena_empresa) {
    res.status(400).json({
      message: "Los campos nombre_empresa, cif_empresa, email_empresa y contrasena_empresa son obligatorios.",
    });
    return; // Detener ejecución después de enviar la respuesta
  }

  try {
    // Crear y guardar la empresa
    const empresa = dataSource.getRepository(Empresa).create({
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
    });
    const nuevaEmpresa = await dataSource.getRepository(Empresa).save(empresa);

    res.status(201).json({
      message: "Empresa creada exitosamente",
      empresa: nuevaEmpresa,
    });
  } catch (error: any) {
    // Manejo de errores, como duplicados
    if (error.code === "ER_DUP_ENTRY") {
      res.status(409).json({
        message: "El CIF o el correo electrónico ya están en uso.",
      });
      return;
    }

    console.error("Error al crear empresa:", error);
    res.status(500).json({
      message: "Error al crear la empresa.",
      error: error.message || error,
    });
  }
};

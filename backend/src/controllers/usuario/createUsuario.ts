import { Request, Response } from "express";
import { Usuario } from "../../entities/Usuario";
import dataSource from "../../config/database";

export const createUsuario = async (req: Request, res: Response): Promise<void> => {
    const { nombre_usuario, apellidos_usuario, email_usuario, telefono_usuario, ciudad_usuario, contrasena_usuario } =
      req.body;
  
    try {
      const usuario = dataSource.getRepository(Usuario).create({
        nombre_usuario,
        apellidos_usuario,
        email_usuario,
        telefono_usuario,
        ciudad_usuario,
        contrasena_usuario,
      });
      await dataSource.getRepository(Usuario).save(usuario);
      res.status(201).json({ message: "Usuario creado exitosamente", usuario });
    } catch (error) {
      console.error("Error al crear usuario:", error);
      res.status(500).json({ message: "Error al crear usuario", error });
    }
  };
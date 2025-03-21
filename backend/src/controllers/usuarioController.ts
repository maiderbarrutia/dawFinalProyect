import { Request, Response } from "express";
import { Usuario } from "../entities/Usuario";
import dataSource from "../config/database";

// Obtener todos los usuarios
export const getUsuarios = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuarios = await dataSource.getRepository(Usuario).find();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: "Error al obtener usuarios", error });
  }
};

// Obtener un usuario por ID
export const getUsuarioById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const usuario = await dataSource.getRepository(Usuario).findOneBy({ id_usuario: parseInt(id) });
    if (!usuario) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }
    res.status(200).json(usuario);
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    res.status(500).json({ message: "Error al obtener usuario", error });
  }
};

// Crear un nuevo usuario
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

// Actualizar un usuario
export const updateUsuario = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const usuario = await dataSource.getRepository(Usuario).findOneBy({ id_usuario: parseInt(id) });
    if (!usuario) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    const updatedUsuario = dataSource.getRepository(Usuario).merge(usuario, updatedData);
    await dataSource.getRepository(Usuario).save(updatedUsuario);
    res.status(200).json({ message: "Usuario actualizado exitosamente", updatedUsuario });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ message: "Error al actualizar usuario", error });
  }
};

// Eliminar un usuario
export const deleteUsuario = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const usuario = await dataSource.getRepository(Usuario).findOneBy({ id_usuario: parseInt(id) });
    if (!usuario) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    await dataSource.getRepository(Usuario).remove(usuario);
    res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ message: "Error al eliminar usuario", error });
  }
};
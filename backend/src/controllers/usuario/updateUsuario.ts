import { Request, Response } from "express";
import { Usuario } from "../../entities/Usuario";
import dataSource from "../../config/database";

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
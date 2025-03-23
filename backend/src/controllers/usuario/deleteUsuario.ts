import { Request, Response } from "express";
import { Usuario } from "../../entities/Usuario";
import dataSource from "../../config/database";

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
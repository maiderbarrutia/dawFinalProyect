import { Request, Response } from "express";
import { UserData } from "../../entities/UserData";
import dataSource from "../../config/database";

export const deleteUserData = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
  
    try {
      const userData = await dataSource.getRepository(UserData).findOneBy({ user_id: parseInt(id) });
      if (!userData) {
        res.status(404).json({ message: "Usuario no encontrado" });
        return;
      }
  
      await dataSource.getRepository(UserData).remove(userData);
      res.status(200).json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      res.status(500).json({ message: "Error al eliminar usuario", error });
    }
  };
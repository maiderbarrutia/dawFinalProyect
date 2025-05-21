import { Request, Response } from "express";
import { UserData } from "../../entities/UserData";
import dataSource from "../../config/database";

export const updateUserData = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updatedData = req.body;
  
    try {
      const userData = await dataSource.getRepository(UserData).findOneBy({ user_id: parseInt(id) });
      
      if (!userData) {
        res.status(404).json({ message: "Usuario no encontrado" });
        return;
      }
  
      const updatedUserData = dataSource.getRepository(UserData).merge(userData, updatedData);

      await dataSource.getRepository(UserData).save(updatedUserData);

      res.status(200).json({ message: "Usuario actualizado exitosamente", updatedUserData });

    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      res.status(500).json({ message: "Error al actualizar usuario", error });
    }
  };
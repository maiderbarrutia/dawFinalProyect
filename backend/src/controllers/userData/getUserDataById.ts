import { Request, Response } from "express";
import { UserData } from "../../entities/UserData";
import dataSource from "../../config/database";

export const getUserDataById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    
    try {
      const userData = await dataSource.getRepository(UserData).findOneBy({ user_id: parseInt(id) });

      if (!userData) {
        res.status(404).json({ message: "Usuario no encontrado" });
        return;
      }

      res.status(200).json(userData);

    } catch (error) {
      console.error("Error al obtener usuario:", error);
      res.status(500).json({ message: "Error al obtener usuario", error });
    }
  };
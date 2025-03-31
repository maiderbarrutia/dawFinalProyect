import { Request, Response } from "express";
import { UserData } from "../../entities/UserData";
import dataSource from "../../config/database";

export const createUserData = async (req: Request, res: Response): Promise<void> => {
    const { ...usersData } =
      req.body;
  
    try {
      const userData = dataSource.getRepository(UserData).create({
        ...usersData
      });
      await dataSource.getRepository(UserData).save(userData);
      res.status(201).json({ message: "Usuario creado exitosamente", userData });
    } catch (error) {
      console.error("Error al crear usuario:", error);
      res.status(500).json({ message: "Error al crear usuario", error });
    }
  };
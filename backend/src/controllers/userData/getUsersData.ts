import { Request, Response } from "express";
import { UserData } from "../../entities/UserData";
import dataSource from "../../config/database";

export const getUsersData = async (req: Request, res: Response): Promise<void> => {
  try {
    const userData = await dataSource.getRepository(UserData).find();
    
    res.status(200).json(userData);

  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: "Error al obtener usuarios", error });
  }
};
import { Request, Response } from "express";
import { Usuario } from "../../entities/Usuario";
import dataSource from "../../config/database";


export const getUsuarios = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuarios = await dataSource.getRepository(Usuario).find();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: "Error al obtener usuarios", error });
  }
};
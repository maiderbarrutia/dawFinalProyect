import { Request, Response } from "express";
import { Categoria } from "../../entities/Categoria";
import dataSource from "../../config/database";

export const getCategorias = async (req: Request, res: Response): Promise<void> => {
    try {
      const categorias = await dataSource.getRepository(Categoria).find();
      res.status(200).json(categorias);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
      res.status(500).json({ message: "Error al obtener categorías", error });
    }
  };
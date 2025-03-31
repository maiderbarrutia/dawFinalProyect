import { Request, Response } from "express";
import { Category } from "../../entities/Category";
import dataSource from "../../config/database";

export const getCategories = async (req: Request, res: Response): Promise<void> => {
    try {
      const categories = await dataSource.getRepository(Category).find();
      res.status(200).json(categories);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
      res.status(500).json({ message: "Error al obtener categorías", error });
    }
  };
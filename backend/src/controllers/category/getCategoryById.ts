import { Request, Response } from "express";
import { Category } from "../../entities/Category";
import dataSource from "../../config/database";

export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    
    try {
      const category = await dataSource.getRepository(Category).findOneBy({ category_id: parseInt(id) });

      if (!category) {
        res.status(404).json({ message: "Categoría no encontrada" });
        return;
      }

      res.status(200).json(category);

    } catch (error) {
      console.error("Error al obtener categoría:", error);
      res.status(500).json({ message: "Error al obtener categoría", error });
    }
  };
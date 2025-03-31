import { Request, Response } from "express";
import { Category } from "../../entities/Category";
import dataSource from "../../config/database";

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updatedData = req.body;
  
    try {
      const category = await dataSource.getRepository(Category).findOneBy({ category_id: parseInt(id) });
      if (!category) {
        res.status(404).json({ message: "Categoría no encontrada" });
        return;
      }
  
      const updatedCategory = dataSource.getRepository(Category).merge(category, updatedData);
      await dataSource.getRepository(Category).save(updatedCategory);
      res.status(200).json({ message: "Categoría actualizada exitosamente", updatedCategory });
    } catch (error) {
      console.error("Error al actualizar categoría:", error);
      res.status(500).json({ message: "Error al actualizar categoría", error });
    }
  };
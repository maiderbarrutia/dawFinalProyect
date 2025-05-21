import { Request, Response } from "express";
import { Category } from "../../entities/Category";
import dataSource from "../../config/database";

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
  
    try {
      const category = await dataSource.getRepository(Category).findOneBy({ category_id: parseInt(id) });

      if (!category) {
        res.status(404).json({ message: "Categoría no encontrada" });
        return;
      }
  
      await dataSource.getRepository(Category).remove(category);
      
      res.status(200).json({ message: "Categoría eliminada exitosamente" });

    } catch (error) {
      console.error("Error al eliminar categoría:", error);
      res.status(500).json({ message: "Error al eliminar categoría", error });
    }
  };
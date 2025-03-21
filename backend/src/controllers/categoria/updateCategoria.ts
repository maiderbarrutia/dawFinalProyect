import { Request, Response } from "express";
import { Categoria } from "../../entities/Categoria";
import dataSource from "../../config/database";

export const updateCategoria = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updatedData = req.body;
  
    try {
      const categoria = await dataSource.getRepository(Categoria).findOneBy({ id_categoria: parseInt(id) });
      if (!categoria) {
        res.status(404).json({ message: "Categoría no encontrada" });
        return;
      }
  
      const updatedCategoria = dataSource.getRepository(Categoria).merge(categoria, updatedData);
      await dataSource.getRepository(Categoria).save(updatedCategoria);
      res.status(200).json({ message: "Categoría actualizada exitosamente", updatedCategoria });
    } catch (error) {
      console.error("Error al actualizar categoría:", error);
      res.status(500).json({ message: "Error al actualizar categoría", error });
    }
  };
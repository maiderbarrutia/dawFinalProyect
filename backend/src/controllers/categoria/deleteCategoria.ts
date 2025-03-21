import { Request, Response } from "express";
import { Categoria } from "../../entities/Categoria";
import dataSource from "../../config/database";

export const deleteCategoria = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
  
    try {
      const categoria = await dataSource.getRepository(Categoria).findOneBy({ id_categoria: parseInt(id) });
      if (!categoria) {
        res.status(404).json({ message: "Categoría no encontrada" });
        return;
      }
  
      await dataSource.getRepository(Categoria).remove(categoria);
      res.status(200).json({ message: "Categoría eliminada exitosamente" });
    } catch (error) {
      console.error("Error al eliminar categoría:", error);
      res.status(500).json({ message: "Error al eliminar categoría", error });
    }
  };
import { Request, Response } from "express";
import { Category } from "../../entities/Category";
import dataSource from "../../config/database";

export const createCategory = async (req: Request, res: Response): Promise<void> => {
  console.log("Solicitud recibida:", req.body);
  const { category_name, ...categoryData } = req.body;

  if (!category_name) {
    res.status(400).json({
      message: "El campo nombre_categoria es obligatorio.",
    });
    return;
  }

  try {
    const category = dataSource.getRepository(Category).create({
      ...categoryData
    });

    const newCategory = await dataSource.getRepository(Category).save(category);

    res.status(201).json({
      message: "Categoría creada exitosamente",
      category: newCategory,
    });
  } catch (error: any) {
    if (error.code === "ER_DUP_ENTRY") {
      res.status(409).json({
        message: "El nombre de la categoría ya está en uso.",
      });
      return;
    }

    // Registro del error en la consola para depuración
    console.error("Error al crear categoría:", error);

    res.status(500).json({
      message: "Error al crear la categoría.",
      error: error.message || error,
    });
  }
};

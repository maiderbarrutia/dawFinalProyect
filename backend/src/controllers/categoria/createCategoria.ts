import { Request, Response } from "express";
import { Categoria } from "../../entities/Categoria";
import dataSource from "../../config/database";

export const createCategoria = async (req: Request, res: Response): Promise<void> => {
  console.log("Solicitud recibida:", req.body);
  const { nombre_categoria, descripcion_categoria, imagen_categoria } = req.body;

  // Validar que el campo requerido no esté vacío
  if (!nombre_categoria) {
    res.status(400).json({
      message: "El campo nombre_categoria es obligatorio.",
    });
    return; // Detener ejecución después de enviar la respuesta
  }

  try {
    // Crear y guardar la categoría
    const categoria = dataSource.getRepository(Categoria).create({
      nombre_categoria,
      descripcion_categoria,
      imagen_categoria,
    });

    const nuevaCategoria = await dataSource.getRepository(Categoria).save(categoria);

    res.status(201).json({
      message: "Categoría creada exitosamente",
      categoria: nuevaCategoria,
    });
  } catch (error: any) {
    // Manejo de errores, como duplicados
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

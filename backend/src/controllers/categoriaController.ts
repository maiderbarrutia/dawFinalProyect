import { Request, Response } from "express";
import { Categoria } from "../entities/Categoria";
import dataSource from "../config/database";

// Obtener todas las categorías
export const getCategorias = async (req: Request, res: Response): Promise<void> => {
  try {
    const categorias = await dataSource.getRepository(Categoria).find();
    res.status(200).json(categorias);
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    res.status(500).json({ message: "Error al obtener categorías", error });
  }
};

// Obtener una categoría por ID
export const getCategoriaById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const categoria = await dataSource.getRepository(Categoria).findOneBy({ id_categoria: parseInt(id) });
    if (!categoria) {
      res.status(404).json({ message: "Categoría no encontrada" });
      return;
    }
    res.status(200).json(categoria);
  } catch (error) {
    console.error("Error al obtener categoría:", error);
    res.status(500).json({ message: "Error al obtener categoría", error });
  }
};

// Crear una nueva categoría
export const createCategoria = async (req: Request, res: Response): Promise<void> => {
  const { nombre_categoria, descripcion_categoria, imagen_categoria } = req.body;

  try {
    const categoria = dataSource.getRepository(Categoria).create({
      nombre_categoria,
      descripcion_categoria,
      imagen_categoria,
    });
    await dataSource.getRepository(Categoria).save(categoria);
    res.status(201).json({ message: "Categoría creada exitosamente", categoria });
  } catch (error) {
    console.error("Error al crear categoría:", error);
    res.status(500).json({ message: "Error al crear categoría", error });
  }
};

// Actualizar una categoría
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

// Eliminar una categoría
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

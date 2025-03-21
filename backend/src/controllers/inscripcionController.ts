import { Request, Response } from "express";
import { Inscripcion } from "../entities/Inscripcion";
import dataSource from "../config/database";

// Obtener todas las inscripciones
export const getInscripciones = async (req: Request, res: Response): Promise<void> => {
  try {
    const inscripciones = await dataSource.getRepository(Inscripcion).find({
      relations: ["usuario", "actividad"], // Incluye las relaciones con Usuario y Actividad
    });
    res.status(200).json(inscripciones);
  } catch (error) {
    console.error("Error al obtener inscripciones:", error);
    res.status(500).json({ message: "Error al obtener inscripciones", error });
  }
};

// Obtener una inscripción por ID
export const getInscripcionById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const inscripcion = await dataSource.getRepository(Inscripcion).findOne({
      where: { id_inscripcion: parseInt(id) },
      relations: ["usuario", "actividad"], // Incluye las relaciones con Usuario y Actividad
    });
    if (!inscripcion) {
      res.status(404).json({ message: "Inscripción no encontrada" });
      return;
    }
    res.status(200).json(inscripcion);
  } catch (error) {
    console.error("Error al obtener inscripción:", error);
    res.status(500).json({ message: "Error al obtener inscripción", error });
  }
};

// Crear una nueva inscripción
export const createInscripcion = async (req: Request, res: Response): Promise<void> => {
  const { usuario_id, actividad_id } = req.body;

  try {
    const inscripcion = dataSource.getRepository(Inscripcion).create({
      usuario: { id_usuario: usuario_id }, // Relación con Usuario
      actividad: { id_actividad: actividad_id }, // Relación con Actividad
    });
    await dataSource.getRepository(Inscripcion).save(inscripcion);
    res.status(201).json({ message: "Inscripción creada exitosamente", inscripcion });
  } catch (error) {
    console.error("Error al crear inscripción:", error);
    res.status(500).json({ message: "Error al crear inscripción", error });
  }
};

// Actualizar una inscripción
export const updateInscripcion = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { usuario_id, actividad_id } = req.body;

  try {
    const inscripcion = await dataSource.getRepository(Inscripcion).findOneBy({ id_inscripcion: parseInt(id) });
    if (!inscripcion) {
      res.status(404).json({ message: "Inscripción no encontrada" });
      return;
    }

    const updatedInscripcion = dataSource.getRepository(Inscripcion).merge(inscripcion, {
      usuario: usuario_id ? { id_usuario: usuario_id } : undefined, // Actualiza si se proporciona un usuario_id
      actividad: actividad_id ? { id_actividad: actividad_id } : undefined, // Actualiza si se proporciona un actividad_id
    });
    await dataSource.getRepository(Inscripcion).save(updatedInscripcion);
    res.status(200).json({ message: "Inscripción actualizada exitosamente", updatedInscripcion });
  } catch (error) {
    console.error("Error al actualizar inscripción:", error);
    res.status(500).json({ message: "Error al actualizar inscripción", error });
  }
};

// Eliminar una inscripción
export const deleteInscripcion = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const inscripcion = await dataSource.getRepository(Inscripcion).findOneBy({ id_inscripcion: parseInt(id) });
    if (!inscripcion) {
      res.status(404).json({ message: "Inscripción no encontrada" });
      return;
    }

    await dataSource.getRepository(Inscripcion).remove(inscripcion);
    res.status(200).json({ message: "Inscripción eliminada exitosamente" });
  } catch (error) {
    console.error("Error al eliminar inscripción:", error);
    res.status(500).json({ message: "Error al eliminar inscripción", error });
  }
};
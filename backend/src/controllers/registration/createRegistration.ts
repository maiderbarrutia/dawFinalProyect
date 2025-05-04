import { Request, Response } from "express";
import { Registration } from "../../entities/Registration";
import dataSource from "../../config/database";
import { UserData } from "../../entities/UserData";
import { Activity } from "../../entities/Activity";

export const createRegistration = async (req: Request, res: Response): Promise<void> => {
  const { user_id, activity_id, registration_date } = req.body;

  // Validar de campos obligatorios
  if (!user_id || !activity_id || !registration_date) {
    res.status(400).json({ message: "Faltan parámetros requeridos" });
    return;
  }

  // Validación del activity_id: asegurarse de que sea un número válido
  if (isNaN(Number(activity_id))) {
    res.status(400).json({ message: "ID de actividad no válido" });
    return;
  }

  try {
    // Verificar si el usuario existe
    const user = await dataSource.getRepository(UserData).findOneBy({ user_id });
    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    // Verificar si la actividad existe
    const activity = await dataSource.getRepository(Activity).findOneBy({ activity_id });
    if (!activity) {
      res.status(404).json({ message: "Actividad no encontrada" });
      return;
    }

    // Verificar si el usuario ya está inscrito en esta actividad
    const existingRegistration = await dataSource.getRepository(Registration).findOneBy({
      user_id,
      activity_id,
    });
    
    if (existingRegistration) {
      res.status(400).json({ message: "Ya estás inscrito en esta actividad" });
      return;
    }

    // Crear la nueva inscripción sin incluir el 'registration_id' (lo asigna la base de datos)
    const registration = dataSource.getRepository(Registration).create({
      user_id,
      activity_id,
      registration_date,
    });

    // Guardar la inscripción en la base de datos
    const savedRegistration = await dataSource.getRepository(Registration).save(registration);

    // Verificar si la inscripción se guardó correctamente
    if (!savedRegistration.registration_id) {
      res.status(500).json({ message: "No se pudo realizar la inscripción" });
      return;
    }

    // Devolver la inscripción creada con su ID generado automáticamente
    res.status(201).json({
      message: "Inscripción realizada con éxito",
      registration_id: savedRegistration.registration_id,
      registration: savedRegistration,
    });
    
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error al crear la inscripción:", error.message);
      res.status(500).json({ message: "Error al crear la inscripción", error: error.message });
    } else {
      console.error("Error desconocido", error);
      res.status(500).json({ message: "Error desconocido al crear la inscripción" });
    }
  }
};
import { Request, Response } from "express";
import { Registration } from "../../entities/Registration";
import dataSource from "../../config/database";
import { UserData } from "../../entities/UserData";
import { Activity } from "../../entities/Activity";

export const createRegistration = async (req: Request, res: Response): Promise<void> => {
  const { user_id, activity_id, registration_date } = req.body;

  // Verificar que los parámetros requeridos estén presentes
  if (!user_id || !activity_id || !registration_date) {
    res.status(400).json({ message: "Faltan parámetros requeridos" });
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

    // Crear la nueva inscripción sin incluir el 'registration_id' (lo asigna la base de datos)
    const registration = dataSource.getRepository(Registration).create({
      user_id,
      activity_id,
      registration_date,
    });

    // Guardar la inscripción en la base de datos
    const savedRegistration = await dataSource.getRepository(Registration).save(registration);

    // Devolver la inscripción creada con su ID generado automáticamente
    res.status(201).json({
      message: "Inscripción realizada con éxito",
      registration_id: savedRegistration.registration_id,
      registration: savedRegistration,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error al crear la inscripción:", error.message);
      res.status(500).json({ message: "Error al crear la inscripción", error: error.message });
    } else {
      console.error("Error desconocido", error);
      res.status(500).json({ message: "Error desconocido al crear la inscripción" });
    }
  }
};




// import { Request, Response } from "express";
// import { Registration } from "../../entities/Registration";
// import dataSource from "../../config/database";

// export const createRegistration = async (req: Request, res: Response): Promise<void> => {
//     const { user_id, activity_id } = req.body;
  
//     try {
//       const registration = dataSource.getRepository(Registration).create({
//         userData: { user_id: user_id }, 
//         activity: { activity_id: activity_id },
//       });
//       await dataSource.getRepository(Registration).save(registration);
//       res.status(201).json({ message: "Inscripción creada exitosamente", registration });
//     } catch (error) {
//       console.error("Error al crear inscripción:", error);
//       res.status(500).json({ message: "Error al crear inscripción", error });
//     }
//   };
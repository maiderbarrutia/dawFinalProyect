import { Request, Response } from "express";
import { Registration } from "../../entities/Registration";
import dataSource from "../../config/database";

export const updateRegistration = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { user_id, activity_id } = req.body;
  
    try {
      const registration = await dataSource.getRepository(Registration).findOneBy({ registration_id: parseInt(id) });

      if (!registration) {
        res.status(404).json({ message: "Inscripción no encontrada" });
        return;
      }
  
      const updatedRegistration = dataSource.getRepository(Registration).merge(registration, {
        userData: user_id ? { user_id: user_id } : undefined, // Actualiza si se proporciona un usuario_id
        activity: activity_id ? { activity_id: activity_id } : undefined, // Actualiza si se proporciona un actividad_id
      });

      await dataSource.getRepository(Registration).save(updatedRegistration);

      res.status(200).json({ message: "Inscripción actualizada exitosamente", updatedRegistration });
      
    } catch (error) {
      console.error("Error al actualizar inscripción:", error);
      res.status(500).json({ message: "Error al actualizar inscripción", error });
    }
  };
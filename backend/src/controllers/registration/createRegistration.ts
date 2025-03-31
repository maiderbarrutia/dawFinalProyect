import { Request, Response } from "express";
import { Registration } from "../../entities/Registration";
import dataSource from "../../config/database";

export const createRegistration = async (req: Request, res: Response): Promise<void> => {
    const { user_id, activity_id } = req.body;
  
    try {
      const registration = dataSource.getRepository(Registration).create({
        userData: { user_id: user_id }, 
        activity: { activity_id: activity_id },
      });
      await dataSource.getRepository(Registration).save(registration);
      res.status(201).json({ message: "Inscripción creada exitosamente", registration });
    } catch (error) {
      console.error("Error al crear inscripción:", error);
      res.status(500).json({ message: "Error al crear inscripción", error });
    }
  };
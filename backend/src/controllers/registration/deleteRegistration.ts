import { Request, Response } from "express";
import { Registration } from "../../entities/Registration";
import dataSource from "../../config/database";

export const deleteRegistration = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
  
    try {
      const registration = await dataSource.getRepository(Registration).findOneBy({ registration_id: parseInt(id) });

      if (!registration) {
        res.status(404).json({ message: "Inscripción no encontrada" });
        return;
      }
  
      await dataSource.getRepository(Registration).remove(registration);

      res.status(200).json({ message: "Inscripción eliminada exitosamente" });
      
    } catch (error) {
      console.error("Error al eliminar inscripción:", error);
      res.status(500).json({ message: "Error al eliminar inscripción", error });
    }
  };
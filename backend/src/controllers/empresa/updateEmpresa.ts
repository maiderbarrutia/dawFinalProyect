import { Request, Response } from "express";
import { Empresa } from "../../entities/Empresa";
import dataSource from "../../config/database";

export const updateEmpresa = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updatedData = req.body;
  
    try {
      const empresa = await dataSource.getRepository(Empresa).findOneBy({ id_empresa: parseInt(id) });
      if (!empresa) {
        res.status(404).json({ message: "Empresa no encontrada" });
        return;
      }
  
      const updatedEmpresa = dataSource.getRepository(Empresa).merge(empresa, updatedData);
      await dataSource.getRepository(Empresa).save(updatedEmpresa);
      res.status(200).json({ message: "Empresa actualizada exitosamente", updatedEmpresa });
    } catch (error) {
      console.error("Error al actualizar empresa:", error);
      res.status(500).json({ message: "Error al actualizar empresa", error });
    }
  };
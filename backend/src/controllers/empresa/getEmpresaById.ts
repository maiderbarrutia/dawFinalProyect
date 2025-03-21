import { Request, Response } from "express";
import { Empresa } from "../../entities/Empresa";
import dataSource from "../../config/database";

export const getEmpresaById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const empresa = await dataSource.getRepository(Empresa).findOneBy({ id_empresa: parseInt(id) });
      if (!empresa) {
        res.status(404).json({ message: "Empresa no encontrada" });
        return;
      }
      res.status(200).json(empresa);
    } catch (error) {
      console.error("Error al obtener empresa:", error);
      res.status(500).json({ message: "Error al obtener empresa", error });
    }
  };
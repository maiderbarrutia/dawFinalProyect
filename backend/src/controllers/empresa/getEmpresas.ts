import { Request, Response } from "express";
import { Empresa } from "../../entities/Empresa";
import dataSource from "../../config/database";

export const getEmpresas = async (req: Request, res: Response): Promise<void> => {
    try {
      const empresas = await dataSource.getRepository(Empresa).find();
      res.status(200).json(empresas);
    } catch (error) {
      console.error("Error al obtener empresas:", error);
      res.status(500).json({ message: "Error al obtener empresas", error });
    }
};
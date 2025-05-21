import { Request, Response } from "express";
import { Company } from "../../entities/Company";
import dataSource from "../../config/database";


  export const getCompanyById = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const companyRepo = dataSource.getRepository(Company);
      const company = await companyRepo.findOne({ where: { company_id: parseInt(id) } });
  
      if (!company) {
        res.status(404).json({ message: "Empresa no encontrada" });
        return;
      }
  
      // Excluir la contraseña
      const { company_password, ...rest } = company;
  
      res.status(200).json(rest);
      
    } catch (error) {
      res.status(500).json({ message: "Error al obtener empresa", error });
    }
  };
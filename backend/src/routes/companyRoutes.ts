import { Router } from "express";
import { getCompanies } from "../controllers/company/getCompanies";
import { getCompanyById } from "../controllers/company/getCompanyById";
import { createCompany } from "../controllers/company/createCompany";
import { updateCompany } from "../controllers/company/updateCompany";
import { deleteCompany } from "../controllers/company/deleteCompany";
import { loginCompany } from "../controllers/company/loginCompany";
import { authMiddleware } from "../middlewares/authMiddleware"; 


const companyRoutes = Router();

companyRoutes.post("/register", createCompany);
companyRoutes.post("/login", loginCompany);

companyRoutes.get("/", getCompanies);
companyRoutes.get("/:id", getCompanyById);
companyRoutes.put("/:id", authMiddleware, updateCompany);
companyRoutes.delete("/:id", authMiddleware, deleteCompany);

export default companyRoutes;


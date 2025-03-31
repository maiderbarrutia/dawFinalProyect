import { Router } from "express";
import { getRegistrations } from "../controllers/registration/getRegistrations";
import { getRegistrationById } from "../controllers/registration/getRegistrationById";
import { createRegistration } from "../controllers/registration/createRegistration";
import { updateRegistration } from "../controllers/registration/updateRegistration";
import { deleteRegistration } from "../controllers/registration/deleteRegistration";

const registrationRoutes = Router();

registrationRoutes.get("/", getRegistrations);
registrationRoutes.get("/:id", getRegistrationById);
registrationRoutes.post("/", createRegistration);
registrationRoutes.put("/:id", updateRegistration);
registrationRoutes.delete("/:id", deleteRegistration);

export default registrationRoutes;
import { Router } from "express";
import { getUsersData } from "../controllers/userData/getUsersData";
import { getUserDataById } from "../controllers/userData/getUserDataById";
import { createUserData } from "../controllers/userData/createUserData";
import { updateUserData } from "../controllers/userData/updateUserData";
import { deleteUserData } from "../controllers/userData/deleteUserData";

const userDataRoutes = Router();

userDataRoutes.get("/", getUsersData);
userDataRoutes.get("/:id", getUserDataById);
userDataRoutes.post("/", createUserData);
userDataRoutes.put("/:id", updateUserData);
userDataRoutes.delete("/:id", deleteUserData);

export default userDataRoutes;
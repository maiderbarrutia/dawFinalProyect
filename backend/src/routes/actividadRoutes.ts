import { Router } from "express";
import { getActividades, createActividad, getActividadById, updateActividad, deleteActividad } from "../controllers/actividadController";

const actividadRoutes = Router();

actividadRoutes.get("/", getActividades);
actividadRoutes.get("/:id", getActividadById);
actividadRoutes.post("/", createActividad);
actividadRoutes.put("/:id", updateActividad);
actividadRoutes.delete("/:id", deleteActividad);

export default actividadRoutes;




// import {postGetAllAction} from "./controller/PostGetAllAction";
// import {postGetByIdAction} from "./controller/PostGetByIdAction";
// import {postSaveAction} from "./controller/PostSaveAction";

/**
 * All application routes.
 */
// export const AppRoutes = [
//     {
//         path: "/posts",
//         method: "get",
//         action: postGetAllAction
//     },
//     {
//         path: "/posts/:id",
//         method: "get",
//         action: postGetByIdAction
//     },
//     {
//         path: "/posts",
//         method: "post",
//         action: postSaveAction
//     }
// ];
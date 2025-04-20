import { Router } from "express";
import { getActivities} from "../controllers/activity/getActivities";
import { getActivityById} from "../controllers/activity/getActivityById";
import { createActivity} from "../controllers/activity/createActivity";
import { updateActivity} from "../controllers/activity/updateActivity";
import { deleteActivity} from "../controllers/activity/deleteActivity";
import { authMiddleware } from "../middlewares/authMiddleware";
import { upload } from '../config/multer';

const activityRoutes = Router();

activityRoutes.get("/", getActivities);
activityRoutes.get("/:id", getActivityById);
activityRoutes.post("/", authMiddleware, upload.array('activity_images', 5), createActivity);
activityRoutes.put("/:id", authMiddleware, updateActivity);
activityRoutes.delete("/:id", authMiddleware, deleteActivity);

export default activityRoutes;
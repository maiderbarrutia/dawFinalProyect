"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getActivities_1 = require("../controllers/activity/getActivities");
const getActivityById_1 = require("../controllers/activity/getActivityById");
const createActivity_1 = require("../controllers/activity/createActivity");
const updateActivity_1 = require("../controllers/activity/updateActivity");
const deleteActivity_1 = require("../controllers/activity/deleteActivity");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const multer_1 = require("../config/multer");
const activityRoutes = (0, express_1.Router)();
activityRoutes.get("/", getActivities_1.getActivities);
activityRoutes.get("/:id", getActivityById_1.getActivityById);
activityRoutes.post("/", authMiddleware_1.authMiddleware, multer_1.upload.array('activity_images', 20), createActivity_1.createActivity);
activityRoutes.put("/:id", authMiddleware_1.authMiddleware, updateActivity_1.updateActivity);
activityRoutes.delete("/:id", authMiddleware_1.authMiddleware, deleteActivity_1.deleteActivity);
exports.default = activityRoutes;
//# sourceMappingURL=activityRoutes.js.map
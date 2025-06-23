"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getUsersData_1 = require("../controllers/userData/getUsersData");
const getUserDataById_1 = require("../controllers/userData/getUserDataById");
const createUserData_1 = require("../controllers/userData/createUserData");
const updateUserData_1 = require("../controllers/userData/updateUserData");
const deleteUserData_1 = require("../controllers/userData/deleteUserData");
const userDataRoutes = (0, express_1.Router)();
userDataRoutes.get("/", getUsersData_1.getUsersData);
userDataRoutes.get("/:id", getUserDataById_1.getUserDataById);
userDataRoutes.post("/", createUserData_1.createUserData);
userDataRoutes.put("/:id", updateUserData_1.updateUserData);
userDataRoutes.delete("/:id", deleteUserData_1.deleteUserData);
exports.default = userDataRoutes;
//# sourceMappingURL=userDataRoutes.js.map
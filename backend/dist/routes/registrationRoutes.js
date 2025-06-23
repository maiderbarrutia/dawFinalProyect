"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getRegistrations_1 = require("../controllers/registration/getRegistrations");
const getRegistrationById_1 = require("../controllers/registration/getRegistrationById");
const createRegistration_1 = require("../controllers/registration/createRegistration");
const updateRegistration_1 = require("../controllers/registration/updateRegistration");
const deleteRegistration_1 = require("../controllers/registration/deleteRegistration");
const registrationRoutes = (0, express_1.Router)();
registrationRoutes.get("/", getRegistrations_1.getRegistrations);
registrationRoutes.get("/:id", getRegistrationById_1.getRegistrationById);
registrationRoutes.post("/", createRegistration_1.createRegistration);
registrationRoutes.put("/:id", updateRegistration_1.updateRegistration);
registrationRoutes.delete("/:id", deleteRegistration_1.deleteRegistration);
exports.default = registrationRoutes;
//# sourceMappingURL=registrationRoutes.js.map
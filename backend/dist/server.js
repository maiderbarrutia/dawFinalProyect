"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
const activityRoutes_1 = __importDefault(require("./routes/activityRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const companyRoutes_1 = __importDefault(require("./routes/companyRoutes"));
const registrationRoutes_1 = __importDefault(require("./routes/registrationRoutes"));
const userDataRoutes_1 = __importDefault(require("./routes/userDataRoutes"));
const seedCategories_1 = require("./seeds/seedCategories");
const seedCompanies_1 = require("./seeds/seedCompanies");
const seedActivities_1 = require("./seeds/seedActivities");
const resourcePaths_1 = require("./config/resourcePaths");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const startServer = async () => {
    try {
        // Conectar a la base de datos
        await database_1.default.initialize();
        console.log("Conexión a la base de datos establecida.");
        // Ejecutar seeds
        await (0, seedCategories_1.seedCategories)(database_1.default);
        await (0, seedCompanies_1.seedCompanies)(database_1.default);
        await (0, seedActivities_1.seedActivities)(database_1.default);
        // Registrar las rutas
        app.use("/api/usuarios", userDataRoutes_1.default);
        app.use("/api/actividades", activityRoutes_1.default);
        app.use("/api/categorias", categoryRoutes_1.default);
        app.use("/api/empresas", companyRoutes_1.default);
        app.use("/api/inscripciones", registrationRoutes_1.default);
        app.use('/images', express_1.default.static(resourcePaths_1.uploadImagePath));
        app.use('/videos', express_1.default.static(resourcePaths_1.uploadVideoPath));
        // Iniciar el servidor
        const port = process.env.PORT || 3003;
        app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error al iniciar el servidor:", error.message);
        }
        else {
            console.error("Error desconocido al iniciar el servidor:", error);
        }
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=server.js.map
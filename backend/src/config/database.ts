import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

// Cargar las variables de entorno
dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const dataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || "aisiPlan_user",
  password: process.env.DB_PASSWORD || "Zp8!rA7k@Xv2Lm9",
  database: process.env.DB_DATABASE || "aisiplan",
  entities: isProduction
    ? [__dirname + "/../entities/*.js"]  // Usar .js para producción
    : [__dirname + "/../entities/*.ts"], // Usar .ts para desarrollo
  synchronize: false, // Cambiar a false en producción
  logging: false,
});

export default dataSource;


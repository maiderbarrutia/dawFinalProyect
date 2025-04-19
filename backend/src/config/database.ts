import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

// Cargar las variables de entorno
dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const dataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: isProduction
    ? [__dirname + "/../entities/*.js"]  // Usar .js para producción
    : [__dirname + "/../entities/*.ts"], // Usar .ts para desarrollo
  synchronize: false, // Cambiar a false en producción
  logging: false,
});

export default dataSource;


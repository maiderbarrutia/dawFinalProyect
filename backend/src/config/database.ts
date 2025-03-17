import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Actividad } from "../entities/Actividad";
import { Empresa } from "../entities/Empresa";
import { Categoria } from "../entities/Categoria";
import { Inscripcion } from "../entities/Inscripcion";

// Cargar las variables de entorno
dotenv.config();

// const isProduction = process.env.NODE_ENV === "production";

const dataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || "aisiPlan_user",
  password: process.env.DB_PASSWORD || "Zp8!rA7k@Xv2Lm9",
  database: process.env.DB_DATABASE || "aisiplan",
  // entities: [__dirname + "/../entities/*.ts"],
  entities: [Actividad, Empresa, Categoria, Inscripcion], 
  // entities: isProduction
  //   ? [__dirname + "/../entities/*.js"]  // Usar .js para producción
  //   : [__dirname + "/../entities/*.ts"], // Usar .ts para desarrollo
  synchronize: true, // Cambiar a false en producción
  logging: true,
});

export default dataSource;


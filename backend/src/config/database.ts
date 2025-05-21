import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

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
    ? [__dirname + "/../entities/*.js"]
    : [__dirname + `/../entities/*.{ts,js}`],
  migrations: isProduction
    ? [__dirname + "/../migrations/*.js"]
    : [__dirname + `/../migrations/*.{ts,js}`],
  synchronize: false,
  logging: false,
});

export default dataSource;


import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import path from "path";

const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";
dotenv.config({ path: path.resolve(__dirname, `../../${envFile}`) });

const isProduction = process.env.NODE_ENV === "production";

const dataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: isProduction
    ? [path.resolve(__dirname, "../entities/*.js")]
    : [path.resolve(__dirname, "../entities/*.{ts,js}")],
  migrations: isProduction
    ? [path.resolve(__dirname, "../migrations/*.js")]
    : [path.resolve(__dirname, "../migrations/*.{ts,js}")],
  synchronize: false,
  logging: false,
});

export default dataSource;


"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, `../../${envFile}`) });
const isProduction = process.env.NODE_ENV === "production";
const dataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: isProduction
        ? [path_1.default.resolve(__dirname, "../entities/*.js")]
        : [path_1.default.resolve(__dirname, "../entities/*.{ts,js}")],
    migrations: isProduction
        ? [path_1.default.resolve(__dirname, "../migrations/*.js")]
        : [path_1.default.resolve(__dirname, "../migrations/*.{ts,js}")],
    synchronize: false,
    logging: false,
});
exports.default = dataSource;

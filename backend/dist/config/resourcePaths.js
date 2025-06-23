"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadVideoPath = exports.uploadImagePath = void 0;
const path_1 = __importDefault(require("path"));
const basePath = process.env.UPLOAD_RESOURCES_PATH || './public/';
exports.uploadImagePath = path_1.default.resolve(basePath, 'images');
exports.uploadVideoPath = path_1.default.resolve(basePath, 'videos');

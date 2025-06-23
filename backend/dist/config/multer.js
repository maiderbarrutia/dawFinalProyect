"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const resourcePaths_1 = require("./resourcePaths");
// Extensiones y tipos MIME permitidos
const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];
// Carpeta de destino
if (!fs_1.default.existsSync(resourcePaths_1.uploadImagePath)) {
    fs_1.default.mkdirSync(resourcePaths_1.uploadImagePath, { recursive: true });
}
// Filtro de archivo
const fileFilter = (req, file, cb) => {
    const ext = path_1.default.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;
    if (!allowedExtensions.includes(ext) || !allowedMimeTypes.includes(mimetype)) {
        return cb(new Error('Solo se permiten imágenes válidas.'));
    }
    cb(null, true);
};
// Almacenamiento personalizado
const customStorage = {
    _handleFile(req, file, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filename = `${Date.now()}_${path_1.default.parse(file.originalname).name}.webp`;
                const filepath = path_1.default.join(resourcePaths_1.uploadImagePath, filename);
                const chunks = [];
                file.stream.on('data', chunk => chunks.push(chunk));
                file.stream.on('end', () => __awaiter(this, void 0, void 0, function* () {
                    const buffer = Buffer.concat(chunks);
                    const image = (0, sharp_1.default)(buffer);
                    const metadata = yield image.metadata();
                    // Solo redimensionar si el ancho original es mayor a 1200
                    let transformer = image;
                    if ((metadata.width || 0) > 1200) {
                        transformer = transformer.resize({ width: 1200 });
                    }
                    yield transformer
                        .webp({ quality: 75, lossless: true })
                        .toFile(filepath);
                    cb(null, {
                        destination: resourcePaths_1.uploadImagePath,
                        filename,
                        path: filepath,
                        size: fs_1.default.statSync(filepath).size,
                    });
                }));
            }
            catch (err) {
                cb(err);
            }
        });
    },
    _removeFile(req, file, cb) {
        fs_1.default.unlink(file.path, cb);
    }
};
// Exportar el middleware `upload` ya procesado
exports.upload = (0, multer_1.default)({
    storage: customStorage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024,
    }
});

import multer from 'multer';
import path from 'path';
import sharp from 'sharp';
import fs from 'fs';
import { Request } from 'express';
import { uploadImagePath } from './resourcePaths';

// Extensiones y tipos MIME permitidos
const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];

// Carpeta de destino
if (!fs.existsSync(uploadImagePath)) {
  fs.mkdirSync(uploadImagePath, { recursive: true });
}

// Filtro de archivo
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (!allowedExtensions.includes(ext) || !allowedMimeTypes.includes(mimetype)) {
    return cb(new Error('Solo se permiten imágenes válidas.'));
  }

  cb(null, true);
};

// Almacenamiento personalizado
const customStorage = {
  async _handleFile(
    req: Request,
    file: Express.Multer.File,
    cb: (error?: any, info?: Partial<Express.Multer.File>) => void
  ) {
    try {
      const filename = `${Date.now()}_${path.parse(file.originalname).name}.webp`;
      const filepath = path.join(uploadImagePath, filename);

      const chunks: Buffer[] = [];
      file.stream.on('data', chunk => chunks.push(chunk));
      file.stream.on('end', async () => {
        const buffer = Buffer.concat(chunks);
        const image = sharp(buffer);
        const metadata = await image.metadata();

        // Solo redimensionamos si el ancho original es mayor a 1200
        let transformer = image;
        if ((metadata.width || 0) > 1200) {
          transformer = transformer.resize({ width: 1200 });
        }

        await transformer
          .webp({ quality: 75, lossless: true })
          .toFile(filepath);

        cb(null, {
          destination: uploadImagePath,
          filename,
          path: filepath,
          size: fs.statSync(filepath).size,
        });
      });
    } catch (err) {
      cb(err);
    }
  },

  _removeFile(
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null) => void
  ) {
    fs.unlink(file.path, cb);
  }
};

// Exportar el middleware `upload` ya procesado
export const upload = multer({
  storage: customStorage as unknown as multer.StorageEngine,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  }
});
import multer from 'multer';
import path from 'path';
import sharp from 'sharp';
import fs from 'fs';
import { Request } from 'express';

// Extensiones y tipos MIME permitidos
const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];

// Carpeta de destino
const uploadPath = path.resolve(__dirname, '../../assets/images');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
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
      const filepath = path.join(uploadPath, filename);

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
          destination: uploadPath,
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




// import multer from 'multer';
// import path from 'path';
// import { Request } from 'express';

// // Extensiones y tipos MIME permitidos
// const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
// const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];

// // Configuración del almacenamiento de archivos
// const storage = multer.diskStorage({
//    // Ruta donde se guardarán los archivos subidos
//   destination: (req, file, cb) => {
//     cb(null, path.resolve(__dirname, '../../assets/images'));
//   },
//   // Nombre con el que se guardará el archivo (para evitar duplicados)
//   filename: (req, file, cb) => {
//     const uniqueName = `${Date.now()}_${file.originalname}`;
//     cb(null, uniqueName); 
//   }
// });

// // Filtro para validar tipo de archivo subido
// const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
//   const ext = path.extname(file.originalname).toLowerCase();
//   const mimetype = file.mimetype;

//   const isValidExt = allowedExtensions.includes(ext);
//   const isValidMime = allowedMimeTypes.includes(mimetype);

//   if (!isValidExt || !isValidMime) {
//     return cb(new Error('Solo se permiten imágenes con extensiones válidas.'));
//   }

//   cb(null, true);
// };

// export const upload = multer({
//   storage,
//   fileFilter,
//   limits: {
//     fileSize: 10 * 1024 * 1024, // 10MB máx
//   }
// });



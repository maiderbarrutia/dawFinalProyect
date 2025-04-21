import multer from 'multer';
import path from 'path';
import { Request } from 'express';

// Extensiones y tipos MIME permitidos
const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];

// Configuración del almacenamiento de archivos
const storage = multer.diskStorage({
   // Ruta donde se guardarán los archivos subidos
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../../assets/images'));
  },
  // Nombre con el que se guardará el archivo (para evitar duplicados)
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}_${file.originalname}`;
    cb(null, uniqueName); 
  }
});

// Filtro para validar tipo de archivo subido
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  const isValidExt = allowedExtensions.includes(ext);
  const isValidMime = allowedMimeTypes.includes(mimetype);

  if (!isValidExt || !isValidMime) {
    return cb(new Error('Solo se permiten imágenes con extensiones válidas.'));
  }

  cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB máx
  }
});



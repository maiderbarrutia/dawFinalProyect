// import multer from 'multer';
// import path from 'path';

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.resolve(__dirname, '../../assets/images'));
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = `${Date.now()}_${file.originalname}`;
//     cb(null, uniqueName);
//   }
// });

// export const upload = multer({ storage });


// import multer from 'multer';
// import path from 'path';
// import { v4 as uuidv4 } from 'uuid';
// import { Request } from 'express';

// const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.mp4', '.webm'];
// const allowedMimeTypes = ['image/', 'video/'];

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.resolve(__dirname, '../../assets/images'));
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname).toLowerCase();
//     const filename = uuidv4() + ext;
//     cb(null, filename);
//   },
// });

// const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
//   const ext = path.extname(file.originalname).toLowerCase();
//   const isValidExt = allowedExtensions.includes(ext);
//   const isValidMime = allowedMimeTypes.some((prefix) => file.mimetype.startsWith(prefix));

//   if (!isValidExt || !isValidMime) {
//     return cb(new Error('Solo se permiten imágenes o videos.'));
//   }

//   cb(null, true);
// };

// export const upload = multer({
//   storage,
//   fileFilter,
//   limits: {
//     fileSize: 20 * 1024 * 1024, // 20MB
//   },
// });


import multer from 'multer';
import path from 'path';
import { Request } from 'express';

// Extensiones y tipos MIME permitidos
const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../../assets/images'));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}_${file.originalname}`;
    cb(null, uniqueName); 
  }
});

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



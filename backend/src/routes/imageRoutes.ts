import express from 'express';
import { upload } from '../config/multer';
import { uploadToCloudinary } from '../services/cloudinaryService';

const router = express.Router();

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      res.status(400).json({ error: 'No se subió ninguna imagen' });
      return;
    }

    const imageUrl = await uploadToCloudinary(req.file.path);
    res.status(200).json({ imageUrl });

  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});


export default router;

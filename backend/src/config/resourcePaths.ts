import path from 'path';

const basePath = process.env.UPLOAD_RESOURCES_PATH || './public/';

export const uploadImagePath = path.resolve(basePath, 'images');
export const uploadVideoPath = path.resolve(basePath, 'videos');

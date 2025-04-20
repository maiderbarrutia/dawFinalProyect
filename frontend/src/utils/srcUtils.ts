const assets = import.meta.glob('/src/assets/**/*.{jpg,png,jpeg}', { 
  eager: true,
  query: {
    format: 'webp'
  }
});

const otherAssets = import.meta.glob('/src/assets/**/*.{gif,pdf,woff,woff2,ttf}', { eager: true });

//IMAGENES ESTATICAS
export const getAssetSrc = (assetPath: string): string => {
  const fullPath = `/src/assets/${assetPath}`;
  const asset = assets[fullPath] || otherAssets[fullPath];

  if (asset && typeof asset === 'object' && 'default' in asset) {
    return (asset as { default: string }).default;
  }

  return '';
};

//IMAGENES SUBIDAS
export const getUploadedImageSrc = (filename: string): string => {
  const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  if (/^https?:\/\//.test(filename)) {
    return filename;
  }

  return `${BACKEND_BASE_URL}/${filename}`;
};

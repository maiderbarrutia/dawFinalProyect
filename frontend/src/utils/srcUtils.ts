// Importar imágenes usando import.meta.glob con format=webp
const assets = import.meta.glob('/src/assets/**/*.{jpg,png,jpeg}', { 
  eager: true,
  query: {
    format: 'webp'  // Añadir la conversión a WebP en la query
  }
});

// Para otros archivos como PDFs, fuentes, etc., sin modificación de formato
const otherAssets = import.meta.glob('/src/assets/**/*.{gif,pdf,woff,woff2,ttf}', { eager: true });

// Función para obtener la ruta del asset
export const getAssetSrc = (assetPath: string): string => {
  const fullPath = `/src/assets/${assetPath}`;
  const asset = assets[fullPath] || otherAssets[fullPath];

  if (asset && typeof asset === 'object' && 'default' in asset) {
    return (asset as { default: string }).default;
  }

  return '';
};

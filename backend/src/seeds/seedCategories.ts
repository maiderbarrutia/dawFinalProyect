import { DataSource } from "typeorm";
import { Category } from "../entities/Category";

export const seedCategories = async (dataSource: DataSource) => {
  const categoryRepo = dataSource.getRepository(Category);

  // Categorías iniciales definidas en el seed
  const INITIAL_CATEGORIES = [
    {
      category_name: "Deportes",
      category_description: "Pon a prueba tus límites y mantente activo con nuestras actividades deportivas para todas las edades y niveles.",
      category_image: "deportes.jpg",
    },
    {
      category_name: "Bienestar y relajación",
      category_description: "Encuentra la paz que necesitas con actividades diseñadas para el cuidado de tu cuerpo y mente.",
      category_image: "bienestar-relajacion.jpg",
    },
    {
      category_name: "Cultura",
      category_description: "Sumérgete en la historia, tradiciones y expresiones artísticas que conectan generaciones y lugares.",
      category_image: "cultura.jpg",
    },
    {
      category_name: "Aventura",
      category_description: "Vive experiencias únicas llenas de adrenalina y emociones fuertes en la categoría de aventura.",
      category_image: "aventura.jpg",
    },
    {
      category_name: "Entretenimiento",
      category_description: "Diversión asegurada con actividades ideales para disfrutar en grupo y crear recuerdos inolvidables.",
      category_image: "entretenimiento.jpg",
    },
  ];

  try {
    // Verificar y sincronizar categorías iniciales
    for (const category of INITIAL_CATEGORIES) {
      const categoryExists = await categoryRepo.findOneBy({ category_name: category.category_name });
  
      if (categoryExists) {
        // Si la categoría ya existe, actualizarla si es necesario
        const updatedCategory = categoryRepo.merge(categoryExists, category);
        await categoryRepo.save(updatedCategory);
        console.log(`Categoría actualizada: ${category.category_name}`);
      } else {
        // Si la categoría no existe, crearla e insertarla
        const newCategory = categoryRepo.create(category);
        await categoryRepo.save(newCategory);
        console.log(`Categoría insertada: ${category.category_name}`);
      }
    }
  
    console.log("¡Sincronización de categorías completada!");
  } catch (error) {
    console.error("Error durante el seed de categorías:", error);
  }
  
};
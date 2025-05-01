import { DataSource } from "typeorm";
import { Category } from "../entities/Category";

export const seedCategories = async (dataSource: DataSource) => {
  const categoryRepo = dataSource.getRepository(Category);

  // Categorías iniciales definidas en el seed
  const INITIAL_CATEGORIES = [
    {
      category_id: 1,
      category_name: "Deportes",
      category_description: "Pon a prueba tus límites y mantente activo con nuestras actividades deportivas para todas las edades y niveles.",
      category_image: "deportes.jpg",
    },
    {
      category_id: 2,
      category_name: "Bienestar y relajación",
      category_description: "Encuentra la paz que necesitas con actividades diseñadas para el cuidado de tu cuerpo y mente.",
      category_image: "bienestar-relajacion.jpg",
    },
    {
      category_id: 3,
      category_name: "Cultura",
      category_description: "Sumérgete en la historia, tradiciones y expresiones artísticas que conectan generaciones y lugares.",
      category_image: "cultura.jpg",
    },
    {
      category_id: 4,
      category_name: "Aventura",
      category_description: "Vive experiencias únicas llenas de adrenalina y emociones fuertes en la categoría de aventura.",
      category_image: "aventura.jpg",
    },
    {
      category_id: 5,
      category_name: "Entretenimiento",
      category_description: "Diversión asegurada con actividades ideales para disfrutar en grupo y crear recuerdos inolvidables.",
      category_image: "entretenimiento.jpg",
    },
  ];

  try {
    
    for (const category of INITIAL_CATEGORIES) {
      const categoryExists = await categoryRepo.findOneBy({ category_id: category.category_id });
      if (!categoryExists) {
        console.log(`🟢 Creando categoría: ${category.category_name}`);
        const newCategory = categoryRepo.create(category);
        await categoryRepo.save(newCategory);
      } else {
        const hasChanges = (
          categoryExists.category_name !== category.category_name ||
          categoryExists.category_description !== category.category_description ||
          categoryExists.category_image !== category.category_image
          
        );

        if (hasChanges) {
          console.log(`🟡 Actualizando categoria: ${category.category_name}`);
          await categoryRepo.update(
            { category_id: category.category_id },
            {
              ...category,
              category_id: category.category_id,
            }
          );
        } else {
          console.log(`🔵 La categoría "${category.category_name}" ya existe sin cambios.`);
        }
      }
    }

    console.log("✅ ¡Seed de categorias completado!");
  } catch (error) {
    console.error("❌ Error durante el seed de categorias:", error);
  }
  
};
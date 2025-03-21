import { DataSource } from "typeorm";
import { Categoria } from "../entities/Categoria";

export const seedCategorias = async (dataSource: DataSource) => {
  const categoriaRepo = dataSource.getRepository(Categoria);

  // Categorías iniciales definidas en el seed
  const CATEGORIAS_INICIALES = [
    {
      nombre_categoria: "Deportes",
      descripcion_categoria: "Pon a prueba tus límites y mantente activo con nuestras actividades deportivas para todas las edades y niveles.",
      imagen_categoria: "deportes.jpg",
    },
    {
      nombre_categoria: "Bienestar y relajación",
      descripcion_categoria: "Encuentra la paz que necesitas con actividades diseñadas para el cuidado de tu cuerpo y mente.",
      imagen_categoria: "bienestar-relajacion.jpg",
    },
    {
      nombre_categoria: "Cultura",
      descripcion_categoria: "Sumérgete en la historia, tradiciones y expresiones artísticas que conectan generaciones y lugares.",
      imagen_categoria: "cultura.jpg",
    },
    {
      nombre_categoria: "Aventura",
      descripcion_categoria: "Vive experiencias únicas llenas de adrenalina y emociones fuertes en la categoría de aventura.",
      imagen_categoria: "aventura.jpg",
    },
    {
      nombre_categoria: "Entretenimiento",
      descripcion_categoria: "Diversión asegurada con actividades ideales para disfrutar en grupo y crear recuerdos inolvidables.",
      imagen_categoria: "entretenimiento.jpg",
    },
  ];

  try {
    // Verificar y sincronizar categorías iniciales
    for (const categoria of CATEGORIAS_INICIALES) {
      const existeCategoria = await categoriaRepo.findOneBy({ nombre_categoria: categoria.nombre_categoria });
      if (!existeCategoria) {
        console.log(`Insertando categoría: ${categoria.nombre_categoria}`);
        const nuevaCategoria = categoriaRepo.create(categoria); // Crear instancia usando el repositorio
        await categoriaRepo.save(nuevaCategoria);
      } else {
        console.log(`La categoría "${categoria.nombre_categoria}" ya existe.`);
      }
    }

    console.log("¡Sincronización de categorías completada!");
  } catch (error) {
    console.error("Error durante el seed de categorías:", error);
  }
};
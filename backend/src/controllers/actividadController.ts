// import { Request, Response } from "express";
// import { Actividad } from "../entities/Actividad";
// import { Empresa } from "../entities/Empresa";
// import { Categoria } from "../entities/Categoria";
// import dataSource from "../config/database";

// export const getActividad = async (req: Request, res: Response): Promise<Response> => {
//   try {
//     const actividades = await dataSource
//       .getRepository(Actividad)
//       .find({ relations: ["empresa", "categoria"] });
//     return res.status(200).json(actividades);
//   } catch (error) {
//     console.error("Error al obtener actividades:", error);
//     return res.status(500).json({ message: "Error al obtener actividades", error });
//   }
// };

// export const createActividad = async (req: Request, res: Response): Promise<Response> => {
//   const { titulo_actividad, descripcion_actividad, fecha_actividad, hora_actividad, precio_actividad, numero_plazas, duracion_actividad, nivel_dificultad, tipo_actividad, ubicacion_actividad, empresaId, categoriaId } = req.body;

//   try {
//     const empresa = await dataSource.getRepository(Empresa).findOneBy({ id_empresa: empresaId });
//     const categoria = await dataSource.getRepository(Categoria).findOneBy({ id_categoria: categoriaId });

//     if (!empresa || !categoria) {
//       return res.status(400).json({ message: "Empresa o categoría no encontrada" });
//     }

//     const actividad = new Actividad();
//     actividad.titulo_actividad = titulo_actividad;
//     actividad.descripcion_actividad = descripcion_actividad;
//     actividad.fecha_actividad = fecha_actividad;
//     actividad.hora_actividad = hora_actividad;
//     actividad.precio_actividad = precio_actividad;
//     actividad.numero_plazas = numero_plazas;
//     actividad.duracion_actividad = duracion_actividad;
//     actividad.nivel_dificultad = nivel_dificultad;
//     actividad.tipo_actividad = tipo_actividad;
//     actividad.ubicacion_actividad = ubicacion_actividad;
//     actividad.empresa = empresa;
//     actividad.categoria = categoria;

//     await dataSource.getRepository(Actividad).save(actividad);

//     return res.status(201).json({ message: "Actividad creada exitosamente", actividad });
//   } catch (error) {
//     console.error("Error al crear actividad:", error);
//     return res.status(500).json({ message: "Error al crear actividad", error });
//   }
// };


import { Request, Response } from "express";
import { Actividad } from "../entities/Actividad";
import { Empresa } from "../entities/Empresa";
import { Categoria } from "../entities/Categoria";
import dataSource from "../config/database";

export const getActividad = async (req: Request, res: Response): Promise<void> => {
  try {
    const actividades = await dataSource.getRepository(Actividad).find({
      relations: ["empresa", "categoria"],
    });
    res.status(200).json(actividades);
  } catch (error) {
    console.error("Error al obtener actividades:", error);
    res.status(500).json({ message: "Error al obtener actividades", error });
  }
};


// Obtener una actividad por ID
export const getActividadById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const actividad = await dataSource.getRepository(Actividad).findOne({
      where: { id_actividad: parseInt(id) },
      relations: ["empresa", "categoria"],
    });

    if (!actividad) {
      res.status(404).json({ message: "Actividad no encontrada" });
      return;
    }

    res.status(200).json(actividad);
  } catch (error) {
    console.error("Error al obtener la actividad:", error);
    res.status(500).json({ message: "Error al obtener la actividad", error });
  }
};

// Crear una nueva actividad
export const createActividad = async (req: Request, res: Response): Promise<void> => {
  const {
    titulo_actividad,
    descripcion_actividad,
    empresaId,
    fecha_actividad,
    hora_actividad,
    precio_actividad,
    numero_plazas,
    duracion_actividad,
    nivel_dificultad,
    tipo_actividad,
    categoriaId,
    ubicacion_actividad,
    imagenes_actividad,
    videos_actividad,
    incluye,
    no_incluye,
    politica_privacidad
  } = req.body;

  try {
    // Validar si la empresa y la categoría existen en la base de datos
    const empresa = await dataSource.getRepository(Empresa).findOneBy({ id_empresa: empresaId });
    const categoria = await dataSource.getRepository(Categoria).findOneBy({ id_categoria: categoriaId });

    if (!empresa || !categoria) {
      res.status(400).json({ message: "Empresa o categoría no encontrada" });
      return;
    }

    // Crear la nueva instancia de Actividad
    const actividad = dataSource.getRepository(Actividad).create({
      titulo_actividad,
      descripcion_actividad,
      fecha_actividad: new Date(fecha_actividad), // Asegurarse de que la fecha esté en formato Date
      hora_actividad,
      precio_actividad,
      numero_plazas,
      duracion_actividad,
      nivel_dificultad,
      tipo_actividad,
      ubicacion_actividad,
      imagenes_actividad: imagenes_actividad || [], // Asignar un array vacío si no se proporcionan imágenes
      videos_actividad: videos_actividad || [], // Asignar un array vacío si no se proporcionan videos
      incluye,
      no_incluye,
      politica_privacidad,
      empresa, // Relación con la entidad Empresa
      categoria // Relación con la entidad Categoria
    });

    // Guardar la nueva actividad en la base de datos
    await dataSource.getRepository(Actividad).save(actividad);

    res.status(201).json({ message: "Actividad creada exitosamente", actividad });
  } catch (error) {
    console.error("Error al crear actividad:", error);
    res.status(500).json({ message: "Error al crear actividad", error });
  }
};

// Actualizar una actividad
export const updateActividad = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const actividad = await dataSource.getRepository(Actividad).findOneBy({ id_actividad: parseInt(id) });

    if (!actividad) {
      res.status(404).json({ message: "Actividad no encontrada" });
      return;
    }

    const updatedActividad = dataSource.getRepository(Actividad).merge(actividad, updatedData);
    await dataSource.getRepository(Actividad).save(updatedActividad);

    res.status(200).json({ message: "Actividad actualizada exitosamente", updatedActividad });
  } catch (error) {
    console.error("Error al actualizar la actividad:", error);
    res.status(500).json({ message: "Error al actualizar la actividad", error });
  }
};

// Eliminar una actividad
export const deleteActividad = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const actividad = await dataSource.getRepository(Actividad).findOneBy({ id_actividad: parseInt(id) });

    if (!actividad) {
      res.status(404).json({ message: "Actividad no encontrada" });
      return;
    }

    await dataSource.getRepository(Actividad).remove(actividad);
    res.status(200).json({ message: "Actividad eliminada exitosamente" });
  } catch (error) {
    console.error("Error al eliminar actividad:", error);
    res.status(500).json({ message: "Error al eliminar actividad", error });
  }
};




// Pruebas con Postman o cURL
// GET http://localhost:3001/api/actividades: Listar todas las actividades.

// GET http://localhost:3001/api/actividades/:id: Obtener una actividad específica.

// POST http://localhost:3001/api/actividades: Crear una nueva actividad.

// PUT http://localhost:3001/api/actividades/:id: Actualizar una actividad.

// DELETE http://localhost:3001/api/actividades/:id: Eliminar una actividad.
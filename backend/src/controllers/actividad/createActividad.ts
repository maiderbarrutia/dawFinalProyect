import { Request, Response } from "express";
import { Actividad } from "../../entities/Actividad";
import dataSource from "../../config/database";

export const createActividad = async (req: Request, res: Response): Promise<void> => {
    const {
      titulo_actividad,
      descripcion_actividad,
      empresa_id,
      categoria_id,
      fecha_actividad,
      hora_actividad,
      precio_actividad,
      numero_plazas,
      duracion_actividad,
      nivel_dificultad,
      tipo_actividad,
      ubicacion_actividad,
      imagenes_actividad,
      videos_actividad,
      incluye,
      no_incluye,
      politica_privacidad,
    } = req.body;
  
    try {
      const actividad = dataSource.getRepository(Actividad).create({
        titulo_actividad,
        descripcion_actividad,
        empresa: { id_empresa: empresa_id }, // Relación con Empresa
        categoria: { id_categoria: categoria_id }, // Relación con Categoría
        fecha_actividad,
        hora_actividad,
        precio_actividad,
        numero_plazas,
        duracion_actividad,
        nivel_dificultad,
        tipo_actividad,
        ubicacion_actividad,
        imagenes_actividad,
        videos_actividad,
        incluye,
        no_incluye,
        politica_privacidad,
      });
      await dataSource.getRepository(Actividad).save(actividad);
      res.status(201).json({ message: "Actividad creada exitosamente", actividad });
    } catch (error) {
      console.error("Error al crear actividad:", error);
      res.status(500).json({ message: "Error al crear actividad", error });
    }
  };
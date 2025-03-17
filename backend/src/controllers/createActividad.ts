import { Request, Response } from "express";
import { Actividad } from "../entities/Actividad";
import { Empresa } from "../entities/Empresa";
import { Categoria } from "../entities/Categoria";
import dataSource from "../config/database";

export const createActividad = async (req: Request, res: Response): Promise<Response> => {
    const { titulo_actividad, descripcion_actividad, fecha_actividad, hora_actividad, precio_actividad, numero_plazas, duracion_actividad, nivel_dificultad, tipo_actividad, ubicacion_actividad, empresaId, categoriaId } = req.body;
  
    try {
      const empresa = await dataSource.getRepository(Empresa).findOneBy({ id_empresa: empresaId });
      const categoria = await dataSource.getRepository(Categoria).findOneBy({ id_categoria: categoriaId });
  
      if (!empresa || !categoria) {
        return res.status(400).json({ message: "Empresa o categoría no encontrada" });
      }
  
      const actividad = new Actividad();
      actividad.titulo_actividad = titulo_actividad;
      actividad.descripcion_actividad = descripcion_actividad;
      actividad.fecha_actividad = fecha_actividad;
      actividad.hora_actividad = hora_actividad;
      actividad.precio_actividad = precio_actividad;
      actividad.numero_plazas = numero_plazas;
      actividad.duracion_actividad = duracion_actividad;
      actividad.nivel_dificultad = nivel_dificultad;
      actividad.tipo_actividad = tipo_actividad;
      actividad.ubicacion_actividad = ubicacion_actividad;
      actividad.empresa = empresa; // Relación con Empresa
      actividad.categoria = categoria; // Relación con Categoría
  
      await dataSource.getRepository(Actividad).save(actividad);
  
      return res.status(201).json({ message: "Actividad creada exitosamente", actividad });
    } catch (error) {
      console.error("Error al crear actividad:", error);
      return res.status(500).json({ message: "Error al crear actividad", error });
    }
  };
  
import { DataSource } from "typeorm";
import { Activity } from "../entities/Activity";

export const seedActivities = async (dataSource: DataSource) => {
  const activityRepo = dataSource.getRepository(Activity);

  const INITIAL_ACTIVITIES: Partial<Activity>[] = [
    {
      activity_id: 1,
      activity_title: 'Zumba en grupo',
      activity_description: 'Clase de Zumba para todas las edades y niveles de habilidad.',
      company_id: 1,
      activity_date: new Date('2025-05-01'),
      activity_time: '10:30:00',
      activity_price: 15.0,
      available_slots: 20,
      activity_duration: 60,
      difficulty_level: 'medium',
      activity_type: 'Deportes',
      category_id: 1,
      activity_location: 'Madrid',
      activity_adress: 'Calle Salud 10',
      activity_images: ['zumba-1.webp', 'zumba-2.webp'],
      activity_videos: [],
      includes: 'Clase dirigida por un instructor profesional.',
      excludes: 'No se permite la grabación de videos durante la clase.',
      privacy_policy: true,
    },
    {
      activity_id: 2,
      activity_title: 'Yoga para principiantes',
      activity_description: 'Sesión de yoga para aliviar el estrés y mejorar la flexibilidad.',
      company_id: 2,
      activity_date: new Date('2025-05-02'),
      activity_time: '09:00:00',
      activity_price: 10.0,
      available_slots: 15,
      activity_duration: 90,
      difficulty_level: 'easy',
      activity_type: 'Bienestar y relajación',
      category_id: 2,
      activity_location: 'Segovia',
      activity_adress: 'Camino Sierra 23',
      activity_images: ['yoga-1.webp', 'yoga-2.webp'],
      activity_videos: [],
      includes: 'Instrucción personal en poses básicas.',
      excludes: 'No se permite grabar durante la sesión.',
      privacy_policy: true,
    },
    {
      activity_id: 3,
      activity_title: 'Maratón 10k',
      activity_description: 'Competición de 10 kilómetros para corredores de todos los niveles.',
      company_id: 1,
      activity_date: new Date('2025-06-01'),
      activity_time: '07:00:00',
      activity_price: 25.5,
      available_slots: 100,
      activity_duration: 120,
      difficulty_level: 'hard',
      activity_type: 'Deportes',
      category_id: 1,
      activity_location: 'Valencia',
      activity_adress: 'Calle Tranquila 15',
      activity_images: ['maraton-1.webp'],
      activity_videos: [],
      includes: 'Kit de carrera incluido.',
      excludes: 'Sin devolución de inscripciones.',
      privacy_policy: true,
    },
    {
      activity_id: 4,
      activity_title: 'Escalada',
      activity_description: 'Aventura de escalada para todos los niveles de experiencia.',
      company_id: 4,
      activity_date: new Date('2025-07-10'),
      activity_time: '08:30:00',
      activity_price: 40.0,
      available_slots: 12,
      activity_duration: 180,
      difficulty_level: 'hard',
      activity_type: 'Aventura',
      category_id: 4,
      activity_location: 'Sevilla',
      activity_adress: 'Avenida Historia 77',
      activity_images: ['escalada-1.webp', 'escalada-2.webp'],
      activity_videos: [],
      includes: 'Equipo de escalada proporcionado.',
      excludes: 'No se permite el uso de cámaras personales.',
      privacy_policy: true,
    },
    {
      activity_id: 5,
      activity_title: 'Tour cultural por Madrid',
      activity_description: 'Recorrido guiado por los principales puntos históricos de Madrid.',
      company_id: 2,
      activity_date: new Date('2025-05-15'),
      activity_time: '10:00:00',
      activity_price: 0,
      available_slots: 30,
      activity_duration: 120,
      difficulty_level: 'medium',
      activity_type: 'Cultura',
      category_id: 3,
      activity_location: 'Madrid',
      activity_adress: 'Plaza Mayor',
      activity_images: ['madrid-tour-1.webp'],
      activity_videos: [],
      includes: 'Guía turístico experto incluido.',
      excludes: 'El tour no incluye entradas a museos.',
      privacy_policy: true,
    },
    {
      activity_id: 6,
      activity_title: 'Excursión en kayak',
      activity_description: 'Aventura en kayak por los ríos de la región.',
      company_id: 4,
      activity_date: new Date('2025-08-05'),
      activity_time: '09:00:00',
      activity_price: 35.0,
      available_slots: 15,
      activity_duration: 120,
      difficulty_level: 'medium',
      activity_type: 'Aventura',
      category_id: 4,
      activity_location: 'Zaragoza',
      activity_adress: 'Río Ebro',
      activity_images: ['kayak-1.webp', 'kayak-2.webp'],
      activity_videos: [],
      includes: 'Equipo de kayak proporcionado.',
      excludes: 'No se permiten grupos mayores de 5 personas.',
      privacy_policy: true,
    },
    {
      activity_id: 7,
      activity_title: 'Cine al aire libre',
      activity_description: 'Disfruta de una película bajo las estrellas en nuestra proyección al aire libre.',
      company_id: 5,
      activity_date: new Date('2025-06-10'),
      activity_time: '21:00:00',
      activity_price: 8.0,
      available_slots: 50,
      activity_duration: 120,
      difficulty_level: 'easy',
      activity_type: 'Entretenimiento',
      category_id: 5,
      activity_location: 'Barcelona',
      activity_adress: 'Parque Central',
      activity_images: ['cine-1.webp', 'cine-2.webp'],
      activity_videos: [],
      includes: 'Palomitas y refresco incluidos.',
      excludes: 'No se permite grabar la película.',
      privacy_policy: true,
    },
    {
      activity_id: 8,
      activity_title: 'Bailes latinos',
      activity_description: 'Aprende a bailar salsa, bachata y merengue en esta clase divertida y enérgica.',
      company_id: 5,
      activity_date: new Date('2025-09-01'),
      activity_time: '18:00:00',
      activity_price: 12.0,
      available_slots: 25,
      activity_duration: 60,
      difficulty_level: 'medium',
      activity_type: 'Entretenimiento',
      category_id: 5,
      activity_location: 'Valencia',
      activity_adress: 'Calle Alegría 4',
      activity_images: ['bailes-1.webp'],
      activity_videos: [],
      includes: 'Clase dirigida por un instructor experimentado.',
      excludes: 'No se permite el uso de teléfonos durante la clase.',
      privacy_policy: true,
    }
  ];

  try {
    for (const activity of INITIAL_ACTIVITIES) {
      const existingActivity = await activityRepo.findOneBy({ activity_id: activity.activity_id });
  
      if (!existingActivity) {
        console.log(`🟢 Creando actividad: ${activity.activity_title}`);
        const newActivity = activityRepo.create(activity);
        await activityRepo.save(newActivity);
      } else {
        // Comparar si los campos de la actividad han cambiado (sin imágenes y videos)
        const hasChanges = (
          existingActivity.activity_title !== activity.activity_title ||
          existingActivity.activity_description !== activity.activity_description ||
          existingActivity.company_id !== activity.company_id ||
          Number(existingActivity.activity_price) !== Number(activity.activity_price) ||
          (existingActivity.activity_date && activity.activity_date &&
            new Date(existingActivity.activity_date).getTime() !== new Date(activity.activity_date).getTime()) ||
          (existingActivity.activity_date && !activity.activity_date) ||
          (!existingActivity.activity_date && activity.activity_date) ||
          existingActivity.activity_time !== activity.activity_time ||
          existingActivity.available_slots !== activity.available_slots ||
          existingActivity.activity_duration !== activity.activity_duration ||
          existingActivity.difficulty_level !== activity.difficulty_level ||
          existingActivity.activity_type !== activity.activity_type ||
          existingActivity.category_id !== activity.category_id ||
          existingActivity.activity_location !== activity.activity_location ||
          existingActivity.activity_adress !== activity.activity_adress ||
          existingActivity.includes !== activity.includes ||
          existingActivity.excludes !== activity.excludes ||
          existingActivity.privacy_policy !== activity.privacy_policy ||
          (existingActivity.activity_images?.length !== activity.activity_images?.length || 
           existingActivity.activity_images?.some((img, index) => img !== activity.activity_images?.[index])) ||
          (existingActivity.activity_videos?.length !== activity.activity_videos?.length || 
           existingActivity.activity_videos?.some((video, index) => video !== activity.activity_videos?.[index]))
        );
        
  
        if (hasChanges) {
          console.log(`🟡 Actualizando actividad: ${activity.activity_title}`);
          await activityRepo.update(
            { activity_id: activity.activity_id },
            { 
              ...activity, 
              activity_id: activity.activity_id
            }
          );
        } else {
          console.log(`🔵 La actividad "${activity.activity_title}" ya existe sin cambios.`);
        }
      }
    }
  
    console.log("✅ ¡Seed de actividades completado!");
  } catch (error) {
    console.error("❌ Error durante el seed de actividades:", error);
  }
  
  

  
};
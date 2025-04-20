import { Request, Response } from "express";
import { UserData } from "../../entities/UserData";
import dataSource from "../../config/database";

export const createUserData = async (req: Request, res: Response): Promise<void> => {
  const { first_name, last_name, user_email, user_phone, user_city, privacy_policy } = req.body;

  // Validación básica de los datos
  if (!first_name || !last_name || !user_email || !user_phone || !user_city || privacy_policy === undefined) {
    res.status(400).json({ message: "Faltan campos obligatorios." });
    return; // Terminamos aquí si faltan datos
  }

  // Validación de formato de correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(user_email)) {
    res.status(400).json({ message: "Correo electrónico inválido." });
    return;
  }


  try {
    // Crear la instancia del usuario sin incluir el 'user_id' (lo asigna la base de datos)
    const userData = dataSource.getRepository(UserData).create({
      first_name,
      last_name,
      user_email,
      user_phone, 
      user_city,
      privacy_policy,
    });

    // Guardar el usuario en la base de datos
    const savedUser = await dataSource.getRepository(UserData).save(userData);

    // Devolver el usuario creado y su ID generado automáticamente por la base de datos
    res.status(201).json({
      message: "Usuario creado exitosamente",
      user_id: savedUser.user_id,
      userData: savedUser,
    });
  } catch (error: unknown) {
    // Mejor manejo de errores con detalles claros
    if (error instanceof Error) {
      console.error("Error al crear usuario:", error.message);
      res.status(500).json({ message: "Error al crear usuario", error: error.message });
    } else {
      console.error("Error desconocido:", error);
      res.status(500).json({ message: "Error desconocido al crear usuario", error });
    }
  }
};





// import { Request, Response } from "express";
// import { UserData } from "../../entities/UserData";
// import dataSource from "../../config/database";

// export const createUserData = async (req: Request, res: Response): Promise<void> => {
//     const { ...usersData } =
//       req.body;
  
//     try {
//       const userData = dataSource.getRepository(UserData).create({
//         ...usersData
//       });
//       await dataSource.getRepository(UserData).save(userData);
//       res.status(201).json({ message: "Usuario creado exitosamente", userData });
//     } catch (error) {
//       console.error("Error al crear usuario:", error);
//       res.status(500).json({ message: "Error al crear usuario", error });
//     }
//   };
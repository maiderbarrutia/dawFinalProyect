import { DataSource } from "typeorm";
import { Company } from "../entities/Company";
import bcrypt from "bcrypt";

export const seedCompanies = async (dataSource: DataSource) => {
  const companyRepo = dataSource.getRepository(Company);

  const INITIAL_COMPANIES = [
    {
      company_id: 1,
      company_name: 'Batt Base',
      company_type: 'Gimnasio',
      company_logo: 'logo-batt-base.png',
      company_cif: 'B12345678',
      contact_person: 'Laura Sánchez',
      company_phone: '9123456783',
      company_address: 'Calle Salud 10, Madrid',
      company_website: 'https://battbase.es',
      company_email: 'info@battbase.es',
      company_password: 'hashedpass15',
      privacy_policy: true,
    },
    {
      company_id: 2,
      company_name: 'Healthy Life',
      company_type: 'Centro de Bienestar',
      company_logo: 'logo-healthy-life.png',
      company_cif: 'B23456789',
      contact_person: 'Carlos Romero',
      company_phone: '913456789',
      company_address: 'Camino Sierra 23, Segovia',
      company_website: 'https://healthylife.com',
      company_email: 'contacto@healthylife.com',
      company_password: 'hashedpass2',
      privacy_policy: true,
    },
    {
      company_id: 3,
      company_name: 'Running Club',
      company_type: 'Club Deportivo',
      company_logo: 'logo-running.png',
      company_cif: 'B34567890',
      contact_person: 'Marta Gil',
      company_phone: '914567890',
      company_address: 'Calle Tranquila 15, Valencia',
      company_website: 'https://runningclub.es',
      company_email: 'info@runningclub.es',
      company_password: 'hashedpass3',
      privacy_policy: true,
    },
    {
      company_id: 4,
      company_name: 'Storm Adventures',
      company_type: 'Turismo Aventura',
      company_logo: 'logo-storm.png',
      company_cif: 'B45678901',
      contact_person: 'David Moreno',
      company_phone: '915678901',
      company_address: 'Avenida Historia 77, Sevilla',
      company_website: 'https://stormadventures.com',
      company_email: 'eventos@stormadventures.com',
      company_password: 'hashedpass4',
      privacy_policy: true,
    },
    {
      company_id: 5,
      company_name: 'Strike Sports',
      company_type: 'Club Deportivo',
      company_logo: 'logo-strike.png',
      company_cif: 'B56789012',
      contact_person: 'Sara Rivas',
      company_phone: '916789012',
      company_address: 'Calle Diversión 45, Barcelona',
      company_website: 'https://strikesports.net',
      company_email: 'hello@strikesports.net',
      company_password: 'hashedpass5',
      privacy_policy: true,
    },
    {
      company_id: 6,
      company_name: 'The Culture',
      company_type: 'Organización Cultural',
      company_logo: 'logo-the-culture.png',
      company_cif: 'B67890123',
      contact_person: 'Luis Pérez',
      company_phone: '917890123',
      company_address: 'Plaza Arte 5, Madrid',
      company_website: 'https://theculture.org',
      company_email: 'contacto@theculture.org',
      company_password: 'hashedpass6',
      privacy_policy: true,
    },
    {
      company_id: 7,
      company_name: 'Velo Max',
      company_type: 'Turismo Activo',
      company_logo: 'logo-velo-max.png',
      company_cif: 'B78901234',
      contact_person: 'Ana Gómez',
      company_phone: '918901234',
      company_address: 'Avenida Viento 19, Barcelona',
      company_website: 'https://velomax.com',
      company_email: 'info@velomax.com',
      company_password: 'hashedpass7',
      privacy_policy: true,
    },
    {
      company_id: 8,
      company_name: 'Wellness Center',
      company_type: 'Bienestar y Relax',
      company_logo: 'logo-wellness.png',
      company_cif: 'B89012345',
      contact_person: 'José Martínez',
      company_phone: '919012345',
      company_address: 'Calle Serenidad 33, Valencia',
      company_website: 'https://wellnesscenter.es',
      company_email: 'contacto@wellnesscenter.es',
      company_password: 'hashedpass8',
      privacy_policy: true,
    }
  ];

  try {
    for (const company of INITIAL_COMPANIES) {
      const existingCompany = await companyRepo.findOneBy({ company_id: company.company_id });

      if (!existingCompany) {
        const hashedPassword = await bcrypt.hash(company.company_password, 10);
        company.company_password = hashedPassword;

        console.log(`🟢 Creando empresa: ${company.company_name}`);
        const newCompany = companyRepo.create(company);
        await companyRepo.save(newCompany);
      } else {
        
        const passwordChanged = !(await bcrypt.compare(company.company_password, existingCompany.company_password));
        if (passwordChanged) {
          company.company_password = await bcrypt.hash(company.company_password, 10);
        } else {
          company.company_password = existingCompany.company_password;
        }

        // Comparar campos
        const hasChanges = (
          existingCompany.company_name !== company.company_name ||
          existingCompany.company_type !== company.company_type ||
          existingCompany.company_logo !== company.company_logo ||
          existingCompany.company_cif !== company.company_cif ||
          existingCompany.contact_person !== company.contact_person ||
          existingCompany.company_phone !== company.company_phone ||
          existingCompany.company_address !== company.company_address ||
          existingCompany.company_website !== company.company_website ||
          existingCompany.company_email !== company.company_email ||
          existingCompany.privacy_policy !== company.privacy_policy ||
          passwordChanged
        );

        if (hasChanges) {
          console.log(`🟡 Actualizando empresa: ${company.company_name}`);
          // await companyRepo.update({ company_id: company.company_id }, company);
          await companyRepo.update(
            { company_id: company.company_id },
            {
              ...company,
              company_id: company.company_id,
            }
          );
        } else {
          console.log(`🔵 La empresa "${company.company_name}" ya existe sin cambios.`);
        }
      }
    }

    console.log("✅ ¡Seed de empresas completado!");
  } catch (error) {
    console.error("❌ Error durante el seed de empresas:", error);
  }
  
};

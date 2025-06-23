"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedCategories = void 0;
const Category_1 = require("../entities/Category");
const seedCategories = (dataSource) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryRepo = dataSource.getRepository(Category_1.Category);
    // Categorías iniciales definidas en el seed
    const INITIAL_CATEGORIES = [
        {
            category_id: 1,
            category_name: "Deportes",
            category_description: "Pon a prueba tus límites y mantente activo con nuestras actividades deportivas para todas las edades y niveles.",
            category_image: "deportes.webp",
        },
        {
            category_id: 2,
            category_name: "Bienestar y relajación",
            category_description: "Encuentra la paz que necesitas con actividades diseñadas para el cuidado de tu cuerpo y mente.",
            category_image: "bienestar-relajacion.webp",
        },
        {
            category_id: 3,
            category_name: "Cultura",
            category_description: "Sumérgete en la historia, tradiciones y expresiones artísticas que conectan generaciones y lugares.",
            category_image: "cultura.webp",
        },
        {
            category_id: 4,
            category_name: "Aventura",
            category_description: "Vive experiencias únicas llenas de adrenalina y emociones fuertes en la categoría de aventura.",
            category_image: "aventura.webp",
        },
        {
            category_id: 5,
            category_name: "Entretenimiento",
            category_description: "Diversión asegurada con actividades ideales para disfrutar en grupo y crear recuerdos inolvidables.",
            category_image: "entretenimiento.webp",
        },
    ];
    try {
        for (const category of INITIAL_CATEGORIES) {
            const categoryExists = yield categoryRepo.findOneBy({ category_id: category.category_id });
            if (!categoryExists) {
                console.log(`🟢 Creando categoría: ${category.category_name}`);
                const newCategory = categoryRepo.create(category);
                yield categoryRepo.save(newCategory);
            }
            else {
                const hasChanges = (categoryExists.category_name !== category.category_name ||
                    categoryExists.category_description !== category.category_description ||
                    categoryExists.category_image !== category.category_image);
                if (hasChanges) {
                    console.log(`🟡 Actualizando categoria: ${category.category_name}`);
                    yield categoryRepo.update({ category_id: category.category_id }, Object.assign(Object.assign({}, category), { category_id: category.category_id }));
                }
                else {
                    console.log(`🔵 La categoría "${category.category_name}" ya existe sin cambios.`);
                }
            }
        }
        console.log("✅ ¡Seed de categorias completado!");
    }
    catch (error) {
        console.error("❌ Error durante el seed de categorias:", error);
    }
});
exports.seedCategories = seedCategories;

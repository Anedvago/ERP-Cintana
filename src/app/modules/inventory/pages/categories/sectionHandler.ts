import { Category } from "src/app/models/Category";
import { CategoryHandler } from "src/app/models/CategoryHandler";
import { CategoryService } from "src/app/services/category.service";

export class SectionHandler implements CategoryHandler {
    public ArticlesSections: Category[] = []
    public servicesSections: Category[] = []

    constructor(private categoryService: CategoryService) {
        this.getAllArticlesCategories()
        this.getAllServicesCategories()
    }

    getAllArticlesCategories() {
        this.categoryService.getAllArticlesSections().then((data: any) => {
            this.ArticlesSections = Object.values(
                data.reduce((acc: any, objeto: any) => {
                    const departament = objeto.departament;
                    if (!acc[departament]) {
                        acc[departament] = [];
                    }
                    acc[departament].push(objeto);
                    return acc;
                }, {})
            );
        });
    }

    getAllServicesCategories() {
        this.categoryService.getAllServicesSections().then((data: any) => {
            this.servicesSections = Object.values(
                data.reduce((acc: any, objeto: any) => {
                    const departament = objeto.departament;
                    if (!acc[departament]) {
                        acc[departament] = [];
                    }
                    acc[departament].push(objeto);
                    return acc;
                }, {})
            );
        });
    }

    insertCategory(category: Category): void {
        this.categoryService.insertSection(category.type, category.departament!, category.name).then(() => {
            this.getAllArticlesCategories()
            this.getAllServicesCategories()
        })
    }

    updateCategory(category: Category): void {
        this.categoryService.updateDepartament(category.id, category.type, category.name);
    }
}

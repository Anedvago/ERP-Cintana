import { Category } from "src/app/models/Category";
import { CategoryHandler } from "src/app/models/CategoryHandler";
import { CategoryService } from "src/app/services/category.service";

export class FamilyHandler implements CategoryHandler {
    public articlesFamilies: Category[] = []
    public servicesFamilies: Category[] = []

    constructor(private categoryService: CategoryService) {
        this.getAllArticlesCategories()
        this.getAllServicesCategories()
    }

    getAllArticlesCategories() {
        this.categoryService.getAllArticlesFamilies().then((data: any) => {
            this.articlesFamilies = Object.values(
                data.reduce((acc: any, objeto: any) => {
                    const section = objeto.section;
                    if (!acc[section]) {
                        acc[section] = [];
                    }
                    acc[section].push(objeto);
                    return acc;
                }, {})
            );
        });
    }

    getAllServicesCategories() {
        this.categoryService.getAllArticlesFamilies().then((data: any) => {
            this.servicesFamilies = Object.values(
                data.reduce((acc: any, objeto: any) => {
                    const section = objeto.section;
                    if (!acc[section]) {
                        acc[section] = [];
                    }
                    acc[section].push(objeto);
                    return acc;
                }, {})
            );
        });
    }

    insertCategory(category: Category): void {
        this.categoryService.insertFamily(category.type, category.departament!, category.section!, category.name).then(() => {
            this.getAllArticlesCategories()
            this.getAllServicesCategories()
        })
    }

    updateCategory(category: Category): void {
        this.categoryService.updateDepartament(category.id, category.type, category.name);
    }
}

import { Category } from "src/app/models/Category";
import { CategoryHandler } from "src/app/models/CategoryHandler";
import { CategoryService } from "src/app/services/category.service";

export class DepartamentHandler implements CategoryHandler {
    public articlesDptos: Category[] = []
    public servicesDptos: Category[] = []

    constructor(private categoryService: CategoryService) {
        this.getAllArticlesCategories()
        this.getAllServicesCategories()
    }

    getAllArticlesCategories() {
        this.categoryService.getAllArticlesDepartaments().then((data) => {
            this.articlesDptos = data!;
        })
    }

    getAllServicesCategories() {
        this.categoryService.getAllServicesDepartaments().then((data) => {
            this.servicesDptos = data!;
        })
    }

    insertCategory(category: Category): void {
        this.categoryService.insertDepartament(category.type, category.name).then(() => {
            this.getAllArticlesCategories()
            this.getAllServicesCategories()
        })
    }

    updateCategory(category: Category): void {
        this.categoryService.updateDepartament(category.id, category.type, category.name);
    }

    getCategoryById(id:number, type:number){
        
    }
}
